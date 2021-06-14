
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
fs.readFile('./webcaculator.html',(err,data)=>{
if(err){
    return console.log("error loading file");
    
}console.log(data.toString());

});
app.use(express.static(path.join(__dirname, 'public')))
app.post("/webcaculator.html",(req,res)=>{

res.writeHead(200,{ 'Content-Type': 'text/html'});
res.end(data.toString());

});
app.get("/webcaculator.html/", (req, res) => {

            
            
            var q="";
            var result1=0;
            q = url.parse(req.url, true);
            var data=q.query;
            var a =parseInt(data.a);
            var b= parseInt(data.b);
            var p =data.p;
            result1 = dt.calc(a,b,p);
            result1= a.toString()+" "+p+" "+b.toString()+" = " + result1.toString();
            res.render(__dirname+"/webcaculator.html",{result:result1});
            
});
