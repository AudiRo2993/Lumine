

const {
    SlashCommandBuilder,
    PermissionFlagsBits,
    EmbedBuilder,
    Client,
    ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  MessageMentions,
  time
  } = require('discord.js');

  const moment = require("moment");

module.exports = {
	name: 'esnipe',
	description: "Snipe a deleted message.",
	cooldown: 100,
	userPerms: ['ManageMessages'],
	botPerms: [''],
    category: 'Admin',
	run: async (client, message, args, prefix) => {

       
        const snipes = client.esnipesDB.get(message.channel.id)
        if(!snipes) return message.reply({ content: `<:Cross:1148583818991763536> Sorry but i couldn't find any edited messages.`})
     
const snipe = args[0] - 1 || 0
const target = snipes[snipe]

if(!target) return message.reply({ content: `<:Cross:1148583818991763536> Sorry. there are only ${snipes.length} messages.`})

const { oldMsg, newMsg, oldImage, newImage, oldTime, newTime, oldSticker, newSticker, oldEmoji, newEmoji, emojiLine } = target


        const id = newMsg.author.id
        const member = message.guild.members.cache.get(id)

        const embed = new EmbedBuilder()
        .setColor("LuminousVividPink")
        .setAuthor({ name: `Sniped Edited Message - ${member.displayName}`, iconURL: member.displayAvatarURL()})
        .setDescription(`Old Message: ${oldMsg.content}\n\nNew Message: ${newMsg.content}\n\n<:alg_bughunter:1149625961000742912> Sent at **${moment(oldTime).fromNow()}** | Snipe **${snipe + 1} / ${snipes.length}**`)

        if(newImage) embed.setImage(oldImage)

        if(newSticker) embed.setImage(oldSticker)

        if(newEmoji) embed.setImage("attachment://emojiline.png")
        console.log(emojiLine)


        if(emojiLine) {
            await message.reply({ embeds: [embed], files: [emojiLine]})
return;
        }

        await message.reply({ embeds: [embed]})

  
    
	}
};