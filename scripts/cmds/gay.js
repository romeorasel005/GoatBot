const DIG = require("discord-image-generation");
const fs = require("fs-extra");

module.exports = {
	config: {
		name: "gay",
		version: "1.0",
		author: "Orochi Team",
		countDown: 1,
		role: 0,
		shortDescription: "find gay",
		longDescription: "",
		category: "box chat",
		guide: "{pn} {{[on | off]}}",
		envConfig: {
			deltaNext: 5
		}
	},

	langs: {
		en: {
			noTag: "🎟️ 𝗡𝗘𝗘𝗗𝗘𝗗 𝗧𝗔𝗚\n\n┏━━━━━━━━━━━━━❀\n➤ You must tag the person you want to\n┗━━━━━━━━━━━━━❀ "
		}
	},

	onStart: async function ({ event, message, usersData, args, getLang }) 
  {

    let mention = Object.keys(event.mentions)
    let uid;
  
    // const img = await new DIG.Gay().getImage(url);
    
    
		if(event.type == "message_reply"){
    uid = event.messageReply.senderID
    } else{
      if (mention[0]){
        uid = mention[0]
      }else{
        console.log(" jsjsj")
        uid = event.senderID}
    }

let url = await usersData.getAvatarUrl(uid)
let avt = await new DIG.Gay().getImage(url)


	// 	message.reply({
	// 		body:"",
	// 		attachment: await global.utils.getStreamFromURL(avt)
	// })
  		const pathSave = `${__dirname}/tmp/gay.png`;
	fs.writeFileSync(pathSave, Buffer.from(avt));
    let body = " 𝗙𝗢𝗨𝗡𝗗𝗘𝗗 𝗔 𝗚𝗔𝗬\n\n┏━━━━━━━━━━━━━❀\n➤ Look this Gay 🖕💀\n┗━━━━━━━━━━━━━❀"
    if(!mention[0]) body="🤮 𝗬𝗢𝗨 𝗔𝗥𝗘 𝗚𝗔𝗬\n\n┏━━━━━━━━━━━━━❀\n😈 btich you are a gay\n🖕 You forgot to reply or mention someone\n┗━━━━━━━━━━━━━❀"
    message.reply({body:body,
attachment: fs.createReadStream(pathSave)
		}, () => fs.unlinkSync(pathSave));

    
  }
};









// 	onStart: async function ({ message, event, usersData, threadsData, args }) {

    

    
// 		if(event.type == "message_reply"){
//       avt = await usersData.getAvatarUrl(event.messageReply.senderID)
//     } else{
//       if (!uid2){avt =  await usersData.getAvatarUrl(uid1)
//               } else{avt = await usersData.getAvatarUrl(uid2)}}


// 		message.reply({body:"Look.... I found a gay",
// attachment: fs.createReadStream(pathSave)
// 		}, () => fs.unlinkSync(pathSave));

    

   

// message.send({body:"Look.... I found a gay",
// attachment: fs.createReadStream(pathSave)
// 		}, () => fs.unlinkSync(pathSave));
    
// st fs = require("fs-extra");
// let url = await usersData.getAvatarUrl(event.messageReply.senderID)
// // const img = await new DIG.Gay().getImage(url);
		// const pathSave = `${__dirname}/tmp/gay.png`;
		// fs.writeFileSync(pathSave, Buffer.from(avt));

// // message.send({body:"Look.... I found a gay",
// // attachment: fs.createReadStream(pathSave)
// // 		}, () => fs.unlinkSync(pathSave));

    
// 	}



  
// }