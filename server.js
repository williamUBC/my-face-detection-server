const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signIn = require('./controllers/signIn');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'mac',
      password : '',
      database : 'smart-brain'
    }
});

// db.select('*').from('users').then(data => {
//     console.log(data);
// });

const app = express(); // running express

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// const database = {
//     users: [
//         {
//             id: '123',
//             name: 'John',
//             email: 'john@gmail.com',
//             password: 'cookies',
//             entries: 0,
//             joined: new Date()
//         },
//         {
//             id: '124',
//             name: 'Sally',
//             email: 'sally@gmail.com',
//             password: 'bananas',
//             entries: 0,
//             joined: new Date()
//         }
//     ]
// }

app.get('/', (req, res) => {
    res.send(database.users);
});

app.post('/signin', (req,res) => signIn.handlerSignIn(req, res, db, bcrypt));

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)});//denpendancy injection

app.get('/profile/:id', (req, res) => profile.handleProfileGet(req, res, db));

//I did not put the image endpoint to a seperate file just make it to be an example of how can I put it in the main file of server.js
app.put('/image', (req, res) => image.handlerImage(req, res, db));
app.post('/imageurl',(req,res) => { image.handleApiCall(req, res)})

app.listen(3000, () => {
    console.log('app is running on port 3000');
});


/*  
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userid --> GET = user
/image --> PUT --> user

*/