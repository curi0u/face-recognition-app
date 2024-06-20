const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const knex = require('knex');

const signin = require('./controllers/signin')
const register = require('./controllers/register')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors())

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    port: 5432,
    user: 'postgres',
    password: '',
    database: 'smart-brain',
  },
});

app.get('/', (req, res) => {
  res.send('success');
})

app.post('/signin', (req, res) => { signin.handleSignin(req, res, bcrypt, db) })

app.post('/register', (req, res) => { register.handleRegister(req, res, bcrypt, db) })

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })

app.put('/image', (req, res) => { image.handleImage(req, res, db) })

app.listen(3000, () => {
  console.log('app is listening on port 3000');
})