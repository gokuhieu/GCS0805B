
const express = require("express");
const app = express();
var url = require('url');
const path = require('path');
var router=express.Router();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
var fs = require('fs');
const { connectsql } = require('./product.js');
app.engine('html', require('ejs').renderFile);
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static(path.join(__dirname, 'public')))
const connection = require('pg').Pool;
const myconect = new connection({
    user: 'zzdduyaaxgfqab',
    host: 'ec2-174-129-225-160.compute-1.amazonaws.com',
    database: 'dfd8gcsog7njl7',
    password: '0493727bcbcc2f72994bbedb01f5bfe1360109bc5c66505f7c18dc47e2a1f151',
    port: 5432,
    ssl: {rejectUnauthorized: false},
    });
app.get('/addproduct/add',(req,res)=>{

    var q="";
    q = url.parse(req.url, true);
    var data=q.query;
    const pid =data.pid;
    const pname= data.pname;
    const pprice =data.pprice;
    const cateid= data.cateid;
    console.log(pid);
    var query1 ="insert into public.product values('"+pid+"'"+",'"+pname+"'"+",'"+cateid+"'"+",'"+pprice+"')";
    myconect.query(query1,(err,result) =>{
        if(err)
        {
            console.log(err)
            return;
        }      
    })
    res.sendFile(path.resolve(__dirname,'./home.html'))

})
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
app.get('/addcategory',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'./addcategory.html'))
})

app.get('/viewproduct',(req,res)=>{
    query="SELECT * FROM public.product";
    var queryresult;
    myconect.query(query,(err,result) =>{
    
        res.send(result);
        var product =[{nameid: result.fields[0].name, nameproduct: result.fields[1].name,cateidname: result.fields[2].name,productprice: result.fields[3].name}]
        res.render(path.join(__dirname,'./viewproduct.html'),product)
    })
    
    
    // 
})

app.listen(port, () => {
    console.log(`Application started and Listening on port ${port}`);
});

          
    