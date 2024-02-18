const fs = require("fs");

module.exports = {
  config: {
    name: "balance",
    aliases: ["money", "bal"],
    version: 1.0,
    author: "Orochi Team",//Command modified by Aryan Chauhan don't change my author name
    shortDescription: { en: "Check your balance or transfer money" },
    longDescription: { en: "Check your balance or transfer money" },
    category: " 𝗕𝗔𝗟𝗔𝗡𝗖𝗘",
    guide: { en: ".money - Check your balance\n.money transfer [recipient] [amount] - Transfer money" }
  },
  onStart: async function ({ api, args, message, event, threadsData, usersData, dashBoardData }) {
    const command = args[0];
    const senderID = event.senderID;
    const userData = await usersData.get(senderID);
    const userName = userData ? userData.name : "Unknown User";
    const userMoney = userData?.money || 0;

    const taxRate = 5.09; // 4.09% tax per minute
    const elapsedTime = await getElapsedTime(senderID);
    const currentTime = Date.now();
    const elapsedMinutes = Math.floor(elapsedTime / (1000 * 60)); // Convert milliseconds to minutes
    const totalTaxFunds = await getTotalTaxFunds();

    const deductAmount = Math.min(Math.floor(userMoney * (taxRate / 100) * elapsedMinutes), userMoney);
    const updatedMoney = userMoney - deductAmount;

    if (deductAmount > 0) {
      await updateElapsedTime(senderID, currentTime);
      await updateTotalTaxFunds(totalTaxFunds + deductAmount);
    }

    if (command === "transfer") {
      const recipient = args[1];
      const amount = parseFloat(args[2]);

      if (isNaN(amount)) {
        message.reply("🤖 𝙍𝙤𝙢𝙚𝙤𖣘𝘽𝙤𝙩:\n┏━━━━━━━━━━━━❀\n⛔ Invalid amount.✅ Please provide a valid number.\n┗━━━━━━━━━━━━❀");
        return;
      }

      if (updatedMoney < amount) {
        message.reply("🤖 𝙍𝙤𝙢𝙚𝙤𖣘𝘽𝙤𝙩:\n┏━━━━━━━━━━━━❀\n⛔ You don't have enough money to transfer.\n┗━━━━━━━━━━━━❀");
        return;
      }

      const recipientData = await usersData.get(recipient);
      const recipientName = recipientData ? recipientData.name : "Unknown User";
      const transferAmount = Math.floor(amount * 0.95); // 0.05% tax on transfer amount

      if (recipientData) {
        const recipientMoney = recipientData.money || 0;
        const senderData = await usersData.get(senderID);
        const senderMoney = senderData.money || 0;

        if (senderMoney >= amount) {
          const updatedSenderMoney = senderMoney - amount;
          const updatedRecipientMoney = recipientMoney + transferAmount;

          await usersData.set(senderID, { money: updatedSenderMoney });
          await usersData.set(recipient, { money: updatedRecipientMoney });

          message.reply(`🤖 𝙍𝙤𝙢𝙚𝙤𖣘𝘽𝙤𝙩:\n┏━━━━━━━━━━━━❀\n✅ Successfully transferred 💰\n➤ ${transferAmount} \n ➤ ${recipientName}\n┗━━━━━━━━━━━━❀`);
        } else {
          message.reply("🤖𝙍𝙤𝙢𝙚𝙤𖣘𝘽𝙤𝙩:\n┏━━━━━━━━━━━━❀\nYou don't have enough money to transfer.\n┗━━━━━━━━━━━━❀");
        }
      } else {
        message.reply("Recipient not found.");
      }
    } else {
      message.reply(`💬 𝗕𝗔𝗟𝗔𝗡𝗖𝗘 𝗗𝗘𝗧𝗔𝗜𝗟𝗦\n┏━━━━━━━━━━━━━━❀\n🎀 𝗡𝗔𝗠𝗘\n➤ [${userName}]\n\n💎 𝗨𝗦𝗘𝗥 𝗕𝗔𝗟𝗔𝗡𝗖𝗘\n➤ [${updatedMoney}💰]\n\n👑 𝗠𝗢𝗥𝗘 𝗜𝗡𝗙𝗢 \n➤ .money transfer [recipient] [amount] - Transfer money\n\n🍂𝗧𝗘𝗫𝗧 𝗥𝗔𝗧𝗘 \n➤ [${taxRate}%]\n\n⚙️ 𝗨𝗦𝗘𝗥 𝗨𝗜𝗗\n➤ }[${event.senderID}]\n┗━━━━━━━━━━━━━━❀`);
    }
  }
};

async function getElapsedTime(userID) {
  try {
    const taxData = JSON.parse(await fs.promises.readFile("taxData.json"));
    return taxData[userID]?.elapsedTime || 0;
  } catch (error) {
    return 0;
  }
}

async function updateElapsedTime(userID, currentTime) {
  try {
    const taxData = JSON.parse(await fs.promises.readFile("taxData.json"));
    taxData[userID] = { ...taxData[userID], elapsedTime: currentTime };
    await fs.promises.writeFile("taxData.json", JSON.stringify(taxData));
  } catch (error) {
    return;
  }
}

async function getTotalTaxFunds() {
  try {
    const taxData = JSON.parse(await fs.promises.readFile("taxData.json"));
    return taxData.totalTaxFunds || 0;
  } catch (error) {
    return 0;
  }
}

async function updateTotalTaxFunds(totalTaxFunds) {
  try {
    const taxData = JSON.parse(await fs.promises.readFile("taxData.json"));
    taxData.totalTaxFunds = totalTaxFunds;
    await fs.promises.writeFile("taxData.json", JSON.stringify(taxData));
  } catch (error) {
    return;
  }
}