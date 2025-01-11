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
           
        const msg = await interaction.reply({ content: `💫 Hmm, let me just set it up for you`})

  //       await Razen.aichat.ensure(interaction.guild.id, {
  //         channel: "",
  //         enabled: false,
  // }, "riachat")

  var data;
    data = await intellisense.findOne({ guildId: interaction.guild.id})

    if(!data || data == null) {
        await intellisense.create({ guildId: interaction.guild.id}, { enabled: false})
        data = await intellisense.findOne({ guildId: interaction.guild.id})
    }
  console.log(data)
await wait(3000)
  const embed = new EmbedBuilder()
  .setAuthor({ name: `Lumine - your personal coding teacher.`, iconURL:interaction.user.displayAvatarURL(), url: "https://discord.gg/rialabs"})
  .setDescription(`👋 Do you have errors with your code? Enable **RIA Intellisense**, and i will help anyone who is facing an error!`)
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
      .setEmoji("🚀")
      .setStyle(ButtonStyle.Secondary)
      .setDisabled(state)
      .setCustomId("ria-enable"),

      new ButtonBuilder()
      .setLabel("Disable")
      .setEmoji("🔴")
      .setStyle(ButtonStyle.Primary)
      
      .setDisabled(stateMENT)
      .setCustomId("ria-disable")
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
  
  await i.message.edit({content: `💫 RIA Intellisense is now active.`, embeds: [], components: []})
  
     
          }

          if(i.customId === "ria-disable") {

              await intellisense.findOneAndDelete({ guildId: interaction.guild.id })  
              await i.message.edit({content: "I'm sorry you had to let me go, i'll try to be better soon..", components: [], embeds: []})
          }
      
       
      })
    
    },
};