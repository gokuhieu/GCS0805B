
const connectsql =(query1) =>{
    var queryresult;
    const connection = require('pg').Pool;
const myconect = new connection({
    user: 'zzdduyaaxgfqab',
    host: 'ec2-174-129-225-160.compute-1.amazonaws.com',
    database: 'dfd8gcsog7njl7',
    password: '0493727bcbcc2f72994bbedb01f5bfe1360109bc5c66505f7c18dc47e2a1f151',
    port: 5432,
    ssl : {rejectUnauthorized: false},
    });
    myconect.query(query1,(err,result) =>{
        if(err)
        {
            return err;
        }
        
        queryresult=result;
    })
    return queryresult;
}
exports.connectsql=connectsql;
