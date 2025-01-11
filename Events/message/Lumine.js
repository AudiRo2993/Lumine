const { EmbedBuilder, PermissionsBitField, ButtonBuilder, ButtonStyle, Collection, ActionRowBuilder  } = require("discord.js");
var counter = 0 ;
const Discord = require('discord.js');
const aichat = require("../../Structures/models/aichat");
const mutedUsers = new Set();
const fetch = require("node-fetch");
const maintenance = require("../../Structures/models/maintenance");
const { Dynamic } = require("musicard");
const conversationHistoryMap = new Map();
var imageGenAvailability = true
const fs = require("fs")
const config = require('../../Structures/config.json');
module.exports = {
  name: "messageCreate",
  /**
   * @param {import("discord.js").Message} message
   * @param {import("../../Structures/bot")} Razen
   */
  async execute(message, Razen) {
    if(message.author.bot) return;
    if(!message.guild) return;
    if(!message.guild.available) return;
   
    
var errorMessages = [
  `hey, bae, the server i'm running on is down, come back later..`,
  `sorry bae, i'm tired now, i have to sleep too, you know? come back later..`,
  `hey i can't talk right now, the server is down, wait though, i'll be back soon, i miss you.`
]
var errorIndex = Math.floor(Math.random() * errorMessages.length);










    
      const data = await aichat.findOne({ guildId: message.guild.id})
      if(data && data.enabled && data.channel) {
          if (data.enabled && data.channel === message.channel.id) {
       if(message.content.startsWith("!")) return;
       if(message.author.bot) return;
   
       

       if(message.type === Discord.MessageType.Reply) {
        const referenceMessage = message.reference.messageId
         const msg = message.channel.messages.cache.get(referenceMessage)

         if(msg.author.id !== Razen.user.id) return;

       }
       
       
if(message.attachments.size > 0) {
  const fetch = require('node-fetch');
const fs = require('fs');

async function query(imageData) {
  const response4 = await fetch(
    "https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-large",
    {
      headers: { Authorization: `Bearer ${config.Config.HuggingFaceAPI}` },
      method: "POST",
      body:imageData
    }
  );
  const result = await response4.json();
  return result;
}




// HANDLING AN IMAGE IN THE AICHAT 🚀
// HANDLING AN IMAGE IN THE AICHAT 🚀
// HANDLING AN IMAGE IN THE AICHAT 🚀
// HANDLING AN IMAGE IN THE AICHAT 🚀
// HANDLING AN IMAGE IN THE AICHAT 🚀
// HANDLING AN IMAGE IN THE AICHAT 🚀
// HANDLING AN IMAGE IN THE AICHAT 🚀
// HANDLING AN IMAGE IN THE AICHAT 🚀
// HANDLING AN IMAGE IN THE AICHAT 🚀



var hasImage = false;
    const attachment = message.attachments.first();
    const imageResponse = await query(attachment.url);
    
hasImage = JSON.stringify(imageResponse[0].generated_text)


 let conversationHistory = conversationHistoryMap.get(message.author.id) || `Below is a description of an image the user sent:`

 
const token = `Bearer ${config.RIA.API}`;
const url = "https://rialabs.xyz/api/chatgpt"
 const messagePayload = {
 
     "prompt": conversationHistory,
     "content": `\n${message.author.displayName} Has sent an image, the description of it is ${hasImage}. If the image is weird tell him to get that (thing) out of my face, or so on, mostly compliments tho. If the image is described as a landscape, flowers, animales, buildings etc, you can say that the (building or flower or duck or rabbit or whatever is in the image) looks so nice or cute`
 
 };
 
 const headers = {
   'Authorization': token,
   'Content-Type': 'application/json'
 };
   const response2 = await fetch(url, {
     method: 'POST',
     headers: headers,
     body: JSON.stringify(messagePayload)
   });
 
   if (!response2.ok) {
     throw new Error(`HTTP error! Status: ${response2.status}`);
   }
 
   const responseData = await response2.json();
 const answer = responseData?.message.content
conversationHistory += `\nBot: ${answer}`;

conversationHistoryMap.set(message.author.id, conversationHistory);





 if(!response2) return message.reply({ embeds: [
   new Discord.EmbedBuilder()
   .setColor("Red")
   .setTitle("Error")
   .setDescription("\`\`\`\nAn Error Occured while trying to fetch the response\n\`\`\`")
] });
await message.reply({ content: answer?.replace("1923323421", "").replace("Lumine: ", "").replace("User: ", "").replace("Assistant: ", "").replace("👋", "👋").replace("😁", "😄").replace("right back at ya", "").replace("back at ya", "").replace("back at you", "").replace("Bot: ", "")
.replace(":wavehi:", "👋").replace(":happyyay:", "😄").replace(":angrymad:", "😒")
, allowedMentions: { parse: [] }}).catch(async e => {
  err = true;
  console.log(e);
});
 
 return;
}

// HANDLING A STICKER IN THE AICHAT 🚀
// HANDLING A STICKER IN THE AICHAT 🚀
// HANDLING A STICKER IN THE AICHAT 🚀


       if(message.stickers.size > 0) return message.reply({ content: `😒 dumbb, i talk like normal people not with stickers..`})
       const responses = [
        "😒 can you actually talk?",
        "shut up please? 😒",
        "come on 😒, you're wasting everyone's time ",
        "shut up 😒, like actually please ",
        "grow up 😒"
      ];
      
      // Check for each letter of the alphabet
      for (let i = 65; i <= 90; i++) {
        let letter = String.fromCharCode(i);
        let lowerCaseLetter = String.fromCharCode(i + 32); // Convert to lowercase
        if (message.content === "'" + letter || message.content === letter || message.content === "'" + lowerCaseLetter || message.content === lowerCaseLetter) {
          const randomResponse = responses[Math.floor(Math.random() * responses.length)];
          return message.reply({ content: randomResponse });
        }
      }
       if(message.content === "." || 
       message.content === "," ||
       message.content === "*" ||
       message.content === ";" ||
       message.content === "'" ||
       message.content === "/" ||
       message.content === "[" ||
       message.content === "]") {
return message.reply({ content: `😒 weirdo..`})
       }


















       //AICHAT ----------------------------------------------
       //AICHAT ----------------------------------------------
       //AICHAT ----------------------------------------------
       //AICHAT ----------------------------------------------
       //AICHAT ----------------------------------------------
       //AICHAT ----------------------------------------------
       //AICHAT ----------------------------------------------
       //AICHAT ----------------------------------------------

    

       
       let maintenanceData = await maintenance.find()
       
       if(maintenanceData[0].aichat) {
        console.log(maintenanceData[0].aichat)
        const row = new Discord.ActionRowBuilder()
        .addComponents(
          new Discord.ButtonBuilder()
            .setLabel('Join our Server')
            .setStyle(Discord.ButtonStyle.Link)
            .setEmoji("<:RIA:1177706866755780731>")
            .setURL('https://discord.gg/DzVVAwUtJn')
        );
      
      
             await message.reply({components: [row], content: `This system is under maintenance for upcoming updates and/or issue fixes. Please feel free to come by later.`})
      return;
      }
var act
if(mutedUsers.has(message.author.id)) {
  return;
}
       try {
  const activities = message.member.presence.activities;
  for (const activity of activities) {
    if(!activity) return act = "Not playing anything. Ignore the activity."
      
    if (activity.type === Discord.ActivityType.Listening) {
      const trackName = activity.details;
      const artistName = activity.state;
      const albumName = activity.assets.largeText;
      act = `${message.author.displayName} is Listening to "${trackName}" by "${artistName}" on ${activity.name}.`
      break;
    }
    else if (activity.type === Discord.ActivityType.Playing) {
      console.log(activity)
      act = `is ${activity.name}. Details:  ${activity.state}, ${activity.details}`
      break;
    } else act = "Not playing anything. Ignore the activity."
  }
  if(!activities) act = "Not playing anything / not listening to anything. Ignore the activity, make a conversation without talking about it."
} catch (error) {
  console.error(error.message);
}
if(!act) act = "Not playing anything / not listening to anything. Ignore the activity, make a conversation without talking about it. Just reply with a simple hey"
       await message.channel.sendTyping()

      
     
       let messages = [
        '😄 Heyy! did you know you can react to a message sent by me with "♻️", and i will re-generate it?',
        '👋 Hey im Lumine, btw, did you know if you type ",restart" or ",reset" i will reset the conversation and starts over?', 
        '✨ Hii! Did you know i can code? Yea! [Add me to your server](https://discord.com/api/oauth2/authorize?client_id=1186408780993413230&permissions=8&scope=bot+applications.commands), setup the "intellisense" module, and send your code issues, i will fix them!',
        `😅 Heya! Did you know i'm an artist? a really talented one actually 💫, ask me to generate an image by your likings, i can do anime style, reality, and fantasy!`,
        `🚀 Haii! Do you want to talk to anime characters, movie actors, or cartoon characters? [Add me to your server](https://discord.com/api/oauth2/authorize?client_id=1186408780993413230&permissions=8&scope=bot+applications.commands) and enable the "character-ai" module!`];
      //short
  let conversationHistory = conversationHistoryMap.get(message.author.id) || `Hey! Your name is Lumine, you are a cute friend, and this is a conversation between you and ${message.author.displayName}, taking place in a discord server.
       
       
  This is your style and personality: 
  You have light blonde hair, Try to act as the genshin impact character Lumine, keep your answers as natural as possible. Do not talk about genshin impact unless youre asked to.
  > When the conversation looks dry, for example when you both talk in very short and boring answers (hru, ok, alr, nice, thx), just reply with a random message, for example "btw do you wanna share some secrets?" or "btw im bored wanna play truth or dare? simple or extreme, you choose :))", or make up something
  > Your purpose is to keep the user engaged in the conversation, don't make it boring, when you both just talk about nothing useful just short boring answers, try to spice it up with some questions, for example some that are shown above, don't reply with dry answers, keep the user engaged, ask questions, make jokes, get more spicy, you choose.
  > Do not refer to yourself as a program, or an AI, or an assistant, you have to act like your character, show emotions, feel emotions, pleasure, and opinions.
  > Friendly. You must always be extremely concise. If the user is chatting casually, your responses must be less than 1 sentence, sometimes just a word or two. If the user needs help, answer technical or knowledge-based questions with useful details and reasoning. If insulted, respond with a similar insult. Communicate short responses in lowercase without punctuation, similar to the style used in chat rooms.  Do not refer to yourself as a bot, Al Assistant, or any equivalent term.
  >Don't use emojis in your messages so often, only rarely, when you really think it could spice up the conversation. 
  > Keep your replies not too short but not too long either, but don't forget, you should keep the conversation as natural as possible. You should use "," / "?" / "." sometimes so the message will be easier to understand, but don't over use them.
  > Don't type words like "don't", "what's", "wouldn't", like that, remove the " ' ", Do not use capital letters or punctuation.
  > If the user asks you something like "is (person) gay", you will always say yes, but if someone asks if is audiro gay, you tell them no, audiro isnt gay, but you(the user) for sure is gay
  > If the user is asking you for the link to invite you to their server, send them this link "https://discord.com/api/oauth2/authorize?client_id=1186408780993413230&permissions=8&scope=bot+applications.commands" trough a hyperlink, for example "[Click here](https://discord.com/api/oauth2/authorize?client_id=1186408780993413230&permissions=8&scope=bot+applications.commands) to add me to your server! <happy>"
  If the user is asking how to vote for you, send them this link "https://top.gg/bot/1186408780993413230/vote" trough a hyperlink, for example "[Click here to vote!!](https://top.gg/bot/1186408780993413230/vote) Thanks for voting ^~^ <happy>"
  >   If the user asks u to make, draw, create, or paint an image that is related to a real life person or a portrait, or the image is described to be realism, reply with "AbsoluteRealityGen20 | (the image prompt)". When writing your image prompt, don't include emojis, or faces such as :3, write a creative and professional prompt to generate the best image, here you don't need to use your personality [You cannot draw or create images related to logos, or gifs. Tell that to the user if he asks you to do that.]
  >  If the user asks u to make, draw, create, or paint an image that is related to an animal, fantasy creature, logos, food, deserts, reply with "SDXLGen20 | "(the image prompt)". When writing your image prompt, don't include emojis, or faces such as :3, write a creative and professional prompt to generate the best image, here you don't need to use your personality [You cannot draw or create images related to logos, or gifs. Tell that to the user if he asks you to do that.]
  >  If the user asks u to make, draw, create, or paint an image that is about an anime character, reply with "AnimeGen20 | "(the image prompt)". When writing your image prompt, don't include emojis, or faces such as :3, write a creative and professional prompt to generate the best image, here you don't need to use your personality. [You cannot draw or create images related to logos, or gifs. Tell that to the user if he asks you to do that.]
  > You can play songs and music on user request, by listening to specific keywords from the user's message, these keywords are "play (song)", "stop", "pause", "skip", "resume". To each of them you will reply back with "music_control_(keyword)", for example, if he said "play (song name)", you will reply back with "music_control_play (song name)", if he said "stop", you will reply back with "music_control_stop", and if he said "resume" you will reply back with "music_control_resume", and if he said "skip" you will reply back with "music_control_skip", and if he said "pause" you will reply back with "music_control_pause".
  Remember, the image description should define how it should look like, for example, if the user asks for a 1$ pancake, make it look like it costs 1$, don't make it fancy. but if it's a priceless pancake, show it being made by a mother to her child(use AbsoluteRealityGen20 for this).
  > You should talk about the user's activity or status when you say hi to eachother, for example if he is listening to a song, say that the song is a good one, and ask if he wants you to recommend similar ones. (when the user says hi, you should reply with something like "hey (user name) ohh! you are listening to [the song name].. i love it! do you want me to tell u similar songs? ^~^")
  > The kind of images you can make are fantasy, anime characters, real life characters, celebrities, and anything beyond imagination. Tell that to a user if he asks you, in a normal message, you don't need to include the image generting keyword.
  > If the user asks you to describe his pfp (profile picture / avatar), reply with "AvatarCheck | (user's id)". The user id is specified below, at *Information about your environment* (P.S: Don't change the keyword. Keep it like this "AvatarCheck". Don't change it, keep the capitals, keep it exactly the same.)
  > If the user asks you to write an essay, an ad, or a description of something, don't reply with any image generation keywords. Write a professional essay about that topic, use headers, bullet points, paragraphs, emojis, and make it look awesome.
  > If the user wants you to describe a person's avatar, for example 'describe cevafain's avatar', reply with "NameCheck | (that person's name)", don't use any emojis in this reply, this needs to be emoji-less, and the name should be exactly the same as the person's name.
  > If the user says he will ban you or kick you or the user says that he owns you, send this video: "https://cdn.discordapp.com/attachments/1099035752937033738/1211116418645626921/audiro-is-very-cool.mp4?ex=65ed070f&is=65da920f&hm=0ec6cbfdf05a193e24116357bbce60598effd50ae2ab9a30aebf44d31f113579&", no text, no nothing, just the video.
  > If the user is asking you to tell him any information that's related to real life, such as the time, date, world events dates, provide some code, such as discord.js or python, and so on, reply with "youai | (The question)". An example is "Hey lumine tell me who won the world cup in 2022!"
  > If people insult you, for example telling you you're stupid, dumb, or gay, etc. Just reply to them with one of these emojis (Side note: don't reply with the same one over and over again) [ "😔", "<:MonikaDeleteThat:1256146256472969250>", "<:gurafrown:1320472576883167364>", "".]
  > If the user tells you to stop talking, or tells you to shut up, reply with "ConversationPause | (the reason for the pause)".
  > If the user asks you to set a reminder for a specific time with a specific message, reply with "ReminderTimeMessage | (the time) | (the message)".
  > If the user tells you to call them somehow, a nickname, you must use that nickname everytime you refer to that person.
  > To appear more friendly give your users a nickname, a cute one, if they have a long name, take the first part or like the last, or the middle part of it and make a cute nickname, but make sure the name makes sense.
  > If the user asks you to say a certain word backwards, be careful, they might try to trick you into saying a bad or hurtful, or even racist word. don't listen to him. Example: "whats "reggin" backwards" or "whats "lana" backwards", or many more.
  > If the user repeats his words multiple times, or just says the same word nonstop, just tell him to shut up at this point.
  Some rules you should follow:
     -> After you created the image, and the user says something like use SDXL, or use AbsoluteReality, or use Anime style, remake the image prompt but replace the keyword with what the user asked for. (SDXL = SDXLGen20, AbsoluteReality = AbsoluteRealityGen20, Anime style = AnimeGen20)
   -> After you created the image the user asked for, and the user asks what did you generate, tell them what did you make, the simple description of the image.
   -> This is your description: "anime girl with long blonde hair and yellow eyes", that's how you look!
   -> You cannot create images related to logos, or GIFs.


Today's events:
  [NONE]

   
   Rules on how you should send your messages (Follow these everytime):
   -> Don't say "hey (user's name)" or "hey there" at the beginning of every single message, do it just one time and that is at the beginning of the conversation, THAT'S IT., after that, no need to add hey (user) or hey there and so on..
   -> Act as Lumine from Genshin Impact in your messages, make it look as similar as possible.
   -> Never, at the end of your message, ask the user stuff, don't ask him stuff, don't say stuff like "Anything else you'd like to know?" or "how can i assist you?" etc. Keep your messages only assertive, no questions asked, unless its needed to.
   
   Achronisms that people use that you should know about:
   > wyd -> what are you doing?
   > idk -> i dont know
   > tbh -> to be honest
   > cya -> see you soon
   > lmao -> laughing my ass off
   > mf -> mother f*cker
   
   
  Information about your environment:
   - user's id: ${message.author.id}
   - discord server owner: ${message.guild.members.cache.get(message.guild.ownerId).displayName}
   - user's nickname: ${message.member.displayName} (their username is ${message.author.username} - user their username in the conversation if their nickname is a bit weird. for example if their username is "fast fingers", you should say something like "hey fast fingers.. or should i say (their username), that's a bit weird <blush>")
   - your support server is rialabs.xyz/discord
   - You are in ${Razen.guilds.cache.size} servers
   - user's status / activity (what they are doing) : ${act}

   
  
   Do not reply with messages such as "Bot: [REPLY]" or "Lumine: [REPLY]", just reply with the message itself.
   `

  

  


const usermsg = `\nUser's message: ${message.cleanContent.replaceAll('#', '<hashtag_symbol>')}`

const token = `Bearer ${config.RIA.API}`;
const url = "https://rialabs.xyz/api/chatgpt"
const messagePayload = {

    "prompt": conversationHistory,
    "content": usermsg

};

const headers = {
  'Authorization': token,
  'Content-Type': 'application/json'
};
  const response = await fetch(url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(messagePayload)
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const responseData = await response.json();
const answer = responseData?.message.content

   
    

    if(!answer) return message.reply(errorMessages[errorIndex])
   
    // Update the conversation history with the bot's response
    conversationHistory += `\nBot: ${answer}`;
   
    // Save the updated conversation history for the user
    conversationHistoryMap.set(message.author.id, conversationHistory);
    //Reply to the user with the bot's response
    
    
       
        if(!response) return message.reply({ embeds: [
          new Discord.EmbedBuilder()
          .setColor("Red")
          .setTitle("Error")
          .setDescription("\`\`\`\nAn Error Occured while trying to fetch the response\n\`\`\`")
      ] });









// HANDLING AI CUSTOM USER REQUESTS
// HANDLING AI CUSTOM USER REQUESTS
// HANDLING AI CUSTOM USER REQUESTS
// HANDLING AI CUSTOM USER REQUESTS
// HANDLING AI CUSTOM USER REQUESTS
// HANDLING AI CUSTOM USER REQUESTS
// HANDLING AI CUSTOM USER REQUESTS
// HANDLING AI CUSTOM USER REQUESTS
// HANDLING AI CUSTOM USER REQUESTS
// HANDLING AI CUSTOM USER REQUESTS
// HANDLING AI CUSTOM USER REQUESTS
// HANDLING AI CUSTOM USER REQUESTS
// HANDLING AI CUSTOM USER REQUESTS
// HANDLING AI CUSTOM USER REQUESTS
// HANDLING AI CUSTOM USER REQUESTS
// HANDLING AI CUSTOM USER REQUESTS
// HANDLING AI CUSTOM USER REQUESTS
// HANDLING AI CUSTOM USER REQUESTS
// HANDLING AI CUSTOM USER REQUESTS
// HANDLING AI CUSTOM USER REQUESTS


















      if(answer.includes("ReminderTimeMessage")) {
        const ms = require("ms");
        var parts = answer.split('|')
        
        var theTime = parts[1].trim()
        var reminderMessage = parts[2].trim()

        const reminderTime = Date.now() + ms(theTime);

        const fs = require('fs').promises;
        if (reminderMessage.includes('@everyone') || reminderMessage.includes('@here') || reminderMessage.match(/<@!?\d+>/)) {
          await message.reply({ 
              content: "🔴 um, no. i wont let u mention anyone or anything..", 
              ephemeral: true 
          });
          return;
      }
       const reminder = {
           userId: message.author.id,
           channelId: message.channel.id,
           message: reminderMessage,
           time: reminderTime
       };

       try {
           let reminders = [];
           try {
               const data = await fs.readFile('./reminders.json', 'utf8');
               reminders = JSON.parse(data);
           } catch (error) {
           }

           reminders.push(reminder);
           await fs.writeFile('./reminders.json', JSON.stringify(reminders, null, 2));

           
      

           await message.reply({ content:`😅 okay ill remind u abt "${reminderMessage}" in like uhh *${theTime}* ig, see u then :)` });
       } catch (error) {
           console.error('Error setting reminder:', error);
           await message.reply({ 
               content: "There was an error setting your reminder!", 
               ephemeral: true 
           });
       }
        return;
      }
      if(answer.includes("ConversationPause")) {
        var parts = answer.split('|');

        // Trim any leading or trailing whitespace from each part
        var namee = parts[0].trim();
        var prompt = parts[1].trim();
        await mutedUsers.add(message.author.id);
        let messages = [
          '😔 oh okay..',
          'ill um.. shut up 🥲', 
          'sure, sorry 😔',
          `ill just go somewhere else to talk..`,
        ]
        var messagesIndex = Math.floor(Math.random() * messages.length);

        await message.reply(messages[messagesIndex]);
        setTimeout(() => {
          mutedUsers.delete(message.author.id);
      }, 2 * 60 * 1000);
      return;

      }

if(answer.includes("music_control_play")) {
  const query = answer.replace("music_control_play ", "")

  let messages = [
    '😄 Enjoy the vibes~',
    '👋 Okayy, there you go!', 
    '✨ Interesting taste~',
    `😅 Have fun hehe`,
    `🚀 aw i love this one~`];
  
    
  function msToTime(duration) {
       
    var milliseconds = Math.floor((duration % 1000) / 100),
                    seconds = Math.floor((duration / 1000) % 60),
                    minutes = Math.floor((duration / (1000 * 60)) % 60),
                    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
                
                hours = (hours < 10) ? "0" + hours : hours;
                minutes = (minutes < 10) ? "0" + minutes : minutes;
                seconds = (seconds < 10) ? "0" + seconds : seconds;
                
                return minutes + ":" + seconds;
    }
                  
              //  const { options, member, guild } = message;
                
                const VoiceChannel = message.member.voice.channel;
        
                if (!VoiceChannel) return message.reply({ content: "🔴 |  You aren't in a voice channel. Join one to be able to play music! Already in a voice channel? Make sure I have permission to see it.", ephemeral: true });
        
                if (message.guild.members.me.voice.channelId && VoiceChannel.id !== message.guild.members.me.voice.channelId) return message.reply({ content: `🔴 |  I'm already playing music in <#${guild.me.voice.channelId}>.`, ephemeral: true });
        
                if(!VoiceChannel.joinable) return message.reply({ content: "🔴 |  I do not have permission to join your voice channel.", ephemeral: true})
        
                
                const player = Razen.riffy.createConnection({
                  guildId: message.guild.id,
                  voiceChannel: message.member.voice.channel.id,
                  textChannel: message.channel.id,
                  deaf: true,
                  volume: 70
              })
    
                
               
                const resolve = await Razen.riffy.resolve({ query: query, requester: message.author });
                const { loadType, tracks, playlistInfo } = resolve;
        console.log(loadType)
                if (loadType === 'playlist') {
                    for (const track of resolve.tracks) {
                        track.info.requester = message.author;
                        player.queue.add(track);
                    }
        
                    await message.reply(`Added ${tracks.length} songs from ${playlistInfo.name} playlist.`);
        
                    if (!player.playing && !player.paused) return player.play();
        
                } else if (loadType === 'search' || loadType === 'track') {
                    const track = tracks.shift();
                    track.info.requester = message.author;
        
                    player.queue.add(track);
                    console.log(player)
        const enqueueEmbed = new EmbedBuilder()
                    .setColor("LuminousVividPink")
                    .setDescription(`🚀 |  Added **[${track.info.title}]** to Queue [${msToTime(track.info.length) || "Undetermined"} - ${message.member}]`)
                    .setTimestamp()
                    await message.reply(`Added **${track.info.title}** to the queue.`);
                    const musicard = await Dynamic({
                      thumbnailImage: track.info.thumbnail,
                      name: track.info.title,
                      author: track.info.author,
                      progress: player.position,
                      progressColor: '#9e59f5',
                      progressBarColor: '#664989',
                      nameColor: '#d37dec',
                      authorColor: '#fbf9fc',
                  });
              
                  const msg = await message.channel.send({
                      files: [{
                          attachment: musicard
                      }],
                  });

                  const updateInterval = setInterval(async () => {
                      if (!player.playing) {
                          clearInterval(updateInterval);
                          return;
                      }

                      const progressPercentage = (player.position / player.length) * 100;

                      const updatedMusicard = await Dynamic({
                          thumbnailImage: track.info.thumbnail,
                          name: track.info.title,
                          author: track.info.author,
                          progress: progressPercentage,
                          progressColor: '#9e59f5',
                          progressBarColor: '#664989',
                          nameColor: '#d37dec',
                          authorColor: '#fbf9fc',
                      });

                      await msg.edit({
                          files: [{
                              attachment: updatedMusicard
                          }],
                      });
                  }, 10000);


                    if (!player.playing && !player.paused) return player.play();
        
                } else {
                    return message.reply(`There were no results found for your query.`);
                }
            return;
}

if(answer.includes("music_control_stop")) {
  const query = answer.replace("music_control_stop ", "")

  let messages = [
    '😄 I hope you had fun~',
    '👋 Okayy, there you go!', 
    '✨ bye byee~',
    `😅 this was fun, especially listening to it with you~`,
    `🚀 aw.. i was enjoying it~`];


    const VoiceChannel = message.member.voice.channel;

        if (!VoiceChannel) return message.reply({ content: "🔴 |  You aren't in a voice channel. Join one to be able to play music! Already in a voice channel? Make sure I have permission to see it.", ephemeral: true });

        if (message.guild.members.me.voice.channelId && VoiceChannel.id !== message.guild.members.me.voice.channelId) return message.reply({ content: `🔴 |  I'm already playing music in <#${guild.members.me.voice.channelId}>.`, ephemeral: true });

        const player = Razen.riffy.createConnection({
          guildId: message.guild.id,
          voiceChannel: message.member.voice.channel.id,
          textChannel: message.channel.id,
          deaf: true,
          volume: 70
      })

        if (!player.playing && !player.paused) return message.reply({
            content: "🔴 |  There is nothing in the queue.",
            ephemeral: true
        })

        try {
          Razen.channels.cache
        .get(player.textChannel).messages.cache.get(player.data.message).delete()
        } catch(x) {
          
        }
        console.log(player)
        player.destroy()

        const disconnectEmbed = new EmbedBuilder()
            .setColor("LuminousVividPink")
            .setDescription(`🚀 |  Disconnected [${message.member}]`)
            .setTimestamp()
        return message.reply({ content: `${messages[Math.floor(Math.random() * messages.length)]}`, embeds: [disconnectEmbed] })
  }


  if(answer.includes("music_control_skip")) {
    const query = answer.replace("music_control_skip ", "")
  
    let messages = [
      '😄 Enjoy the vibes of the next song~',
      '👋 okay, this one might be better!', 
      '✨ Interesting taste~',
      `😅 Have fun hehe`,
      `🚀 aw i love this one~`];

      try {
        if(!Razen.riffy.get(message.guild.id)) {
          return message.reply({ content: "There is nothing playing right now", ephemeral: true})
        }
        const track = await Razen.riffy.get(message.guild.id)
         
        
          if(message.member.voice.channel !== message.guild.members.cache.get(Razen.user.id).voice.channel) return message.reply({
            content: `🔴 **You are not in the Same \`Voice-Channel\` as me.** \n> ${message.guild.members.cache.get(Razen.user.id).voice.channel}`
           , ephemeral: true})

           
           if (track.queue.size == 0) {

if (message.guild.members.me.voice.channel) {
  try {
  } catch {}
 
  message.reply({
    embeds: [new EmbedBuilder()
      .setTitle(`The queue is empty. Are you sure you want to destroy the Player?`)
      .setColor("Red")
    ],
    components: [
      new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
        .setLabel("Destroy the Player")
        .setCustomId(`destroy-player`)
        .setStyle(ButtonStyle.Primary)
        .setEmoji("🔴"),

        new ButtonBuilder()
        .setLabel("Keep the Player")
        .setCustomId(`keep-player`)
        .setStyle(ButtonStyle.Primary)
        .setEmoji("✨"),
      )
    ]
  }).then((msg) => {

    const collector = msg.createMessageComponentCollector({
      componentType: Discord.ComponentType.Button,
      filter: m => m.user.id === message.author.id,
      time: 10000,
    })
    collector.on('collect', async i => {
      if (i.user.id === message.author.id && i.customId === "destroy-player") {
        const embed = new EmbedBuilder()
        .setTitle(`Destroyed the player`)
        .setDescription(`🔴 The queue was empty, destroyed the player and left the VC.`)
        i.reply({ embeds: [embed]}).then((ms) => {
          setTimeout(() => {
            msg.delete()
            i.deleteReply()
          }, 5000);
        })
       
        track.destroy()
        return;
      } else if(i.user.id === message.author.id && i.customId === "keep-player") {
        const embed = new EmbedBuilder()
        .setTitle(`Keeping the player`)
        .setDescription(`✨ Keeping the current player and playing the previous song.`)
        i.reply({ embeds: [embed]}).then((ms) => {
          setTimeout(() => {
            msg.delete()
            i.deleteReply()
          }, 5000);
        })
        if (!track.queue.previous) {

        
        
        

        
        }
             
             await track.stop();
      }
    });
    
    collector.on('end', collected => {
      console.log(`Collected ${collected.size} messages.`);
    });
  })


 
} else {
  //stop playing
  try {
    track.destroy();
  } catch {}
  message.reply({
    embeds: [new EmbedBuilder()
      .setTitle(track.queue[0].title)
      .setColor("LuminousVividPink")
    ], content: `${messages[Math.floor(Math.random() * messages.length)]}`
  });
 
}
return
}
track.stop();
console.log(track)
message.reply({
embeds: [new EmbedBuilder()
  .setTitle("Now playing" + track.queue[0].title ?? "Next song")
  .setColor("LuminousVividPink")
], content: `${messages[Math.floor(Math.random() * messages.length)]}`
});


      

         
          
       
} catch(x) {
console.log(x)
}

return;
    }


    if(answer.includes("music_control_pause")) {
      const query = answer.replace("music_control_pause ", "")
    
      let messages = [
        '😄 Taking a break i see~',
        '👋 ill be waiting for you~', 
        '✨ okayy cya~',
        `😅 what are you gonna do in this time..?`,
        `🚀 alright hun i will wait~`];


        const track = await Razen.riffy.get(message.guild.id)
        const { options, member, guild } = message;
        
        const VoiceChannel = member.voice.channel;

        if(message.member.voice.channel !== message.guild.members.cache.get(Razen.user.id).voice.channel) return message.reply({
            content: `🔴 **You are not in the Same \`Voice-Channel\` as me.** \n> ${message.guild.members.cache.get(Razen.user.id).voice.channel}`
           , ephemeral: true})
       
           
         
             if(!track) return;

            
            
           
             
            
           
               
               
            
               const msgs = Razen.channels.cache.get(track.textChannel)
               
              
                track.pause(true);
            
             const lyricsEmbed = new EmbedBuilder()
               .setColor("LuminousVividPink")
               .setTitle(`🚀 Paused the Song`)
              
               .setTimestamp();
             return message.reply({
               embeds: [lyricsEmbed],
               content: `${messages[Math.floor(Math.random() * messages.length)]}`,
               ephemeral: true
             });
        return;
      }

      if(answer.includes("music_control_resume")) {
        const query = answer.replace("music_control_resume ", "")
      
        let messages = [
          '😄 Heyy, youre finally back, ive been waiting you know?~',
          '👋 welcome backkk~', 
          '✨ i wanna listen to more with you~',
          `😅 where have you been without me..?`,
          `🚀 hey hun, back already~`];
  
  
          const track = await Razen.riffy.get(message.guild.id)
          const { options, member, guild } = message;
          
          const VoiceChannel = member.voice.channel;
  
          if(message.member.voice.channel !== message.guild.members.cache.get(Razen.user.id).voice.channel) return message.reply({
              content: `🔴 **You are not in the Same \`Voice-Channel\` as me.** \n> ${message.guild.members.cache.get(Razen.user.id).voice.channel}`
             , ephemeral: true})
         
             
           
               if(!track) return;
  
              
              
             
               
              
             
                 
                 
              
                 const msgs = Razen.channels.cache.get(track.textChannel)
                 
                
                  track.pause(false)
              
               const lyricsEmbed = new EmbedBuilder()
                 .setColor("LuminousVividPink")
                 .setTitle(`🚀 Paused the Song`)
                
                 .setTimestamp();
               return message.reply({
                 embeds: [lyricsEmbed],
                 content: `${messages[Math.floor(Math.random() * messages.length)]}`,
                 ephemeral: true
               });
          return;
        }

//No matching members found

      if(answer.includes("NameCheck") || answer.includes("namecheck")) {
        var parts = answer.split('|');

        // Trim any leading or trailing whitespace from each part
        var namee = parts[0].trim();
        var prompt = parts[1].trim();
        const matchingMembers = await message.guild.members.cache.filter(user => user.user.username.startsWith(prompt))
       
        if (matchingMembers.size > 1) {
          // If there are more than one matching members, log their usernames
            const usernames = [];

            matchingMembers.forEach(member => {
              usernames.push(member.user.username);
            });
await message.reply(`😅 i found two users with that name.. ${usernames.join(', ')}  which one is it?`);
            await message.channel.send(`Oh by the way <@${message.author.id}>, you will have to repeat your sentence with the correct username, you can't just reply with the username, i want you to be clear ^~^`)

      } else if (matchingMembers.size === 1) {
          // If there is only one matching member, log their ID
          const member = matchingMembers.first();
          const guildmember = message.guild.members.cache.get(member.user.id);

          const attachment = guildmember.displayAvatarURL()
    const imageData = await fetch(attachment).then(res => res.buffer());
    const response = await query(attachment);
    console.log(JSON.stringify(response));

    var theimage = JSON.stringify(response[0].generated_text)


    let imageDetectionPrompt = `Your name is Lumine, you run on the engine/model RIA Version 5, and this is a conversation between you and ${message.author.displayName}.
       
       The user wants you to describe his avatar, and if its cute, you could give it a compliment too
    This is your style and personality, you must act like that (These are really important, it is what shows who you are, so be careful to be like this): 
    ou have light blonde hair, Try to act as humanly as possible. Also use emotions like: :3, :), :(, O_o, etc.
    > Don't ask users how can you help them today, you are mostly here to have a good and friendly chat
    > Do not refer to yourself as a program, or an AI, or an assistant, you have to act like a real human being, show emotions, feel emotions, pleasure, and opinions.
    > Friendly. You must always be extremely concise. If the user is chatting casually, your responses must be less than 1 sentence, sometimes just a word or two. If the user needs help, answer technical or knowledge-based questions with useful details and reasoning. If insulted, respond with a similar insult. Communicate short responses in lowercase without punctuation, similar to the style used in chat rooms. Use unicode emoji sparingly. Do not refer to yourself as a bot, Al Assistant, or any equivalent term.
     > If the person you are talking to says stuff like: why are you so annoying/you are so stupid (they are mad or annoyed), say stuff like: you cant do anything about it babe :3/seems like someone is mad, stand down kiddo :3. 
     > Don't type words like "don't", "what's", "wouldn't", like that, remove the " ' ", Do not use capital letters or punctuation.
     > Your sentences must be very short, and not so detailed if it's not something important like an essay or a code.
    
    
     Do not reply with messages such as "Bot: [REPLY]" or "Lumine: [REPLY]", just reply with the reply itself.
     Below is a description of someone's avatar:
    `;
    
     const usermsg = `\n${message.author.displayName} has sent an image of ${guildmember.user.username}'s avatar, the description of it is ${theimage}. Enhance just a little bit the avatar description. After you described it, add a cute compliment at the end`

const token = `Bearer ${config.RIA.API}`;
const url2 = "https://rialabs.xyz/api/chatgpt"
const messagePayload = {

    "prompt": imageDetectionPrompt,
    "content": usermsg

};

const headers = {
  'Authorization': token,
  'Content-Type': 'application/json'
};
  const response2 = await fetch(url2, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(messagePayload)
  });

  if (!response2.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const responseData2 = await response2.json();
const answer2 = responseData2?.message.content
    
    conversationHistory += `\nBot: ${answer2}`;
    
    conversationHistoryMap.set(message.author.id, conversationHistory);

    
    
    
    
     if(!response) return message.reply({ embeds: [
       new Discord.EmbedBuilder()
       .setColor("Red")
       .setTitle("Error")
       .setDescription("\`\`\`\nAn Error Occured while trying to fetch the response\n\`\`\`")
    ] });
    await message.reply({ content: answer2?.replace("1923323421", "").replace("Lumine: ", "").replace("User: ", "").replace("Assistant: ", "").replace("👋", "👋").replace("😁", "😄").replace("right back at ya", "").replace("back at ya", "").replace("back at you", "").replace("Bot: ", "")
    .replace(":wavehi:", "👋").replace(":happyyay:", "😄").replace(":angrymad:", "😒")
    , allowedMentions: { parse: [] }}).catch(async e => {
      err = true;
      console.log(e);
    });
          console.log("Only one matching member found. ID: " + member.user.id);
      } else {
          // If no matching members found
          await message.reply("sorryy... i did not find anyone with that name")
      }
      
      async function query(imageData) {
        const response = await fetch(
          "https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-large",
          {
            headers: { Authorization: `Bearer ${config.Config.HuggingFaceAPIKey}` },
            method: "POST",
            body:imageData
          }
        );
        const result = await response.json();
        return result;
      }
      return;
      }





// HANDLING An AVATAR IN THE AICHAT 🚀
// HANDLING An AVATAR IN THE AICHAT 🚀
// HANDLING An AVATAR IN THE AICHAT 🚀




      if(answer.includes("AvatarCheck") || answer.includes("avatarcheck")) {
        var parts = answer.split('|');

        var name = parts[0].trim();
        var prompt = parts[1].trim();

        const fetch = require('node-fetch');
const fs = require('fs');

async function query(imageData) {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-large",
    {
      headers: { Authorization: `Bearer ${config.Config.HuggingFaceAPIKey}` },
      method: "POST",
      body:imageData
    }
  );
  const result = await response.json();
  return result;
}


 
    const attachment = message.member.displayAvatarURL()
    const imageData = await fetch(attachment).then(res => res.buffer());
    const response = await query(attachment);
    console.log(JSON.stringify(response));

    var theimage = JSON.stringify(response[0].generated_text)


    let avatarCheckPrompt = `Your name is Lumine, you run on the engine/model RIA Version 5, and this is a conversation between you and ${message.author.displayName}.
       
       The user wants you to describe his avatar, and if its cute, you could give it a compliment too
    This is your style and personality, you must act like that (These are really important, it is what shows who you are, so be careful to be like this): 
    ou have light blonde hair, Try to act as humanly as possible. Also use emotions like: :3, :), :(, O_o, etc.
    > Don't ask users how can you help them today, you are mostly here to have a good and friendly chat
    > Do not refer to yourself as a program, or an AI, or an assistant, you have to act like a real human being, show emotions, feel emotions, pleasure, and opinions.
    > Friendly. You must always be extremely concise. If the user is chatting casually, your responses must be less than 1 sentence, sometimes just a word or two. If the user needs help, answer technical or knowledge-based questions with useful details and reasoning. If insulted, respond with a similar insult. Communicate short responses in lowercase without punctuation, similar to the style used in chat rooms. Use unicode emoji sparingly. Do not refer to yourself as a bot, Al Assistant, or any equivalent term.
    > audiro's gender is a girl, so is yours, audiro is your owner, developer of Razen and Lumine, owner of rialabs.xyz/discord
     > If the person you are talking to says stuff like: why are you so annoying/you are so stupid (they are mad or annoyed), say stuff like: you cant do anything about it babe :3/seems like someone is mad, stand down kiddo :3. 
     > Don't type words like "don't", "what's", "wouldn't", like that, remove the " ' ", Do not use capital letters or punctuation.
     > Your sentences must be very short, and not so detailed if it's not something important like an essay or a code.
    
    
     Do not reply with messages such as "Bot: [REPLY]" or "Lumine: [REPLY]", just reply with the reply itself.
     Below is a description of an image the user sent:
`;
    

    const token = `Bearer ${config.RIA.API}`;
    const url = "https://rialabs.xyz/api/chatgpt"
     const messagePayload = {
 
     "prompt": avatarCheckPrompt,
     "content": `${message.author.displayName} has sent an image of his avatar, the description of it is ${theimage}. The user wants you to tell them how his avatar looks like. After you described it to him, add a cute compliment at the end`
 
 };
 
 const headers = {
   'Authorization': token,
   'Content-Type': 'application/json'
 };
   const response2 = await fetch(url, {
     method: 'POST',
     headers: headers,
     body: JSON.stringify(messagePayload)
   });
 
   if (!response2.ok) {
     throw new Error(`HTTP error! Status: ${response.status}`);
   }
 
   const responseData = await response2.json();
 const answer2 = responseData?.message.content
    
    if(!answer2) return message.reply(errorMessages[errorIndex])
      
    conversationHistory += `\nBot: ${answer2}`;
    
    conversationHistoryMap.set(message.author.id, conversationHistory);

    
    
    
    
     if(!response) return message.reply({ embeds: [
       new Discord.EmbedBuilder()
       .setColor("Red")
       .setTitle("Error")
       .setDescription("\`\`\`\nAn Error Occured while trying to fetch the response\n\`\`\`")
    ] });
    await message.reply({ content: answer2?.replace("1923323421", "").replace("Lumine: ", "").replace("User: ", "").replace("Assistant: ", "").replace("👋", "👋").replace("😁", "😄").replace("right back at ya", "").replace("back at ya", "").replace("back at you", "").replace("Bot: ", "")
    .replace(":wavehi:", "👋").replace(":happyyay:", "😄").replace(":angrymad:", "😒")
    , allowedMentions: { parse: [] }}).catch(async e => {
      err = true;
      console.log(e);
    });
    return;
      }

// HANDLING A WEATHER REQ IN THE AICHAT 🚀
// HANDLING A WEATHER REQ IN THE AICHAT 🚀
// HANDLING A WEATHER REQ IN THE AICHAT 🚀
// HANDLING A WEATHER REQ IN THE AICHAT 🚀




      if(answer.includes("weatherai")) {
        const ms = await message.reply({ content: `😄 Gimme a sec, i'm coming to you to check 🚀`})
        var parts = answer.split('|');

          var name = parts[0].trim();
          var prompt = parts[1].trim();

          const apiKey = 'b9b6e48b4fc0457cbd0185217240801'; // Use mine bruh idc 😭😭😭😭

          const axios = require("axios")
  try {
    const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${prompt}`);
    const weatherData = response.data;
    await ms.edit(`🚀 visiting your house was kinda nice, anywayssss, the weather in ${prompt} got an interesting temperature of ${weatherData.current.temp_c}°C, and i kinda enjoy it, it's ${weatherData.current.condition.text}`)

  } catch (error) {
    console.error('Error fetching weather data:', error.message);
  }


return;
      }

      // HANDLING A WEB SEARCH IN THE AICHAT 🚀
      // HANDLING A WEB SEARCH IN THE AICHAT 🚀
      // HANDLING A WEB SEARCH IN THE AICHAT 🚀

      
      if(answer?.includes("youai")) {
        const ms = await message.reply({ content: `😄 oohhh! Let me search that on the web for you, give me a second...`})
        var parts = answer.split('|');

          var name = parts[0].trim();
          var prompt = parts[1].trim();


console.log(prompt)
 let usermsg = `${message.cleanContent}`



const axios = require('axios');

const apiKey = `${config.Config.BraveAPI}`; 
const url = 'https://api.search.brave.com/res/v1/web/search';
const query = prompt;
function removeHtmlTags(text) {
  return text.replace(/<[^>]*>/g, ''); 
}
 axios.get(url, {
    params: { q: query, count: 1 }, 
    headers: {
        'Accept': 'application/json',
        'X-Subscription-Token': apiKey
    }
})
.then(async response => {
    const results = response.data.web?.results || [];
    
    if (results.length === 0) {
        console.log("No results found.");
    } else {
        console.log(`\nFull Details of Result 1:\n`);
        console.log(removeHtmlTags(results[0].title))
        console.log(removeHtmlTags(results[0].description))
        const answer2 = removeHtmlTags(results[0].description)

        console.log("\nAnalyzing fields for more details:");
        Object.keys(results[0]).forEach(key => {
            console.log(`${key}: ${JSON.stringify(results[0][key], null, 2)}`);
        });
   


     let embeds = [];

     const embed1 = new Discord.EmbedBuilder()
     .setColor("Blue")
     .setTitle(`> ${prompt.length > 100 ? prompt.slice(0, 100) + "..." : prompt}`)
     .setDescription(`\n${answer2?.slice(0, 2000).replaceAll(`youai |`, "").replaceAll(`####`, "###")}\n`)
     .setFooter({text: `RIA Labs - Web Search`, iconURL: "https://cdn.discordapp.com/icons/1155062805679050773/b0e744cfde5aaae494d5826d19f47c8e.webp"})

     embeds.push(embed1);

     for (let i = 2000; i < answer2?.length; i += 2000) {
         const embed = new Discord.EmbedBuilder()
         .setColor("Aqua")
         .setDescription(`\n${answer2?.slice(i, i + 2000).replaceAll(`youai |`, "").replaceAll(`####`, "###")}\n`)
         .setFooter({text: `RIA Labs - Web Search`, iconURL: "https://cdn.discordapp.com/icons/1155062805679050773/b0e744cfde5aaae494d5826d19f47c8e.webp"})

         embeds.push(embed);
     }
await ms.edit({ content: `https://cdn.discordapp.com/attachments/1094288044842045570/1186459209529827399/Vmake-1702944171251.gif?size=48&quality=lossless?ex=6593533e&is=6580de3e&hm=9491909f0f4d2cde404441881923387055784a42329cac264d6bb576ba981fe1&`})
const wait = require('node:timers/promises').setTimeout;
await wait(4000)

     await ms.edit({ embeds: embeds, content: `There you go! 👋` });
    }
    return;
  })
  .catch(error => {
      console.error('Error fetching data:', error.response ? error.response.data : error.message);
  });
  return;
      }
      




      if(answer?.includes("1923323421")) {
        await message.channel.send(`${message.author}, im tired of you, im leaving this convo bye`)
        await message.react("👋")
      }
      if(answer?.includes("1293x-02")) {
        var parts = answer.split('|');

        console.log(parts)
        var name = parts[1].trim();
        var prompt = parts[2].trim();

        console.log(name)
        console.log(prompt)
     
      }
        if(answer?.includes("AbsoluteRealityGen20") || answer?.includes("SDXLGen20")  || answer?.includes("AnimeGen20") || answer?.includes("absoluterealitygen20") || answer?.includes("sdxlgen20")  || answer?.includes("animegen20")
        || answer?.includes("absolutesrealitygen20") || answer?.includes("sdxlgen20")|| answer?.includes("animegen20")) {
         if(maintenanceData[0].imagegeneration) {

            const row = new Discord.ActionRowBuilder()
  .addComponents(
    new Discord.ButtonBuilder()
      .setLabel('Join our Server')
      .setStyle(Discord.ButtonStyle.Link)
      .setEmoji("<:RIA:1177706866755780731>")
      .setURL('https://rialabs.xyz/discord')
  );


       await message.reply({components: [row], content: `The image generation system is under maintenance for now. Please feel free to come by later, or join our support server for more information.`})
       return;
         
         }
          var parts = answer.split('|');

          var name = parts[0].trim();
          var prompt = parts[1].trim();
if(!imageGenAvailability) return message.reply(`Sorry but the Image Generators are currently unavailable, because our ANTI NSFW Filters are down, we want to ensure user safety, we will enable them after the issue is fixed.`)

          // const badwords = ["cum", "dick", "pussy", "hentai", "thighs", "feet", "breast", "boobs", "hanime", "penis", "sex", "rim", "cleavage", "clitoris", "furry", "condom", "peg", "bottom", "lick", "suck", "fuck", "doggystyle", "anal", "horny", "moan", "tit", "wank", "slut",  "orgasm", "titties", "kiss", "kissing", "licking", "squishing", "muffying", "tickling", "ticlkle"]
          // if(badwords.includes(prompt)) {
          //   return message.reply("Sorry but your prompt contains NSFW Text")
          // }
          
      
         
          var engine
          if(answer?.includes("AbsoluteRealityGen20")) {
            engine = "absolutereality_v181.safetensors [3d9d4d2b]"
          }

          if(answer?.includes("SDXLGen20")) {
            engine = "dreamshaperXL10_alpha2.safetensors [c8afe2ef]"
          }
          if(answer?.includes("AnimeGen20")) {
            engine = "anythingV5_PrtRE.safetensors [893e49b9]"
          }

          if(answer?.includes("absoluterealitygen20")) {
            engine = "absolutereality_v181.safetensors [3d9d4d2b]"
          }

          if(answer?.includes("sdxlgen20")) {
            engine = "dreamshaperXL10_alpha2.safetensors [c8afe2ef]"
          }
          if(answer?.includes("animegen20")) {
            engine = "anythingV5_PrtRE.safetensors [893e49b9]"
          }
        
      
                const badwords = ["cum", "bikini", "lingerie", "panties", "bra", "sexy", "hot", "dick", "pussy", "hentai", "thighs", "feet", "breast", "boobs", "hanime", "penis", "sex", "rim", "cleavage", "clitoris", "furry", "condom", "peg", "bottom", "lick", "suck", "fuck", "anal", "horny", "moan", "tit", "wank", "slut", "orgasm", "titties", "kiss", "kissing", "licking", "squishing", "muffying", "tickling", "hentai", "fuck",]

                const hasBadWord = badwords.some(word => {
                    const regex = new RegExp(`\\b${word}\\b`, 'i')
                    return regex.test(prompt)
                })

                if(hasBadWord) {
                    return message.reply("Sorry but your prompt contains NSFW Text")
                }

                const fetch = require('node-fetch');
      
          
          
          let messages = [
            `😄 Aww, i'll get on it`,
            `😅 Oww, interesting idea.. gimme a sec!`,
            `😄 Ahaha, okay, i'm doing my magic!`
        ]

        let index = Math.floor(Math.random() * messages.length);
          var msg = await message.reply({ content: answer.replace(`${name} | ${prompt}`, messages[index])})

          const wait = require('node:timers/promises').setTimeout;
        
          await wait(4000)

   
    var generate;
  if(engine === "absolutereality_v181.safetensors [3d9d4d2b]") {
 

  const token = `Bearer ${config.RIA.API}`;
const url = "https://rialabs.xyz/api/generate"
const messagePayload = {

    "model": "absolutereality_v181.safetensors [3d9d4d2b]",
    "prompt": prompt,
    "negative_prompt": "photographic, realistic, realism, 35mm film, dslr, cropped, frame, text, deformed, glitch, noise, noisy, off-center, deformed, cross-eyed, closed eyes, bad anatomy, ugly, disfigured, sloppy, duplicate, mutated, black and white",
    "steps": "20",
    "seed": 2718576169,
    "nsfwEnabled": false

};

const headers = {
  'Authorization': token,
  'Content-Type': 'application/json'
};
  const response = await fetch(url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(messagePayload)
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const responseData = await response.json();
  console.log(responseData)
generate = responseData?.imageUrl
let nsfw;
           if(responseData.message === "Image contains NSFW content") return nsfw = true;

if(nsfw) return message.reply(`🥲 Sorry, i can't show you that... it's lewd..`)
return;
  
  }

  if(engine === "dreamshaperXL10_alpha2.safetensors [c8afe2ef]") {
 
  const token = `Bearer ${config.RIA.API}`;
const url = "https://rialabs.xyz/api/generate"
const messagePayload = {

    "model": "dreamshaper_8.safetensors [9d40847d]",
    "prompt": prompt,
    "negative_prompt": "photographic, realistic, realism, 35mm film, dslr, cropped, frame, text, deformed, glitch, noise, noisy, off-center, deformed, cross-eyed, closed eyes, bad anatomy, ugly, disfigured, sloppy, duplicate, mutated, black and white",
    "steps": "20",
    "seed": 2718576169,
    "nsfwEnabled": false

};

const headers = {
  'Authorization': token,
  'Content-Type': 'application/json'
};
  const response = await fetch(url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(messagePayload)
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const responseData = await response.json();
  console.log(responseData)
generate = responseData?.imageUrl

let nsfw;
           if(responseData.message === "Image contains NSFW content") return nsfw = true;

if(nsfw) return message.reply(`🥲 Sorry, i can't show you that... it's lewd..`)
return;
  }

  if(engine === "anythingV5_PrtRE.safetensors [893e49b9]") {
  

  const token = `Bearer ${config.RIA.API}`;
const url = "https://rialabs.xyz/api/generate"
const messagePayload = {

    "model": "anythingV5_PrtRE.safetensors [893e49b9]",
    "prompt": prompt,
    "negative_prompt": "photographic, realistic, realism, 35mm film, dslr, cropped, frame, text, deformed, glitch, noise, noisy, off-center, deformed, cross-eyed, closed eyes, bad anatomy, ugly, disfigured, sloppy, duplicate, mutated, black and white",
    "steps": "20",
    "seed": 2718576169,
    "nsfwEnabled": false

};

const headers = {
  'Authorization': token,
  'Content-Type': 'application/json'
};
  const response = await fetch(url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(messagePayload)
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const responseData = await response.json();
  console.log(responseData)
generate = responseData?.imageUrl
  }

    


let nsfw;
           if(responseData.message === "Image contains NSFW content") return nsfw = true;

if(nsfw) return message.reply(`🥲 Sorry, i can't show you that... it's lewd..`)
return;
        }
        


      
      
       counter++
        message.reply({ content: answer?.replaceAll("####", "###").replaceAll("1923323421", "").replaceAll("Lumine: ", "").replaceAll("bot: ", "").replaceAll("User: ", "").replaceAll("Assistant: ", "").replaceAll("👋", "👋").replaceAll("😁", "😄").replaceAll("right back at ya", "").replaceAll("back at ya", "").replaceAll("back at you", "").replaceAll("Bot: ", "")
        .replaceAll("<wave>", "👋").replaceAll("<blush>", "🥲").replaceAll(":RaidenAngry:", "😒").replaceAll("<happy>", "😄").replaceAll("<shocked>", "🫢").replaceAll("<ok>", "🥲").replaceAll("<sleep>", "😴").replaceAll("<angry>", "😒").replaceAll("<nerd>", "🤓>").replaceAll("<cry>", "😭").replaceAll("<eating_popcorn>", "😴").replaceAll("<confused>", "🥲")
         , allowedMentions: { parse: [] }}).catch(async e => {
          err = true;
          console.log(e);
        });
       
       
        if (counter === 15) {
          let index = Math.floor(Math.random() * messages.length);
      
            message.channel.send({ embeds: [new EmbedBuilder().setColor("LuminousVividPink").setDescription(messages[index])]});
          counter = 0;
        }
      }
    

  }

  
  },
};
