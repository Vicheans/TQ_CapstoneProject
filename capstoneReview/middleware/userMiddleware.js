const jwt = require('jsonwebtoken');

function ValidateUsername(req, res, next){
    
    const username = req.body.username;
    const password = req.body.password;
    const repeat_password = req.body.repeat_password;

    if(!username || username.length < 3){
        return res.status(400).send({
            message: "Kindly enter a username with a minimum of 3 characters"
        })
    }

    if(!password || password.length < 6){
        return res.status(400).send({
          message: "Kindly enter a password with a minimum of 6 characters",
        });
    }

     if (!repeat_password || password !== repeat_password) {
       return res.status(400).send({
         message: "Both passwords must match",
       });
     }

     next();
}


function SayHiOnEachRequest(req, res, next){
    console.log("Hi, I responded to a request");
    next();
}

function isLoggedIn (req, res, next){
    console.log("")
}

module.exports = {
  ValidateUsername,
  isLoggedIn,
  SayHiOnEachRequest,
};