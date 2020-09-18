/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const jwt = require('jsonwebtoken')
const secret = require('./secrets')

module.exports = (req, res, next) => {
  const token = req.headers.token
  if(!token){
   return res.status(500).json({ message: "no authentication provided" })
  }

  jwt.verify(req.headers.token, secret.jwtSecret, (err, decoded) => {
    if(err){
      res.status(401).json({ you: 'shall not pass!' });      
    } else{
      next()
    }
  })
};
