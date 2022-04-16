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
    description: 'điểm danh mỗi ngày',
    slash:"both",
    testOnly: true,
    syntaxError: 'Incorrect usage! Please use help command',
    callback: ({ message,interaction  }) => {
    
        // message is provided only for a legacy command
		var check=false;
		var query2 ="select * from public.user";
		myconect.query(query2,(err,result) =>{
			if(err)
			{
				console.log(err)
				message.channel.send("error pls contact to admin");
			}      
			else{
				for(let i=0;i<result.rowCount;i++){
					if(result.rows[i].id==message.author.id){
						var date=new Date();
						var query1 ="insert into public.diemdanhlog values('"+message.author.id+"'"+",'"+date +"')";
						myconect.query(query1,(err1,result1) =>{
							if(err1)
							{
								console.log(err1)
								message.channel.send(`Bạn đã điểm danh hôm nay r `);
							}      
							else{
								var query3 ="update public.user set money= money+"+ 100 +"where id='"+message.author.id+"'";
								myconect.query(query3,(err2,result3) =>{
									if(err2)
									{
										console.log(err2)
										message.channel.send("error pls contact to admin");
									}      
									else{
										message.channel.send("Điểm danh thành công và nhận đc 100 coin 🪙");
									}
								}) 	
							}
						}) 
						check=true;
						break;
						}
					}
					if(!check){
						message.channel.send("hãy đăng kí account")
					}
				}
			})
        

      },
}









