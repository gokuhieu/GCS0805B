
import DiscordJS from 'discord.js'
let p
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
import pokedex from 'pokedex-promise-v2';
const P = new pokedex
export default p ={
    category: 'Testing',
    description: 'bảng giá',
    slash:"both",
    testOnly: true,

    syntaxError: 'Incorrect usage! Please use help command',
    callback: ({ channel  }) => {
    
        // message is provided only for a legacy command
        
        channel.send(banggia)

      },
}