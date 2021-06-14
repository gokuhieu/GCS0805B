
var dt = require('./mymodule.js');
const express = require("express");
const app = express();
var url = require('url');
const path = require('path');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
var fs = require('fs');
app.engine('html', require('ejs').renderFile);
app.use(bodyParser.urlencoded({ extended: true })); 
app.listen(port, () => {
  console.log(`Application started and Listening on port ${port}`);
});
fs.readFile('./home.html',(err,data)=>{
if(err){
    return console.log("error loading file");
    
}

});
app.use(express.static(path.join(__dirname, 'public')))
app.set("/home/", (req,res) =>{
res.render("./home.html");

});

          
    