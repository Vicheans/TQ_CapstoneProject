const db = require("../configs/database");

const CartLogic = (req, res, next) => {
  let total = 0;

  db.query(`SELECT * FROM cart`, async (err, result) => {
    if (err) res.status(400).send({ err });

    let count = 0;
    const resp = await result.forEach((cartItem) => {
      db.query(
        `SELECT * FROM products WHERE id='${cartItem.item_id}'`,
        (err, item) => {
          if (err) res.status(400).send({ err });
          total += item[0].price * cartItem.quantity;
          count++;
          if (result.length === count) {
            return res.status(200).send({
              result,
              total,
              msg: "Cart Items Retrieved Successfully",
            });
          }
        }
      );
    });
  });
};

module.exports = CartLogic;
