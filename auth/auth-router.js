const bcrypt = require('bcrypt')
const router = require('express').Router();
const db = require('../database/dbConfig')

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
      // Need to add stuff here for authorization and token
    } else{
      res.status(401).json({ message: "Invalid credentials" })
    }
  })
  .catch(error => {
    res.status(500).json({ error: error.message })
  })
  // Will need to finish this out
});

module.exports = router;
