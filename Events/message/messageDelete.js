const { EmbedBuilder, PermissionsBitField, ButtonBuilder, ButtonStyle, Collection, ActionRowBuilder, time } = require("discord.js");

const Discord = require('discord.js');



module.exports = {
  name: "messageDelete",
  /**
   * @param {import("discord.js").Message} message
   * @param {import("../../Structures/bot")} client
   */
  async execute(message, Lumine) {
  

var emojiAttachment;
const emojiRegex = /^<a?:([a-zA-Z0-9_]+):(\d+)>$/;
            const emojiMatch = message.content?.match(emojiRegex)


let snipes = Lumine.snipesDB.get(message.channel.id) || []

if(snipes.length > 5) snipes = snipes.slice(1, 4)


      if(emojiMatch) {
        const emojiName = emojiMatch[1];
            const emojiId = emojiMatch[2];
            const emojiURL = `https://cdn.discordapp.com/emojis/${emojiId}.png`;
          
            const type = await axios.get(`https://cdn.discordapp.com/emojis/${emojiId}.gif`)
            .then(image => {
                if (image) return "gif"
                else return "png"
            }).catch(err => {
                return "png"
            })
          
            emojiAttachment = `https://cdn.discordapp.com/emojis/${emojiId}.${type}?quality=lossless`
      }
            if (!emojiMatch) emojiAttachment = null

snipes.unshift({
          msg: message,
      image: message.attachments.first() ? message.attachments.first().proxyURL : null,
      time: Date.now(),
      sticker: message.stickers.first() ? message.stickers.first().url : null,
      emoji: emojiAttachment ? emojiAttachment : null
      })

Lumine.snipesDB.set(message.channel.id, snipes)

  },
};
