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
      subCommand: "maintenance.image-generation",
      
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


        if(!maintenanceData[0].imagegeneration) {
            await Maintenance.updateOne({}, { $set: { imagegeneration: true } });
            await interaction.reply({ content: "Image Generation Maintenance is now enabled.", ephemeral: true });
        } else {
            await Maintenance.updateOne({}, { $set: { imagegeneration: false } });
            await interaction.reply({ content: "Image Generation Maintenance is now disabled.", ephemeral: true });
        }


    }
  }