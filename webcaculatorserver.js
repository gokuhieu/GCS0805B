
var dt = require('./mymodule.js');
const hostname = 'localhost';
const express = require("express");
const app = express();
var url = require('url');
const bodyParser = require('body-parser');
const port =80;
app.engine('html', require('ejs').renderFile);
app.use(bodyParser.urlencoded({ extended: true })); 
app.listen(port,hostname, () => {
  console.log("Application started and Listening on port 3000");
});
app.get("/", (req, res) => {
    var q="";
    q = url.parse(req.url, true);
    var data=q.query;
    const a =parseInt(data.a);
    const b= parseInt(data.b);
    const p =data.p;
    var result1 = dt.calc(a,b,p);
    result1= a.toString()+" "+p+" "+b.toString()+" = " + result1.toString();
    console.log(result1);
    res.render(__dirname+"/webcaculator.html", {result:result1});
    
});
