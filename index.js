const express = require('express');
const app = express();
const PORT = 8888;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect('mongodb://localhost:27017/test');

const db = mongoose.connection;
db.on('error', (err) => { console.log(`An error has occcured while connecting to DB: ${err}`); });
db.on('open', () => { console.log(`Connected to database. `); });

const Schema = mongoose.Schema;
const userSchema = new Schema({
    firstname: String,
    lastname: String,
    username: String,
    password: String,
    phone: String
});

const User = mongoose.model('User', userSchema);

// only logged in user should be able to reach this endpoint
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/api/views/pages/home.html');
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/api/views/pages/login.html');
});

app.post('/login/send', (req, res) => {
    // Add the logic to authenticate user
});

app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/api/views/pages/register.html');
});

app.post('/register/send', (req, res) => {
    let newUser = new User();
    newUser.firstname = req.body.firstName;
    newUser.lastname = req.body.lastName;
    newUser.username = req.body.username;
    newUser.password = req.body.password;
    newUser.phone = req.body.phone;

    console.log(newUser);
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});