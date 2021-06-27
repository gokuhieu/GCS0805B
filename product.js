const connection = require('pg').Pool;
const myconect = new connection({
host : 'ec2-174-129-225-160.compute-1.amazonaws.com',
database : 'dfd8gcsog7njl7',
user : 'zzdduyaaxgfqab',
password : '0493727bcbcc2f72994bbedb01f5bfe1360109bc5c66505f7c18dc47e2a1f151',
port : 5432,
});
var queryresult;
const connect =(query) =>{
myconect.query(query,err,result =>{
if(err)
{
console.log(err);
return;
}
queryresult=result;
console.log(result)
});
}
exports.connect=connect;
