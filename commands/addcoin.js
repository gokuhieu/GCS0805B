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
    description: 'thêm coin',
    slash:"both",
    testOnly: true,
    expectedArgs: '<ID người chơi> <số tiền>',
    minArgs: 2,
    maxArgs: 2,
    syntaxError: 'Incorrect usage! Please use help command',
    permissions: ['ADMINISTRATOR'],
    callback: ({ channel,args  }) => {
    
        // message is provided only for a legacy command
		
			var sotien = parseInt(args[1])
			var query2 ="update public.user set money= money +"+ sotien +"where id='"+args[0]+"'";
			
			myconect.query(query2,(err,result) =>{
				if(err)
				{
					console.log(err)
					channel.send("ko thấy id hoặc số tiền sai");
				}      
				else{
					channel.send(`đã thêm ${sotien} coin🪙 thành công`)
				}	
			}) 

      },
}
// var words =message.content.toLowerCase().split(" ")
// 			if(words[1] && words[2])
// 			{
				
				

// 			}else{
				
// 				var query2 ="select * from public.user";
// 				myconect.query(query2,(err,result) =>{
// 					if(err)
// 					{
// 						console.log(err)
// 						message.channel.send("error pls contact to admin");
// 					}      
// 					else{
// 						for(let i=0;i<result.rowCount;i++){
// 							if(result.rows[i].id==message.author.id){
// 								message.channel.send(`Người chơi: ${result.rows[i].name}, coin: ${result.rows[i].money} 🪙`);
// 							}
// 						}
// 					}	
// 				}) 
				
// 			}
			