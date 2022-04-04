const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const saltRounds = 10;
const app = express();

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true
}));

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '',
    database: 's4f'
});
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
    key: "userId",
    secret: "Im20a",
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
});

app.get("/login", (req, res)=> {
    if (req.session.user) {
      res.send({loggedIn: true, user: req.session.user});
    } else {
      res.send({loggedIn: false});
    }
});

app.post('/login', (req, res) => {
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
                        console.log(req.session.user);
                        res.send(result);
                    } else {
                        res.send({message: "Wrong username or password"}); 
                    }
                });
            } else {
                res.send({message: "User doesn't exisit"});
            }
        }
    );
});

app.get('/logout', (req, res) => {
    req.session.user = null;
});

app.get("/contentNum", (req, res)=> {
    db.query(
        "SELECT MAX(postID) AS Max_Id FROM post;",
        (err, result) => {
            console.log(result);
            res.send(result);
        }
    );
});

app.get("/content", (req, res)=> {
    const id = req.body.id;
    db.query(
        "SELECT * FROM post WHERE postID = ?;",
        [id],
        (err, result) => {
            console.log(err);
            res.send(result);
        }
    );
});

app.listen(3001, () => {
    console.log("running");
});