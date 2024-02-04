require("dotenv/config");
const { Client, Collection, Partials } = require("discord.js");
const {
  Channel,
  GuildMember,
  GuildScheduledEvent,
  Message,
  Reaction,
  ThreadMember,
  User,
} = Partials;
const Util = require("./Utils");
const { loadEvents } = require("../Handlers/Events");
const { loadCommands } = require("../Handlers/Commands");
const { loadComponents } = require("../Handlers/Components");
const { loadPREFIXCommands } = require("../Handlers/Prefix");
const chalk = require("chalk");
const config = requre("./config.json")


class BOT extends Client {
  constructor() {
    super({
      intents: 3276799,
      partials: [
        Channel,
        GuildMember,
        GuildScheduledEvent,
        Message,
        Reaction,
        ThreadMember,
        User,
      ],
    });
    this.commands = new Collection();
    this.subCommands = new Collection();
    this.events = new Collection();
    this.prefix = new Collection()
    this.aliases = new Collection()
    this.components = {
      buttons: new Collection(),
      selectMenus: new Collection(),
      modals: new Collection(),
    };

    this.utils = new Util(this);
    global.chalk = chalk;
  }

  async init() {
    await loadEvents(this);
    
    await this.login(config.Config.botToken).then(() => {
      console.log(
        chalk.bold.yellowBright(
          `[this] - ${this.user.tag} has logged into Discord. `
        )
      );
      console.log(
        chalk.bold.yellowBright(
          `┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓ `
        ),
        
      );
      console.log(
        chalk.bold.yellowBright(
          `ONLINE `
        ),
        
      );
      
    });
    await loadCommands(this);
    await loadComponents(this);
    await loadPREFIXCommands(this);
    await this.utils.logger();
  }
}



module.exports = BOT;
