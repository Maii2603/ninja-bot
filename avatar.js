function unknownUser(msg, bot) {
  const unknownEmbed = {
    embed: {
      author: {
        name: ` | ${msg.author.username} can't find the user`,
        icon_url: `${msg.author.avatarURL}`
      },
      color: 0xFF0000
    }
  }
  return bot.createMessage(msg.channel.id, unknownEmbed)
}

async function getUserAvatar(msg, bot, userId) {
  try {
    const fetchUser = await msg.channel.guild.fetchMembers({ userIDs: userId });
    const member = await fetchUser[0];
    const userDynamicAvatar = await member.user.dynamicAvatarURL("", 4096)
    const avatarUserEmbed = {
      embed: {
        author: {
          name: ` |  ${member.username}#${member.discriminator}`,
          icon_url: `${member.avatarURL}`
        },
        description: "Avatar",
        image: {
          url: `${userDynamicAvatar}`
        }
      }
    }
    return bot.createMessage(msg.channel.id, avatarUserEmbed)
      .catch(error => console.log(erorr.message))
  }
  catch (e) {
    unknownUser(msg, bot)
    return;
  }
}

function loadUserAvatar(msg, bot, prefix) {
  const args = msg.content;
  const userIdType = msg.content.split(" ")[1];
  const userIdNumber = /^([0-9]){18}$/ig
  let userId;
  if (args === `${prefix}avatar` || args === `${prefix}av`) {
    userId = msg.author.id
    getUserAvatar(msg, bot, userId)
    return;
  }

  if (args.startsWith(`${prefix}avatar`) && msg.mentions.length > 0 || args.startsWith(`${prefix}av`) && msg.mentions.length > 0) {
    userId = msg.mentions[0].id;
    getUserAvatar(msg, bot, userId)
  }

  if (args.startsWith(`${prefix}avatar`) && msg.mentions.length === 0 && userIdType.match(userIdNumber) || args.startsWith(`${prefix}av`) && msg.mentions.length === 0 && userIdType.match(userIdNumber)) {
    userId = userIdType
    getUserAvatar(msg, bot, userId)
  }
}
module.exports = loadUserAvatar