const { EmbedBuilder, PermissionsBitField, ButtonBuilder, ButtonStyle, Collection, ActionRowBuilder,   } = require("discord.js");
const aichat = require("../../Structures/models/aichat");
const Discord = require('discord.js');
const intellisense = require("../../Structures/models/intellisense");
const { default: fetch } = require("node-fetch");
const conversationHistoryMap22 = new Map();
const config = require("../../Structures/config.json")
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
  
    const aidata = await intellisense.findOne({ guildId: message.guild.id})
    const aichannelData = await aichat.findOne({ Guild: message.guild.id });
    if(aichannelData?.channel === message.channel.id) return;

const keywords = ["code", "TypeError", "Unhandled Rejection Error", "how", "stuck", "solve", "work", "help", "answer", "idea", "coding", "error", "errors", "terminal", "spam", "discord.js", "v14", "v13", "cod", "cod help", "code help", "help me", "coder", "problem", "exercise", "equation", "essay", "ex", "chapter"]


    if(aidata && aidata.enabled && keywords.some(word => message.content.toLowerCase().includes(word))) {

 let usermsg2 = `${message.cleanContent}`


      const prompt2 = `Your name is RIA Intellisense and you have the ability to reply with one of these 2 words: "True" or "False". 
      In order to reply with the correct one you must check the message below to see if the person that sent that message is asking for help with their code, application, or needs help with their homework or an assigment, or a math problem, it doesnt matter, if the person is asking how to solve an error, or an exercise, etc. But you have to make sure the user includes the thing he needs help on, inside the message, for example if he just says "help me with this", then its False.
      
      Below are some cases of when you should flag it as "True" and when you should flag it as "False":
      > If the user is talking about a code issue or problem, make sure you only flag it as "True" if the user has included their code snippet in the message. Otherwise it is false.
      > If the user is talking about a homework or assignment, make sure you only flag it as "True" if the user has included their homework or assignment in the message. Otherwise it is false.
      > If the user is talking about a math problem, make sure you only flag it as "True" if the user has included their math problem in the message. Otherwise it is false.
      > If the user is talking about a coding exercise, make sure you only flag it as "True" if the user has included their coding exercise in the message. Otherwise it is false.
      > If the user is talking about a coding project, make sure you only flag it as "True" if the user has included their coding project in the message. Otherwise it is false.
      > If the user is asking about what he needs to do in his code or exercise, make sure it is clear that the user is asking for help with their code or exercise, along with including their code or exercise snippet in their message. If that's the case, you reply with "True", if not, you reply with "False."
      > Even if the user is asking for help with their code or exercise, make sure you only flag it as "True" if the user has included their code or exercise snippet in their message. Otherwise it is false.
      , This is available only if the user's sentence includes a clear ask for help. If that's the case, you reply with "True", if not, you reply with "False."`
      const token2 = `Bearer ${config.RIA.API}`;
const url22 = "https://rialabs.xyz/api/chatgpt"
const messagePayload2 = {

    "prompt": prompt2,
    "content": usermsg2

};

const headers2 = {
  'Authorization': token2,
  'Content-Type': 'application/json'
};
  const response2 = await fetch(url22, {
    method: 'POST',
    headers: headers2,
    body: JSON.stringify(messagePayload2)
  });

  if (!response2.ok) {
    throw new Error(`HTTP error! Status: ${response2.status}`);
  }

  const responseData2 = await response2.json();
const answer22 = responseData2?.message.content
if(answer22 !== "True") {
  return;
}
const blockedUser = await intellisense.findOne({ 
  guildId: message.guild.id,
  blockedUsers: message.author.id 
});

if(blockedUser) return;
const row = new ActionRowBuilder()
.addComponents(
  new ButtonBuilder()
    .setCustomId('accept-help')
    .setLabel(`That would be great!`)
    .setStyle(ButtonStyle.Success),

    new ButtonBuilder()
    .setCustomId('deny-help')
    .setLabel(`I'll do it myself, ty.`)
    .setStyle(ButtonStyle.Secondary),
)

var msg = await message.reply({ content: `✨ heyyy i think i could help you with that, if you want ofc.`, components: [row]})

const collector = msg.createMessageComponentCollector({
  componentType: Discord.ComponentType.Button,
  time: 2 * 60 * 1000, 
})

collector.on("collect", async i => {
  if(i.user.id !== message.author.id) return i.reply({ content: "Sorry but you cannot use this button.", ephemeral: true })

    if(i.customId === "accept-help") {
      await msg.delete().catch(x => {})
     
      await message.react("✨")
      const ms = await message.reply({
        content: `✨ i'll try my best lol`
      })
      let prompt = `Your name is RIA Intellisense, an extension of the ai chatbot Lumine, and you are here to help users with their coding questions.`
      
       var usermsg = `${message.cleanContent}`
      
       const token = `Bearer ${config.RIA.API}`;
      const url2 = "https://rialabs.xyz/api/chatgpt"
      const messagePayload = {
      
          "prompt": prompt,
          "content": usermsg
      
      };
      
      const headers = {
        'Authorization': token,
        'Content-Type': 'application/json'
      };
        const response = await fetch(url2, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(messagePayload)
        });
      
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        await message.react("👋")
        const responseData = await response.json();
      const answer2 = responseData?.message.content
      
      
       
       
      if(answer2?.slice(0, 2000).replaceAll(`youai |`, "").replaceAll(`####`, "###").includes("NON-EXISTENT-CODING-PATTERN")) return;
      let embeds = [];
      
      const embed1 = new Discord.EmbedBuilder()
      .setColor("Blue")
      .setTitle(`> RIA Intellisense`)
      .setDescription(`\n${answer2.slice(0, 2000).replaceAll(`youai |`, "").replaceAll(`####`, "###")}\n`)
      .setFooter({text: `RIA Labs - Intellisense`, iconURL: "https://cdn.discordapp.com/icons/1155062805679050773/b0e744cfde5aaae494d5826d19f47c8e.webp"})
      
      embeds.push(embed1);
      
      for (let i = 2000; i < answer2.length; i += 2000) {
         const embed = new Discord.EmbedBuilder()
         .setColor("Aqua")
         .setDescription(`\n${answer2.slice(i, i + 2000).replaceAll(`youai |`, "").replaceAll(`####`, "###")}\n`)
         .setFooter({text: `RIA Labs - Intellisense`, iconURL: "https://cdn.discordapp.com/icons/1155062805679050773/b0e744cfde5aaae494d5826d19f47c8e.webp"})
      
         embeds.push(embed);
      }
      
      
      
      await message.reactions.removeAll().catch(x => {})
      
      await ms.edit({ embeds: embeds, content: `There you go! ✨` });
    }

    if(i.customId === "deny-help") {
      if(i.user.id !== message.author.id) return i.reply({ content: "Sorry but you cannot use this button.", ephemeral: true })
      await msg.edit({ components: [], content: `alright, goodluck lol`})
    }

 
})
        }
    
   
    

  

  
  },};
