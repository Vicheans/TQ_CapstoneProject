const express = require("express");
const router = express.Router();

const db = require("../../configs/database");
const uuid = require("uuid").v4();
const CartLogic = require("../../libs/cart");

// Add a Product
// Edit a product
// Delete a product

router.get("/", (req, res)=>{

db.query(`SELECT * FROM products`,
  (err, products) => {
    if (err) res.status(400).json({ err });
    db.query(`SELECT * FROM cart`, async (err, cart) => {
      if (err) res.status(400).json({ err });

      let count = 0, total=0, newCart=[];
      const resp = await cart.forEach((cartItem) => {
        db.query(
          `SELECT * FROM products WHERE id='${cartItem.item_id}'`,
          (err, item) => {
            if (err) res.status(400).json({ err });
            total += (item[0].price || 1) * cartItem.quantity;
            count++;
            newCart.push({...cartItem, name:item[0].name, price: item[0].price})
            if (cart.length === count) {
              return res.status(200).render('home',{
                products, cart: newCart,
                total,
                msg: "Procuts Retrieved Successfully",
              });
            }
          }
        );
      });
    });
  }
);   

})


router.get("/all", (req, res) => {
  db.query(`SELECT * FROM products`, (err, result) => {
    if (err) res.status(400).json({ err });
    return res
      .status(200)
      .json({ result, msg: "Products retrieved successfully" });
  });
});

router.post("/add", (req, res) => {

    const { name, price, weight } = req.body;

    db.query(`INSERT INTO products (id, name, price, weight) VALUES ('${uuid}', '${name}', ${price}, ${weight})`,
      (err, result) => {
        if (err) res.status(400).json({ err });
        return res.status(200).json({ msg: "Product added successfully" });
      });

});

router.patch("/update", (req, res) => {

    const {id, name, price, weight} = req.body;

    db.query(`UPDATE products SET name = '${name}', price=${price}, weight=${weight} WHERE id='${id}';`, (err,result)=>{
             if (err) res.status(400).json({ err });
             res.status(200).json({ msg: "Item Updated Successfully" });
    })
});

router.delete("/delete", (req, res)=>{
   db.query(`DELETE FROM products WHERE id = '${req.body.id}'`, (err, result)=>{
        if (err) res.status(400).json({ err });
        res.status(200).json({msg:'Item removed successfully'})
   })
});


module.exports = router;