const express = require('express');
const request = require('request');
const bodyParser = require("body-parser");
const cors = require('cors')
const mysql = require("mysql")

const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// app.use('*', cors())

let mysqlConnection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'capstone',
	multipleStatements: true
})

mysqlConnection.connect((err=>{
	if(!err) console.log("Connection Created");
	else console.log("Connection failed", err);
}))



// request.get('https://api.spacexdata.com/v3/capsules', function(err, 
//   response, body){
//        if (!err && response.statusCode == 200) {
//            var locals = JSON.parse(body);
//            console.log(locals[0].missions)
//		console.log(locals);
//        }
//    })

app.get("/test", (req,res)=>{
  res.json({msg:"welcome back", resp: req.body})
})


app.post("/test", (req,res)=>{
  res.json({msg:"welcome back to the post route", resp: req.body})
})

app.get("/products", async (req, res)=>{
 	console.log("This is the Home Product Route");
	//request data from port 3000
	await request.get('http://localhost:3000/frances', 
	async function(err, response, body){
	console.log(err, response, body)
        if (!err && response.statusCode == 200) {
            const result = await JSON.parse(body);
            console.log(result);
        	}
	    })
	

 	res.json({message:"Welcome to the Products page"})
})

const PORT = process.env.PORT || 3001;

app.listen(PORT, ()=>{
    console.log("Server running on", PORT)
})

