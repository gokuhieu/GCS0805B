
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
const connection = require('pg').Pool;
const myconect = new connection({
    user: 'zzdduyaaxgfqab',
    host: 'ec2-174-129-225-160.compute-1.amazonaws.com',
    database: 'dfd8gcsog7njl7',
    password: '0493727bcbcc2f72994bbedb01f5bfe1360109bc5c66505f7c18dc47e2a1f151',
    port: 5432,
    ssl: {rejectUnauthorized: false},
    });
app.get('/addproduct',(req,res)=>{
    var q="";
    q = url.parse(req.url, true);
    var pid="";
    var data=q.query;
    pid = data.pid;
    const pname= data.pname;
    const pprice =data.pprice;
    const cateid= data.cateid;
    const decription=data.pdecription;
    if(pid)
    {
        var query1 ="insert into public.product values('"+pid+"'"+",'"+pname+"'"+",'"+cateid+"'"+",'"+pprice+"'"+",'"+decription+"')";
        myconect.query(query1,(err,result) =>{
            if(err)
            {
                console.log(err)
                return;
            }      
        })
        res.render(path.resolve(__dirname,'./home.html'),{idp:0})
        
    }
    else{
        var query2 ="select * from public.category";
        myconect.query(query2,(err,result) =>{
            if(err)
            {
                console.log(err)
                return;
            }      
            else{
                res.render(path.resolve(__dirname,'./addproduct.html'),{result: result});
            }
            
        })
        
    }
})
app.get('/',(req,res)=>{
    res.render(path.join(__dirname,'./home.html'),{idp:0})
})


app.get('/addcustomer',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'./addcustomer.html'))
})
app.get('/addcategory',(req,res)=>{
    var q="";
    q = url.parse(req.url, true);
    var data=q.query;
    const cateID = data.cateid;
    const catename= data.catename;
    const cateid= data.cateid;
    const decription=data.catedecription;
    if(cateID)
    {
        var query1 ="insert into public.category values('"+cateID+"'"+",'"+catename+"'"+",'"+decription+"')";
        myconect.query(query1,(err,result) =>{
            if(err)
            {
                console.log(err)
                return;
            }      
        })
        res.render(path.resolve(__dirname,'./home.html',{idp:0}))
        
    }
    else{
        res.sendFile(path.resolve(__dirname,'./addcategory.html'))
    }
})

app.get('/viewproduct',(req,res)=>{
    query="SELECT * FROM public.product";
    myconect.query(query,(err,result) =>{
        if(err)
        {
            console.log(err);
        }
    else{
    console.log(result)
    res.render(path.join(__dirname,'./viewproduct.html'),{result: result})
}
    })
})
app.get('/home',(req,res)=>{
    var q="";
    q = url.parse(req.url, true);
    var data=q.query;
    const id = data.id;
    if(id=='1'){
        query="SELECT * FROM public.product";
        myconect.query(query,(err,result) =>{
            if(err)
            {
                console.log(err);
            }
        else{
    
        res.render(path.join(__dirname,'./home.html'),{result: result,idp: id})
        }
    })
}
    else if(id=='2'){
        query="SELECT * FROM public.category";
        myconect.query(query,(err,result1) =>{
            if(err)
            {
                console.log(err);
            }
        else{
    
        res.render(path.join(__dirname,'./home.html'),{result1: result1,idp:id})
    }
        })  
    }
    else{
        res.render(path.resolve(__dirname,'./home.html'),{idp:0})
    }
     
})
app.get('/viewcategory',(req,res)=>{
    query="SELECT * FROM public.category";
    myconect.query(query,(err,result) =>{
        if(err)
        {
            console.log(err);
        }
    else{

    res.render(path.join(__dirname,'./viewcategory.html'),{result: result})
}
    })
})
app.get('/checkout',(req,res)=>{
    var q="";
    q = url.parse(req.url, true);
    var data=q.query;
    if(data.form)
    {
        switch (data.form)
        {
            case "addproduct":
                query=`SELECT * FROM public.product where pubic.product.id = ${data.productid}`;
                myconect.query(query,(err,result) =>{
                    if(err)
                    {
                        console.log(err);
                    }
                else{
                res.render(path.join(__dirname,'./checkout.html'),{result1: result,quantity:data.quantity})
            }
                })
                break;
            case"submit" :
            break;
            default:
                
                break;

        }
    }else{
        query="SELECT * FROM public.product";
        myconect.query(query,(err,result) =>{
            if(err)
            {
                console.log(err);
            }
        else{
        res.render(path.join(__dirname,'./checkout.html'),{result: result})
    }
        })
    }

})
app.listen(port, () => {
    console.log(`Application started and Listening on port ${port}`);
});

          
    