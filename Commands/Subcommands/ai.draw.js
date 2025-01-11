const {
    SlashCommandBuilder,
    PermissionFlagsBits,
    ChatInputCommandInteraction,
    EmbedBuilder,
    Client,
    AttachmentBuilder,
  } = require("discord.js");
const fetch = require("node-fetch");
const config = require('../../Structures/config.json');
  module.exports = {
      subCommand: "ai.draw",
      
/**
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} Razen
     */
async execute(interaction, Razen) {

    if(interaction.options.getSubcommand() === "draw") {
        
        const bannedContext = ['nude', 'hentai', 'naked', 'boobs', 'cock', 'dick', 'sex', 'nsfw']
        await interaction.deferReply({ ephemeral: false });

        try {
        const prompt = interaction.options.getString("prompt");
        const negative_prompt = interaction.options.getString("negative_prompt") || "35mm film, dslr, cropped, frame, text, deformed, glitch, noise, noisy, off-center, deformed, cross-eyed, closed eyes, bad anatomy, ugly, disfigured, sloppy, duplicate, mutated, black and white blurry, pixelated, duplicate, deformed, low quality, ugly, bad anatomy, bad proportions, error, watermark, worst quality, signature, low contrast, uncreative, distortion, blur, text, worst quality, low quality, jpeg artifacts, mutilated, out of frame, extra fingers, mutated hands, poorly drawn hands, poorly drawn face, mutation, deformed, dehydrated, bad anatomy, bad proportions, extra limbs, cloned face, disfigured, gross proportions, malformed limbs, missing arms, missing legs, extra arms, extra legs, fused fingers, too many fingers, long neck, username, watermark"
        const model = "absolutereality_v181.safetensors [3d9d4d2b]";

        const words = ['Generating', 'Imagining', 'Painting', 'Drawing', 'Creating']

        const randomWord = words[Math.floor(Math.random() * words.length)];

        if (bannedContext.some(context => prompt.includes(context))) {
            return interaction.editReply({ content: `😔 Sorry, i can't make that... it's lewd..` });
        }
        let messages = [
            `😄 Aww, i'll get on it`,
            `😊 Oww, interesting idea.. gimme a sec!`,
            `😅 Ahaha, okay, i'm doing my magic!`
        ]

        let index = Math.floor(Math.random() * messages.length);
        await interaction.editReply({ content: `${messages[index]}` });

        await imageGenerate(prompt, negative_prompt, model).then(async (image) => {
            if (!image) {
                return interaction.editReply({ content: `:x: Sorry but something broke..` });
            }

            if(image === 'nsfw_image_data') {
                return interaction.editReply({ content: `😔 Sorry, i can't show you that... it's lewd..` });
            }

            const imageBuffer = await fetch(image).then((res) => res.buffer());

            const attachment = new AttachmentBuilder(imageBuffer, { name: 'image.png' });

        
            let successMessages = [
                `😄 Hehe, you like it?`,
                `😊 Did i do good? ^~^`,
                `😅 I think i did it pretty well haha`
            ]
    
            let Successindex = Math.floor(Math.random() * successMessages.length);
            return interaction.editReply({ files: [attachment], content: successMessages[Successindex]});
        });
        
        } catch (e) {
            console.log(e);
            await interaction.editReply({ content: `:x: Sorry but something broke..` })
        }

        
    }

    async function imageGenerate(data, negative_prompt, model) {
      

const token = `Bearer ${config.RIA.API}`;
const url = "https://rialabs.xyz/api/generate"
const messagePayload = {

    "model":model,
    "prompt": data,
    "negative_prompt": negative_prompt || "photographic, realistic, realism, 35mm film, dslr, cropped, frame, text, deformed, glitch, noise, noisy, off-center, deformed, cross-eyed, closed eyes, bad anatomy, ugly, disfigured, sloppy, duplicate, mutated, black and white",
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
let generate = responseData?.imageUrl

return generate;

       
    

    
  }

}
  }

  

