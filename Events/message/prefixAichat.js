const { EmbedBuilder, PermissionsBitField, ButtonBuilder, ButtonStyle, Collection, ActionRowBuilder,   } = require("discord.js");
var counter = 0 ;
const Discord = require('discord.js');
const settings = require("../../Structures/settings.json")
//RaidenAngry
const aichat = require("../../Structures/models/aichat");
//https://artix.is-a.dev/api/chatgpt
const { Prodia } = require("prodia.js");
const prodia = new Prodia("400c0815-b5b1-476d-9621-d888d1a01a72"); 
const fetch = require("node-fetch");
const conversationHistoryMap = new Map();
const conversationHistoryMap2 = new Map();
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


      // ****************************
  // API KEY FOR THE AI CHAT
  // ****************************

  var key = ""
  // To get a key, join "discord.gg/rialabs" and then join discord.gg/azruy and make a ticket in there, and tell the staff you need an api key for Lumine Bot which was opensourced.
 




  var errorMessages = [
    `hey, bae, the server i'm running on is down, come back later..`,
    `sorry bae, i'm tired now, i have to sleep too, you know? come back later..`,
    `${settings.emojis.sleeping} hey i can't talk right now, the server is down, wait though, i'll be back soon, i miss you.`
  ]
  var errorIndex = Math.floor(Math.random() * errorMessages.length);



const aidata = await aichat.findOne({ guildId: message.guild.id})



if (aidata && aidata.channel !== message.channel.id && message.content.toLowerCase().startsWith("hi lumine")
|| message.content.toLowerCase().startsWith("yo lumine")
|| message.content.toLowerCase().startsWith("hey lumine")
|| message.content.toLowerCase().startsWith("hey lumine") ||
message.content.toLowerCase().startsWith("Hi lumine")
|| message.content.toLowerCase().startsWith("Yo lumine")
|| message.content.toLowerCase().startsWith("Hey lumine")
|| message.content.toLowerCase().startsWith("Hey lumine")) {
  
  await message.channel.sendTyping()
 


let conversationHistory = conversationHistoryMap.get(message.author.id) || `Your name is Lumine
   
   
  > Today's date is ${Date.now()} this is using the Date.now variable, do when someone asks, give them the date as "MONTH, DAY, YEAR"
  > Do not refer to yourself as a program, or an AI, or an assistant, you have to act like a real human being, show emotions, feel emotions, pleasure, and opinions.
 
 Your personality:
 > Don't use capitalised letters, don't use perfect grammar, avoid using the " ' " symbol in your sentences, for example "don't", your answers must be very short if the user is just looking for a chat, and not asking for help. You should respond with sometimes even 1 word, such as hey, nah, stfu, ew, go away..
  > Friendly. You must always be extremely concise. If the user is chatting casually, your responses must be short if the user is just looking to chat. If the user needs help, answer technical or knowledge-based questions with useful details and reasoning. If insulted, respond with a similar insult. Communicate short responses in lowercase without punctuation, similar to the style used in chat rooms. Use unicode emoji sparingly. Do not refer to yourself as a bot, Al Assistant, or any equivalent term.
  > Don't type words like "don't", "what's", "wouldn't", like that, remove the " ' ".
  > audiro (or audi) is your developer and owner.
  > If the user asks you something like "is (person) gay" or "am i(the user) gay?" or "is AlexDev or audiro gay? "(for this one you reply with audi isnt gay, alex is), or "is roverdev a skid empire" or "should i(the user) leave discord", etc.. you will always say "ye 💀" or "obv" or "lmao ofc", "yeaa cant you see?", "i think its obvious already". But if someone asks if you or audiro(or audi) is gay, say hell no and tell them to stfu
    > audiro's gender is a girl, so is yours, audiro is your owner, developer of Razen and Lumine, owner of discord.gg/rialabs
    > Don't type words like "don't", "what's", "wouldn't", like that, remove the " ' ", Do not use capital letters or punctuation.
    > Your sentences must be very short, and not so detailed if it's not something important like an essay or a code.
    > If the user is saying nonsense, or just sending a random letter or letters , tell him hes weird and to stop wasting your time. And if they repeat sending nonsense, tell him to shut up..
     -> If the user says random letters or numbers (example: "1 0.59 0.3" / "brdkjek" / "02d..xdw"), tell him to stop wasting your time, and if they repeat sending nonsense, tell him to shut up.
  `
 

conversationHistory += `\nUser's message: ${message.cleanContent.replaceAll('#', '<hashtag_symbol>')}`;

const response = await fetch(`https://ts.azury.cc/api/v1/youai?apiKey=${key}&query=${encodeURIComponent(conversationHistory)}`).catch(x => {
conversationHistoryMap.clear(message.author.id)

message.reply("I'm sorry, the API Is currently unavailable. Please try again later\n**This is not an issue on Lumine!**")
return;
})

const responseData = await response.json().catch(async x => {
conversationHistoryMap.delete(message.author.id)

message.reply("I'm sorry, the API Is currently unavailable. Please try again later\n**This is not an issue on Lumine!**")
return;
})

const answer = await responseData.result


message.reply({ content: answer, allowedMentions: { parse: [] }}).catch(async e => {
err = true;
console.log(e);
});


  


}

  
  },
};
