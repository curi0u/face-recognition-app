const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors())

const database = {
  users: [
    {
      id: '123',
      name: 'John',
      email: 'john@gmail.com',
      password: 'cookies',
      entries: 0,
      joined: new Date()
    },
    {
      id: '124',
      name: 'Sally',
      email: 'sally@gmail.com',
      password: 'bananas',
      entries: 0,
      joined: new Date()      
    }
  ]
}

app.get('/', (req, res) => {
  res.send(database.users);
})

app.post('/signin', (req, res) => {
  const result = database.users.filter(user => 
    req.body.email === user.email && req.body.password === user.password
  )
  if (result.length) {
    res.json('success');
  } else {
    res.status(400).json('error logging in');
  }
})

app.post('/register', (req, res) => {
  const {email, name, password } = req.body;
  database.users.push({
    id: '125',
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date()
  })
  res.json(database.users[database.users.length-1]) 
})

app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  const profile = database.users.filter(user => user.id === id);
  if (profile.length) {
    res.json(profile[0]);
  } else {
    res.status(404).json('no such user');
  }
})

app.post('/image', (req, res) => {
  const { id } = req.body;
  const profile = database.users.filter(user => user.id === id);
  if (profile.length) {
    profile[0].entries++;
    res.json(profile[0].entries);
  } else {
    res.status(404).json('no such user');
  }
})

app.listen(3000, () => {
  console.log('app is listening on port 3000');
})