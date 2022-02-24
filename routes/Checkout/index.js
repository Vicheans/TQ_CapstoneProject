const express = require("express");
const router = express.Router();


const db = require("../../configs/database");
const uuid = require("uuid").v4();

router.post("/", (req, res) => {

     db.query(
       `DELETE FROM cart`,
       (err, result) => {
         if (err) res.status(400).json({ err });
         res.status(200).json({ msg: "Checkout successful" });
       }
     );
});

module.exports = router;

