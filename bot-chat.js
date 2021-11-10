const fs = require("fs");
const chatChannelData = fs.readFileSync("./setup.json");
const chatChannel = JSON.parse(chatChannelData);

function notSetUp(msg,bot){
  const channelID = msg.channelMentions[0];
  const newchatChannelData = fs.readFileSync("./setup.json");
  const newchatChannel = JSON.parse(newchatChannelData);
  newchatChannel.push(channelID);
  const addedNewChannel = JSON.stringify(newchatChannel,null,2);
  const addedChannelEmbed = {
    embed:{
      title:"🥷| succefully set up", 
      color:0x00ff00
    }
  }
  fs.writeFile("./setup.json",addedNewChannel,err => {
    if(err) return console.log(err.message);
    console.log("Update channels")
  })
  return bot.createMessage(msg.channel.id,addedChannelEmbed)
}

function unsetChannel(msg,bot){
const newchatChannelData = fs.readFileSync("./setup.json");
const newchatChannel = JSON.parse(newchatChannelData);
  const channelID = msg.channelMentions[0];
  const removeChannel = newchatChannel.filter(item => {
     return item !== channelID
  })
  if(removeChannel.length === newchatChannel.length){
    const alreadyUnsetEmbed = {
      embed:{
        title:"🥷| Channel is already unset", 
        footer:{
          text:"Set a channel chat bot *setChannel [channel]"
        }, 
        color:0xff0000
      }
    }
    return bot.createMessage(msg.channel.id,alreadyUnsetEmbed)
  }
  const removedChannel = JSON.stringify(removeChannel,null,2);
  const removeEmbed = {
    embed:{
       title:"🥷| Succefully unset", 
       color:0x00ff00
    }
  }
  fs.writeFile("./setup.json",removedChannel,err => {
    if(err) return console.log(err.message)
    console.log("succes removeChannel")
  })
  return bot.createMessage(msg.channel.id,removeEmbed)
}

async function setUpChatBot(msg,bot,prefix){
  const getChannelKeys = Array.from(msg.channel.guild.channels.values());
  const channelKeys = getChannelKeys.map(item => item.id);
  const newchatChannelData = fs.readFileSync("./setup.json");
  const newchatChannel = JSON.parse(newchatChannelData);
  const channelChatCheck = channelKeys.some(item => newchatChannel.includes(item))
  if(msg.content.startsWith(`${prefix}setChannel`) && msg.member.permissions.has("banMembers") && channelChatCheck == true && msg.channelMentions > 0){
     const defineChannelEmbed = {
       embed:{
          title:"🥷 | Chat bot is already set up", 
          color:0xff0000
       }
     }
    return bot.createMessage(msg.channel.id,defineChannelEmbed)
  }
  if(msg.content.startsWith(`${prefix}setChannel`) && msg.member.permissions.has("banMembers") && channelChatCheck == false && msg.channelMentions > 0){
    notSetUp(msg,bot)
  }
  if(msg.content.startsWith(`${prefix}unsetChannel`) && msg.member.permissions.has("banMembers") && msg.channelMentions > 0){
     unsetChannel(msg,bot)
  }
}

module.exports = setUpChatBot