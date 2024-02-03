const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require("discord.js");
const intellisense = require("../../Structures/models/intellisense");
const Discord = require("discord.js")
module.exports = {
	name: 'setup-intellisense',
	description: "I can help fix your codes",
  aliases: [],
  usage: "[prefix]setup-intellisense",
  nsfwOnly: false,
  guildOnly: false,
  ownerOnly: false,
	cooldown: 3000,
	userPerms: ['ManageGuild'],
	botPerms: [''],
    category: "Setup",
	run: async (client, message, args, prefix) => {
		const wait = require('node:timers/promises').setTimeout;
           
          const msg = await message.reply({ content: `<a:loading2:1148911599940288522> Hmm, let me just check if you're worthy to understand coding.. <:RIA:1177706866755780731>`})



    let data = await intellisense.findOne({ guildId: message.guild.id})

    if(!data) {
        console.log("No data found")
    await intellisense.create({ guildId: message.guild.id}, { enabled: false})
return;
 
    }
    console.log(data)
await wait(3000)
    const embed = new EmbedBuilder()
    .setAuthor({ name: `Lumine - your personal coding teacher.`, iconURL: message.author.displayAvatarURL(), url: "https://discord.gg/rialabs"})
    .setDescription(`<:PI_hewwo:1179890952391888928> Do you have errors with your code? Enable **RIA Intellisense**, and i will help anyone who is facing an error!`)
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
        .setEmoji("<:RIA:1177706866755780731>")
        .setStyle(ButtonStyle.Secondary)
        .setDisabled(state)
        .setCustomId("ria-enable"),

        new ButtonBuilder()
        .setLabel("Disable")
        .setEmoji("<:Arrow_Down:1149035835988127795>")
        .setStyle(ButtonStyle.Primary)
        
        .setDisabled(stateMENT)
        .setCustomId("ria-disable"),

        new ButtonBuilder()
        .setLabel("Settings")
        .setEmoji("<:moderators:1148915936443760755>")
        .setStyle(ButtonStyle.Primary)
        .setCustomId("ria-settings"),
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
              
    await intellisense.findOneAndUpdate({ guildId: message.guild.id}, { enabled: true})
    
    await i.message.edit({content: `<:RIA:1177706866755780731> RIA Intellisense is now active.`, embeds: [], components: []})
    
       
            }

            if(i.customId === "ria-disable") {
                await aichat.findOneAndUpdate({ guildId: message.guild.id}, { enabled: false})
    
                await i.message.edit({content: "I'm sorry you had to let me go, i'll try to be better soon..", components: [], embeds: []})
            }
        
         
        })
    
		
	}
};





