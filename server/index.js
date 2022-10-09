const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const settings = require('./conf/config.json');
const path = require("path")
var multer = require('multer');
const formidable = require('formidable');
var fileupload = require("express-fileupload");
const { default: axios } = require('axios');
const { post } = require('request');
var id = null;

const saltRounds = 10;
const app = express();


app.use(express.json());
app.use (express.urlencoded({extended: true}));
app.use(cors({
    origin: [settings.CLIENT_URL],
    methods: ["GET", "POST"],
    credentials: true
}));

const maxSize = 2 * 1000 * 1000;


const upload = multer({  storage: multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, settings.ABSOLUT_PICTURE_PATH);
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname);
    }
})})
app.post(settings.PREFIX + '/stats', upload.any(), function (req, res) {
   res.send("Updated")
});


const db = mysql.createConnection({
    user: settings.DB_USER,
    host: settings.DB_HOST,
    password: settings.DB_PASSWORD,
    database: 's4f'
});

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
    key: "userId",
    secret: settings.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie : {
        maxAge : 60000 * 60
    }
}));

app.post(settings.PREFIX + '/register', (req, res)=> {
    const username = req.body.username;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    if (username && password && firstName && lastName && email != null){
        db.query(
            "SELECT * FROM profile WHERE username = ?",
            username,
            (err, result) => {
                if (result.length === 0){
                    db.query(
                        "SELECT * FROM profile WHERE mail = ?",
                        email,
                        (err, mailResult) => {
                            if (mailResult.length === 0){
                                bcrypt.hash(password, saltRounds, (err, hash) => {
                                    db.query(
                                        "INSERT INTO profile(username, password, firstName, lastName, mail) VALUES (?,?,?,?, ?)",
                                        [username, hash, firstName, lastName, email],
                                        (err, result) => {
                                            res.send({message: "Benutzer erstellt", status: "success", registered: true})
                                        }
                                    );
                                });
                            } else {
                                res.send({message: "Email bereits registriert", status: "error", registered: false})
                            }
                        });
                } else {
                    res.send({message: "Benutzername schon vergeben", status: "error", registered: false})
                }
            }
        );
    } else {
        res.send({message: "Bitte alle Felder ausfüllen", status: "error", registered: false})
    }
});

app.get(settings.PREFIX + "/login", (req, res)=> {
    if (req.session.user) {
      res.send({loggedIn: true, user: req.session.user});
    } else {
      res.send({loggedIn: false});
    }
});

app.post(settings.PREFIX + '/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    db.query(
        "SELECT * FROM profile WHERE username = ?;",
        username,
        (err, result) => {
            if (err){
                res.send({err: err});
            }
            if (result.length > 0) {
                bcrypt.compare(password, result[0].password, (error, response) =>{
                    if(response){
                        req.session.user = result;
                        req.session.username = result[0].username;
                        res.send(result);
                    } else {
                        res.send({message: "Logindaten stimmen nicht überein", status: "error"});
                    }
                });
            } else {
                res.send({message: "Dieser Benutzer existiert nicht", status: "error"});
            }
        }
    );
});

app.get(settings.PREFIX + '/logout', (req, res) => {
    req.session.destroy();
});

app.post(settings.PREFIX + '/editProfile', (req, res) => {
    const oldUsername = req.body.oldUsername;
    const username = req.body.username;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const bio = req.body.bio;
    db.query(
        "SELECT * FROM profile WHERE username = ?;",
        username,
        (err, result) => {
            if (!result[0] || oldUsername === username){
                db.query(
                    "UPDATE profile SET username = ?, firstName = ?, lastName = ?, bio = ? WHERE username = ?",
                    [username, firstName, lastName, bio, oldUsername],
                    (err, result) => {
                        const msg = ["Daten wurden geändert!", "Du wirst auf die Startseite weitergeleitet...", "success"]
                        res.send(msg);
                    }
                );
            } else {
                const msg = ["Dieser Benutzername existiert bereits!",
                 "Bitte versuche es nochmal", "error"]
                res.send(msg);
            }
        });
});


app.post(settings.PREFIX + "/content", (req, res)=> {
    db.query(
        "select post.*, profile.username from post join profile where profile.profileID = post.profileID order by date desc limit 10;",
        (err, result)=> {
            res.send(result);
        }
    );
})

app.post(settings.PREFIX + "/userContent", (req, res)=> {
    const username = req.body.username;
    db.query(
        "select post.*, profile.username from post join profile where profile.profileID = post.profileID and profile.username = ? order by date desc;",
        username,
        (err, result)=> {
            res.send(result);
        }
    )
})

app.post(settings.PREFIX + "/allUser", (req, res)=> {
    const id = req.body.id;
    db.query(
        "select profileID, username, firstName, lastName from profile where profileID != ?;",
        id,
        (err, result)=> {
            res.send(result);
        }
    )
})


app.post(settings.PREFIX + "/addPost", (req, res)=> {
    const profileID = req.body.profileID;
    const title = req.body.title;
    const text = req.body.text;
    db.query(
        "INSERT INTO post(profileID, title, text) values(?,?,?);",
        [profileID, title, text]
    );
});

app.post(settings.PREFIX + "/deletePost", (req, res)=> {
    const id = req.body.id;
    db.query(
        "DELETE FROM post WHERE postID = ?;",
        id,
        (err, result)=> {
            res.send(result);
        }
    )
});

app.get(settings.PREFIX + "/contentNum", (req, res)=> { 
    db.query(
        "SELECT MAX(postID) AS Max_Id FROM post;",
        (err, result) => {
            res.send(result);
        }
    );
});

app.post(settings.PREFIX + "/getUser", (req, res)=> {
    const id = req.body.id;
    db.query(
        "SELECT profileID, username, firstName, lastName, bio FROM profile WHERE profileID = ?;",
        id,
        (err, result) => {
            res.send(result);
        }
    );
});

app.post(settings.PREFIX + "/getUserByUsername", (req, res)=> {
    const username = req.body.username;
    db.query(
        "SELECT profileID, username, firstName, lastName, bio FROM profile WHERE username = ?;",
        username,
        (err, result) => {
            res.send(result);
        }
    );
});

app.post(settings.PREFIX + "/getUserByMail", (req, res)=> {
    const email = req.body.email;
    db.query(
        "SELECT * FROM profile WHERE mail = ?;",
        email,
        (err, result) => {
            res.send(result);
        }
    );
});

app.post(settings.PREFIX + "/createLink", (req, res)=> {
    const token = req.body.token;
    const id = req.body.id;
    db.query(
        "INSERT INTO resetpassword(profileID, link) VALUES(?,?);",
        [id, token],
        (err, result) => {
            if (err){
              res.send(err);
            }         
            res.send(result);
        }
    );
});

app.post(settings.PREFIX + "/checkResetToken", (req, res)=> {
    const token = req.body.token;
    db.query(
        "SELECT * FROM resetpassword WHERE link = ?;",
        token,
        (err, result) => {
            res.send(result)
        }
    );
});

app.post(settings.PREFIX + "/changePassword", (req, res)=> {
    const profileID = req.body.id;
    const password = req.body.password;
    bcrypt.hash(password, saltRounds, (err, hash) => {
        db.query(
            "UPDATE profile SET password = ? WHERE profileID = ?;",
            [hash, profileID],
            (err, result) => {
                res.send(result)
            }
        );  
    })
});

app.post(settings.PREFIX + "/deleteToken", (req, res)=> {
    const token = req.body.token;
    db.query(
        "DELETE FROM resetpassword WHERE link = ?;",
        token,
        (err, result) => {
            res.send(result)
        }
    );  

});

app.post(settings.PREFIX + "/getPost", (req, res)=> {
    const postID = req.body.postID;
    db.query(
        "SELECT post.*, profile.username, profile.firstName, profile.lastName, profile.profileID FROM post JOIN profile ON post.profileID = profile.profileID WHERE postID = ?;",
        postID,
        (err, result) => {
            res.send(result)
        }
    )
});

app.post(settings.PREFIX + "/getComments", (req, res)=> {
    const postID = req.body.postID;
    db.query(
        "SELECT comments.*, profile.username, profile.profileID FROM comments JOIN profile ON comments.profileID = profile.profileID WHERE postID = ? order by comments.commentDate desc;",
        postID,
        (err, result) => {
            res.send(result)
        }
    )
});

app.post(settings.PREFIX + "/postComment", (req, res)=> {
    const postID = req.body.postID;
    const profileID = req.body.profileID;
    const comment = req.body.comment;
    db.query(
        "INSERT INTO comments(profileID, postID, comment) VALUES(?, ?, ?);",
        [profileID, postID, comment],
        (err, result) => {
            res.send(result)
        }
    )
});

app.listen(3001, () => {
    console.log("running");
});
