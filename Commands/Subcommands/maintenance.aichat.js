const {
    SlashCommandBuilder,
    PermissionFlagsBits,
    ChatInputCommandInteraction,
    EmbedBuilder,
    Client,
  } = require("discord.js");
const fetch = require("node-fetch");
const Maintenance = require("../../Structures/models/maintenance");
const Aichat = require("../../Structures/models/aichat");
  module.exports = {
      subCommand: "maintenance.ai-chat",
      
    //   .addChannelOption((option) => option.setName("channel").setDescription("Where should i setup the A.I Channel?")),
/**
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} Razen
     */
    async execute(interaction, Razen) {

        if (interaction.user.id !== "590057334668132352") return interaction.reply({ content: "ur not audii", ephemeral: true });
const reason = interaction.options.getString("reason")
const silent = interaction.options.getBoolean("silent") ?? "true"
console.log(silent)

        let maintenanceData = await Maintenance.find()
       
           console.log(maintenanceData)
        
        
        const { aichat, intellisense, imageGeneration, everything, aicharacter } = maintenanceData;


        if(!maintenanceData[0].aichat) {
            await Maintenance.updateOne({}, { $set: { aichat: true } });
           
            
            

            const aichatData = await Aichat.find();
            

            aichatData.forEach(async (data) => {
                let guildId = await data.guildId
               
                if(!guildId) return;
               
                const guild = await Razen.guilds.cache.get(guildId)
                if(!guild) return;

            const channel = await guild.channels.cache.get(data.channel)
            if(!channel) return;
           
              
        
                if(!silent) {
                    await channel.send({ content: `Lumine's AI Chat module is under maintenance for further updates and/or issue fixes. Please come back later.`})
                    await channel.send({
                      content: `
                      💫 **Official message:**\n>>> ${reason}
                      `
                    })
                    
                }
                 console.log(`Locked channel ${channel.name} in guild ${guild.name}`);
          
                   });


                      
                        
                        
            await interaction.reply({ content: "A.I Chat Maintenance is now enabled.", ephemeral: true });
        } else {
            await Maintenance.updateOne({}, { $set: { aichat: false } });


           const aichatData = await Aichat.find();
            

            aichatData.forEach(async (data) => {
                let guildId = await data.guildId
               
                if(!guildId) return;
               
                const guild = await Razen.guilds.cache.get(guildId)
                if(!guild) return;

            const channel = await guild.channels.cache.get(data.channel)
            if(!channel) return;
           
              
               
                if(!silent) {
                    await channel.send({ content: `# Lumine's AI Chat module is back online!`})
                    await channel.send({
                      content: `
                      💫 **Message from __Audii__ - Developer:**\n>>> ${reason}
                      `
                    })
                }
                 
           
            });
            await interaction.reply({ content: "A.I Chat Maintenance is now disabled.", ephemeral: true });
        }


    }
  }