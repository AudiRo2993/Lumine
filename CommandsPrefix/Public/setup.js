const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require("discord.js");
const aichat = require("../../Structures/models/aichat");
const Discord = require("discord.js")

const settings = require("../../Structures/settings.json")
module.exports = {
	name: 'setup-aichat',
	description: "Set me up 😊",
  aliases: ["setup-aichat", "start", "install"],
  usage: "[prefix]setup",
  nsfwOnly: false,
  guildOnly: false,
  ownerOnly: false,
	cooldown: 3000,
	userPerms: ['ManageGuild'],
	botPerms: [''],
    category: "Setup",
	run: async (client, message, args, prefix) => {
		const wait = require('node:timers/promises').setTimeout;
           
          const msg = await message.reply({ content: `${settings.emojis.wave} Gimme a second.. ${settings.emojis.mainLogo}`})


          let data = await aichat.findOne({ guildId: message.guild.id})

          if(!data) data = await aichat.create({ guildId: message.guild.id}, { enabled: false, channel: "", personality: "kind", defaultEngine: "gpt3", accuracy: 1})
      
       
await wait(3000)
    const embed = new EmbedBuilder()
    .setAuthor({ name: `Lumine - your friendly companion.`, iconURL: message.author.displayAvatarURL(), url: "https://discord.gg/rialabs"})
    .setDescription(`${settings.emojis.wave} Enable Lumine in your server and find out there's nothing to regret about it1`)
    .setThumbnail(client.user.displayAvatarURL())
    .setFooter({ text: `I'm excited, you'll love it!`, iconURL: client.user.displayAvatarURL()})

     const state = data.enabled
     console.log(state)
    var stateMENT;
    
    if(state === true) {
        stateMENT = false
    }

    if(!state) {
        stateMENT = true
    }
    const row = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
        .setLabel("Enable")
        .setEmoji(settings.emojis.mainLogo)
        .setStyle(ButtonStyle.Secondary)
        .setDisabled(state)
        .setCustomId("ria-enable"),

        new ButtonBuilder()
        .setLabel("Disable")
        .setEmoji(settings.emojis.arrowDown)
        .setStyle(ButtonStyle.Primary)
        .setDisabled(stateMENT)
        .setCustomId("ria-disable"),

        
    )
          const mainmsg = await msg.edit({content: `Heyy, let's setup Lumine in your server!`, embeds: [embed], components: [row]})

          const collector = await mainmsg.createMessageComponentCollector({
            componentType: ComponentType.Button,
            time: 60000
          })

           collector.on("collect", async i => {
            if(i.user.id !== message.author.id) return i.reply({content: `Sorry but you aren't allowed to use this menu`, ephemeral: true})
           
            if(i.customId === "ria-enable") {
                await i.deferUpdate()
                const embed = new EmbedBuilder()
                .setAuthor({ name: `Select the channel.`, iconURL: client.user.displayAvatarURL(), url: "https://discord.gg/clientbot"})
    
                .setDescription(`- Select the channel where the ai-chat will be enabled from the selection menu below.`)
    
                const channelSelect = new Discord.ChannelSelectMenuBuilder()
       .setCustomId('aichat-channel')
       .setPlaceholder('Select the channel.')
       .setMinValues(1)
       .setMaxValues(1);
    
     const row1 = new ActionRowBuilder()
       .addComponents(channelSelect);
    
     const messageChannel = await i.message.edit({ embeds: [embed], components: [row1]})
       const collectorChannel = await messageChannel.createMessageComponentCollector({
        filter: m => m.user.id === message.author.id,
        componentType: ComponentType.ChannelSelect,
        time: 120000
       })
    
       collectorChannel.on("collect", async menuChannel => {
    
        await menuChannel.deferUpdate()
    var aichatChannel = menuChannel.values[0]
    
     await aichat.findOneAndUpdate({ guildId: message.guild.id}, { channel: aichatChannel, enabled: true})
    
    await menuChannel.message.edit({content: `${settings.emojis.mainLogo} Enjoy the power of Lumine in <#${aichatChannel}>`, embeds: [], components: []})
    
       })
            }

            if(i.customId === "ria-disable") {
                  await aichat.findOneAndUpdate({ guildId: message.guild.id}, { channel: "", enabled: false})
    
                await i.message.edit({content: "I'm sorry you had to let me go, i'll try to be better soon..", components: [], embeds: []})
            }
        
         
        })
    
		
	}
};





