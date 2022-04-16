import express from"express";
const app = express();
import url  from'url'
const xucxac={rows:[{id:"mot",name:"1️⃣",value:1},{id:"hai",name:"2️⃣",value:2},{id:"ba",name:"3️⃣",value:3},{id:"bon",name:"4️⃣",value:4},{id:"nam",name:"5️⃣",value:5},{id:"sau",name:"6️⃣",value:6}]}
import path  from'path';
import pokedex from 'pokedex-promise-v2';
const P = new pokedex
import bodyParser from'body-parser';
import cookieParser from"cookie-parser";
import sessions from'cookie-session';
const port = process.env.PORT || 3000;
import fileUpload from'express-fileupload'
import ejs from 'ejs'
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.engine('html', ejs.renderFile);
app.use(express.urlencoded({ extended: true })); 
app.use('/public',express.static((__dirname+ '/public')))
app.use(fileUpload({useTempFiles: true}))
import { Client, Intents,Collection } from'discord.js';
import * as fs from 'fs'
import WOKCommands from'wokcommands'
const { default: token } = await import('./Config.json', {
	assert: {
	  type: 'json'
	}
  });
  const { default: village } = await import('./village.json', {
	assert: {
	  type: 'json'
	}
  });

//   const { default: spawm } = await import('./spawm.json', {
// 	assert: {
// 	  type: 'json'
// 	}
//   });
import Connection from'pg';
var connection = Connection.Pool
import fetch from 'node-fetch';
import { json } from"express";
const myconect = new connection({
    user: 'pyosvocvftheey',
    host: 'ec2-54-235-98-1.compute-1.amazonaws.com',
    database: 'd29hcfrealuu2b',
    password: '306335b244c09b26eee27679dab44de6b2130cfa90887e74194c0cdfe74ef697',
    port: 5432,
    ssl: {rejectUnauthorized: false},
    });
app.get('/dangky',(req, res) => {
    // res.render(path.join(__dirname,"adduser.html"),{message:""})
    res.sendFile(path.resolve(__dirname,'./dongdangki.html'))
})
app.post('/dangky',(req, res) => {
    
    const roblox_name= req.body.rname;
    const discord_name =req.body.dname;
    const member= req.body.member;
    const blooline= req.body.blooline;
    const element =req.body.element;
    if(discord_name.includes("#")&&roblox_name!=""&&discord_name!=""&&blooline!=""&&element!=""){
        var query2 ="insert into public.User_info values('"+roblox_name+"'"+",'"+discord_name+"'"+",'"+member+"'"+",'"+blooline+"'"+",'"+element+"')";
        myconect.query(query2,(err,result) =>{
            if(err)
            {
                console.log(err)
                res.render(path.join(__dirname,"adduser.html"),{message:"Roblox Name đã bị trùng"})
            }      
            else{
                res.redirect("/")
            }
                
        }) 
    }else{
        res.render(path.join(__dirname,"adduser.html"),{message:"ID discord sai hoặc bạn chưa nhập đủ thông tin"})
    }
   
})

app.get('/',(req,res)=>{
	let date= new Date();
	if((date.getHours()==0||date.getHours()==12)&&date.getMinutes()>=0&&date.getMinutes()<5){
		var query ="delete from public.diemdanhlog";
		myconect.query(query,(err,result) =>{
			if(err)
			{
				console.log(err)
				return;
			}      
			else{
			}
				
		}) 
	}

    var query2 ="select * from public.User_info";
    myconect.query(query2,(err,result) =>{
        if(err)
        {
            console.log(err)
            return;
        }      
        else{
            res.render(path.join(__dirname,'./home.html'),{result: result})
        }
            
    }) 
       
})

app.get('/luat',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'./luat.html'))
       
})
app.get('/thongtin',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'./thongtin.html'))
       
})
app.get('/bangdau',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'./bangdau.html'))
       
})
app.get('/giaithuong',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'./giaithuong.html'))
       
})

app.get('/home',(req,res)=>{

	var query2 ="select * from public.User_info";
    myconect.query(query2,(err,result) =>{
        if(err)
        {
            console.log(err)
            return;
        }      
        else{
            res.render(path.join(__dirname,'./home.html'),{result: result})
        }
            
    }) 
})
const bot = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES]
});
// const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
// bot.commands=new Collection()
// for (const file of commandFiles) {
// 	const command = import(`./commands/${file}`);
// 	// Set a new item in the Collection
// 	// With the key as the command name and the value as the exported module
// 	bot.commands.set(command.then(data=>{data.name}), command);
// }

bot.on('ready', () => {
	new WOKCommands(bot, {
	  // The name of the local folder for your command files
	  commandsDir: path.join(__dirname, 'commands'),
	  testServers:"914020407961591858"
	  
	}).setDefaultPrefix(';')
})


// Client.commands = new Collection();
bot.on('guildMemberAdd', (member) => {
    const channelId = '919600155764858890'; // The Channel ID you just copied
	const chaneladmin = "919593144247541850"
    const welcomeMessage = `Chào <@${member.id}>! Hãy chat tại kênh này!`;
	var role= member.guild.roles.cache.find(role => role.name === "✅Member✅");
	member.roles.add("919595690588532737").then(member.guild.channels.fetch(chaneladmin).then(channel => {channel.send(`đã add role member cho ${member.displayName}`)}))
    member.guild.channels.fetch(channelId).then(channel => {
        channel.send(welcomeMessage)
    });
});
bot.on('guildMemberAdd', (guildMember) => {
	guildMember.roles.add("919595690588532737");
});


// bot.on('interactionCreate', async interaction => {
// 	if (!interaction.isCommand()) return;

// 	const command = bot.commands.get(interaction.commandName);

// 	if (!command) return;

// 	try {
// 		await command.execute(interaction);
// 	} catch (error) {
// 		console.error(error);
// 		await interaction.reply({ content: 'đây không phải lệnh', ephemeral: true });
// 	}
// });

let s="";



bot.on('messageCreate', (message) => {
	var chatbox=message.guild.channels.cache.get("957142185168470017")
	if (message.author.bot) 
		return;
    if(message.content.toLowerCase().includes('bun') || message.content.toLowerCase().includes('đẹp trai'||message.content.toLowerCase().includes("dep trai")) ){
        message.channel.send('bunpro đẹp trai nhất nhóm!');
	}
    else if(message.content.toLowerCase() ===';help')
	message.channel.send(help);
	else if(message.channelId=="957142185168470017"){
			fetch(`https://api-sv2.simsimi.net/v2/?text=${message.content.toLowerCase()}&lc=vn&cf=false`,{mode: 'cors'})
			.then(result=> result.json())
			.then(data=>{
				chatbox.send(`Bun đẹp trai : ${data.success}`)
			})	
			// const response = await simsimi(message.content.toLowerCase())
			// chatbox.send(`Bun đẹp trai : ${response}`)
	}else if(message.content.toLowerCase().includes("https://discord.gg")){
			
			if(message.member.roles.cache.has('914502815060230204')){

			}else{
				message.reply("tin nhắn đã bị chặn do quảng cáo").then(msg => {
					setTimeout(() => {message.delete()},1000)
					})
					.catch()	
			}
		}
	// }else if(message.content.toLowerCase()===(`;doiitem`)){
	// 	var query2 ="select * from public.voucher";
	// 	let s=""
	// 	myconect.query(query2,(err,result) =>{
	// 		if(err)
	// 		{
	// 			console.log(err)
	// 			message.channel.send("error pls contact to admin");
	// 		}      
	// 		else{
	// 			for(let i=0;i<result.rowCount;i++){
	// 				s=s+`id: ${result.rows[i].voucherid}, ${result.rows[i].name}`
	// 			}
	// 			message.channel.send(s);
	// 		}	
	// 	}) 
	// }

				
			

		
});
bot.login(process.env.DISCORD_TOKEN);
app.listen(port, () => {
    console.log(`Application started and Listening on port ${port}`);
});

          
    