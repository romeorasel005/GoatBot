module.exports = {
	config: {
		name: "kick",
		version: "1.2",
		author: "Orochi Team",//Command modified by Aryan Chauhan don't change my author name
		countDown: 0,
		role: 1,
		shortDescription: {
			vi: "Kick thành viên",
			en: "Kick member"
		},
		longDescription: {
			en: "Kick member out of chat box"
		},
		category: "box chat",
		guide: {
			en: "   {pn} @tags: use to kick members who are tagged"
		}
	},

	langs: {
		en: {
			needAdmin: "💎 𝗡𝗘𝗘𝗗𝗘𝗗 𝗔𝗗𝗠𝗜𝗡\n\n❌ Please add admin for bot before using this feature"
		}
	},

	onStart: async function ({ message, event, args, threadsData, api, getLang }) {
		const adminIDs = await threadsData.get(event.threadID, "adminIDs");
		if (!adminIDs.includes(api.getCurrentUserID()))
			return message.reply(getLang("needAdmin"));
		async function kickAndCheckError(uid) {
			try {
				await api.removeUserFromGroup(uid, event.threadID);
			}
			catch (e) {
				message.reply(getLang("needAdmin"));
				return "ERROR";
			}
		}
		if (!args[0]) {
			if (!event.messageReply)
				return message.SyntaxError();
			await kickAndCheckError(event.messageReply.senderID);
		}
		else {
			const uids = Object.keys(event.mentions);
			if (uids.length === 0)
				return message.SyntaxError();
			if (await kickAndCheckError(uids.shift()) === "ERROR")
				return;
			for (const uid of uids)
				api.removeUserFromGroup(uid, event.threadID);
		}
	}
};