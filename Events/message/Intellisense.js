const { EmbedBuilder, PermissionsBitField, ButtonBuilder, ButtonStyle, Collection, ActionRowBuilder,   } = require("discord.js");

const config = require("../../Structures/config.json")
const settings = require("../../Structures/settings.json")
const Discord = require('discord.js');
const intellisense = require("../../Structures/models/intellisense");
const { default: fetch } = require("node-fetch");
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
const keywords = ["code", "TypeError", "Unhandled Rejection Error", "help", "answer", "idea", "coding", "error", "errors", "terminal", "spam", "discord.js", "v14", "v13", "code help", "help me", "coder"]


    if(aidata && aidata.enabled && keywords.some(word => message.content.toLowerCase().includes(word))) {

        const prompt = `Your name is RIA Intellisense, an extension of the ai chatbot Lumine, and you are here to help users with their coding questions.

                 > If the user's message includes a code error, a codeblock, a coding question or anything related to coding help or explanation, reply with the answer to their question.
               
                 > However if the user's message does NOT include anything related to coding, just reply with "NON-EXISTENT-CODING-PATTERN"
                
                 (do not change those keywords above, keep them the same.)
                 Do not reply with messages such as "Bot: [REPLY]" or "Lumine: [REPLY]", just reply with the reply itself.
                 
                 Here is the user's message:
                 ${message.cleanContent}`

                 
                 const token = `Bearer ${config.Config.RIAKey}`;
                 const messagePayload = {
                 
                     "prompt": prompt,
                 
                 };
                 
                 const headers = {
                   'Authorization': token,
                   'Content-Type': 'application/json'
                 };
                   const response = await fetch(`https://api.zentrixcode.com/sync/ai/gemini`, {
                     method: 'POST',
                     headers: headers,
                     body: JSON.stringify(messagePayload)
                   });
                 
                   if (!response.ok) {
                     throw new Error(`HTTP error! Status: ${response.status}`);
                   }
                 
                   const responseData = await response.json();
                 const answer2 = responseData?.content

if(answer2.slice(0, 2000).replaceAll(`youai |`, "").replaceAll(`####`, "###").includes("NON-EXISTENT-CODING-PATTERN")) return;
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
const ms = await message.reply({ content: `https://cdn.discordapp.com/attachments/1094288044842045570/1186459209529827399/Vmake-1702944171251.gif?size=48&quality=lossless?ex=6593533e&is=6580de3e&hm=9491909f0f4d2cde404441881923387055784a42329cac264d6bb576ba981fe1&`})
const wait = require('node:timers/promises').setTimeout;
await wait(4000)

await ms.edit({ embeds: embeds, content: `There you go! ${settings.emojis.wave}` });

        }
    
   
    

  

  
  },
};
