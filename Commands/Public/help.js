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

module.exports = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("the help command"),
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
   async execute(interaction, client) {
        const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setURL("https://rialabs.xyz/discord")
                .setLabel('Join RIA Labs')
                .setEmoji(`💫`)
                .setStyle(ButtonStyle.Link),

                new ButtonBuilder()
            .setURL("https://rialabs.xyz/discord")
                .setLabel('Privacy Policy')
                .setEmoji(`💫`)
                .setStyle(ButtonStyle.Link),
        );
        // interaction.reply({ content: `Hello`, components: [row], ephemeral: true})

        

        const embed = new EmbedBuilder()
        .setAuthor({ name: `Lumine - Your friendly companion`, iconURL: client.user.displayAvatarURL(), url: "https://rialabs.xyz/discord"})
        .setColor("#FFC0CB")
        .setDescription(`🤚 Hi, i'm Lumine, it's nice to see you! Below are a list of my commands and systems, have fun using them!
        
        
        🎭 Lumine is based on our most capable model RIA 5, an extension of a variety of the most popular AI Chat models, including a live web search function for up-to-date answers, a variety of Image Generation engines to enhance your creativity
        👋 **all for free, all in lumine, all for you.**


        </setup-aichat:1187697030856966164> or \`,setup-aichat\` 🟠 Enable the ai chatbot, have human-like interactions, browse the web and generate stunning images within the blink of an eye! 💫
        
        </setup-intellisense:1187700529623732294> or \`,setup-intellisense\` 🟠 Explore the workaround of your codes, get help within seconds and get suggestions on how to improve your projects! 💡
       
       
        ### 🎸 Come hangout with us and give us ideas, watch the new updates release before everyone else at [RIA Labs](https://rialabs.xyz/discord) !`)

       await interaction.reply({ embeds: [embed], components: [row]})
    },
};