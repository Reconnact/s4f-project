const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const settings = require('./conf/confDefault.json');

const saltRounds = 10;
const app = express();

app.use(express.json());
app.use(cors({
    origin: [settings.CLIENT_URL],
    methods: ["GET", "POST"],
    credentials: true
}));

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
    saveUninitialized: false,
    cookie : {
        maxAge : 60000 * 60
    }
}));

app.post('/register', (req, res)=> {
    const username = req.body.username;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    if (username && password && firstName && lastName != null){
        db.query(
            "SELECT * FROM profile WHERE username = ?",
            username,
            (err, result) => {
                if (result.length === 0){
                    bcrypt.hash(password, saltRounds, (err, hash) => {
                        if(err){
                            console.log(err);   
                        }
                        db.query(
                            "INSERT INTO profile(username, password, firstName, lastName) VALUES (?,?,?,?)",
                            [username, hash, firstName, lastName],
                            (err, result) => {
                                console.log(err);
                            }
                        );
                    });
                } else {
                    res.send({message: "Benutzername schon vergeben"})
                }
            }
        );
    } else {
        res.send({message: "Bitte alle Felder ausfüllen"})
    }
});

app.get("/login", (req, res)=> {
    if (req.session.user) {
      res.send({loggedIn: true, user: req.session.user});
    } else {
      res.send({loggedIn: false});
    }
});

app.post('/login', (req, res) => {
    console.log("login requested");
    const username = req.body.username;
    const password = req.body.password;

    db.query(
        "SELECT * FROM profile WHERE username = ?;",    
        username,
        (err, result) => {
            console.log(err)
            if (err){
                res.send({err: err});
            }
            if (result.length > 0) {
                bcrypt.compare(password, result[0].password, (error, response) =>{
                    if(response){
                        req.session.user = result;
                        res.send(result);
                    } else {
                        res.send({message: "Falscher Benutzername oder Passwort"}); 
                    }
                });
            } else {
                res.send({message: "Dieser Benutzer existiert nicht"});
            }
        }
    );
});

app.get('/logout', (req, res) => {
    //req.session.destroy();
});

app.post('/editProfile', (req, res) => {
    const oldUsername = req.body.oldUsername;
    const username = req.body.username;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const bio = req.body.bio;

    db.query(
        "UPDATE profile SET username = ?, firstName = ?, lastName = ?, bio = ? WHERE username = ?",
        [username, firstName, lastName, bio, oldUsername],
        (err, result) => {
            console.log(err);
            res.send(result);
        }
    );
});

app.get("/contentNum", (req, res)=> {
    db.query(
        "SELECT MAX(postID) AS Max_Id FROM post;",
        (err, result) => {
            res.send(result);
        }
    );
});


app.post("/content", (req, res)=> {
    db.query(
        "select post.*, profile.username from post join profile where profile.profileID = post.profileID order by date desc limit 10;",
        (err, result)=> {
            res.send(result);
        }
    );
})

app.post("/userContent", (req, res)=> {
    const username = req.body.username;
    db.query(
        "select post.*, profile.username from post join profile where profile.profileID = post.profileID and profile.username = ? order by date desc limit 10;",
        username,
        (err, result)=> {
            res.send(result);
        }
    )
})

app.post("/allUser", (req, res)=> {
    const username = req.body.username;
    db.query(
        "select username from profile where username != ?;",
        username,
        (err, result)=> {
            res.send(result);
        }
    )
})


app.post("/addPost", (req, res)=> {
    const profileID = req.body.profileID;
    const title = req.body.title;
    const text = req.body.text;
    db.query(
        "INSERT INTO post(profileID, title, text) values(?,?,?);",
        [profileID, title, text]
    );
});

app.post("/getUser", (req, res)=> {
    const username = req.body.username;
    db.query(
        "SELECT * FROM profile WHERE username = ?;",
        username,
        (err, result) => {
            res.send(result);
        }
    );
});

app.listen(3001, () => {
    console.log("running");
});
