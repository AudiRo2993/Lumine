const {
    SlashCommandBuilder,
    PermissionFlagsBits,
    ChatInputCommandInteraction,
    EmbedBuilder,
    Client,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    SelectMenuBuilder,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
    ComponentType,
    AttachmentBuilder,
} = require("discord.js");
const ms = require("ms");

const fetch = require("node-fetch");
const config = require("../../Structures/config.json")
const emojis = require("../../Structures/settings.json")
module.exports = {
    data: new SlashCommandBuilder()
        .setName("search")
        .setDescription("Search something on the web!")
        .addStringOption(option =>
            option
                .setName("content")
                .setDescription("The content to search")
                .setRequired(true)
            )
        .addBooleanOption(option =>
            option
                .setName("ephemeral")
                .setDescription("Do you want others to see what you're searching?")
                .setRequired(false)
            ),
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
   async execute(interaction, client) {
    let empheral = interaction.options.getBoolean("ephemeral") || false;

    await interaction.deferReply({ ephemeral: empheral });

    const content = interaction.options.getString("content");

let messages = [
    `${emojis.emojis.happy} Aww, i'll get on it`,
    `${emojis.emojis.blush} Oww, interesting idea.. gimme a sec!`,
    `${emojis.emojis.wave} Ahaha, okay, i'm doing my magic!`
    ]

    let index = Math.floor(Math.random() * messages.length);
    await interaction.editReply({ content: `${messages[index]}` });
    const token = `Bearer ${config.Config.RIAKey}`;
const messagePayload = {

    "prompt": content,

};

const headers = {
  'Authorization': token,
  'Content-Type': 'application/json'
};
  const response = await fetch(`https://api.zentrixcode.com/sync/ai/gemini`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(messagePayload)
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const responseData = await response.json();
const result = responseData?.content

    const embeds = [];

    for (let i = 0; i < result.length; i += 2000) {
        const embed = new EmbedBuilder()
        .setColor("LuminousVividPink")
        .setDescription(result.replaceAll('####', '###').slice(i, i + 2000))

        embeds.push(embed);
    }


        
     
        await interaction.editReply({ embeds: embeds, content: ` ` });
        

     
}
}


    