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
           
          const msg = await interaction.reply({ content: `<a:laugh:1186421728423972864> Gimme a second.. <:RIA:1177706866755780731>`})

    

    let data = await aichat.create({ guildId: interaction.guild.id}, { enabled: false, channel: "", personality: "kind", defaultEngine: "gpt3", accuracy: 1})


    data = aichat.findOne({ guildId: interaction.guild.id})
 
    
   
    const embed = new EmbedBuilder()
    .setAuthor({ name: `Lumine - your friendly companion.`, iconURL: interaction.user.displayAvatarURL(), url: "https://discord.gg/rialabs"})
    .setDescription(`<:PI_hewwo:1179890952391888928> Enable Lumine in your server and find out there's nothing to regret about it1`)
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
                .setAuthor({ name: `Select the channel.`, iconURL: client.user.displayAvatarURL(), url: "https://discord.gg/clientbot"})
    
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
    
    await menuChannel.message.edit({content: `<:RIA:1177706866755780731> Enjoy the power of Lumine in <#${aichatChannel}>`, embeds: [], components: []})
    
       })
            }

            if(i.customId === "ria-disable") {
                await aichat.findOneAndUpdate({ guildId: interaction.guild.id}, { channel: "", enabled: false})
    
                await i.message.edit({content: "I'm sorry you had to let me go, i'll try to be better soon..", components: [], embeds: []})
            }

            if(i.customId === "ria-settings") {
                await i.deferUpdate()
if(!data) return message.reply("Please run the command again, setup the ai-chat, then come change the settings. There is no data for this guild!")

const row = new ActionRowBuilder()
.addComponents(
    new ButtonBuilder()
    .setLabel("Personality")
    .setCustomId("lumine-personality")
    .setStyle(ButtonStyle.Primary)
    .setEmoji("<:RIASupport:1187702126458175618>"),

    new ButtonBuilder()
    .setLabel("Default Engine")
    .setCustomId("lumine-default-engine")
    .setStyle(ButtonStyle.Primary)
    .setEmoji("<:RIA5:1187699966576164895>"),

    new ButtonBuilder()
    .setLabel("Accuracy & Info")
    .setCustomId("lumine-a-i")
    .setStyle(ButtonStyle.Success)
    .setEmoji("<:RIA:1177706866755780731>")
)

const embed = new EmbedBuilder()
.setAuthor({ name: `What do you want to modify?`, iconURL: "https://cdn.discordapp.com/emojis/1179890952391888928.webp?size=96&quality=lossless", url: "https://discord.gg/rialabs"})
.setDescription(`You can change or modify certain features and settings on Lumine to make it more to your likings, preferences and creativity. **That's what Lumine is about**`)
.setFooter({ text: `Make Lumine yours.`})
.setColor("LuminousVividPink")

const settingsCollector = await i.message.edit({ embeds: [embed], components: [row]})

const collector = await settingsCollector.createMessageComponentCollector({
    time: 120000,
    componentType: ComponentType.Button
})

collector.on("collect", async i => {
    if(i.user.id !== interaction.user.id) return i.reply({content: `Sorry but you aren't allowed to use this menu`, ephemeral: true})
           
    if(i.customId === "lumine-personality") {
        const select = new Discord.StringSelectMenuBuilder()
			.setCustomId('starter')
			.setPlaceholder('Make a selection!')
			.addOptions(
				new Discord.StringSelectMenuOptionBuilder()
					.setLabel('Rude')
					.setDescription('Lumine will be rude to you and make you feel useless.')
					.setValue('luminerude'),
				new Discord.StringSelectMenuOptionBuilder()
					.setLabel('Friendly & Kind')
					.setDescription('Lumine will treat you like her best friend')
					.setValue('luminekind'),
				new Discord.StringSelectMenuOptionBuilder()
					.setLabel('NSFW')
					.setDescription('Lumine will engage in NSFW Conversations. This only works in NSFW-Enabled channels.')
					.setValue('luminensfw'),
                    new Discord.StringSelectMenuOptionBuilder()
					.setLabel('Custom')
					.setDescription('Customize Lumine to your own liking!')
					.setValue('lumine-custom'),
			);

		const row = new ActionRowBuilder()
			.addComponents(select);

		const response = await i.message.reply({
			content: `Choose Lumine's personality.`,
			components: [row],
		});

        const collector = response.createMessageComponentCollector({ componentType: ComponentType.StringSelect, time: 3_600_000 });

collector.on('collect', async i => {
	const selection = i.values[0];
	
    if(selection === "luminerude") {
        let data = await aichat.findOne({ guildId: interaction.guild.id})

    let personality = "rude";
if(!data.personality) await aichat.findOneAndUpdate({ guildId: interaction.guild.id}, { enabled: false, channel: "", personality: "kind", defaultEngine: "gpt3", accuracy: 1})
    await aichat.findOneAndUpdate({ guildId: interaction.guild.id}, { personality: "rude"})

    await i.message.edit({content: `Lumine's personality has been set to **Rude**.`, embeds: [], components: []})

    console.log(data)
    }
});
    }
})
            }
        
         
        })
    
    },
};