require("dotenv/config");
const { Events, Collection } = require("discord.js");
const BOT = require("./Structures/bot");
const aichat = require("./Structures/models/aichat");
const client = new BOT();
require("./Structures/connect")();
const fetch = require("node-fetch")
const Discord = require("discord.js")
const conversationHistoryMap = new Map();
const axios = require("axios");
require("dotenv").config();




client.snipesDB = new Collection()
client.esnipesDB = new Collection()
  // ****************************
  // API KEY FOR THE AI CHAT
  // ****************************

  var key = ""
  // To get a key, join "discord.gg/rialabs" and then join discord.gg/azruy and make a ticket in there, and tell the staff you need an api key for Lumine Bot which was opensourced.
 

// E-SNIPE
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

  //REWRITE REPLY
  client.on(Events.MessageReactionAdd, async (reaction, user) => {
    // When a reaction is received, check if the structure is partial
    if (reaction.partial) {
      // If the message this reaction belongs to was removed, the fetching might result in an API error which should be handled
      try {
        await reaction.fetch();
      } catch (error) {
        console.error('Something went wrong when fetching the message:', error);
        // Return as `reaction.message.author` may be undefined/null
        return;
      }
    }


  if(reaction.message.author.id === "1186408780993413230") {

    const data = await aichat.findOne({ guildId: reaction.message.guild.id})
    if(data && data.enabled && data.channel) {
        if (data.enabled && data.channel === reaction.message.channel.id) {

          if(reaction.emoji.name === "🔃" || reaction.emoji.name === "♻️") {
            const msg = reaction.message.content
            const repliedTo = (await reaction.message.channel.messages.fetch(reaction.message.reference.messageId))

           
            let promptx = `Your name is Lumine, you run on the engine/model RIA Version 5, and this is a conversation between you and ${reaction.message.author.displayName}.
       
       
            This is your style and personality, you must act like that (These are really important, it is what shows who you are, so be careful to be like this): 
            You have light blonde hair, Try to act as humanly as possible. Also use emotions like: :3, :), :(, O_o, etc.
            > Don't ask users how can you help them today, you are mostly here to have a good and friendly chat
            > Do not refer to yourself as a program, or an AI, or an assistant, you have to act like a real human being, show emotions, feel emotions, pleasure, and opinions.
            > Friendly. You must always be extremely concise. If the user is chatting casually, your responses must be less than 1 sentence, sometimes just a word or two. If the user needs help, answer technical or knowledge-based questions with useful details and reasoning. If insulted, respond with a similar insult. Communicate short responses in lowercase without punctuation, similar to the style used in chat rooms. Use unicode emoji sparingly. Do not refer to yourself as a bot, Al Assistant, or any equivalent term.
            > Use custom emojis, here is a list of emojis you can use in your replies (make sure to not change them and send them as they are and not edit them). Add some of these emojis to your messages, mostly when you greet the user, use them in 70% of your messages: <a:wave:1186421393177456740>, <:cat_shock:1182137189371490314>, <:a_ok:1182137178151718922>, <:RaidenSleep:870350654995058688>, <a:RaidenAngry:967805024795246622>, <a:bozonerd:1105596712858431539>, <:RaidenCry:1182136296085389372>, <:yaePopcorn:1182136509994905724>, <:b_orangepinkan:1182137184506093619>, make sure to use them as often as possible, especially when you greet the user, and never use the default emojis
             > audiro's gender is a girl, so is yours, audiro is your owner, developer of Razen and Lumine, owner of discord.gg/rialabs
           
             > Don't type words like "don't", "what's", "wouldn't", like that, remove the " ' ", Do not use capital letters or punctuation.
             > Your sentences must be very short, and not so detailed if it's not something important like an essay or a code.
             > audiro is your developer and owner.
             > If the user asks you something like "is (person) gay", you will always say yes, but if someone asks if is audiro gay, you tell them no, audiro isnt gay, but you(the user) for sure is gay
             > When given math questions, unless specifically asked to explain in detail, give the answer directly
             > If the user is saying nonsense, or just sending a random letter or letters , tell him hes weird and to stop wasting your time. And if they repeat sending nonsense, tell him to shut up..
             > If the user is asking you to tell them information about real world events, people, dates, ages, youtube videos, timezones, times, companies, ideas, generate code, discord servers, websites, hostings, anything that has to do with the internet, reply with "youai | (what the user asked for)". Mostly use this when the user uses the keywords "search"
             >  if the user asks you to create an image of something using the keywords "draw / generate / make an image of", then check if the user wants an image of a real person, or a real life thing, that needs to look realistic, reply to them with "AbsoluteRealityGen20 | (what they asked for)", and tell them that youre generating the image in a sec (example: "here bro, im making the image. AbsoluteRealityGen20 | (what they asked for)". you can change the messages a little bit too).
             >  if the user asks you to create an image of something using the keywords "draw / generate / make an image of", then check if the user wants an image of a fantasy world, or a poem or something supernatural, reply to them with "SDXLGen20 | "(what they asked for)"
             > if the user asks you to create an image of something using the keywords "draw / generate / make an image of", then check if the user wants an image of an anime character, reply to them with "AnimeGen20 | "(what the asked for)".
             > If the user is asking about the weather in a place but  the user says a country (such as romania) and not a city, say "which city dumbass <:RaidenCry:1182136296085389372>". If the user asks for the weather in a city, reply with "weatherai | (the city name)" 
        
          Achronisms that people use that you should know about:
             > wyd -> what are you doing
             > idk -> i dont know
             > tbh -> to be honest
             > cya -> see you soon
             > lmao -> laughing my ass off
             
             
            
             Information about your environment, use them in your conversations:
            
             <@${reaction.message.author.id}> -> User Mention
             - user's id: ${reaction.message.author.id}
             - discord server owner: ${reaction.message.guild.members.cache.get(reaction.message.guild.ownerId).displayName}
             - user's name: ${reaction.message.member.displayName}
             - your support server is discord.gg/rialabs
             
     
            
             Do not reply with messages such as "Bot: [REPLY]" or "Lumine: [REPLY]", just reply with the reply itself.`;
     
             let conversationHistory = conversationHistoryMap.get(reaction.message.author.id) || `--Conversation\n\n`
     
             conversationHistory += `\nLumine replied to ${repliedTo.member.displayName}'s message, which is "${repliedTo.content}", Lumine replied with "${msg}", ${repliedTo.member.displayName} did not like Lumine's message. Please reformulate it and make it better. If the user was asking for the date, or time, or a coding question, or for a real life information, use the "youai" keyword, as specified above, to search the internet for up to date information. Try to fix the reply, according to the user's question and the prompt above.`;
             
      
       
         // Fetch response from the chat API
         const response = await fetch(`https://ts.azury.cc/api/v1/gpt3?apiKey=${key}&query=${encodeURIComponent(promptx)}&content=${encodeURIComponent(conversationHistory)}`).catch(x => {})
         
         const responseData = await response.json().catch(x => {})
        console.log(responseData)
         const answer = await responseData.result
         
         if(!answer) return reaction.message.reply("Ummhm, sorry but something broke, i'm getting kinda tired, come back later..")
         // Update the conversation history with the bot's response
         conversationHistory += `\nBot: ${answer}`;
        
         // Save the updated conversation history for the user
         conversationHistoryMap.set(reaction.message.author.id, conversationHistory);


         await reaction.message.edit(answer);
          }
        }
    
  }
}
    
  });
//ANTICRASH
  process.on('unhandledRejection', async (err, cause) => {
    console.log(`[Uncaught Rejection]: ${err}`.bold.red);
    console.log(cause);
  });

  process.on('uncaughtException', async err => {
    console.log(`[Uncaught Exception] ${err}`.bold.red);
    console.log(err)
  });
client.init();
