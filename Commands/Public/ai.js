const {
    SlashCommandBuilder,
    CommandInteraction,
    PermissionFlagsBits,
    Client
} = require("discord.js");
module.exports = {
    data: new SlashCommandBuilder()
    .setName("ai")
    .setDescription("AI Commands")
    .addSubcommand(subcommand =>
      subcommand
        .setName("draw")
        .setDescription("Watch your ideas become imagery")
        .addStringOption(option =>
            option
                .setName("prompt")
                .setDescription("Describe the image you want")
                .setRequired(true)
            )
        .addStringOption(option =>
            option
                .setName("negative_prompt")
                .setDescription("Describe things you don't want in your image (example: blur)")
                .setRequired(false)
            )
        .addStringOption(option =>
            option
                .setName("model")
                .setDescription("The model to use")
                .setRequired(false)
                .addChoices(
                    {
                        name: "DreamShaper", value: "dreamshaper-8"
                    },
                    {
                        name: "Anything Journey", value: "anythingV5_PrtRE.safetensors [893e49b9]"
                    },
                    {
                        name: "Open Journey", value: "openjourney-v4"
                    },
                    {
                        name: "Absolute Reality", value: "absolute-reality-v1.8.1"
                    },
                    {
                        name: "Realistic Vision", value: "realistic-vision-v5.0"
                    },
                    {
                        name: "Vivid", value: "elldreths-vivid"
                    },
                    {
                        name: "Dreamlike Anime", value: "dreamlike-anime-v1"
                    },
                    {
                        name: "Dreamlike Diffusion", value: "dreamlike-diffusion-v1"
                    },
                    {
                        name: "Dreamlike Photoreal", value: "dreamlike-photoreal-v2"
                    },
                    {
                        name: "Quantum Anime", value: "quantumcanvas-anime-v2.0"
                    },
                    {
                        name: "Quantum Realistic", value: "quantumcanvas-realistic-v1.0"
                    },
                )
            )
    )
    
        .addSubcommand(subcommand =>
            subcommand
            .setName("summarize")
            .setDescription("Summarize large bodies of text")
            .addStringOption(option =>
                option
                    .setName("content")
                    .setDescription("The content to summarize")
                    .setRequired(true)
                )
            .addStringOption(option =>
                option
                    .setName("type")
                    .setDescription("The type of summary")
                    .setRequired(true)
                    .addChoices(
                        {
                            name: "Bullet Points", value: "bullet_points"
                        },
                        {
                            name: "Paragraph", value: "paragraph"
                        },
                        {
                            name: "Category", value: "category"
                        }
                    )
                )
            .addBooleanOption(option =>
                option
                    .setName("ephemeral")
                    .setDescription("If the content is visible")
                    .setRequired(false)
                )
        ),

  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
   
    },
};