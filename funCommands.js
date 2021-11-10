class Greetings {
  
  constructor(bot) {
    this.bot = bot;
  }

  reactToGreetings(msg,reaction) {
    const channelId = msg.channel.id;
    const messageId = msg.id;
    return this.bot.addMessageReaction(channelId, messageId,reaction)
           .catch(error => console.log(error.message))
  }

  greetings(msg) {
    const greetingWords = /^(hello)$|^(hi)$|^(welcome)$/ig
    if (msg.author.bot) return;
    if(msg.content.match(greetingWords)){
      this.reactToGreetings(msg,"a:pepe_wave:904878307626074153");
      this.reactToGreetings(msg,"a:paw_wave:904878471665291305");
      this.reactToGreetings(msg,"a:party_pepe:904899434624737312");
    }
 }
}


module.exports = Greetings