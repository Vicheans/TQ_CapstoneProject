require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const uuid = require("uuid")
const bcrypt =require("bcrypt")


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const router= require("./routes/router")

app.use("/api", router);


let PORT = process.env.PORT || 3001;
app.listen(PORT, ()=>{
    console.log("App is running on Port", PORT)
})