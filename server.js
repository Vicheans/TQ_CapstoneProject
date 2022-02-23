const express = require('express');
const request = require('request');
const bodyParser = require("body-parser");
const cors = require('cors')
const mysql = require("mysql")

const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.use(express.static("public"));
// app.use(parser.urlencoded({ extended: true }));
// app.use('*', cors())

let mysqlConnection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'tqbk',
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


const productArr = [
   {id:1, product_name:'Louis Vuitton Bag', price: 5000},
   {id:2, product_name:'Vendi Watch', price: 3000},
   {id:3, product_name:'Channel Bag', price: 1000},
]

const cartItems = [];

app.get("/product", function(req, res, next){
     res.render('home', {message:'Products returned successfully', products: 
productArr, cart: cartItems})
})

app.post('/add', function(req, 	res){
	const id = Number(req.body.id);
	//find the product form productArr via id
	const findProduct = productArr.find(productItem => productItem.id === id)
	//next
	//add the found product to the cartItems arr


	//Check if item exiosts in cart already
	const checkCart = cartItems.find(item=>item.id === id)
	
  if (checkCart) {
    (checkCart.quantity += 1);
  } else {
     cartItems.push({ ...findProduct, quantity: 1 });
  }
	
	// res.json({message:'Item Added to cart successfully'});
	// console.log("Product id from the frontend ",id)
	res.redirect('/product')
})


app.get("/about", function(req, res, next){
     res.render('index', {message:'Products returned successfully', products: 
productArr})
})










// 






















const PORT = process.env.PORT || 3001;

app.listen(PORT, ()=>{
    console.log("Server running on", PORT)
})

