
var dt = require('./mymodule.js');
const express = require("express");
const app = express();
var url = require('url');
const path = require('path');
var router=express.Router();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
var fs = require('fs');
app.engine('html', require('ejs').renderFile);
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static(path.join(__dirname, 'public')))

app.get('/',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'./home.html'))

})
app.get('/home',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'./home.html'))
})
app.get('/addproduct',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'./addproduct.html'))
})
app.get('/addcustomer',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'./addcustomer.html'))
})
app.get('/addcustomer',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'./addcategory.html'))
})



app.listen(port, () => {
    console.log(`Application started and Listening on port ${port}`);
});

          
    