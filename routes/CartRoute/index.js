const express = require("express");
const router = express.Router();

const db = require("../../configs/database");
const uuid = require("uuid").v4();

const CartLogic=require("../../libs/cart")

router.get("/", async (req, res) => {

  await CartLogic(req, res);

});

router.post("/add", (req, res) => {
  const { item_id } = req.body;

  db.query(
    `INSERT INTO cart (id, item_id, quantity) VALUES ('${uuid}', '${item_id}', ${1})`,
    (err, result) => {
      if (err) res.status(400).send({ err });
      return res.status(200).send({ msg: "Product added to Cart successfully" });
    }
  );
});


router.delete("/delete", (req, res) => {
  db.query(
    `DELETE FROM cart WHERE id = '${req.body.id}'`,
    (err, result) => {
      if (err) res.status(400).send({ err });
      res.status(200).send({ msg: "Item removed successfully" });
    }
  );
});

module.exports = router;
