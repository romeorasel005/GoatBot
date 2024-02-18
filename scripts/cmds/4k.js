const a = require('axios');
const tinyurl = require('tinyurl');
const fs = require('fs');

module.exports = {
  config: {
    name: "4k",
    aliases: ["4k", "upscale"],
    version: "1.1",
    author: "Orochi Team",//Command modified by Aryan Chauhan don't change my author name
    countDown: 0,
    role: 0,
    longDescription: "4k HD convert your image.",
    category: " 4𝗞",
    guide: {
      en: "{pn} reply to an image"
    }
  },

  onStart: async function ({ message, args, event, api }) {
    const limit = 15;
    const fileName = "aryan.json";
    let userLimits = {};

    try {
      const limitsFileData = fs.readFileSync(fileName, 'utf-8');
      userLimits = JSON.parse(limitsFileData);
    } catch (error) {
      userLimits = {};
      fs.writeFileSync(fileName, JSON.stringify(userLimits), 'utf-8');
    }

    const senderId = event?.senderID;
    const userLimitCount = userLimits[senderId] || 0;

    if (userLimitCount >= limit) {
      return api.sendMessage({ body: "⛔𝗖𝗠𝗗 𝗔𝗟𝗘𝗥𝗧:\n\n ✅ You have reached the daily Limits of 【 15 】Questions\n\n❌ 𝗪𝗵𝘆 𝗬𝗼𝘂 𝗖𝗮𝗻'𝘁 𝗨𝘀𝗲 𝗧𝗵𝗶𝘀 𝗖𝗼𝗺𝗺𝗮𝗻𝗱\n You are a free user so you get daily limits If you do not want daily limits then buy our membership\n\n⁉ \n\n𝗪𝗵𝘆 𝗬𝗼𝘂 𝗕𝘂𝘆 𝗢𝘂𝗿 𝗠𝗲𝗺𝗯𝗲𝗿𝘀𝗵𝗶𝗽\n If you buy our membership then you will not get daily limit. infinite If you buy our membership So you will not get daily limit, you can use it infinitely for life time.And you will also get gifts from Our Team\n\n👑 𝗧𝗵𝗮𝗻𝗸 𝗢𝗿𝗼𝗰𝗵𝗶 𝗧𝗲𝗮𝗺(𝗢𝗧):\nThank you, Orochi Team (OT), for your incredible contributions to my scripting and development. I greatly appreciate the effort you've put into making me a helpful and efficient virtual assistant\n\n🔵𝗗𝗮𝗶𝗹𝘆 𝗖𝗼𝗺𝗺𝗮𝗻𝗱 𝗟𝗶𝗺𝗶𝘁𝘀\n You are given [ 15 ] daily limits for free users from the Orochi team.Your Limits is Over Your limits is 【 ${limit} 】. Now You can't use this Command\n\n🔄 𝗪𝗵𝗲𝗻 𝗧𝗵𝗲 𝗗𝗮𝗶𝗹𝘆 𝗟𝗶𝗺𝗶𝘁𝘀 𝗕𝗲 𝗥𝗲𝘀𝗲𝘁\n The limits will be reset daily the next day for all users.\n\n😚 𝗧𝗛𝗔𝗡𝗞 𝗬𝗢𝗨 𝗔𝗡𝗗 𝗘𝗡𝗝𝗢𝗬." }, event.threadID);
    }

    let imageUrl;

    if (event.type === "message_reply") {
      const replyAttachment = event.messageReply.attachments[0];

      if (["photo", "sticker"].includes(replyAttachment?.type)) {
        imageUrl = replyAttachment.url;
      } else {
        return api.sendMessage(
          { body: "❌ | Reply must be an image." },
          event.threadID
        );
      }
    } else if (args[0]?.match(/(https?:\/\/.*\.(?:png|jpg|jpeg))/g)) {
      imageUrl = args[0];
    } else {
      return api.sendMessage({ body: "4𝗞 𝗛𝗗 𝗜𝗠𝗔𝗚𝗘\n\n🔃 𝐃𝐚𝐢𝐥𝐲 𝐋𝐢𝐦𝐢𝐭𝐬\n➡ 15 \n\n❌ Reply to an image,Do you want to HD image" }, event.threadID);
    }

    try {
      const url = await tinyurl.shorten(imageUrl);
      const k = await a.get(`https://www.api.vyturex.com/upscale?imageUrl=${url}`);

      message.reply("4𝗞 𝗛𝗗 𝗜𝗠𝗔𝗚𝗘\n\n🔃 𝐃𝐚𝐢𝐥𝐲 𝐋𝐢𝐦𝐢𝐭𝐬\n➡ 15\n\n✅ | Please wait...");
      const resultUrl = k.data.resultUrl;
      message.reply({ body: "4𝗞 𝗛𝗗 𝗜𝗠𝗔𝗚𝗘\n\n🔃𝐃𝐚𝐢𝐥𝐲 𝐋𝐢𝐦𝐢𝐭𝐬\n➡ 15✅ | Image Upscaled,HD,4K.", attachment: await global.utils.getStreamFromURL(resultUrl) });

      userLimits[senderId] = (userLimits[senderId] || 0) + 1;
      fs.writeFileSync(fileName, JSON.stringify(userLimits), 'utf-8');
    } catch (error) {
      message.reply("❌ | Error: " + error.message);
      return;
    }
  }
};