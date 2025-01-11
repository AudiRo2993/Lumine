const {
    SlashCommandBuilder,
    PermissionFlagsBits,
    ChatInputCommandInteraction,
    EmbedBuilder,
    Client,
  } = require("discord.js");
const fetch = require("node-fetch");
const Maintenance = require("../../Structures/models/maintenance");
  module.exports = {
      subCommand: "maintenance.everything",
      
    //   .addChannelOption((option) => option.setName("channel").setDescription("Where should i setup the A.I Channel?")),
/**
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} Razen
     */
    async execute(interaction, Razen) {

        if (interaction.user.id !== "590057334668132352") return interaction.reply({ content: "ur not audii", ephemeral: true });

        let maintenanceData = await Maintenance.find()
       
           console.log(maintenanceData)
        
        
        const { aichat, intellisense, imageGeneration, everything, aicharacter } = maintenanceData;


        if(!maintenanceData[0].everything) {
            await Maintenance.updateOne({}, { $set: { aichat: true } });
            await Maintenance.updateOne({}, { $set: { aicharacter: true } });
            await Maintenance.updateOne({}, { $set: { intellisense: true } });
            await Maintenance.updateOne({}, { $set: { imagegeneration: true } });
            await Maintenance.updateOne({}, { $set: { everything: true } });
            
            await interaction.reply({ content: "GLOBAL MAINTENANCE FULL -- ENABLED", ephemeral: true });
        } else {
            await Maintenance.updateOne({}, { $set: { aichat: false } });
            await Maintenance.updateOne({}, { $set: { aicharacter: false } });
            await Maintenance.updateOne({}, { $set: { intellisense: false } });
            await Maintenance.updateOne({}, { $set: { imagegeneration: false } });
            await Maintenance.updateOne({}, { $set: { everything: false } });
            await interaction.reply({ content: "GLOBAL MAINTENANCE FULL -- DISABLED", ephemeral: true });
        }


    }
  }