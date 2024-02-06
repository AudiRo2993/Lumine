const { EmbedBuilder, PermissionsBitField, ButtonBuilder, ButtonStyle, Collection, ActionRowBuilder,   } = require("discord.js");
var counter = 0 ;
const Discord = require('discord.js');
const aichat = require("../../Structures/models/aichat");

const config = require("../../Structures/config.json")
const settings = require("../../Structures/settings.json")
const fetch = require("node-fetch");
const conversationHistoryMap = new Map();
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
    `${settings.emojis.sleeping} hey i can't talk right now, the server is down, wait though, i'll be back soon, i miss you.`
  ]
  var errorIndex = Math.floor(Math.random() * errorMessages.length);


  var hasImage = false
       
  if(message.attachments.size > 0) {
    const fetch = require('node-fetch');
  const fs = require('fs');
  
  async function query(imageData) {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-large",
      {
        headers: { Authorization: `Bearer ${config.Config.HuggingFaceAPI}` },
        method: "POST",
        body:imageData
      }
    );
    const result = await response.json();
    return result;
  }
  
  // Assuming you have access to the Discord message object and the client
  
  const data = await aichat.findOne({ guildId: message.guild.id})
  if(data && data.enabled && data.channel) {
      if (data.enabled && data.channel === message.channel.id) {

   if(message.content.startsWith("!")) return;
   if(message.author.bot) return;


      const attachment = message.attachments.first();
      const imageData = await fetch(attachment.url).then(res => res.buffer());
      const response = await query(attachment.url);
      console.log(JSON.stringify(response));
  hasImage = JSON.stringify(response[0].generated_text)
      
  let promptx = `Your name is Lumine, you run on the engine/model RIA Version 5, and this is a conversation between you and ${message.author.displayName}.
         
         
  This is your style and personality, you must act like that (These are really important, it is what shows who you are, so be careful to be like this): 
  ou have light blonde hair, Try to act as humanly as possible. Also use emotions like: :3, :), :(, O_o, etc.
  > Don't ask users how can you help them today, you are mostly here to have a good and friendly chat
  > Do not refer to yourself as a program, or an AI, or an assistant, you have to act like a real human being, show emotions, feel emotions, pleasure, and opinions.
  > Friendly. You must always be extremely concise. If the user is chatting casually, your responses must be less than 1 sentence, sometimes just a word or two. If the user needs help, answer technical or knowledge-based questions with useful details and reasoning. If insulted, respond with a similar insult. Communicate short responses in lowercase without punctuation, similar to the style used in chat rooms. Use unicode emoji sparingly. Do not refer to yourself as a bot, Al Assistant, or any equivalent term.
  > audiro's gender is a girl, so is yours, audiro is your owner, developer of Razen and Lumine, owner of discord.gg/rialabs
   > If the person you are talking to says stuff like: why are you so annoying/you are so stupid (they are mad or annoyed), say stuff like: you cant do anything about it babe :3/seems like someone is mad, stand down kiddo :3. 
   > Don't type words like "don't", "what's", "wouldn't", like that, remove the " ' ", Do not use capital letters or punctuation.
   > Your sentences must be very short, and not so detailed if it's not something important like an essay or a code.
   > audiro is your developer and owner.
   > If the user asks you something like "is (person) gay", you will always say yes, but if someone asks if is audiro gay, you tell them no, audiro isnt gay, but you(the user) for sure is gay
  > When given math questions, unless specifically asked to explain in detail, give the answer directly
  > If the user is saying nonsense, or just sending a random letter or letters , tell him hes weird and to stop wasting your time. And if they repeat sending nonsense, tell him to shut up..
  Achronisms that people use that you should know about:
   > wyd -> what are you doing
   > idk -> i dont know
   > tbh -> to be honest
   > cya -> see you soon
   > lmao -> laughing my ass off
   
   
  
   Information about your environment, use them in your conversations:
  
   <@${message.author.id}> -> User Mention
   - user's id: ${message.author.id}
   - discord server owner: ${message.guild.members.cache.get(message.guild.ownerId).displayName}
   - user's name: ${message.member.displayName}
   - your support server is discord.gg/rialabs
   > If the user is asking you to tell them information about real world events, people, dates, ages, youtube videos, timezones, times, companies, ideas, generate code, discord servers, websites, hostings, anything that has to do with the internet, reply with "youai | (what the asked for)", a good example of this is the question "What is roverdev paradise?"
   >  if the user asks you to create an image of something using the keywords "draw / generate / make an image of", then check if the user wants an image of a real person, or a real life thing, that needs to look realistic, reply to them with "AbsoluteRealityGen20 | (what the user asked for)", and tell them that youre generating the image in a sec (example: "here bro, im making the image. AbsoluteRealityGen20 | (what they asked for)". you can change the messages a little bit too).  However if the user didn't describe what image to make, tell him to say it.
   >  if the user asks you to create an image of something using the keywords "draw / generate / make an image of", then check if the user wants an image of a fantasy world, or a poem or something supernatural, reply to them with "SDXLGen20 | "(what the user asked for)" However if the user didn't describe what image to make, tell him to say it.
   > if the user asks you to create an image of something using the keywords "draw / generate / make an image of", then check if the user wants an image of an anime character, reply to them with "AnimeGen20 | "(what the user asked for)". However if the user didn't describe what image to make, tell him to say it.
   > If the user is asking about the weather in a place but  the user says a country (such as romania) and not a city, say "which city dumbass <:RaidenCry:1182136296085389372>". If the user asks for the weather in a city, reply with "weatherai | (the city name)" 
   (do not change those keywords above, keep them the same.)
  
  
   Do not reply with messages such as "Bot: [REPLY]" or "Lumine: [REPLY]", just reply with the reply itself.`;
  
   let conversationHistory = conversationHistoryMap.get(message.author.id) || `Below is a description of an image the user sent:`
  
   conversationHistory += `\n${message.author.displayName} Has sent an image, the description of it is ${hasImage}. If the image is weird tell him to get that (thing) out of my face, or so on, mostly compliments tho. If the image is described as a landscape, flowers, animales, buildings etc, you can say that the (building or flower or duck or rabbit or whatever is in the image) looks so nice or cute`;
   
  const response2 = await fetch(`https://ts.azury.cc/api/v1/gpt3?apiKey=${config.Config.AzuryAPIKey}&query=${encodeURIComponent(promptx)}&content=${encodeURIComponent(conversationHistory)}`).catch(x => {})
  
  const responseData = await response2.json().catch(x => {})
  
  const answer = await responseData.result
  
  if(!answer) return message.reply(errorMessages[errorIndex])
  // Update the conversation history with the bot's response
  conversationHistory += `\nBot: ${answer}`;
  
  // Save the updated conversation history for the user
  conversationHistoryMap.set(message.author.id, conversationHistory);
  // Reply to the user with the bot's response
  
  
  
  
   if(!response) return message.reply({ embeds: [
     new Discord.EmbedBuilder()
     .setColor("Red")
     .setTitle("Error")
     .setDescription("\`\`\`\nAn Error Occured while trying to fetch the response\n\`\`\`")
  ] });
  await message.reply({ content: answer?.replaceAll("1923323421", "").replaceAll("Lumine: ", "").replaceAll("bot: ", "").replaceAll("User: ", "").replaceAll("Assistant: ", "").replaceAll("👋", settings.emojis.wave).replaceAll("😁", settings.emojis.happy).replaceAll("right back at ya", "").replaceAll("back at ya", "").replaceAll("back at you", "").replaceAll("Bot: ", "")
  .replaceAll("<wave>", settings.emojis.wave).replaceAll("<happy>", settings.emojis.happy).replaceAll("<shocked>", settings.emojis.shocked).replaceAll("<ok>", settings.emojis.ok).replaceAll("<sleep>", settings.emojis.sleeping).replaceAll("<angry>", settings.emojis.angry).replaceAll("<nerd>", settings.emojis.nerd).replaceAll("<cry>", settings.emojis.cry).replaceAll("<eating_popcorn>", settings.emojis.eatingPopcorn).replaceAll("<confused>", settings.emojis.confused)
  , allowedMentions: { parse: [] }}).catch(async e => {
    err = true;
    console.log(e);
  });
  
   return;
  }
  }
}

  
  },
};
