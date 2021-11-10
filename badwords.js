function errorResponse(msg, bot, error = "error") {
  const errorEmbed = {
    embed: {
      title: "🥷  |  Something Went Wrong",
      color: 0xff0000
    }
  }
  console.log(error.message)
  return bot.createMessage(msg.channel.id, errorEmbed);
}

function botMessage(msg, bot) {
  const channelId = msg.channel.id;
  const messageId = msg.id;
  return bot.deleteMessage(channelId, messageId)
    .catch(error => errorResponse(msg, bot, error))
}

function deleteBotMessage(msg, bot) {
  return setTimeout(() => {
    botMessage(msg, bot)
  }, 2000)
}

function warnEmbeds(msg, bot, reason) {
  const warnEmbed = {
    embed: {
      author: {
        name: ` | ${msg.author.username} ${reason}`,
        icon_url: msg.author.avatarURL
      },
      color: 0xff0000
    }
  }
  return bot.createMessage(msg.channel.id, warnEmbed)
    .then(msg => deleteBotMessage(msg, bot))
    .catch(error => errorResponse(msg, bot, error))
}

function deleteForbiddenMessages(msg, bot, reason) {
  const channelId = msg.channel.id;
  const msgId = msg.id;
  return bot.deleteMessage(channelId, msgId, "Explicit Words")
    .then(() => {
      return warnEmbeds(msg, bot, reason)
    })
    .catch(error => {
      errorResponse(msg, bot, error)
    })
}

function badWordsDetected(msg, bot) {
  deleteForbiddenMessages(msg, bot, "That message isn't allowed here");
}

function longWordsDetected(msg, bot) {
  deleteForbiddenMessages(msg, bot, "Your message is too long");
}

function deleteBadWords(msg, bot, prefix) {
  try {
    const explicitWords = /(niggas?)|(niggers?)|(fuck\s?you|fuck\s?u)|(https\:\/\/discord\.gg\/([\w\d])*)|(discord\.gg\/[\w\d]*)/ig
    if (msg.content.match(explicitWords)) {
      if (msg.channel.guild.ownerID === msg.author.id) return;
      badWordsDetected(msg, bot)
      return;
    }
    if (msg.content.length > 450) {
      if (msg.channel.guild.ownerID === msg.author.id) return;
      longWordsDetected(msg, bot)
      return;
    }
  }
  catch (error) {
    errorResponse(msg, bot, error)
  }
}

module.exports = deleteBadWords