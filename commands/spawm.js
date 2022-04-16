
  function formathour(hour,min){
    if(min>=60){
        return hour+1
    }else{
        return hour
    }
    }
  const { default: spawm } = await import('../spawm.json', {
	assert: {
	  type: 'json'
	}
  });
let spawms
export default spawms ={
    category: 'Testing',
    description: 'xem các item spawm hiện tại',
    slash:"both",
    testOnly: true,
    callback: ({ message, interaction }) => {
    
        // message is provided only for a legacy command
        if (message) {
            const date = new Date();
            let ss=""
            var offset = -300; //Timezone offset for EST in minutes.
            var estDate = new Date(date.getTime() + offset*60*1000);
            var hours= estDate.getHours()>=12?estDate.getHours()-12:estDate.getHours()
            for(let i=0;i<spawm.rows.length;i++){
                
                if(spawm.rows[i].time.hour===hours&&spawm.rows[i].time.minute<=estDate.getMinutes()&&estDate.getMinutes()<=spawm.rows[i].time.minute+25){
                    var des=spawm.rows[i].time.minute+25
                    let hournow= formathour(spawm.rows[i].time.hour,des)
                    if(des>=60){
                        des=des-60;
                    }else{			
                    }
                    ss=ss+`item :${spawm.rows[i].name},Location = ${spawm.rows[i].location}, Time spawm = ${spawm.rows[i].time.hour+":"+spawm.rows[i].time.minute}, Time to despawm = ${des==0?hournow+":00":hournow+":"+des}, tỷ lệ: ${spawm.rows[i].tyle} \n`;
                }else{
                }
            }
            ss===""?ss="không có item drop":ss
          message.reply({
            content: ss
          })
          return
        }
        const date = new Date();
            let ss=""
            var offset = -300; //Timezone offset for EST in minutes.
            var estDate = new Date(date.getTime() + offset*60*1000);
            var hours= estDate.getHours()>=12?estDate.getHours()-12:estDate.getHours()
            for(let i=0;i<spawm.rows.length;i++){
                
                if(spawm.rows[i].time.hour===hours&&spawm.rows[i].time.minute<=estDate.getMinutes()&&estDate.getMinutes()<=spawm.rows[i].time.minute+25){
                    var des=spawm.rows[i].time.minute+25
                    let hournow= formathour(spawm.rows[i].time.hour,des)
                    if(des>=60){
                        des=des-60;
                    }else{			
                    }
                    ss=ss+`item :${spawm.rows[i].name},Location = ${spawm.rows[i].location}, Time spawm = ${spawm.rows[i].time.hour+":"+spawm.rows[i].time.minute}, Time to despawm = ${des==0?hournow+":00":hournow+":"+des}, tỷ lệ: ${spawm.rows[i].tyle} \n`;
                }else{
                }
            }
            ss===""?ss="không có item drop":ss
        // interaction is provided only for a slash command
        interaction.reply({
          content: ss
        })
        
        // Alternatively we can just simply return our reply object
        // OR just a string as the content.
        // WOKCommands will handle the proper way to reply with it
        return {
          content: "pong"
        }
      },
}