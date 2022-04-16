import Connection from'pg';
const xucxac={rows:[{id:"mot",name:"1️⃣",value:1},{id:"hai",name:"2️⃣",value:2},{id:"ba",name:"3️⃣",value:3},{id:"bon",name:"4️⃣",value:4},{id:"nam",name:"5️⃣",value:5},{id:"sau",name:"6️⃣",value:6}]}
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
    description: 'tài xĩu chẵn lẻ vui chơi có thưởng',
    slash:"both",
    testOnly: true,
    expectedArgs: '<ID người chơi> <số tiền>',
    minArgs: 0,
    maxArgs: 2,
    syntaxError: 'Incorrect usage! Please use help command',
    permissions: ['ADMINISTRATOR'],
    callback: ({ message,args  }) => {
                if(args[0]=="luat"){
                        message.channel.send(`Với tài xỉu, bạn sử dụng 3 viên xúc xắc. Mỗi viên xúc xắc có 6 mặt và người chơi sẽ đặt cược kết quả sau khi nhà cái lắc xúc xắc. Nếu kết quả trên tổng 3 mặt của xúc xắc là 4 đến 10 thì đó gọi là Xỉu, còn nếu là 11 đến 17 thì đó là Tài`)
                }else if(args[0]=="tai" || args[0]=="xiu"||args[0]=="chan"||args[0]=="le"){
                        if(args[1]){
                            const sotien = parseInt(args[1])
                            if(Number.isInteger(sotien)){
                                var query2 ="select * from public.user";
                                myconect.query(query2,(err,result) =>{
                                    if(err)
                                    {
                                        console.log(err)
                                        message.channel.send("error pls contact to admin");
                                    }      
                                    else{
                                        let messages="";
                                        let randomitem=[]
                                        for(let i=0;i<result.rowCount;i++){
                                            if(message.author.id==result.rows[i].id){
                                                if(result.rows[i].money>=sotien){
                                                    messages=""
                                                    var item = xucxac.rows[Math.floor(Math.random()*xucxac.rows.length)];
                                                    var item1 = xucxac.rows[Math.floor(Math.random()*xucxac.rows.length)];
                                                    var item2 = xucxac.rows[Math.floor(Math.random()*xucxac.rows.length)];
                                                    randomitem.push(item)
                                                    randomitem.push(item1)
                                                    randomitem.push(item2)
                                                    for(let j =0;j<10000;j=j+2000){
                                                        item = xucxac.rows[Math.floor(Math.random()*xucxac.rows.length)];
                                                        item1 = xucxac.rows[Math.floor(Math.random()*xucxac.rows.length)];
                                                        item2 = xucxac.rows[Math.floor(Math.random()*xucxac.rows.length)];
                                                        message.channel.send("đang xúc xắc"+item.name+" "+item1.name+" "+item2.name).then(msg => {
                                                            setTimeout(() => msg.delete(), 1000)
                                                          }).catch()
                                                    }
                                                    let sum =randomitem[0].value+randomitem[1].value+randomitem[2].value
                                                    if(args[0]==`tai`||args[0]==`xiu`){
                                                        message.channel.send("xúc xắc xong: "+randomitem[0].name+" "+randomitem[1].name+" "+randomitem[2].name+" tổng điểm là : "+sum +" ("+(sum>=11?" tài ":" xỉu ")+")")
                                                    }else{
                                                        message.channel.send("xúc xắc xong: "+randomitem[0].name+" "+randomitem[1].name+" "+randomitem[2].name+" tổng điểm là : "+sum +" ("+(sum%2==0?" chẵn ":" lẻ ")+")")
                                                    }
                                                        if((args[0]==`tai` && sum>=11)||(args[0]==`xiu` && sum <11)||(args[0]==`le` && sum %2!=0)||(args[0]==`chan` && sum %2==0)){
                                                            var query3 ="update public.user set money= money+"+ sotien +"where id='"+message.author.id+"'";
                                                            myconect.query(query3,(err2,result3) =>{
                                                                if(err2)
                                                                {
                                                                    console.log(err2)
                                                                    message.channel.send("error pls contact to admin");
                                                                }      
                                                                else{
                                                                    message.channel.send(`bạn đã thắng ${sotien*2} coin 🪙`)
                                                                }
                                                            }) 
                                                              }else{
                                                                var query3 ="update public.user set money= money -"+ sotien +"where id='"+message.author.id+"'";
                                                                myconect.query(query3,(err2,result3) =>{
                                                                    if(err2)
                                                                    {
                                                                        console.log(err2)
                                                                        message.channel.send("error pls contact to admin");
                                                                    }      
                                                                    else{
                                                                        message.channel.send(`bạn đã thua ${sotien} coin 🪙`)
                                                                        
                                                                    }
                                                                }) 	
                                                                
                                                              }	  
                                                    
                                                }else{
                                                    messages="bạn không đủ tiền"
                                                }
                                                break;
                                            }else{
                                                messages="vui lòng đăng kí account"
                                            }
                                        }
                                        if(messages!=""){
                                            message.channel.send(messages)
                                        }
                                    }
                                }) 
                        }
                    }else{
                        message.channel.send("hãy nhập số tiền")
                    }
            }else{
                message.channel.send("câu lệnh sai")
            }
      },
}
