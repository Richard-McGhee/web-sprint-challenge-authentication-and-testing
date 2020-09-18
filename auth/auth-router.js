const router = require('express').Router();
const db = require('../database/dbConfig')

router.post('/register', (req, res) => {
  // implement registration
});

router.post('/login', (req, res) => {
  const { username } = req.body

  db('users').where({ username }).first()
  .then(user => {

  })
  .catch(error => {
    res.status(500).json({ error: error.message })
  })
  // Will need to finish this out
});

module.exports = router;
