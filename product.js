

var queryresult;

    myconect.query("SELECT * FROM public.product",err,result =>{
        if(err)
        {
        console.log(err);
        return;
        }
        queryresult=result;
        console.log(result)
        });

