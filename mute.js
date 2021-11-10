function successCreateRole(msg, bot, role) {
  const embedCreatedRole = {
    embed: {
      title: "🥷 | Role Created",
      description: `<@&${role.id}>`,
      color: 0x00ff00
    }
  }
  return bot.createMessage(msg.channel.id, embedCreatedRole)
}

function setRoleInChannels(msg, bot, role) {
  const arrayOfChannels = Array.from(msg.channel.guild.channels.values());
  const channels = arrayOfChannels.forEach(channel => {
    return bot.editChannelPermission(channel.id, role, BigInt(1024), BigInt(2048), "role");
  })
}

function createMute(msg, bot) {
  bot.createRole(msg.channel.guild.id, {
      color: 14103594,
      hoist: true,
      mentionable: false,
      name: "Weeb mute",
      permissions: 1
    })
    .then(role => {
      successCreateRole(msg, bot, role)
        .then(message => {
          setRoleInChannels(msg, bot, role.id)
        })
    })
}

function noRoles(msg, bot) {
  const noRolesEmbed = {
    embed: {
      author: {
        name: ` | ${msg.author.username} There's no Weeb mute role`,
        icon_url: msg.author.avatarURL
      },
      footer: {
        text: `To create a mute role [*create-mute]`
      },
      color: 0xff0000
    }
  }
  return bot.createMessage(msg.channel.id, noRolesEmbed)
}

function convertToMs(time) {
  const interval = time.split("").pop()
  if (interval === "m") {
    time = time.split("").slice(0, time.length - 1).join("")
    const timeout = Number(time)
    return timeout * 60000
  }
  if (interval === "h") {
    time = time.split("").slice(0, time.length - 1).join("");
    const timeout = Number(time)
    return timeout * 60000 * 60
  }
  //else return 24 * 60000
}

function removeMute(msg, bot, user, role) {
  bot.removeGuildMemberRole(msg.channel.guild.id, user, role)
    .catch(e => console.log(e.message))
}


function userMuted(msg, bot, reason, time, role) {
  const userMention = msg.mentions[0].id
  const removeMuteRole = convertToMs(time);
  const roles = Array.from(msg.channel.guild.roles.values())
  const userMuteEmbed = {
    embed: {
      title: `🥷 | You were muted in ${msg.channel.guild.name} ${time}`,
      description: `Reason\n${reason}`,
      color: 0x00ffff
    }
  }
  bot.getDMChannel(userMention)
    .then((channel) => bot.createMessage(channel.id, userMuteEmbed))
    .then(() => {
      setTimeout(() => {
        removeMute(msg, bot, userMention, role)
      }, removeMuteRole)
    })
}

function addMuteRole(roles, msg, bot) {
  const userMention = msg.mentions[0].id
  const arrayOfRoles = roles.filter(role => role.name === "Weeb mute" && role.color === 14103594);
  const roleId = arrayOfRoles[arrayOfRoles.length - 1].id;
  let muteTime = msg.content.split(" ").pop();
  if (!muteTime[0].match(/[0-9]/ig)) muteTime = "69h";
  let uncutReason = msg.content.split(" ").slice(2).join(" ");
  let cutReason = msg.content.split(" ").slice(2).join(" ").split(" ");
  cutReason.pop()
  cutReason = cutReason.join(" ")
  uncutReason = uncutReason || "no reason specified";
  cutReason = cutReason || "no reason specified"
  const reason = muteTime !== undefined ? cutReason : uncutReason
  bot.addGuildMemberRole(msg.channel.guild.id, userMention, roleId, reason)
    .then(() => {
      userMuted(msg, bot, reason, muteTime, roleId)
    })
}

function mute(msg, member, bot) {
  try {
    const guildMuteName = "Weeb mute";
    const roles = Array.from(msg.channel.guild.roles.values())
    const checkRoles = roles.some(role => role.name === "Weeb mute");
    if (checkRoles === false) {
      return noRoles(msg, bot)
    }

    if (checkRoles === true) {
      return addMuteRole(roles, msg, bot)
    }
  }
  catch (error) {
    console.log(error.message)
  }
}

function successCommand(msg, bot, user, command) {
  successEmbed = {
    embed: {
      author: {
        name: ` | ${msg.author.username}#${msg.author.discriminator}`,
        icon_url: msg.author.avatarURL
      },
      description: `You ${command} <@${user}>`,
      color: 0x00ff00
    }
  }
  return bot.createMessage(msg.channel.id, successEmbed)
}

function muteInstruction(msg, bot,command) {
  const embedInstruction = {
    embed: {
      title: "Invalid Command",
      description: `*${command} [user] [reason] [duration]`,
      color: 0xff0000
    }
  }
  return bot.createMessage(msg.channel.id, embedInstruction)
}

function muteUser(msg, bot, prefix) {
  let user;
  if (msg.content.startsWith(`${prefix}mute`) && msg.mentions.length > 0 && msg.member.permissions.has("banMembers")) {
    //   user = msg.mentions[0].id;
    user = msg.mentions[0].id
    const guildMuteName = "Weeb mute";
    const roles = Array.from(msg.channel.guild.roles.values())
    const checkRoles = roles.some(role => role.name === "Weeb mute");
    if (checkRoles === false) {
      return noRoles(msg, bot)
    }
    const arrayOfRoles = roles.filter(role => role.name === "Weeb mute" && role.color === 14103594);
    const roleId = arrayOfRoles[arrayOfRoles.length - 1].id;
    mute(msg, user, bot)
    successCommand(msg, bot, user, "mute")

    /*mute(msg,user,bot)
    successCommand(msg,bot,user,"mute")*/
  }

  if (msg.content === `${prefix}create-mute` && msg.member.permissions.has("banMembers")) {
    createMute(msg, bot)
  }

  if (msg.content.startsWith(`${prefix}unmute`) && msg.mentions.length > 0 && msg.member.permissions.has("banMembers")) {
    user = msg.mentions[0].id
    const guildMuteName = "Weeb mute";
    const roles = Array.from(msg.channel.guild.roles.values())
    const checkRoles = roles.some(role => role.name === "Weeb mute");
    if (checkRoles === false) {
      return noRoles(msg, bot)
    }
    const arrayOfRoles = roles.filter(role => role.name === "Weeb mute" && role.color === 14103594);
    const roleId = arrayOfRoles[arrayOfRoles.length - 1].id;
    removeMute(msg, bot, user, roleId)
    successCommand(msg, bot, user, "unmute")
  }

  if (msg.content === `${prefix}mute` && msg.mentions.length === 0 && msg.member.permissions.has("banMembers")) {
    muteInstruction(msg, bot,"mute")
  }
    if (msg.content === `${prefix}unmute` && msg.mentions.length === 0 && msg.member.permissions.has("banMembers")) {
    muteInstruction(msg, bot,"unmute")
  }
}

module.exports = muteUser