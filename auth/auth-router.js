const bcrypt = require('bcrypt')
const router = require('express').Router();
const jwt = require('jsonwebtoken')
const db = require('../database/dbConfig')

const secret = require('./secrets')

router.post('/register', (req, res) => {
  const { username, password } = req.body

  const hashed = bcrypt.hashSync(password, 4)

  db('users').insert({ username, password: hashed })
  .then(newID => {
    res.status(201).send("<h1>Registered successfully!</h1>")
  })
  .catch(error => {
    res.status(500).json({ error: error.message })
  })
});

router.post('/login', (req, res) => {
  const { username, password } = req.body

  
  db('users').where({ username }).first()
  .then(user => {
    if(user && bcrypt.compareSync(password, user.password)){
      const token = generateToken(req.body)

      res.status(200).json({
        message: "Logged in succesfully",
        token
      })
    } else{
      res.status(401).json({ message: "Invalid credentials" })
    }
  })
  .catch(error => {
    res.status(500).json({ error: error.message })
  })
});

function generateToken(user){
  const payload= {
    subect: user.id,
    username: user.username
  }

  const options = {
    expiresIn: '1hr'
  }

  return jwt.sign(payload, secret.jwtSecret, options)
}

module.exports = router;
