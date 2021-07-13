
const express = require("express");
const app = express();
var url = require('url');
const path = require('path');
var router=express.Router();
var product= require('./product.js')
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const fileUpload = require('express-fileupload')
var fs = require('fs');
app.engine('html', require('ejs').renderFile);
app.use(bodyParser.urlencoded({ extended: true })); 
app.use('/public/images',express.static((__dirname+ '/public/images')))
app.use(fileUpload());
var cloudinary = require('cloudinary').v2;
cloudinary.config({ 
    cloud_name: 'hmdahuj7l', 
    api_key: '779499346745353', 
    api_secret: 'AIHCfCxi9ZX23i93z41om9PlwYc' 
  });
const connection = require('pg').Pool;
const myconect = new connection({
    user: 'zzdduyaaxgfqab',
    host: 'ec2-174-129-225-160.compute-1.amazonaws.com',
    database: 'dfd8gcsog7njl7',
    password: '0493727bcbcc2f72994bbedb01f5bfe1360109bc5c66505f7c18dc47e2a1f151',
    port: 5432,
    ssl: {rejectUnauthorized: false},
    });
app.get('/addproduct',(req, res) => {
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
})
app.post('/addproduct1',(req,res)=>{
    var q="";
    q = url.parse(req.url, true);
    var pid="";
    var data=q.query;
    pid = req.body.pid;
    const pname= req.body.pname;
    const pprice =req.body.pprice;
    const cateid= req.body.cateid;
    var pimage =req.files.pimage.name;
    const decription=req.body.pdecription;
        if(pid)
        {  
            cloudinary.uploader.upload(pimage,(err,result) =>{
                if(err){
                    console.log(err)
                }
            var query1 ="insert into public.product values('"+pid+"'"+",'"+pname+"'"+",'"+cateid+"'"+",'"+pprice+"'"+",'"+decription+"','"+result.public_id+"')";
            myconect.query(query1,(err,result1) =>{
                if(err)
                {
                    console.log(err)
                    return;
                }   
                res.redirect("/home/?id=1")   
            })
        
    })
        }
})

app.get('/',(req,res)=>{
    res.render(path.join(__dirname,'./home.html'),{idp:0})
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
        res.redirect("/home/?id=2")
        
    }
    else{
        res.sendFile(path.resolve(__dirname,'./addcategory.html'))
    }
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
        }else {
        res.render(path.join(__dirname,'./home.html'),{result: result,idp: id})
        }
    })
}
    else if(id=='2')
    {
        query="SELECT * FROM public.category";
        myconect.query(query,(err,result1) =>{
        if(err)
        {
                console.log(err);
        }else{
        res.render(path.join(__dirname,'./home.html'),{result1: result1,idp:id})
        }
        })  
    }
    else if(id=='3')
    {
        query="SELECT * FROM public.invoice";
        myconect.query(query,(err,result3) =>{
            if(err)
            {
                console.log(err);
            }
        else{
        res.render(path.join(__dirname,'./home.html'),{result3: result3,idp:id})
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
                if(data.productid && data.quantity)
                {
                    query=`insert into public.checkout values('${data.productid}',${data.quantity})`;
                    myconect.query(query,(err,result) =>{
                        if(err)
                        {
                            console.log(err);
                        }
                    else{
 
                    }
                    })
                }
                res.redirect("/checkout")
                break;
            case"submit" :
            var total=0;
            myconect.query(query1,(err,result1) =>{
            if(err)
            {
                    console.log(err);
            }
            else
            {
                if(data.invoiceid&& data.invoicedate)
            {
                    
                    for(var i=0;i<result1.rowCount;i++)
                    {
                        total= total+parseInt(result1.rows[i].price)*parseInt(result1.rows[i].quantity)     
                    }   
                    query=`insert into public.invoice values('${data.invoiceid}','${data.invoicedate}','${total}')`;
                    myconect.query(query,(err,result)=>{
                        if (err)
                        {
                            console.log(err);
                        }
                    })
                    query2=`delete from public.checkout`;
                    myconect.query(query2,(err,result2)=>{
                        if (err)
                        {
                            console.log(err);
                        }
                    })
                    res.redirect("/home/?id=3")
                }

        }
            })
            
            
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
            query1=`SELECT * FROM public.product where product.id = '0'`;
            myconect.query(query1,(err,result1) =>{
                if(err)
                {
                    console.log(err);
                }
            else{
                query1=`select product.id,product.name,product.price,checkout.quantity from public.product,public.checkout where public.product.id = public.checkout.proid`;
                myconect.query(query1,(err,result1) =>{
                    if(err)
                    {
                        console.log(err);
                    }
                else{
                res.render(path.join(__dirname,'./checkout.html'),{result1: result1,result: result})
            }
            
                })
    }
        })
    }
    })
}
})
app.get('/productdelete',(req,res)=>{
    var q="";
    q = url.parse(req.url, true);
    var data=q.query;
    query1=`delete from public.product where id = '${data.productid}'`;
                myconect.query(query1,(err,result1) =>{
                    if(err)
                    {
                        console.log(err);
                    }
                else{
                res.redirect('/home/?id=1')
            }
            
                })
})
app.get('/categorydelete',(req,res)=>{
    var q="";
    q = url.parse(req.url, true);
    var data=q.query;
    query1=`delete from public.category where cateid = '${data.cateid}'`;
                myconect.query(query1,(err,result1) =>{
                    if(err)
                    {
                        console.log(err);
                    }
                else{
                res.redirect('/home/?id=2')
            }
            
                })
})
app.get('/invoicedelete',(req,res)=>{
    var q="";
    q = url.parse(req.url, true);
    var data=q.query;
    query1=`delete from public.invoice where invoiceid = '${data.invoiceid}'`;
                myconect.query(query1,(err,result1) =>{
                    if(err)
                    {
                        console.log(err);
                    }
                else{
                res.redirect('/home/?id=3')
            }
            
                })
})
app.get('/checkoutdelete',(req,res)=>{
    var q="";
    q = url.parse(req.url, true);
    var data=q.query;
    query1=`delete from public.checkout where proid = '${data.productid}'`;
                myconect.query(query1,(err,result1) =>{
                    if(err)
                    {
                        console.log(err);
                    }
                else{
                res.redirect('/checkout')
            }
            
                })
})
app.listen(port, () => {
    console.log(`Application started and Listening on port ${port}`);
});

          
    