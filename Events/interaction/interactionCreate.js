const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { Api } = require('@top-gg/sdk');
const topgg = new Api("Token");
module.exports = {
  name: "interactionCreate",
  /**
   *
   * @param {import("discord.js").ChatInputCommandInteraction} interaction
   * @param {import("../../Structures/bot")} Razen
   */
  async execute(interaction, Razen) {

    if (interaction.isChatInputCommand()) {
        const wait = require('node:timers/promises').setTimeout;

    const command = Razen.commands.get(interaction.commandName);
    // if(command.category === 'Music') {
    //   await interaction.deferReply()
    //   await interaction.editReply("The command is closed.")
    //   return;
    // }
    try {
      if (!command) {
        return interaction.reply({
          content: "This command is outdated",
          ephemeral: true,
        });
      }

      // if(command && Razen.blacklist.get(interaction.user.id)) {
      //   interaction.reply("no")
      // }
      if (command.voteRequired) {
        const btn_link = new ActionRowBuilder().addComponents(
         new ButtonBuilder()
         .setLabel("Vote Me")
         .setEmoji("🔗")
         .setStyle(ButtonStyle.Link)
         .setURL("https://top.gg/")
        )
   
        const voted = new EmbedBuilder()
        .setTitle("Vote Required")
        .setDescription("**You must vote in [Top.gg](https://top.gg/) to unlock this command**")
        .setFooter({ text: "Razen | Vote Required" })
         const hasVoted = await topgg.hasVoted(interaction.user.id);
         if (!hasVoted) {
           interaction.reply({ embeds: [voted], components: [btn_link] });
           return;
         }
     }
      if (command.ownerOnly && Razen.utils.checkOwner(interaction.user.id)) {
        return interaction.reply({
          embeds: [
            new EmbedBuilder()
              .setDescription(
                `\\📛 **Error:** \\📛\n You cannot use that command!`
              )
              .setColor("Red"),
          ],
          ephemeral: true,
        });
      }
      
      // const musicCommands = Razen.commands.filter(
      //   (cmd) => cmd.category === "Music"
      // );
    
      // // Check if the command that was executed is in the Music category
      // const executedMusicCommand = musicCommands.find(
      //   (cmd) => cmd.name === interaction.commandName
      // );
    
      // // If it's not in the Music category, do nothing
      // if (!executedMusicCommand) return;
    
      // await interaction.reply("Sorry, the Music category is currently closed");
      const subCommand = interaction.options.getSubcommand(false);
      if (subCommand && !interaction.options.getSubcommandGroup()) {
        const subCommandFie = Razen.subCommands.get(
          `${interaction.commandName}.${subCommand}`
        );
        if (!subCommandFie) {
          return interaction.reply({
            content: "This sub command is outdated",
            ephemeral: true,
          });
        }
        if (!subCommandFie) return command.execute(interaction, Razen, wait);
      subCommandFie.execute(interaction, Razen, wait);
      } else
      command.execute(interaction, Razen, wait);
      //if(command.category !== "Music") return command.execute(interaction, Razen, wait);
    



    
    } catch (error) {
      console.log(error);
    }
    return;
    }

     if (interaction.isButton()) {
        const button = Razen.components.buttons.get(interaction.customId);

    try {
      await button?.execute(interaction, Razen);
    } catch (error) {
      console.log(error)

      
     // interaction.reply({ content: `${interaction.user}, | BUTTON ID: \`${interaction.customId}\` ❌ Something went **WRONG**! > Either this code:\n- Has no Button Code\n- Found an error.\n> Please check the console or contact our Developers -> https://site.tyrion.ml`})
    }
    return;
     }

     if (interaction.isUserContextMenuCommand()) {
        const command = Razen.commands.get(interaction.commandName);
    if (!command) return;

    try {
      command?.execute(interaction, Razen);
    } catch (error) {
      console.log(error);
    }
    return;
     }

     if (interaction.isMessageContextMenuCommand()) {
      const command = Razen.commands.get(interaction.commandName);
  if (!command) return;

  try {
    command?.execute(interaction, Razen);
  } catch (error) {
    console.log(error);
  }
  return;
   }

     if (interaction.isModalSubmit()) {
        const modal = Razen.components.modals.get(interaction.customId);
    
        try {
          await modal?.execute(interaction, Razen);
        } catch (error) {
         console.log(error)
        }
        return;
     }
    
     if (interaction.isSelectMenu()) {
         // Discord Together/Activities
     if (interaction.customId === "together") {
        const fetch = require("node-fetch");
        if (interaction.member.voice.channelId) {
          try {
            await fetch(
              `https://discord.com/api/v8/channels/${interaction.member.voice.channelId}/invites`,
              {
                method: "POST",
                body: JSON.stringify({
                  max_age: 86400,
                  max_uses: 0,
                  target_application_id: interaction.values[0],
                  target_type: 2,
                  temporary: false,
                  validate: null,
                }),
                headers: {
                  Authorization: `Bot ${Razen.token}`,
                  "Content-Type": "application/json",
                },
              }
            )
              .then((res) => res.json())
              .then((invite) => {
                if (
                  invite.error ||
                  !invite.code ||
                  Number(invite.code) === 50013
                ) {
                  return console.log(
                    `(${interaction.guild.name}) An error occurred while starting activity id ${interaction.values[0]}`
                  );
                }
                interaction.channel.send(
                  `${interaction.member} https://discord.com/invite/${invite.code}`
                );
                interaction.deferUpdate();
              });
          } catch (err) {
            console.log(
              `(${interaction.guild.name}) An error occurred while starting activity id ${interaction.values[0]}`
            );
          }
        }
      }
      const selectMenu = Razen.components.selectMenus.get(interaction.customId);
  
      try {
        await selectMenu?.execute(interaction, Razen);
      } catch (error) {
        console.log(error)
        
      }
      return;
     }

    
    
    

    
  },
};
