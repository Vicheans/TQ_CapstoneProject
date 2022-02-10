const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: 
["http://localhost:8081",
"http://localhost:3001", 
"http://localhost:3002"]
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  console.log("This is a response from the Remote origin")
  res.json({ message: "Welcome to the starting page" });
});

app.get("/frances", (req, res)=>{
	console.log("A response for the remote Frances API")
res.json({"message": "Welcome to Bukola API, this response is from the remote API"})
})

app.get("/bukola", (req, res)=>{
 res.json({message: "Bukola, API made easy"})
})

// require("./app/routes/tutorial.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
