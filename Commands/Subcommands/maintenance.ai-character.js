const {
    SlashCommandBuilder,
    PermissionFlagsBits,
    ChatInputCommandInteraction,
    EmbedBuilder,
    Client,
  } = require("discord.js");
const fetch = require("node-fetch");
const Maintenance = require("../../Structures/models/maintenance");
const Aicharacter = require("../../Structures/models/aicharacter");
  module.exports = {
      subCommand: "maintenance.ai-character",
      
    //   .addChannelOption((option) => option.setName("channel").setDescription("Where should i setup the A.I Channel?")),
/**
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} Razen
     */
    async execute(interaction, Razen) {
        if (interaction.user.id !== "590057334668132352") return interaction.reply({ content: "ur not audii", ephemeral: true });
        const reason = interaction.options.getString("reason")
                let maintenanceData = await Maintenance.find()
               
                   console.log(maintenanceData)
                
                
                const { aichat, intellisense, imageGeneration, everything, aicharacter } = maintenanceData;
        
        
                if(!maintenanceData[0].aichat) {
                    await Maintenance.updateOne({}, { $set: { aicharacter: true } });
                   
                    
                    
        
                    const aiCharacterdata = await Aicharacter.find();
                    
        
                    aiCharacterdata.forEach(async (data) => {
                        let guildId = await data.guildId
                       
                        if(!guildId) return;
                       
                        const guild = await Razen.guilds.cache.get(guildId)
                        if(!guild) return;
        
                    const channel = await guild.channels.cache.get(data.channel)
                    if(!channel) return;
                   
                      
                       console.log(channel.id)
                        await channel.permissionOverwrites.edit(guild.roles.everyone.id, { SendMessages: false });
                        const mostCommonRole = guild.roles.cache.filter(role => !role.name.includes('@everyone')).sort((a, b) => b.members.size - a.members.size).first();
                        console.log(mostCommonRole)
                        await channel.permissionOverwrites.edit(mostCommonRole.id, { SendMessages: false });
                        
                         await channel.send({ content: `Lumine's AI Character module is under maintenance for further updates and/or issue fixes. Please come back later.`})
                                  await channel.send({
                                    content: `
                                    💫 **Message from __Audii__ - Developer:**\n>>> ${reason}
                                    `
                                  })
                         console.log(`Locked channel ${channel.name} in guild ${guild.name}`);
                  
                           });
        
        
                              
                                
                                
                    await interaction.reply({ content: "AI Character Maintenance is now enabled.", ephemeral: true });
                } else {
                    await Maintenance.updateOne({}, { $set: { aicharacter: false } });
        
        
                   const aiCharacterdata = await Aicharacter.find();
                    
        
                    aiCharacterdata.forEach(async (data) => {
                        let guildId = await data.guildId
                       
                        if(!guildId) return;
                       
                        const guild = await Razen.guilds.cache.get(guildId)
                        if(!guild) return;
        
                    const channel = await guild.channels.cache.get(data.channel)
                    if(!channel) return;
                   
                      
                       console.log(channel.id)
                        await channel.permissionOverwrites.edit(guild.roles.everyone.id, { SendMessages: true });
                        const mostCommonRole = guild.roles.cache.filter(role => !role.name.includes('@everyone')).sort((a, b) => b.members.size - a.members.size).first();
                        await channel.permissionOverwrites.edit(mostCommonRole.id, { SendMessages: true });
                        
                         await channel.send({ content: `Lumine's AI Character module is now available.`})
                         
                   
                    });
                    await interaction.reply({ content: "AI Character Maintenance is now disabled.", ephemeral: true });
                }
     

    }
  }