
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
app.use(express.static(path.join(__dirname, 'public')))
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '/webcaculator.html'))
    var q="";
    var result1=0;
    q = url.parse(req.url, true);
    var data=q.query;
    const a =parseInt(data.a);
    const b= parseInt(data.b);
    const p =data.p;
    result1 = dt.calc(a,b,p);
    result1= a.toString()+" "+p+" "+b.toString()+" = " + result1.toString();
    res.render  (__dirname+"/webcaculator.html",{result:result1});
    
});
