const express = require('express');
const app = express();
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');


// const knex = require('knex');
app.use(express.urlencoded({ extended: false }));
app.use(cors());


const knex = require('knex');
const { response } = require('express');
// const db = knex({
//     client: 'pg',
//     connection: {
//         connectionString : process.env.DATABASE_URL,
//         ssl: true,
//     }
// });
const db = knex({
    // Enter your own database information here based on what you created
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'Ankush',
        database: 'smart-brain'
    }
});


app.use(express.json());

app.get('/', (req, res) => { res.send(db.users) })
app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })
app.put('/image', (req, res) => { image.handleImage(req, res, db) })
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })



app.listen(3000, () => {
    console.log(`app is running on PORT ${process.env.PORT}`);
})

/*
    API PLAN:
    '/' = this is working
    /signin POST = success/fail
    /register POST = user Input
    /profile/:userId GET = user
    /image PUT = updated user object (count)
*/