module.exports.config = {
		name: "imgur",
		version: "2.1.0",
		hasPermssion: 0,
		credits: "Orochi Team",
		description: "imgur upload",
		commandCategory: "imgur",
		usages: "[reply to image]",
		cooldowns: 1,
		dependencies: {
				"axios": ""
		}
};

module.exports.run = async ({ api, event }) => {
		const axios = global.nodemodule['axios'];  
		var kenliegwapokaayo = event.messageReply.attachments[0].url; 
		if (!kenliegwapokaayo) return api.sendMessage('⛔ 𝗜𝗡𝗩𝗔𝗟𝗜𝗗 𝗨𝗦𝗘\n\n🗺️ Pease reply to image.', event.threadID, event.messageID);

		const res = await axios.get(`https://api.kenliejugarap.com/imgur/?imageLink=${encodeURIComponent(kenliegwapokaayo)}`);

		if (res.data.error) {
				return api.sendMessage(res.data.error, event.threadID, event.messageID);
		}

		var imgur = res.data.link;
		return api.sendMessage(`🖼️ 𝗜𝗠𝗚𝗨𝗥 𝗖𝗥𝗘𝗔𝗧𝗘𝗗\n\nHere is your imgur link:\n${imgur}`, event.threadID, event.messageID);
}