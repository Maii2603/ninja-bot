const fs = require("fs");

function sendWelcomeMessages(id,description,member,bot){
  const guildIcon = member.guild.dynamicIconURL("",4096);
  const welcomeEmbed = {
    embed:{
      title:`WELCOME TO ${member.guild.name}`,
      author:{
        name:` |  ${member.username}#${member.discriminator}`,
        icon_url:member.avatarURL
      }, 
      thumbnail:{
        url:member.avatarURL
      }, 
      description:`${description}`, 
      color:0x00ffff
    }
  }
  return bot.createMessage(id,welcomeEmbed)
          .then(message => {
            bot.addMessageReaction(message.channel.id,message.id,"a:paw_wave:904878471665291305")
          })
}

function setWelcomeChannel(bot,member) {
 try {
  const getWelcomeChannels = fs.readFileSync("./welcome.json");
  const welcomeChannels = JSON.parse(getWelcomeChannels);
  const getchannels = Array.from(member.guild.channels.values())
  const guildchannelMap = welcomeChannels.map(channel => channel.id);
  const arrayOfChannelId = getchannels.map(channel => channel.id)
  const checkWelcomeChannels = arrayOfChannelId.filter(channel => guildchannelMap.includes(channel));
  if(checkWelcomeChannels.length > 0) {
    const welcomeEmbedProperties = welcomeChannels.filter(item => item.id === checkWelcomeChannels[0]);
    const {id,description} = welcomeEmbedProperties[0];
    return sendWelcomeMessages(id,description,member,bot)
  }
 } 
 catch(error){
   console.log(error.message)
 }
}

function getWelcomeChannel(bot,member) {
  setWelcomeChannel(bot, member);
}

module.exports = getWelcomeChannel
