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
    AttachmentBuilder,
  } = require("discord.js");
const fetch = require("node-fetch");
const config = require('../../Structures/config.json');
  module.exports = {
      subCommand: "ai.summarize",
      
    //   .addChannelOption((option) => option.setName("channel").setDescription("Where should i setup the A.I Channel?")),
/**
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} Razen
     */
async execute(interaction, Razen) {

    const lang = require(`../../Locales/en.json`);
    if(interaction.options.getSubcommand() === "summarize") {
        let empheral = interaction.options.getBoolean("ephemeral") || false;

       
    await interaction.deferReply({ ephemeral: empheral });

        const content = interaction.options.getString("content");
        const type = interaction.options.getString("type");

        let messages = [
            `<:happy:1186421508315287663> Aww, i'll get on it`,
            `<:blushCute:1180844071783239681> Oww, this will take some time, but i'll do it for you ^~^!`,
            `<:giggle:1204148042819698699> Ahaha, okay, i'm doing my magic!`
        ]
        let index = Math.floor(Math.random() * messages.length);
        await interaction.editReply({ content: messages[index], ephemeral: empheral });

        const prompt = `Hello, you are Lumine-AI-Summarizer, an extension of the an extension of the Discord Chatbot. Your goal is to take the prompt mentioned soon, and summarize it.
        > Summarize the prompt in ${type === 'bullet_points' ? 'bullet point form.' : type === 'paragraph' ? 'paragraph form.' : 'category form. (Meaning you will categorize the summary using ### Headers and summarized information below.)'}
        > Do not deviate from the prompt you are to summarize, only summarize it.
        > Remember this is a SummarizerAI Model that is being used to summarize text, not a text model. You are not to greet the user, or do anything else, only summarize the prompt.

        The next message sent will be the prompt you will need to summarize, only send the summarized version of the prompt, no quotations, messages, or anything else. ONLY SEND 1 SUMMARIZED PROMPT, NOT MULTIPLE.`

        // const search = await fetch(`https://ts.azury.cc/api/v1/gpt3?apiKey=NzkxODU3ODgtODgyYi00N2RiLWIzNTUtOTFhMGEyZWQ5MzM5h3YIIGDZ&query=${encodeURIComponent(prompt)}&content=${encodeURIComponent(content)}`).then(res => res.json())
        // const search = await fetch(`https://ts.azury.cc/api/v1/gpt3?apiKey=ZDUyMGM3YTgtNDIxYi00NTYzLWI5NTUtZjVhYmM1NmI5N2VjuAygYus2&query=${encodeURIComponent(prompt)}&content=${encodeURIComponent(content)}`).then(res => res.json())
   
        // if(!search || !search?.result) return interaction.editReply({ content: `:x: ${lang.bot.summarize.failed}` });

        // const result = search.result;
        const token = `Bearer ${config.RIA.API}`;
const url = "https://rialabs.xyz/api/chatgpt"
const messagePayload = {

    "prompt": prompt,
    "content": content

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
const result = responseData?.message.content

        const embeds = [];

        for (let i = 0; i < result.length; i += 2000) {
            const embed = new EmbedBuilder()
            .setColor("LuminousVividPink")
            .setDescription(result.replaceAll('####', '###').slice(i, i + 2000))

            embeds.push(embed);
        }

        await interaction.editReply({ embeds: embeds, content: ` ` });


      
    }

}
  }

  async function imageGenerate(data, negative_prompt, model) {
    const fs = require('fs');
const prompt = `
You will be given a prompt of an image description, i want you to enhance that prompt to the maximum to get theb est result possible, while also keeping it the same style. The prompt will be given below
\n\nPROMPT:\n\n

`
    const response = await fetch(`https://ts.azury.cc/api/v1/gpt3?apiKey=ZDUyMGM3YTgtNDIxYi00NTYzLWI5NTUtZjVhYmM1NmI5N2VjuAygYus2&query=${encodeURIComponent(prompt)}&content=${encodeURIComponent(data)}`).catch(x => {})
   
   
    const responseData = await response.json()
   
    const answer = await responseData?.result
    if(answer === "I could not respond to that message.") {
      return Error("No response from API")
    }

    console.log(answer)

    let job = await prodia.generateImage({
        model: model,
        prompt: answer,
        negativePrompt: negative_prompt,
        seed: Math.floor(Math.random() * 1000000000),
        upscale: true,
        cfgScale: 9,
        aspectRatio: "square",
        sampler: "DDIM"
    });

    while (job.status !== "succeeded") {
        await new Promise((resolve) => setTimeout(resolve, 250));
        job = await prodia.getJob(job.job);
    }

    return job.imageUrl;
}

async function enhanceGenerate(data, negative_prompt, model) {
    const prompt = `
Hello, you are Khaos-AI-Enhancer, an extension of the an extension of the Discord Chatbot. Your goal is to take the prompt mentioned soon, and enhance it to make it better.
> Do not reply with "Sure! Let me help with that..." or anything like that, just send the enhanced version of the prompt, no quotations, messages, or anything else.
> The ImageAI model that you will be using is "${model}" using ProdiaAI from prodia.js.org
> You are to take the prompt below, and make it better. You can use the prompt as a base, but you must make it better.
> Don't ever sway from the original prompt, you can enhance it but not remove it.
> Remember this is an ImageAI Model that is being used to generate images, not a text model. You are to use proper parameters to enhance the prompt.

Examples of enhanced prompts (Use this to guide you on how you should use parameters to enhance the prompt):
"ar, realistic, 4k of Electricity, Crystal Gardens, Steampunk in Toulouse-Lautrec style, Geometric, Misty, trending on deviantart, Night Colors"
"Biological Kratos with Laptop of Steam, Interdimensional Nexus, Graphite in Hokusai Katsushika style, Glimmering, Galactic, masterpiece, Adobe RGB"
"realistic, 4k duck flying in air of Poison, Haunted Graveyard, Anime in Pixar Animation Studios style, Luminous, Misty, ethereal beauty, Electric Colors"
"realistic, 4k duck flying in air of Nanobots, Digital Utopia, Wall Decal in Makoto Shinkai style, Hypnotic, Radiant, masterpiece, Monochrome"
"Medium Shot of Reclusive Gnoll of Light, Steam Punk Metropolis, Concept Art in Hiromu Arakawa style, Retro-Futuristic, Golden Hour, award-winning, Atari Graphics"
"(masterpiece)), ((best quality)), ((detailed)), Meticulous, Striking, Striking, Beastmaster, Bond, Animals, Street art approach, Spray art, Lunar illumination, Moonbeam, Moonlit atmosphere, Wide aperture, Shallow depth of field"
"((detailed)), ((masterpiece)), ((best quality)), Spectacular, ((Captivating)), (8K), Blimp, Dirigible, Zeppelin, Chalk art, Chalk mural, Main illumination, Focused lighting, Straight light, Sharpness throughout, Balanced depth of field"
"The manor's grave inside a cave, dark colors, ominous fog, unreal engine, octane render, dramatic lighting, pond, digital art, by stanley artgerm lau, greg rutkowski, thomas kindkade, alphonse mucha, loish, norman rockwell,"
"hyperrealistic landscape of a forest on fire, realistic flames, big depth of field, deep red colors, by timur vasilyev"
"Cat, realistic, 4k, high details, studio lightning, bright colors, intricate, masterpiece, trending on artstation, very very detailed, masterpiece, stunning"

The next message sent will be the prompt you will need to enhance, only send the enhanced version of the prompt, no quotations, messages, or anything else. ONLY SEND 1 ENHANCED PROMPT, NOT MULTIPLE.
    `

    const response = await fetch(`https://ts.azury.cc/api/v1/gpt3?apiKey=NzkxODU3ODgtODgyYi00N2RiLWIzNTUtOTFhMGEyZWQ5MzM5h3YIIGDZ&query=${encodeURIComponent(prompt)}&content=${encodeURIComponent(data)}`).then(res => res.json())
    console.log(response)
    const enhancedData = response.result

    if(!enhancedData || enhancedData?.error) return;

    let job = await prodia.generateImage({
        model: model,
        prompt: enhancedData,
        negativePrompt: negative_prompt,
        seed: Math.floor(Math.random() * 1000000000),
        upscale: true,
        cfgScale: 9,
        aspectRatio: "square",
        sampler: "DDIM"
    });

    while (job.status !== "succeeded") {
        await new Promise((resolve) => setTimeout(resolve, 250));
        job = await prodia.getJob(job.job);
    }

    return job.imageUrl;
    
}