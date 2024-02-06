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
const ms = require("ms");

const fetch = require("node-fetch");
const config = require("../../Structures/config.json")
const emojis = require("../../Structures/settings.json")
const { Prodia } = require("prodia.js");
const prodia = new Prodia(config.Config.ProdiaAPIKey); 
module.exports = {
    data: new SlashCommandBuilder()
        .setName("draw")
        .setDescription("Draw something")
        .addStringOption(option =>
            option
                .setName("prompt")
                .setDescription("Describe the image you want")
                .setRequired(true)
            )
        .addStringOption(option =>
            option
                .setName("negative_prompt")
                .setDescription("Describe things you don't want in your image (example: blur)")
                .setRequired(false)
            )
        .addStringOption(option =>
            option
                .setName("model")
                .setDescription("The model to use")
                .setRequired(false)
                .addChoices(
                    {
                        name: "DreamShaper", value: "dreamshaper_6BakedVae.safetensors [114c8abb]"
                    },
                    {
                        name: "Anything Journey", value: "anythingv3_0-pruned.ckpt [2700c435]"
                    },
                    {
                        name: "Open Journey", value: "openjourney_V4.ckpt [ca2f377f]"
                    },
                    {
                        name: "Absolute Reality", value: "absolutereality_v181.safetensors [3d9d4d2b]"
                    },
                    {
                        name: "Realistic Vision", value: "Realistic_Vision_V2.0.safetensors [79587710]"
                    },
                    {
                        name: "Vivid", value: "elldreths-vivid-mix.safetensors [342d9d26]"
                    },
                    {
                        name: "Anime V5", value: "anythingV5_PrtRE.safetensors [893e49b9]"
                    }
                )
            ),
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
   async execute(interaction, client) {
    const bannedContext =  ["cum", "bikini", "lingerie", "panties", "bra", "sexy", "hot", "dick", "pussy", "hentai", "thighs", "feet", "breast", "boobs", "hanime", "penis", "sex", "rim", "cleavage", "clitoris", "furry", "condom", "peg", "bottom", "lick", "suck", "fuck", "doggystyle", "anal", "horny", "moan", "tit", "wank", "slut",  "orgasm", "titties", "kiss", "kissing", "licking", "squishing", "muffying", "tickling", "ticlkle", "kid", "hentai", "sexo", "fuck", "lips touch", "kis", "touch lips", "all the way down"]
    await interaction.deferReply({ ephemeral: false });

    
    try {
    const prompt = interaction.options.getString("prompt");
    const negative_prompt = interaction.options.getString("negative_prompt") || "35mm film, dslr, cropped, frame, text, deformed, glitch, noise, noisy, off-center, deformed, cross-eyed, closed eyes, bad anatomy, ugly, disfigured, sloppy, duplicate, mutated, black and white blurry, pixelated, duplicate, deformed, low quality, ugly, bad anatomy, bad proportions, error, watermark, worst quality, signature, low contrast, uncreative, distortion, blur, text, worst quality, low quality, jpeg artifacts, mutilated, out of frame, extra fingers, mutated hands, poorly drawn hands, poorly drawn face, mutation, deformed, dehydrated, bad anatomy, bad proportions, extra limbs, cloned face, disfigured, gross proportions, malformed limbs, missing arms, missing legs, extra arms, extra legs, fused fingers, too many fingers, long neck, username, watermark"
    const model = interaction.options.getString("model") || "dreamshaper_6BakedVae.safetensors [114c8abb]";


    if (bannedContext.some(context => prompt.includes(context))) {
        return interaction.editReply({ content: `${emojis.emojis.blush} Sorry, i can't make that... it's lewd..` });
    }
    let messages = [
        `${emojis.emojis.happy} Aww, i'll get on it`,
        `${emojis.emojis.blush} Oww, interesting idea.. gimme a sec!`,
        `${emojis.emojis.wave} Ahaha, okay, i'm doing my magic!`
    ]

    let index = Math.floor(Math.random() * messages.length);
    await interaction.editReply({ content: `${messages[index]}` });

    await imageGenerate(prompt, negative_prompt, model).then(async (image) => {
        if (!image) {
            return interaction.editReply({ content: `:x: Sorry but something broke..` });
        }

        const checkNSFW = await fetch('https://the-net.loves-genshin.lol/nsfw-detector?url='+image).then(res => res.json()).catch(() => {})

        if(checkNSFW?.is_nsfw) {
            return interaction.editReply({ content: `${emojis.emojis.blush} Sorry, i can't make that... it's lewd..` });
        }

        const imageBuffer = await fetch(image).then((res) => res.buffer());

        const attachment = new AttachmentBuilder(imageBuffer, { name: 'image.png' });

    
        let successMessages = [
            `${emojis.emojis.happy} Hehe, you like it?`,
            `${emojis.emojis.blush} Did i do good? ^~^`,
            `${emojis.emojis.wave} I think i did it pretty well haha`
        ]

        let Successindex = Math.floor(Math.random() * successMessages.length);
        return interaction.editReply({ files: [attachment], content: successMessages[Successindex]});
    });
    
    } catch (e) {
        console.log(e);
        await interaction.editReply({ content: `:x: Sorry but something broke..` })
    }

    
}


}


async function imageGenerate(data, negative_prompt, model) {
   
const fs = require('fs');
const prompt = `
You will be given a prompt of an image description, i want you to enhance that prompt to the maximum to get theb est result possible, while also keeping it the same style. The prompt will be given below
\n\nPROMPT:\n\n

`
const response = await fetch(`https://ts.azury.cc/api/v1/gpt3?apiKey=${config.Config.AzuryAPIKey}&query=${encodeURIComponent(prompt)}&content=${encodeURIComponent(data)}`).catch(x => {})


const responseData = await response.json()

const answer = await responseData?.result
if(answer === "I could not respond to that message.") {
  return Error("No response from API")
}


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

    