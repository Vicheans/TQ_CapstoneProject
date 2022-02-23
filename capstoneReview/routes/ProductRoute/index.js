const express = require("express");
const router = express.Router();

const db = require("../../configs/database");
const uuid = require("uuid").v4();

// Add a Product
// Edit a product
// Delete a product

router.get("/", (req, res)=>{

db.query(` SELECT * FROM products);`,
  (err, result) => {
    if (err) res.status(400).json({ err });
    return res.status(200).json({ result, msg: "Products retrieved successfully" });
  }
);   

})

router.post("/add", (req, res) => {

    const { name, price, weight } = req.body;

    db.query(`INSERT INTO products (id, name, price, weight) VALUES ('${uuid}', '${name}', ${price}, ${weight})`,
      (err, result) => {
        if (err) res.status(400).json({ err });
        return res.status(200).json({ msg: "Product added successfully" });
      });

});

router.patch("/update", (req, res) => {
    db.query(`UPDATE products SET name = 'New name' WHERE id='${req.body.id}';`, (err,result)=>{
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