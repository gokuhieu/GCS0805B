import Connection from'pg';
var connection = Connection.Pool
let d
const myconect = new connection({
    user: 'pyosvocvftheey',
    host: 'ec2-54-235-98-1.compute-1.amazonaws.com',
    database: 'd29hcfrealuu2b',
    password: '306335b244c09b26eee27679dab44de6b2130cfa90887e74194c0cdfe74ef697',
    port: 5432,
    ssl: {rejectUnauthorized: false},
    });
export default d ={
    category: 'Testing',
    description: 'bảng giá',
    slash:"both",
    testOnly: true,

    syntaxError: 'Incorrect usage! Please use help command',
    callback: ({ channel  }) => {
    
        // message is provided only for a legacy command
        
        var query2 ="select * from public.User_info";
        myconect.query(query2,(err,result) =>{
            if(err)
            {
                channel.send("error pls contact to admin");
            }      
            else{
                var s=``
                for(var i= 0;i<result.rowCount;i++){
                    s=s+result.rows[i].Roblox_ID + " - "+result.rows[i].DisName+"\n";	
                }
                channel.send(s);
            }	
        }) 
    },
}
