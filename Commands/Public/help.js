const {
    SlashCommandBuilder,
    CommandInteraction,
    PermissionFlagsBits,
    Client,
    ButtonBuilder,
    ButtonStyle,
    ActionRowBuilder,
    EmbedBuilder
} = require("discord.js");
const ms = require("ms");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("help"),
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
   async execute(interaction, client) {
        const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setURL("https://discord.gg/rialabs")
                .setLabel('Join RIA Labs')
                .setEmoji(`<:RIASupport:1187702126458175618>`)
                .setStyle(ButtonStyle.Link),

        );
        // interaction.reply({ content: `Hello`, components: [row], ephemeral: true})

        

        const embed = new EmbedBuilder()
        .setAuthor({ name: `Lumine - Your friendly companion`, iconURL: client.user.displayAvatarURL(), url: "https://discord.gg/rialabs"})
        .setColor("#FFC0CB")
        .setDescription(`<:PI_hewwo:1179890952391888928> Hi, i'm Lumine, it's nice to see you! Below are a list of my commands and systems, have fun using them!
        
        
        <:RIA:1177706866755780731> Lumine is based on our most capable model RIA 5, an extension of a variety of the most popular AI Chat models, including a live web search function for up-to-date answers, a variety of Image Generation engines to enhance your creativity
        <:RIA5:1187699966576164895> **all for free, all in lumine, all for you.**


        </setup-aichat:1187697030856966164> or \`,setup-aichat\` <:arrowww:1187700924785893396> Enable the ai chatbot, have human-like interactions, browse the web and generate stunning images within the blink of an eye! 💫
        
        </setup-intellisense:1187700529623732294> or \`,setup-intellisense\` <:arrowww:1187700924785893396> Explore the workaround of your codes, get help within seconds and get suggestions on how to improve your projects! 💡
       
       
        ### <:RIASupport:1187702126458175618> Come hangout with us and give us ideas, watch the new updates release before everyone else at [RIA Labs](https://discord.gg/rialabs) !`)

       await interaction.reply({ embeds: [embed], components: [row]})
    },
};