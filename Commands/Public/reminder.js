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
const Agenda = require("agenda")
module.exports = {
    data: new SlashCommandBuilder()
        .setName("reminder")
        .setDescription("Set a reminder.")
        .addStringOption(option => 
            option.setName("time").setDescription("Format: 1d, 3h, 12m, 15s")
        )
        .addStringOption(option => option.setName("message").setDescription("The message to remind you about.")),
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
  async execute(interaction, client) {
       const time = interaction.options.getString("time");
       const message = interaction.options.getString("message");

       if (!time) return interaction.reply({ content: "Please specify a time!", ephemeral: true });
       if (!message) return interaction.reply({ content: "Please specify a message!", ephemeral: true });

       const reminderTime = Date.now() + ms(time);
       if (message.includes('@everyone') || message.includes('@here') || message.match(/<@!?\d+>/)) {
        await interaction.reply({ 
            content: "❌ um, no. i wont let u mention anyone or anything..", 
            ephemeral: true 
        });
        return;
    }
       const confirmEmbed = new EmbedBuilder()
           .setTitle("✅ Reminder Set!")
           .setDescription(`I will remind you about: "${message}"\nIn: *${time}*`)
           .setColor("Green")
           .setTimestamp();

       // Write reminder to JSON file
       const fs = require('fs').promises;
       const reminder = {
           userId: interaction.user.id,
           channelId: interaction.channel.id,
           message: message,
           time: reminderTime
       };

       try {
           let reminders = [];
           try {
               const data = await fs.readFile('./reminders.json', 'utf8');
               reminders = JSON.parse(data);
           } catch (error) {
               // File doesn't exist yet, that's okay
           }

           reminders.push(reminder);
           await fs.writeFile('./reminders.json', JSON.stringify(reminders, null, 2));

           
// Check for mentions in the message
      

           await interaction.reply({ content:`✨ okay ill remind u abt "${message}" in like uhh *${time}* ig, see u then :)` });
       } catch (error) {
           console.error('Error setting reminder:', error);
           await interaction.reply({ 
               content: "There was an error setting your reminder!", 
               ephemeral: true 
           });
       }
   },}
