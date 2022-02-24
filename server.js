require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");


const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(cors());


const router= require("./routes/router")

app.use("/api", router);

let PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log("App is running on Port", PORT)
})