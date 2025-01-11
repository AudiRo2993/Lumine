
const config = require('../../Structures/config.json');
module.exports = {
	name: 'invite',
	description: "View my speed / latency",
  aliases: [],
  usage: "[prefix]invite",
  nsfwOnly: false,
  guildOnly: false,
  ownerOnly: false,
	cooldown: 3000,
	userPerms: [''],
	botPerms: [''],
    category: "Information",
	run: async (client, message, args, prefix) => {
		message.reply({ content: `[Click here](https://discord.com/api/oauth2/authorize?client_id=${config.Config.botID}&permissions=8&scope=bot+applications.commands) to add me to ur server <:happy:1186421508315287663>`})
		
	}
};





