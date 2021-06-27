
const express = require("express");
const app = express();
var url = require('url');
const path = require('path');
var router=express.Router();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
var fs = require('fs');
const { connect } = require('./product.js');

app.engine('html', require('ejs').renderFile);
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static(path.join(__dirname, 'public')))
const [Pool,client] = require('pg');
const { on } = require("events");
connectionString = 'postgres://zzdduyaaxgfqab:0493727bcbcc2f72994bbedb01f5bfe1360109bc5c66505f7c18dc47e2a1f151@ec2-174-129-225-160.compute-1.amazonaws.com:5432/dfd8gcsog7njl7'
const client = new client({
    connectionString:connectionString
})

client.connect()
app.get('/',(req,res)=>{
    var q="";
    q = url.parse(req.url, true);
    var data=q.query;
    const pid =data.pid;
    const pname= data.pname;
    const pprice =data.pprice;
    const cateid= data.cateid;
    console.log(pid);
    var query1 ="insert into public.product values('"+pid+"'"+",'"+pname+"'"+",'"+cateid+"'"+",'"+pprice+"')";
    client.query(query1,(err,res)=>{
        console.log(err,res)
        client.end()
    })
    res.sendFile(path.resolve(__dirname,'./home.html'));

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

app.get('/addproduct/',(req,res)=>{


})



app.listen(port, () => {
    console.log(`Application started and Listening on port ${port}`);
});

          
    