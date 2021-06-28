
const connectsql =(query1) =>{
    var queryresult;

    myconect.query(query1,(err,result) =>{
        if(err)
        {
            console.log(err)
            return;
        }      
        queryresult=result;
    })
}
exports.connectsql=connectsql;
