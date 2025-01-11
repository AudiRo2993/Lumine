const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, Client } = require('discord.js');
const intellisense = require("../../Structures/models/intellisense");
module.exports = {
    data: new SlashCommandBuilder()
        .setName('intellisense-whitelist')
        .setDescription('Lockdown management commands')
        .addStringOption(option => 
            option.setName("guildid").setDescription("The guild ID.").setRequired(true)
        )
        .addStringOption(option => 
            option.setName("userid").setDescription("The user ID.").setRequired(true)
        ) ,
    /**
     * @param {Client} client 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction, client) {
        if (interaction.user.id !== "590057334668132352") {


            description = `\\📛 **Error:** \\📛\n What are you thinking? You're not my owner!`;
            return interaction.reply({
              embeds: [errorEmbed.setDescription(description)],
              ephemeral: true,
            });
          }
          const guild = interaction.options.getString("guildid");
          const user = interaction.options.getString("userid");

          await intellisense.findOneAndUpdate(
                  { guildId: guild },
                  { $pull: { blockedUsers: user } },
                 { upsert: true }
                );
const userr = client.users.cache.get(user)
                await interaction.reply(`Intellisense is now working again for ${userr.username}`);

    }
};