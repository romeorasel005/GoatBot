module.exports = {
 config: {
	 name: "prefix2",
	 version: "1.0",
	 author: "Orochi Team",//Command modified by Aryan Chauhan don't change my author name
	 countDown: 0,
	 role: 0,
	 shortDescription: "Orochi prefix",
	 longDescription: "Check Orochi System prefix",
	 category: "𝗣𝗥𝗘𝗙𝗜𝗫",
 },

 onStart: async function(){}, 
 onChat: async function({ event, message, getLang }) {
 if (event.body && event.body.toLowerCase() === "prefix2") {
 return message.reply({
 body: `🤖 𝙍𝙤𝙢𝙚𝙤𖣘𝘽𝙤𝙩࿐:\n\n😃 Hello! It look's like you're not familiar with my prefix!\n😗 My Prefix Is 👉【 {global.GoatBot.config.prefix} 】\n\n📌 𝗛𝗢𝗪 𝗧𝗢 𝗨𝗦𝗘
➤  .chi ʜᴏᴡ ᴛᴏ ᴍᴀᴋᴇ ᴄᴀᴋᴇ
➤  .chi ᴡʜᴀᴛ ᴜs ᴄᴀᴘɪᴛᴀʟ ᴏғ ғʀᴀɴᴄ\n➤ Type .help To see All available commands😙 `,
 attachment: await global.utils.getStreamFromURL("https://i.imgur.com/nQkj28w.jpg")
 });
 }
 }
}