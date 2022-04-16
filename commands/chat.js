import axios from 'axios'
let v
export default v ={
    category: 'Testing',
    description: 'nói chuyện với AI',
    slash:"both",
    testOnly: true,
    expectedArgs: '<đoạn text>',
    minArgs: 1,
    maxArgs: 100,
    syntaxError: 'Incorrect usage! Please use help command',
    callback: ({ channel,args,interaction  }) => {
        let s =""
        for(let i=0;i<=99;i++){
            if(args[i]){
                s=s+args[i]+" "
            }else{
                break;
            }
        }
        // message is provided only for a legacy command
        
        const encodedParams = new URLSearchParams();
        encodedParams.append("q", s);
        encodedParams.append("target", "vi");
        encodedParams.append("source", "en");

        const options = {
            method: 'GET',
            url: 'https://ai-chatbot.p.rapidapi.com/chat/free',
            params: {message: s, uid: 'user1'},
            headers: {
              'X-RapidAPI-Host': 'ai-chatbot.p.rapidapi.com',
              'X-RapidAPI-Key': '25d37531afmsh81b31003c40bccbp12b041jsnaa158dac16d7'
            }
          };
          
          axios.request(options).then(function (response) {
              channel.send(response.data.chatbot.response);
          }).catch(function (error) {
              channel.send(error);
          });
      },
}



