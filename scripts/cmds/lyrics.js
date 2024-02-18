const axios = require("axios");

module.exports = {
  config: {
    name: "lyrics",
    version: "1.0",
    author: "Orochi Team",
    countDown: 1,
    role: 0,
    shortDescription: {
      en: "Get lyrics for a song",
    },
    longDescription: {
      en: "This command allows you to get the lyrics for a song. Usage: !lyrics <song name>",
    },
    category: "music",
    guide: {
      en: "{prefix}lyrics <song name>",
    },
  },

  onStart: async function ({ api, event, args }) {
    const songName = args.join(" ");
    if (!songName) {
      api.sendMessage("⛔ 𝗜𝗡𝗩𝗔𝗟𝗜𝗗 𝗧𝗜𝗧𝗟𝗘\n\n❁ Please provide a song name!", event.threadID, event.messageID);
      return;
    }

    const apiUrl = `https://lyrist.vercel.app/api/${encodeURIComponent(songName)}`; // Replace API_URL_HERE with the actual API URL
    try {
      const response = await axios.get(apiUrl);
      const { lyrics, title, artist, image } = response.data;
      if (!lyrics) {
        api.sendMessage("❌ 𝗟𝗬𝗥𝗜𝗖𝗦 𝗡𝗢𝗧 𝗙𝗢𝗨𝗡𝗗\n\n❁ Sorry, lyrics not found!", event.threadID, event.messageID);
        return;
      }
      let message = `📌 𝗛𝗘𝗥𝗘 𝗜𝗦 𝗟𝗬𝗥𝗜𝗖𝗦\n\n🎧 𝗧𝗜𝗧𝗟𝗘\n❥︎ ${title}\n👑 𝗔𝗥𝗧𝗜𝗦𝗧 \n❥︎ ${artist} ✨\n\n🎶 𝗟𝗬𝗥𝗜𝗖𝗦\n❥︎ ${lyrics}`;
      if (image) {
        message += `\n\n🎁 𝗜𝗠𝗔𝗚𝗘 𝗨𝗥𝗟\n${image}`;
      }
      api.sendMessage(message, event.threadID, event.messageID);
    } catch (error) {
      console.error(error);
      api.sendMessage("Sorry, there was an error getting the lyrics!", event.threadID, event.messageID);
    }
  },
};