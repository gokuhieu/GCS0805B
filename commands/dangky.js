import Connection from'pg';
var connection = Connection.Pool
const myconect = new connection({
    user: 'pyosvocvftheey',
    host: 'ec2-54-235-98-1.compute-1.amazonaws.com',
    database: 'd29hcfrealuu2b',
    password: '306335b244c09b26eee27679dab44de6b2130cfa90887e74194c0cdfe74ef697',
    port: 5432,
    ssl: {rejectUnauthorized: false},
    });

let c 
export default c={
    category: 'Testing',
    description: 'đăng kí account game',
    slash:"both",
    testOnly: true,
    syntaxError: 'Incorrect usage! Please use help command',
    callback: ({ message,interaction  }) => {
    
        // message is provided only for a legacy command
		
        var query2 ="insert into public.User (ID,Name,Money) values('"+message.author.id+"'"+",'"+message.author.username+"'"+","+0+")";
		myconect.query(query2,(err,result) =>{
			if(err)
			{
				console.log(err)
				message.channel.send("error pls contact to admin");
			}      
			else{
				message.channel.send("đăng kí thành công");
			}
		}) 

      },
}
