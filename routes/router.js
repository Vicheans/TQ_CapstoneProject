const express = require("express");
const router = express.Router();

const database = require("../configs/database")
const UserRouter = require("./UserRoute/userRouter");
const ProductRouter =require("./ProductRoute/"); 
const CartRouter = require("./CartRoute/")

router.get("/", (req, res, next)=>{
    // res.json({ message: "Welcome to the API" });
    res.send({message: "Welcome to the API" });
})

router.use("/user", UserRouter);
router.use("/product", ProductRouter);
router.use("/cart", CartRouter);

module.exports = router;