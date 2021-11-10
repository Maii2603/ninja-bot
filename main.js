const axios = require("axios");
const Eris = require("eris");
const bot = new Eris(`Bot ${process.env.BOT_TOKEN}`, {
  intents: [
  "guilds",
  "guildMessages",
  "guildMessageReactions",
  "guildPresences",
  "guildMembers",
  "directMessages",
  "guildMembers",
  "guildBans"
  ],
  restMode: true
});
const ReactToGreetings = require("./funCommands");
const AnimeFunCommands = require("./anime");
const Moderation = require("./moderation");
const Embed = require("./embed");
const embed = new Embed(bot);
const greeting = new ReactToGreetings(bot);
const animeCommands = new AnimeFunCommands(bot);
const moderation = new Moderation(bot);
const deleteBadWords = require("./badwords");
const purgeMessages = require("./purge");
const loadUserAvatar = require("./avatar");
const loadAnimeData = require("./anime-search");
const chatMessages = require("./chat");
const setUpChatBot = require("./bot-chat");
const getEmoji = require("./emoji");
const attachmentsOnly = require("./attachments");
const getInfoUser = require("./user-info");
const erisAntiSpam = require("eris-antispam");
const commands = require("./help");
const getWelcomeChannel = require("./welcome");
const setWelcomeChannel = require("./set-welcome");
const muteUser = require("./mute");
const prefix = "*";
bot.on("ready", () => {
  console.log("bot is now ready")
  bot.editStatus("online",{
  name:"*help", 
  type:0
})
})

bot.on("error", err => {
  console.log(err)
})

bot.on("messageCreate", async msg => {
  if (msg.author.bot) return;
  greeting.greetings(msg);
  animeCommands.animeStaticImage(axios, msg);
  animeCommands.dynamicAnimeImages(axios, msg);
  moderation.kickMember(msg, prefix);
  moderation.banMember(msg, prefix);
  embed.userEmbed(msg, prefix);
  deleteBadWords(msg, bot, prefix);
  purgeMessages(msg, bot, prefix);
  loadUserAvatar(msg, bot, prefix);
  loadAnimeData(msg, bot, prefix, axios);
  chatMessages(msg, bot, prefix, axios);
  setUpChatBot(msg, bot, prefix);
  getEmoji(msg, bot, prefix);
  attachmentsOnly(msg, bot, prefix);
  getInfoUser(msg, bot, prefix);
  muteUser(msg, bot, prefix);
  commands(msg, bot, prefix);
  setWelcomeChannel(msg,bot,prefix)
})

bot.on("guildMemberAdd", (guild, member) => {
  getWelcomeChannel(bot,member);
})

bot.connect();
