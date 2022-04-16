const { Client, Intents } = require('discord.js');
const { token } = require('./Config.json');
const connection = require('pg').Pool;
const village=require('./village.json')
const spawm = require('./spawm.json')
const myconect = new connection({
    user: 'pyosvocvftheey',
    host: 'ec2-54-235-98-1.compute-1.amazonaws.com',
    database: 'd29hcfrealuu2b',
    password: '306335b244c09b26eee27679dab44de6b2130cfa90887e74194c0cdfe74ef697',
    port: 5432,
    ssl: {rejectUnauthorized: false},
    });
const bot = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES]
});
bot.on('guildMemberAdd', (member) => {
    const channelId = '919600155764858890'; // The Channel ID you just copied
    const welcomeMessage = `Chào <@${member.id}>! Hãy chat tại kênh này!`;
    member.guild.channels.fetch(channelId).then(channel => {
        channel.send(welcomeMessage)
    });
});
bot.on('ready', () => {
	console.log('Ready!');
});

function formathour(hour,min){
if(min>=60){
	return hour+1
}else{
	return hour
}
}
let s="";
const banggia=`Tyn tailed gen 1 - 40k, gen 2 - 40k;
1 rank - 5k 
20k - 6 rank
max rank - 50k
max lv vĩ thú - 20k 
combo event boss
SHINDAI  - 40K
FORGED  - 40K
DEVA       - 20k
ĐẶC BIỆT: khi các bạn mua combo 3 event boss và 1 thập vĩ nx thì giá chỉ có 120k th ạ:3 
autoroll bloodline - (thương lượng theo rate)
lmited bloodline - đóng 
max ryo - 40K
1m ryo - 1k
săn tailed beast - 10k gen 2, 20k gen 1 `;
bot.on('messageCreate', (message) => {
	if (message.author.bot) 
		return;

    if(message.content.toLowerCase().includes('bun') || message.content.toLowerCase().includes('đẹp trai'||message.content.toLowerCase().includes("dep trai")) ){
        message.channel.send('bunpro đẹp trai nhất nhóm!');
	}else if(message.content.toLowerCase() ===';banggia')
	message.channel.send(banggia);
	else if(message.content.toLowerCase() ===";aolang"){
		var query2 ="select * from public.User_info";
		myconect.query(query2,(err,result) =>{
			if(err)
			{
				message.channel.send("error pls contact to admin");
			}      
			else{
				var s=``
				for(var i= 0;i<result.rowCount;i++){
					s=s+result.rows[i].Roblox_ID + " - "+result.rows[i].DisName+"\n";
				}
				message.channel.send(s);
			}
				
		}) 
	}else if(message.content.toLowerCase().startsWith(`;spawm`)&&message.content.toLowerCase().includes("now"))	{
		const date = new Date();
		let ss=""
		var offset = -300; //Timezone offset for EST in minutes.
		var estDate = new Date(date.getTime() + offset*60*1000);
		var hourss=date.getHours()+7;
		console.log(hourss)
		var hours= estDate.getHours()>=12?estDate.getHours()-12:estDate.getHours()
		for(let i=0;i<spawm.rows.length;i++){
			
			if(spawm.rows[i].time.hour===hours&&spawm.rows[i].time.minute<=estDate.getMinutes()&&estDate.getMinutes()<=spawm.rows[i].time.minute+25){
				var des=spawm.rows[i].time.minute+25
				let hournow= formathour(spawm.rows[i].time.hour,des)
				if(des>=60){
					des=des-60;
				}else{
					
				}
				ss=ss+`item :${spawm.rows[i].name},Location = ${spawm.rows[i].location}, Time spawm = ${spawm.rows[i].time.hour+":"+spawm.rows[i].time.minute}, Time to despawm = ${hournow+":"+des}, tỷ lệ: ${spawm.rows[i].tyle} \n`;
			}else{
				
			}
			
		}
		ss===""?ss="không có item drop":ss
		message.channel.send(ss)
	}
	
	for(let i=0;i<village.rows.length;i++){
		if(message.content.toLowerCase().startsWith(`;${village.rows[i].name}`)&&message.content.toLowerCase().includes("list")){
			for(let j=0;j<village.rows[i].code.length;j++){
				s=s+village.rows[i].code[j]+"\n"
			}
				
			message.channel.send(s);
		}
		else if(message.content.toLowerCase() ===`;${village.rows[i].name}`){
		var item = village.rows[i].code[Math.floor(Math.random()*village.rows[i].code.length)]
		message.channel.send(item);
		}
	}

    
});

bot.login(process.env.DISCORD_TOKEN);
