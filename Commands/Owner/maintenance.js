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
    .setName("maintenance")
    .setDescription("Lumine Global Maintenance")
    .addSubcommand(subcommand =>
      subcommand
        .setName("view")
        .setDescription("View the current maintenance instances.")
    )
    .addSubcommand(subcommand =>
        subcommand
            .setName("ai-chat")
            .setDescription("Global Maintenance - AI CHAT")
            .addStringOption(option =>
                option
                    .setName("reason")
                    .setDescription("The reason for the ongoing maintenance")
                    .setRequired(true)
                )
                .addBooleanOption(option =>
                    option
                        .setName("silent")
                        .setDescription("Do you want to send messages in the channel? True = silent, False = messages")
                        .setRequired(false)
                    )
        )
       
        .addSubcommand(subcommand =>
            subcommand
            .setName("image-generation")
            .setDescription("Global Maintenance - IMAGE GENERATION")
        )
        .addSubcommand(subcommand =>
            subcommand
            .setName("ria-intellisense")
            .setDescription("Global Maintenance - RIA INTELLISENSE")
        )
        .addSubcommand(subcommand =>
            subcommand
            .setName("ai-character")
            .setDescription("Global Maintenance - AI CHARACTER")
        )
        .addSubcommand(subcommand =>
            subcommand
            .setName("everything")
            .setDescription("Global Maintenance - EVERYTHING")
        ),

  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
   
    },
};