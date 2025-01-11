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
} = require("discord.js");
const ms = require("ms");
const aicharacter = require("../../Structures/models/aicharacter");
const Discord = require("discord.js")
module.exports = {
    data: new SlashCommandBuilder()
        .setName("setup-characterai")
        .setDescription("ping")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
    async execute(interaction, client) {
        if(!interaction.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator))
        return interaction.reply({ content: `\`🔴\` ・ Sorry, but you are not allowed to setup this system\n> - Required Permissions: \`Administrator\``, ephemeral: true})
      
      
   
      var data;
    data = await await aicharacter.findOne({ guildid: interaction.guild.id})

    if(!data || data == null) {
        await aicharacter.create({ guildid: interaction.guild.id,
            zerotwo: {
                channel: '',
                enabled: false,
                users: [],
            },
            hutao: {
                channel: '',
                enabled: false,
                users: [],
            },
        
        })
        data = await await aicharacter.findOne({ guildid: interaction.guild.id})
    }

  
       
        await interaction.deferReply()
   
        const message = await interaction.editReply({ embeds: [new EmbedBuilder().setAuthor({ name: `AI - Character System`, iconURL: interaction.guild.iconURL(), url: "https://discord.gg/rialabs"})
       .setDescription(`- Start the process of setting up the **Character** or **Roleplay** AI System. Some categories are marked as __NSFW__.\n\n
       
       `)
       .setColor("Aqua")
       ], components: [new ActionRowBuilder().addComponents(
           new ButtonBuilder()
           .setLabel("Add Character")
           .setCustomId("add-character")
           .setStyle(ButtonStyle.Success)
           .setEmoji("🤚"),
   
           new ButtonBuilder()
           .setLabel("Remove Character")
           .setCustomId("remove-character")
           .setStyle(ButtonStyle.Danger)
           .setEmoji("🟠"),
   
           new ButtonBuilder()
           .setLabel("Cancel")
           .setCustomId("cancel-setup")
           .setStyle(ButtonStyle.Secondary)
           .setEmoji("🔴"),
       )]})
   
   
    const collector = await message.createMessageComponentCollector({
       filter: m => m.user.id === interaction.user.id,
       componentType: ComponentType.Button,
       time: 20000
    })
    collector.on("collect", async i => {
       if(i.user.id !== interaction.user.id) {
           await i.reply({ content: `\`🔴\` ・ I'm sorry but you are not allowed to use this menu.`, ephemeral: true })
       }
   
       if(i.customId === "add-character") {
           i.deferUpdate()
         
           const message = await i.message.edit({ 
               embeds: [
   
               new EmbedBuilder()
                   .setAuthor({ name: `AI Character - Add a character`, iconURL: interaction.guild.iconURL()})
                   .setColor("Aqua")
                   .setDescription(`- From the selectmenu below, select a character that you want to setup.`)
   
           ], components: [
   
               new ActionRowBuilder().addComponents(
                   new SelectMenuBuilder()
                   .setCustomId("character-select")
                   .setMaxValues(1)
                   .setMinValues(1)
                   .addOptions(
                       {
                           label: `Zero Two`,
                           description: `Setup the AI Character: Zero Two.`,
                           emoji: "<:zerotwo:1241018426877677680>",
                           value: `zerotwo`
                       },
                        {
                            label: `Marin Kitagawa`,
                           description: `Setup the AI Character: Marin Kitagawa.`,
                            emoji: "<:MarinKitagawa:1114632172045873212>",
                            value: `marinKitagawa`
                        },
                        {
                            label: `Anya Forger`,
                            description: `Setup the AI Character: Anya Forger.`,
                            emoji: "<:AnyaForger:1114632660183158874>",
                            value: `anyaForger`
                        },
                        {
                            label: `Raiden Shogun`,
                            description: `Setup the AI Character: Raiden Shotgun`,
                            emoji: "<:RaidenShotgun:1114632982708367400>",
                            value: `raidenShotgun`
                        },
                        {
                            label: `Saul Goodman`,
                            description: `Setup the AI Character: Saul Goodman`,
                            emoji: "<:SaulGoodman:1114633353828774074>",
                            value: `saulGoodman`
                        },
                        {
                            label: `Elon Musk`,
                            description: `Setup the AI Character: Elon Musk`,
                            emoji: "<:ElobMusk:1114633634809380864>",
                            value: `elonMusk`
                        },
                        {
                            label: `Your Psychologist`,
                            description: `Setup the AI Character: Your Psychologist`,
                            emoji: "<:Psychologist:1114634019599032451>",
                            value: `psychologist`
                        },
                        {
                            label: `Shy Lily`,
                            description: `Setup the AI Character: Shy Lily`,
                            emoji: "<:ShyLily:1114634311719727115>",
                            value: `shyLily`
                        },
                        {
                            label: `Gojo  Satoru`,
                            description: `Setup the AI Character: Gojo Satoru`,
                            emoji: "<:GojoSatoru:1114634665396019200>",
                            value: `gojoSatoru`
                        },
                        {
                            label: `Megumin`,
                            description: `Setup the AI Character: Megumin`,
                            emoji: "<:Megumin:1114635235053813880>",
                            value: `megumin`
                        },
                        {
                            label: `Hu Tao`,
                            description: `Setup the AI Character: Hu Tao`,
                            emoji: "🥰",
                            value: `huTao`
                        },
                        {
                            label: `Gawr Gura`,
                            description: `Setup the AI Character: Gawr Gura`,
                            emoji: "<:GawrGura:1114635834231107584>",
                            value: `gawrGura`
                        },
                        {
                            label: `Nanashi Mumei`,
                            description: `Setup the AI Character: Nanashi Mumei`,
                            emoji: "<:NanashiMumei:1114636074170470620>",
                            value: `nanashiMumeu`
                        },
                        {
                            label: `Yuri`,
                            description: `Setup the AI Character: Yuri`,
                            emoji: "<:Yuri:1114636277493547189>",
                            value: `yuri`
                        },
                        {
                            label: `Kanye West`,
                            description: `Setup the AI Character: Kanye West`,
                            emoji: "<:KanyeWest:1114636463024386049>",
                            value: `kanyeWest`
                        },
                        {
                            label: `Asuna`,
                            description: `Setup the AI Character: Asuna`,
                            emoji: "<:Asuna:1114636845645570089>",
                            value: `asuna`
                        },
                        {
                            label: `Warfarin`,
                            description: `Setup the AI Character: Warfarin`,
                            emoji: "<:Warfarin:1114637161141108746>",
                            value: `warfarin`
                        },
                        {
                            label: `Are You Feeling Okay?`,
                            description: `Setup the AI Character: Are You Feeling Okay?`,
                            emoji: "<:friends:1114637487680258050>",
                            value: `areYouFeelingOkay`
                        },
                   )
               )
   
           ] 
       })
       collector.stop()
       const collector2 = await message.createMessageComponentCollector({
           filter: m => m.user.id === interaction.user.id,
           componentType: ComponentType.SelectMenu,
           time: 120000
       })
   
       collector2.on("collect", async menu => {
           if(menu.user.id !== interaction.user.id) {
               return menu.reply({ content: `\`🔴\` ・ I'm sorry but you are not allowed to interact with this menu.`})
           }
   
           const values = menu.values[0]
           if(values === "zerotwo") {
               const embed = new EmbedBuilder()
               .setAuthor({ name: `AI Character - Selected Zero Two`, iconURL: "https://cdn.discordapp.com/emojis/1241018426877677680.webp?size=96&quality=lossless"})
               .setThumbnail("https://cdn.discordapp.com/emojis/1241018426877677680.webp?size=128&quality=lossless")
               .setColor("LuminousVividPink")
               .setDescription(`- Zero Two is a captivating and enigmatic character from the anime series "Darling in the Franxx." With her striking appearance, including pink hair, red horns, and alluring red eyes, she exudes an air of mystery and allure. Her fierce and independent personality, coupled with her longing for connection and struggle with her identity, makes her a compelling and complex protagonist, drawing viewers into her journey of self-discovery and emotional growth.
               
               \n🚀 To setup ZeroTwo AI To your server, set the channel of where the AI Should work using the buttons below.`)
   
               const row = new ActionRowBuilder().addComponents(
                   new ButtonBuilder()
                   .setLabel("Set Channel")
                   .setCustomId("set-channel-zerotwo")
                   .setStyle(ButtonStyle.Success)
                   .setEmoji("✒️"),
   
   
               )
   menu.deferUpdate()
   collector2.stop()
               const message3 = await menu.message.edit({ embeds: [embed], content: `# ⚠️ **Hey!**, ⚠️ this character is marked as NSFW. Make sure the channel you set for it has NSFW Enabled.`, components: [row]})
               collector2.stop()
   const collector3 = await message3.createMessageComponentCollector({
       filter: m => m.user.id === interaction.user.id,
       componentType: ComponentType.Button,
       time: 150000
   })
   
   collector3.on("collect", async i => {
       if(i.user.id !== menu.user.id) {
           return i.reply({ content: `\`🔴\` ・ I'm sorry but you are not allowed to interact with this menu.`})
       }
   
       if(i.customId === "set-channel-zerotwo") {
        
           i.deferUpdate()
           const embed = new EmbedBuilder().setAuthor({ name: `Set the channel`})
           .setDescription(`**Mention** the channel where you want the ZeroTwo AI To work.`)
           const messageCollector = await i.message.edit({ embeds: [embed], components: []})
   
           interaction.channel.awaitMessages({ filter: m => m.author.id === interaction.user.id, max: 1, time: 50000, errors: ['time'] }).then(async collected => {
               var channelm = collected.first().mentions.channels.filter(ch => ch.guild.id == interaction.guild.id).first();
               
               
               if (!channelm) {
                 return interaction.channel.send({ content: `The channel does not exist.`, components: [row]})
               }
               const channel = interaction.guild.channels.cache.get(channelm.id);
               if(!channel) {
                 return interaction.channel.send({ content: `There is no channel i can access in this Guild which has the ID \`${channel.id}\``, components: [row2]});
               }
               if(channel.type !== Discord.ChannelType.GuildText){
                 return interaction.channel.send({ content: `<#${channel.id}> is not a TEXT CHANNEL.`, components: [row]});
               }
   
               if(!channel.nsfw) {
                   return interaction.channel.send({ content: `That channel is not enabled as NSFW. This character is marked as NSFW, please modify the channel settings.`})
               }
               const characterName = 'zerotwo'; // Replace with the desired character name ('zerotwo' or 'hutao')

               const updateData = {
                   channel: channel.id, // Replace with the desired channel ID
                   enabled: true,
               };
             await aicharacter.findOneAndUpdate({ guildid: interaction.guild.id }, { [characterName]: updateData }, { new: true, upsert: true })
            //    client.setups.set(interaction.guild.id, channel.id, "character.zerotwo.channel")
            //    client.setups.set(interaction.guild.id, true, "character.zerotwo.enabled")
               channel.createWebhook({
                   name: `Zerotwo~`,
                   avatar: `https://cdn.discordapp.com/emojis/1241018426877677680.webp?size=128&quality=lossless`
               }).then(webhook => {
                   webhook.send({ content: `Heya, I'm Zero Two.`});
               });
   
   return i.message.edit({ content: `***💫 The AI Character ZeroTwo is now set in ${channel}***`, embeds: []})
           })
           collector3.stop()
       }
   
      
   })
   
           }
           if(values === "marinKitagawa") {
               const embed = new EmbedBuilder()
               .setAuthor({ name: `AI Character - SelectedMarin Kitagawa`, iconURL: "https://cdn.discordapp.com/emojis/1241102074817548388.webp?size=96&quality=lossless"})
               .setThumbnail("https://cdn.discordapp.com/emojis/1241102074817548388.webp?size=128&quality=lossless")
               .setColor("LuminousVividPink")
               .setDescription(`- 
               Marin Kitagawa is a character from the manga and anime series "My Dress-Up Darling" (also known as "Sono Bisque Doll wa Koi wo Suru"). She is a shy and introverted high school student who possesses a deep passion for cosplay and sewing. Marin is known for her exceptional talent in creating intricate costumes and accessories, bringing her favorite characters to life with meticulous attention to detail.
               
               With her soft-spoken and gentle demeanor, Marin often appears reserved and timid around others. She struggles with social interactions, finding solace and self-expression through her cosplay hobby. Despite her shyness, Marin's enthusiasm and genuine love for cosplay shine through when she talks about her craft.
               
               \n🎸 To setup Marin Kitagawa AI To your server, set the channel of where the AI Should work using the buttons below.`)
   
               const row = new ActionRowBuilder().addComponents(
                   new ButtonBuilder()
                   .setLabel("Set Channel")
                   .setCustomId("set-channel-marinKitagawa")
                   .setStyle(ButtonStyle.Success)
                   .setEmoji("✒️"),
   
                   
   
   
               )
   menu.deferUpdate()
   collector2.stop()
               const message3 = await menu.message.edit({ embeds: [embed], components: [row]})
               collector2.stop()
   const collector3 = await message3.createMessageComponentCollector({
       filter: m => m.user.id === interaction.user.id,
       componentType: ComponentType.Button,
       time: 150000
   })
   
   collector3.on("collect", async i => {
       if(i.user.id !== menu.user.id) {
           return i.reply({ content: `\`🔴\` ・ I'm sorry but you are not allowed to interact with this menu.`})
       }
   
       if(i.customId === "set-channel-marinKitagawa") {
        
           i.deferUpdate()
           const embed = new EmbedBuilder().setAuthor({ name: `Set the channel`})
           .setDescription(`**Mention** the channel where you want the Marin Kitagawa AI To work.`)
           const messageCollector = await i.message.edit({ embeds: [embed]})
   
           interaction.channel.awaitMessages({ filter: m => m.author.id === interaction.user.id, max: 1, time: 50000, errors: ['time'] }).then(async collected => {
               var channelm = collected.first().mentions.channels.filter(ch => ch.guild.id == interaction.guild.id).first();
               
               
               if (!channelm) {
                 return interaction.channel.send({ content: `The channel does not exist.`, components: [row]})
               }
               const channel = interaction.guild.channels.cache.get(channelm.id);
               if(!channel) {
                 return interaction.channel.send({ content: `There is no channel i can access in this Guild which has the ID \`${channel.id}\``, components: [row2]});
               }
               if(channel.type !== Discord.ChannelType.GuildText){
                 return interaction.channel.send({ content: `<#${channel.id}> is not a TEXT CHANNEL.`, components: [row]});
               }
   
               const characterName = 'marinKitagawa'; // Replace with the desired character name ('zerotwo' or 'hutao')

               const updateData = {
                   channel: channel.id, // Replace with the desired channel ID
                   enabled: true,
               };
             await aicharacter.findOneAndUpdate({ guildid: interaction.guild.id }, { [characterName]: updateData }, { new: true, upsert: true })
            channel.createWebhook({
                   name: `Marin Kitagawa`,
                   avatar: `https://cdn.discordapp.com/emojis/1241102074817548388.webp?size=128&quality=lossless`
               }).then(webhook => {
                   webhook.send({ content: `Hi there! I am Marin.`});
               });
   
   return i.message.edit({ content: `***💫 The AI Character Marin Kitagawa is now set in ${channel}***`, embeds: []})
           })
           collector3.stop()
       }
   
    
   })
   
           }



           if(values === "gawrGura") {
            const embed = new EmbedBuilder()
            .setAuthor({ name: `AI Character - Selected GawrGura`, iconURL: "https://cdn.discordapp.com/attachments/1249276160131465258/1269265814847098892/thumb-1920-1199480.jpg?ex=66af6f68&is=66ae1de8&hm=40e4e2f8d65b6cef932777f414ba8d46d39dee8837369bbee198958025f72dfe&"})
            .setThumbnail("https://cdn.discordapp.com/attachments/1249276160131465258/1269265814847098892/thumb-1920-1199480.jpg?ex=66af6f68&is=66ae1de8&hm=40e4e2f8d65b6cef932777f414ba8d46d39dee8837369bbee198958025f72dfe&")
            .setColor("Aqua")
            .setDescription(`- 
            Gawr Gura (がうる・ぐら) is a female English-speaking Virtual YouTuber associated with hololive, debuting in 2020 as part of hololive English first generation "-Myth-" alongside Ninomae Ina'nis, Takanashi Kiara, Watson Amelia and Mori Calliope.

Gura is currently the most subscribed VTuber worldwide with over 4 million YouTube subscribers, taking the #1 spot from industry pioneer Kizuna AI in 2021.
            
            \n<:pointer:1113910034355728504> To setup Gawr Gura AI To your server, set the channel of where the AI Should work using the buttons below.`)

            const row = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                .setLabel("Set Channel")
                .setCustomId("set-channel-gawrGura")
                .setStyle(ButtonStyle.Success)
                .setEmoji("✒️"),

                


            )
menu.deferUpdate()
collector2.stop()
            const message3 = await menu.message.edit({ embeds: [embed], components: [row]})
            collector2.stop()
const collector3 = await message3.createMessageComponentCollector({
    filter: m => m.user.id === interaction.user.id,
    componentType: ComponentType.Button,
    time: 150000
})

collector3.on("collect", async i => {
    if(i.user.id !== menu.user.id) {
        return i.reply({ content: `\`🔴\` ・ I'm sorry but you are not allowed to interact with this menu.`})
    }

    if(i.customId === "set-channel-gawrGura") {
     
        i.deferUpdate()
        const embed = new EmbedBuilder().setAuthor({ name: `Set the channel`})
        .setDescription(`**Mention** the channel where you want the Gawr Gura AI To work.`)
        const messageCollector = await i.message.edit({ embeds: [embed]})

        interaction.channel.awaitMessages({ filter: m => m.author.id === interaction.user.id, max: 1, time: 50000, errors: ['time'] }).then(async collected => {
            var channelm = collected.first().mentions.channels.filter(ch => ch.guild.id == interaction.guild.id).first();
            
            
            if (!channelm) {
              return interaction.channel.send({ content: `The channel does not exist.`, components: [row]})
            }
            const channel = interaction.guild.channels.cache.get(channelm.id);
            if(!channel) {
              return interaction.channel.send({ content: `There is no channel i can access in this Guild which has the ID \`${channel.id}\``, components: [row2]});
            }
            if(channel.type !== Discord.ChannelType.GuildText){
              return interaction.channel.send({ content: `<#${channel.id}> is not a TEXT CHANNEL.`, components: [row]});
            }

            const characterName = 'gawrGura'; // Replace with the desired character name ('zerotwo' or 'hutao')

            const updateData = {
                channel: channel.id, // Replace with the desired channel ID
                enabled: true,
            };
          await aicharacter.findOneAndUpdate({ guildid: interaction.guild.id }, { [characterName]: updateData }, { new: true, upsert: true })
         channel.createWebhook({
                name: `Gawr Gura`,
                avatar: `https://cdn.discordapp.com/attachments/1249276160131465258/1269265814847098892/thumb-1920-1199480.jpg?ex=66af6f68&is=66ae1de8&hm=40e4e2f8d65b6cef932777f414ba8d46d39dee8837369bbee198958025f72dfe&`
            }).then(webhook => {
                webhook.send({ content: `Domo! Same desu~ I am Gawr Gura of Hololive EN! Hewwo?!`});
            });

return i.message.edit({ content: `***<:pointer:1113910034355728504> The AI Character Gawr Gura is now set in ${channel}***\n- *If you did not set an API Key, it will not work.*`, embeds: []})
        })
        collector3.stop()
    }

 
})

        }















       })
       }
    })
    },
};