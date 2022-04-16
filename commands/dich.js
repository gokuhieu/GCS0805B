import axios from 'axios'
let v
export default v ={
    category: 'Testing',
    description: 'dịch tiếng anh sang việt',
    slash:"both",
    testOnly: true,
    expectedArgs: '<chữ cần dịch>',
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
        method: 'POST',
        url: 'https://google-translate1.p.rapidapi.com/language/translate/v2',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'Accept-Encoding': 'application/gzip',
            'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com',
            'X-RapidAPI-Key': '25d37531afmsh81b31003c40bccbp12b041jsnaa158dac16d7'
        },
        data: encodedParams
        };

        axios.request(options).then(function (response) {
            console.log(response.data.data)
            channel.send(response.data.data.translations[0].translatedText);
        }).catch(function (error) {
            channel.send(error);
        });
      },
}



