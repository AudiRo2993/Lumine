require("dotenv/config");
const { Events, Collection } = require("discord.js");
const BOT = require("./Structures/bot");
const client = new BOT();
require("./Structures/connect")();
const Enmap = require("enmap");
const Discord = require("discord.js")
const axios = require("axios");
const config = require('./Structures/config.json');
  const { Riffy } = require("riffy")
  const { ActionRowBuilder, ButtonBuilder, ButtonStyle, GatewayDispatchEvents, EmbedBuilder } = require("discord.js");
const nodes = [
    {
     
      host: config.Music.host,
      port: config.Music.port,
      password: config.Music.password,
      secure: config.Music.secure
       
    },
 
]



client.snipes = new Enmap({
  name: "stats",
  dataDir: "./DataBase/stats"
});
client.snipesDB = new Collection()
client.esnipesDB = new Collection()

client.riffy = new Riffy(client, nodes, {
    send: (payload) => {
        const guild = client.guilds.cache.get(payload.d.guild_id);
        if (guild) guild.shard.send(payload);
    },
    defaultSearchPlatform: "ytmsearch",
    restVersion: "v4"
});
client.on("raw", (d) => {
    if (![GatewayDispatchEvents.VoiceStateUpdate, GatewayDispatchEvents.VoiceServerUpdate,].includes(d.t)) return;
    client.riffy.updateVoiceState(d);
});



client.riffy.on("nodeConnect", async (node) => {
    console.log("\n---------------------")
    console.log(`Node ${node.name} has connected.`, "info")
    console.log("---------------------")
})


client.riffy.on("nodeError", async (node, error) => {
    console.log("\n---------------------")
    console.log(`Node ${node.name} encountered an error: ${error.message}`, "error")
    console.log("---------------------")
})


client.riffy.on("queueEnd", async (player) => {
    const channel = client.channels.cache.get(player.textChannel);

    if (player.isAutoplay) {
        player.autoplay(player)
    } else {
        player.destroy();
        channel.send("Queue has ended.");
    }
})


client.riffy.on('trackError', async (player, track, payload) => {
    console.log(payload);
})

client.riffy.on('trackStart', async (player, track) => {
    const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId('disconnect')
                .setStyle(ButtonStyle.Secondary)
                .setEmoji('⏺'),

            new ButtonBuilder()
                .setCustomId('pause')
                .setStyle(ButtonStyle.Secondary)
                .setEmoji('⏸'),

            new ButtonBuilder()
                .setCustomId('skip')
                .setStyle(ButtonStyle.Secondary)
                .setEmoji('⏭')
        );

    const channel = client.channels.cache.get(player.textChannel);

    function formatTime(time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    }

    const musicLength = track.info.length;
    const formattedLength = formatTime(Math.round(musicLength / 1000));
    const [minutesStr, secondsStr] = formattedLength.split(":");
    const minutes = parseInt(minutesStr, 10);
    const seconds = parseInt(secondsStr, 10);
    const totalMilliseconds = (minutes * 60 + seconds) * 1000;

    //disabling buttons when the song ends

    const musicEmbed = new EmbedBuilder()
    .setAuthor({ name: `Started playing ${track.info.title}`, iconURL: track.info.thumbnail, url: "https://rialabs.xyz/discord" })
    .setDescription(`# ✨ Enjoy the music! ^^
        
        🚀 Here's some information i gathered about this song :)
        Watch this song on [✨ Youtube](${track.info.uri})
        `)
    const rowDisabled = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId('disconnect')
                .setLabel('Music finished.')
                .setStyle(ButtonStyle.Secondary)
                .setEmoji('🤚')
                .setDisabled(true),
        );

    

    setTimeout(async () => {
        return await msg.edit({
            components: [rowDisabled]
        });
    }, totalMilliseconds);
})

  






process.on('unhandledRejection', async (err, cause) => {
    console.log(`[Uncaught Rejection]: ${err}`.bold.red);
    console.log(cause);
  });
  require("dotenv").config();

  client.on('messageUpdate', async (oldMessage, newMessage) => {
    var oldemojiAttachment;
    var newemojiAttachment;
    const oldemojiRegex = /^<a?:([a-zA-Z0-9_]+):(\d+)>$/;
    try {
        var oldemojiMatch = oldMessage.content.match(oldemojiRegex)
    
        var newemojiRegex = /^<a?:([a-zA-Z0-9_]+):(\d+)>$/;
        var newemojiMatch = newMessage.content.match(newemojiRegex)
    } catch(x) {
    
    }
                
  
  


    let snipes = client.esnipesDB.get(newMessage.channel.id) || []
    
    if(snipes.length > 5) snipes = snipes.slice(1, 4)
    
    if(newemojiMatch) {
        const emojiName = newemojiMatch[1];
            const emojiId = newemojiMatch[2];
            const emojiURL = `https://cdn.discordapp.com/emojis/${emojiId}.png`;
          
            const type = await axios.get(`https://cdn.discordapp.com/emojis/${emojiId}.gif`)
            .then(image => {
                if (image) return "gif"
                else return "png"
            }).catch(err => {
                return "png"
            })
          
            newemojiAttachment = `https://cdn.discordapp.com/emojis/${emojiId}.${type}?quality=lossless`
      }
            if (!newemojiMatch) newemojiAttachment = null
    
    
          if(oldemojiMatch) {
            const emojiName = oldemojiMatch[1];
                const emojiId = oldemojiMatch[2];
                const emojiURL = `https://cdn.discordapp.com/emojis/${emojiId}.png`;
              
                const type = await axios.get(`https://cdn.discordapp.com/emojis/${emojiId}.gif`)
                .then(image => {
                    if (image) return "gif"
                    else return "png"
                }).catch(err => {
                    return "png"
                })
              
                oldemojiAttachment = `https://cdn.discordapp.com/emojis/${emojiId}.${type}?quality=lossless`
          }
                if (!oldemojiMatch) oldemojiAttachment = null
                  const { createCanvas, loadImage } = require('canvas');
  
  // ...
  
  // Load the images
  const canvas = createCanvas(400, 200); // Set your desired canvas dimensions
  const ctx = canvas.getContext('2d');
  
  Promise.all([
      loadImage(oldemojiAttachment), // Replace with the path to your left emoji image
      loadImage(newemojiAttachment) // Replace with the path to your right emoji image
  ]).then(async images => {
      const leftImage = images[0];
      const rightImage = images[1];
  
      ctx.drawImage(leftImage, 0, 0, 200, 200); // Draw left image on the left side
      ctx.drawImage(rightImage, 200, 0, 200, 200); // Draw right image on the right side
  
      // Add text "Old" and "New" with aqua color and stroke
      ctx.font = '30px Arial';
      ctx.fillStyle = 'aqua';
      ctx.strokeStyle = 'aqua';
      ctx.lineWidth = 4;
  
      // Draw "Old" text with aqua color and stroke on the left image
      ctx.strokeText('Old', 20, 40); // Position of "Old" text on the left image
      ctx.fillText('Old', 20, 40); // Position of "Old" text on the left image
  
      // Draw "New" text with aqua color and stroke on the right image
      ctx.strokeText('New', 340, 40); // Position of "New" text on the right image
      ctx.fillText('New', 340, 40); // Position of "New" text on the right image
  
      var buffer = canvas.toBuffer();
  
      const attachment = await new Discord.AttachmentBuilder(buffer, {name: `emojiline.png`})

     console.log(attachment)
      snipes.unshift({
          oldMsg: oldMessage,
          newMsg: newMessage,
      oldImage: oldMessage.attachments.first() ? oldMessage.attachments.first().proxyURL : null,
      newImage: newMessage.attachments.first() ? newMessage.attachments.first().proxyURL : null,
      oldTime: oldMessage.createdTimestamp,
      newTime: Date.now(),
      oldSticker: oldMessage.stickers.first() ? oldMessage.stickers.first() : null,
      newSticker: newMessage.stickers.first() ? newMessage.stickers.first() : null,
      oldEmoji: oldemojiAttachment ? oldemojiAttachment : null,
      newEmoji: newemojiAttachment ? newemojiAttachment : null,
      emojiLine: attachment
      })
      
  
  
  })
            
  
  snipes.unshift({
            oldMsg: oldMessage,
            newMsg: newMessage,
        oldImage: oldMessage.attachments.first() ? oldMessage.attachments.first().proxyURL : null,
        newImage: newMessage.attachments.first() ? newMessage.attachments.first().proxyURL : null,
        oldTime: oldMessage.createdTimestamp,
        newTime: Date.now(),
        oldSticker: oldMessage.stickers.first() ? oldMessage.stickers.first() : null,
        newSticker: newMessage.stickers.first() ? newMessage.stickers.first() : null,
        oldEmoji: oldemojiAttachment ? oldemojiAttachment : null,
        newEmoji: newemojiAttachment ? newemojiAttachment : null,
        emojiLine: null
        })
  
  client.esnipesDB.set(newMessage.channel.id, snipes)
  
  });

  process.on('uncaughtException', async err => {
    console.log(`[Uncaught Exception] ${err}`.bold.red);
    console.log(err)
  });
const conversationHistoryMap = new Map();
  client.on(Events.MessageReactionAdd, async (reaction, user) => {
    if (reaction.partial) {
      try {
        await reaction.fetch();
      } catch (error) {
        console.error('Something went wrong when fetching the message:', error);
        return;
      }
    }
 
    // Now the message has been cached and is fully available
    
  });
client.init();
