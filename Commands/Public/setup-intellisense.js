const {
    SlashCommandBuilder,
    CommandInteraction,
    PermissionFlagsBits,
    Client
} = require("discord.js");
const ms = require("ms");
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require("discord.js");
const aichat = require("../../Structures/models/aichat");
const Discord = require("discord.js")
const intellisense = require("../../Structures/models/intellisense");

const settings = require("../../Structures/settings.json")
module.exports = {
    data: new SlashCommandBuilder()
        .setName("setup-intellisense")
        .setDescription("Setup your own personal code helper!")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
    async execute(interaction, client) {
        const wait = require('node:timers/promises').setTimeout;
           
        const msg = await interaction.reply({ content: `${settings.emojis.loading} Hmm, let me just check if you're worthy to understand coding.. ${settings.emojis.mainLogo}`})

 

        let data = await intellisense.findOne({ guildId: interaction.guild.id})

        if(!data) data = await intellisense.create({ guildId: interaction.guild.id}, { enabled: false})
    
await wait(3000)
  const embed = new EmbedBuilder()
  .setAuthor({ name: `Lumine - your personal coding teacher.`, iconURL:interaction.user.displayAvatarURL(), url: "https://discord.gg/rialabs"})
  .setDescription(`${settings.emojis.wave} Do you have errors with your code? Enable **RIA Intellisense**, and i will help anyone who is facing an error!`)
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

      new ButtonBuilder()
      .setLabel("Settings")
      .setEmoji(settings.emojis.moderator)
      .setStyle(ButtonStyle.Primary)
      .setCustomId("ria-settings"),
  )
        const mainmsg = await msg.edit({content: `Heyy, let's setup Lumine in your server!`, embeds: [embed], components: [row]})

        const collector = await mainmsg.createMessageComponentCollector({
          componentType: ComponentType.Button,
          time: 60000
        })

         collector.on("collect", async i => {
          if(i.user.id !==interaction.user.id) return i.reply({content: `Sorry but you aren't allowed to use this menu`, ephemeral: true})
         
          if(i.customId === "ria-enable") {
              await i.deferUpdate()
            
  await intellisense.findOneAndUpdate({ guildId: interaction.guild.id}, { enabled: true})
  
  await i.message.edit({content: `${settings.emojis.mainLogo} RIA Intellisense is now active.`, embeds: [], components: []})
  
     
          }

          if(i.customId === "ria-disable") {
             await intellisense.findOneAndUpdate({ guildId: interaction.guild.id}, { enabled: false})
  
              await i.message.edit({content: "I'm sorry you had to let me go, i'll try to be better soon..", components: [], embeds: []})
          }
      
       
      })
    
    },
};