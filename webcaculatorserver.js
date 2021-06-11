
var dt = require('./mymodule.js');
const express = require("express");
const app = express();
var url = require('url');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
app.engine('html', require('ejs').renderFile);
app.use(bodyParser.urlencoded({ extended: true })); 
app.listen(port, () => {
  console.log(`Application started and Listening on port ${port}`);
});
app.use(express.static(path.join(__dirname, 'public')))
app.get("/", (req, res) => {
    var q="";
    q = url.parse(req.url, true);
    var data=q.query;
    const a =parseInt(data.a);
    const b= parseInt(data.b);
    const p =data.p;
    var result1 = dt.calc(a,b,p);
    result1= a.toString()+" "+p+" "+b.toString()+" = " + result1.toString();
    res.end(`
    <style>
    body{
    background: #ee9ca7;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #ffdde1, #ee9ca7);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #ffdde1, #ee9ca7); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    
        }
    .form-group{
    padding: 2px;
    
    
    }
    .form-control
    {
    
        max-width: 100%;
        
    }
    .form
    {
        padding-left: 40%;
        padding-right: 40%;
    }
    </style>
    <html>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous">
    <head>
    <title>
        A simple web calculator
    </title>
    </head>
    <body>
    <h1 class="text-center">Welcom to example caculator</h1>
    <h2 class="text-center">input value a,b and operator p</h2>
    <div class ="form">
        <form action="" method='GET' id="myForm">
        <div class="form-group">
            <label for="" class="validationDefault02">PLease input number a </label><input type="text" class="form-control" name="a" id="a"placeholder="Number a">
        </div>
        <div class="form-group">
            <label for="" class="validationDefault02">PLease input number b  </label><input type="text" class="form-control" name="b" id="b"placeholder="Number b">
        </div>
        <div class="form-group">
            <label for="" class="validationDefault02">PLease input Operator p </label><input type="text" class="form-control" name="p" id="p"placeholder="Operator">
        </div>
        <div class="form-check text-center">
            <button type="submit" class="btn btn-primary">Submit</button>
        </div>
    </div>
    </form>
     <label for="" class="validationDefault02" name ="result1">Result </label><input class="form-control item" type="text" name=""id="result" value='${result1}'>
    
    </body>
    </html>
    `);
});
