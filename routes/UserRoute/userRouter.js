const express = require("express");
const router = express.Router();
const ValidateNewUser = require("../../middleware/userMiddleware.js")
const db = require("../../configs/database")
const uuid = require("uuid").v4();
const jwt = require("jsonwebtoken")
// console.log(uuid)

router.post(
  "/login",
  ValidateNewUser.SayHiOnEachRequest,
  async (req, res) => {
   

 db.query(`SELECT * FROM users WHERE username = ${db.escape(req.body.username)};`, 
 function(err, result){

   if (err) return res.status(400).json({ err });
   if (!req.body.password)
     return res.status(200).json({ err: "No password detected" });

        const token = jwt.sign(
          {
            username: result[0].username,
            userId: result[0].id,
          }, "SECRETKEY",
          { expiresIn: "7d" });

        return res.status(200).json({
          msg: "Logged in!",
          token,
          user: result[0],
        });

      }
    );
  }
);

router.post("/register", 
ValidateNewUser.SayHiOnEachRequest,
ValidateNewUser.ValidateUsername, 
(req, res) => {

  db.query(
    `INSERT INTO users 
    (id, username, password, registered) 
    VALUES ('${uuid}', ${db.escape(
      req.body.username
    )}, ${db.escape(req.body.password)}, now())`,
    (err, result) => {
      if (err) {
        return res.status(400).send({
          msg: err,
        });
      }
      return res.status(201).json({
        msg: "Registered!",
      });
    }
  );
   
})


router.get("/secret-route", (req, res, next) => {
  console.log(req.userData);
  res.send("This is the secret content. Only logged in users can see that!");
});


module.exports = router;
