const express = require('express');
const app = express();

//determine wethwe input is odd or even
//Binary textRendering: 

class Node{
    constructor(value){
        this.value = value;
        this.right = null;
        this.left = null;
    }
}

class BST{
    constructor(){
        this.root = null;
    }

    // inserting a Node
    insert(val){
        let newNode = new Node(val);
        if(!this.root){
            this.root = newNode;
            return this;
        }
        let current = this.root;

        while(true){
            if(val === current.value) return undefined;

            if(val < current.value){
                if(current.left === null){
                    current.left = newNode;
                    return this;
                }else{
                    current = current.left
                }
            }else if(val > current.value){
                if(current.right === null){
                    current.right = newNode;
                    return this;
                }else{
                    current = current.right;
                }
            }           
        }
    }

        //find value in a tree
        find(val){
            if(!this.root) return 'Tree is Empty';
            let current = this.root;
            let index = 0;
            let leftIdx = 0, rightIdx = 0, found = false;

            while(true && !found){
                if(val === current.value || !current.value) {
                    found = true;
                    return {current, index, leftIdx, rightIdx}
                };
                if(val < current.value){
                    current = current.left;
                    leftIdx++
                }else if(val > current.value){
                    current = current.right;
                    rightIdx++
                }
                index++;
            } if(!found) return 'Entry Not Found';
        }

        //TREE TRAVERSAL
        //Breadth First Search
        BreadthFirstSearch(){
            var data = [];
            let queue = [];
            let node = this.root;
            queue.push(node);

            
            
        }



}


// class TreeTraversal{
//     constructor(){
//         this.root = null;
//     }

    

// }
































































// const bodyParser = require("body-parser");
// const ejs = require("ejs")

// app.set("view engine", "ejs");
// app.use(bodyParser.urlencoded({ extended: true }), bodyParser.json());


// app.get("/", function(req, res){
//     const firstName = ''
//     const last_name = ''
//     const PORTFOLIO = 'Full-Stack Developer'
//     const country = ''
//     res.render('index', {first_name: firstName, last_name, country: country})
// })


// app.post("/", (req, res)=>{
//   const first_name = req.body.firstname
//   const last_name = req.body.lastname;
//   const country = req.body.country;


//   res.render("index", {
//     first_name: first_name,
//     last_name: last_name,
//     country: country,
//   });
// })


// // app.post("/home", function(req, res){

// // })

// function serverResponse(){
//     console.log("Server is running on port here : 1200")
// }

// app.listen(1200, serverResponse);






































// function sumTwoNumbers(x, y){
    
//     console.log("--> The value of X is: " + x)
//     console.log("--> The value of Y is: " + y);
//     // if, else if, else

//     // 1: ||: OR, 
//     // 2: &&: AND, 
//     // 3: ===: EQUAL TO, 
//     // 4: !==: NOT EQUAL TO

//     if(x === undefined) {
//         return "'x' value is not defined "
//     } // 
    
//     else if(y === undefined){
//          return "'y' value is not defined "
//     }
    
//     let total = x + y;
//     return total
// }

// //                      sumTwoNumbers(x, y) 
// console.log('=======> ',sumTwoNumbers(2))













app.listen(3000, ()=>{
    console.log("Running")
})