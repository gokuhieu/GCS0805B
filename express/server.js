
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

router.get('/',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'./home.html'))

})
router.get('/home.html',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'./home.html'))

})
router.get('/webcaculator.html',(req,res)=>{
var q="";
q = url.parse(req.url, true);
var data=q.query;
const a =parseInt(data.a);
const b= parseInt(data.b);
const p =data.p;
var result1 = dt.calc(a,b,p);
result1= a.toString()+" "+p+" "+b.toString()+" = " + result1.toString();
console.log(result1);
res.render(path.resolve(__dirname,'./webcaculator.html'), {result:result1});
})


app.listen(port, () => {
    console.log(`Application started and Listening on port ${port}`);
});

          
    