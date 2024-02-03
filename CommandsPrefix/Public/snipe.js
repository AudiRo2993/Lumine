

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
	name: 'snipe',
	description: "Snipe a deleted message.",
	cooldown: 100,
	userPerms: ['ManageMessages'],
	botPerms: [''],
    category: 'Admin',
	run: async (client, message, args, prefix) => {

       
        const snipes = client.snipesDB.get(message.channel.id)
        if(!snipes) return message.reply({ content: `<:Cross:1148583818991763536> Sorry but i couldn't find any deleted messages.`})
     
const snipe = args[0] - 1 || 0
const target = snipes[snipe]

if(!target) return message.reply({ content: `<:Cross:1148583818991763536> Sorry. there are only ${snipes.length} messages.`})

const { msg, image, time, sticker, emoji } = target


        const id = msg.author.id
        const member = message.guild.members.cache.get(id)

        const embed = new EmbedBuilder()
        .setColor("LuminousVividPink")
        .setAuthor({ name: `Sniped Message - ${member.displayName}`, iconURL: member.displayAvatarURL()})
        .setDescription(`${msg.content}\n\n<:alg_bughunter:1149625961000742912> Deleted **${moment(time).fromNow()}** | Snipe **${snipe + 1} / ${snipes.length}**`)

        if(image) embed.setImage(image)

        if(sticker) embed.setImage(sticker)

        if(emoji) embed.setImage(emoji)


        await message.reply({ embeds: [embed]})

    
	}
};