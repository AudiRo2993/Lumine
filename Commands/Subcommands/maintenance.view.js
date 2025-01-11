const {
    SlashCommandBuilder,
    PermissionFlagsBits,
    ChatInputCommandInteraction,
    EmbedBuilder,
    Client,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
  } = require("discord.js");
const Maintenance = require("../../Structures/models/maintenance");
  module.exports = {
      subCommand: "maintenance.view",
      
    //   .addChannelOption((option) => option.setName("channel").setDescription("Where should i setup the A.I Channel?")),
/**
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} Razen
     */
    async execute(interaction, Razen) {

        
        let maintenanceData = await Maintenance.find()
       
           console.log(maintenanceData)
        
        
        const { aichat, intellisense, imageGeneration, everything, aicharacter } = maintenanceData;
let aichatvalue
let intellisensevalue
let imageGenerationvalue
let everythingvalue
let aicharactervalue

if(!maintenanceData[0].aichat) {
    aichatvalue = "✨ System is online"
} else {
    aichatvalue = "🔴 Ongoing Maintenance"
}

if(!maintenanceData[0].intellisense) {
    intellisensevalue = "✨ System is online"
} else {
    intellisense = "🔴 Ongoing Maintenance"
}

if(!maintenanceData[0].imageGeneration) {
    imageGenerationvalue = "✨ System is online"
} else {
    imageGenerationvalue = "🔴 Ongoing Maintenance"
}

if(!maintenanceData[0].aicharacter) {
    aicharactervalue = "✨ System is online"
} else {
    aicharactervalue = "🔴 Ongoing Maintenance"
}

if(!maintenanceData[0].everything) {
    everythingvalue = "✨ System is online"
} else {
    everythingvalue = "🔴 Ongoing Maintenance"
}
        if (everythingvalue.toString() === "🔴 Ongoing Maintenance") {
            const maintenanceEmbed = new EmbedBuilder()
                .setTitle('Maintenance Status')
                .setDescription("Lumine is on FULL GLOBAL MAINTENANCE.")
            interaction.reply({ embeds: [maintenanceEmbed] });

            return;
        }
        const maintenanceEmbed = new EmbedBuilder()
            .setTitle('Maintenance Status')
            .addFields(
                { name: 'AI Chat', value: aichatvalue.toString() },
                { name: 'Intellisense', value: intellisensevalue.toString() },
                { name: 'Image Generation', value: imageGenerationvalue.toString() },
                { name: 'AI Character', value: aicharactervalue.toString() },
            );

        interaction.reply({ embeds: [maintenanceEmbed], components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setLabel('Join our Server').setURL('https://discord.gg/rialabs').setEmoji('<:PI_hewwo:1179890952391888928>').setStyle(ButtonStyle.Link))] });


    }
  }