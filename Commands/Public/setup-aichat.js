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
module.exports = {
    data: new SlashCommandBuilder()
        .setName("setup-aichat")
        .setDescription("Setup the friendly chatbot in your guild!")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
    async execute(interaction, client) {
        const wait = require('node:timers/promises').setTimeout;
           
          const msg = await interaction.reply({ content: `✨ Gimme a second..`})

   

    var data;
    data = await aichat.findOne({ guildId: interaction.guild.id})

    if(!data || data == null) {
        await aichat.create({ guildId: interaction.guild.id}, { enabled: false, channel: "", personality: "kind", defaultEngine: "gpt3", accuracy: 1})
        data = await aichat.findOne({ guildId: interaction.guild.id})
    }

 
   
   
await wait(3000)
    const embed = new EmbedBuilder()
    .setAuthor({ name: `Lumine - your friendly companion.`, iconURL: interaction.user.displayAvatarURL(), url: "https://rialabs.xyz/discord"})
    .setDescription(`💫 Enable Lumine in your server and find out there's nothing to regret about it1`)
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
        .setEmoji("✨")
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
            if(i.user.id !== interaction.user.id) return i.reply({content: `Sorry but you aren't allowed to use this menu`, ephemeral: true})
           
            if(i.customId === "ria-enable") {
                await i.deferUpdate()
                const embed = new EmbedBuilder()
                .setAuthor({ name: `Select the channel.`, iconURL: client.user.displayAvatarURL(), url: "https://rialabs.xyz/discord"})
    
                .setDescription(`- Select the channel where the ai-chat will be enabled from the selection menu below.`)
    
                const channelSelect = new Discord.ChannelSelectMenuBuilder()
       .setCustomId('aichat-channel')
       .setPlaceholder('Select the channel.')
       .setMinValues(1)
       .setMaxValues(1);
    
     const row1 = new ActionRowBuilder()
       .addComponents(channelSelect);
    
     const interactionChannel = await i.message.edit({ embeds: [embed], components: [row1]})
       const collectorChannel = await interactionChannel.createMessageComponentCollector({
        filter: m => m.user.id === interaction.user.id,
        componentType: ComponentType.ChannelSelect,
        time: 120000
       })
    
       collectorChannel.on("collect", async menuChannel => {
    
        await menuChannel.deferUpdate()
    var aichatChannel = menuChannel.values[0]
    

    await aichat.findOneAndUpdate({ guildId: interaction.guild.id}, { channel: aichatChannel, enabled: true})
    
    await menuChannel.message.edit({content: `✨ Enjoy the power of Lumine in <#${aichatChannel}>`, embeds: [], components: []})
    
       })
            }

            if(i.customId === "ria-disable") {
                await aichat.findOneAndUpdate({ guildId: interaction.guild.id}, { channel: "", enabled: false})
    
                await i.message.edit({content: "I'm sorry you had to let me go, i'll try to be better soon..", components: [], embeds: []})
            }

          
        
         
        })
    
    },
};