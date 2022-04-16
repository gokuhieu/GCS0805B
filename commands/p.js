
import DiscordJS from 'discord.js'
let p
import pokedex from 'pokedex-promise-v2';
const P = new pokedex
export default p ={
    category: 'Testing',
    description: 'lệnh pokemon',
    slash:"both",
    testOnly: true,
    expectedArgs: '<command>',
    minArgs: 1,
    maxArgs: 1,
    syntaxError: 'Incorrect usage! Please use pokemon command',
    callback: ({ channel,args  }) => {
    
        // message is provided only for a legacy command
        
            const option = args[0]
            if(option === "tim")
            (async () => { // with Async/Await
				try {
					var id = Math.floor(Math.random() * 1000);
					const pname= P.getPokemonByName(id).then(poke=>channel.send( `${poke.name?"đã tìm thấy "+poke.name + " ":"không tìm thấy"}`))
					const pimage=P.getPokemonFormByName(id).then(poke=>channel.send( `${poke.sprites.front_default?poke.sprites.front_default:null}`))
				} catch (error) {
					throw error
				}
			})()	

          
        
        
        // interaction is provided only for a slash command
        
        // Alternatively we can just simply return our reply object
        // OR just a string as the content.
        // WOKCommands will handle the proper way to reply with it
            
        
      },
}