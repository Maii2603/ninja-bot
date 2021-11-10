const fs = require("fs");

function deleteBotMessage(message,bot){
  bot.deleteMessage(message.channel.id,message.id)
   .catch(error => console.log(error.message))
}

function deleteMessage(msg,bot){
  const deleteEmbed = {
    embed:{
      description:"🥷| Text message isn't allowed here", 
      color:0xff0000
    }
  }
  bot.createMessage(msg.channel.id,deleteEmbed)
  .then(message => {
    setTimeout(() => {
      deleteBotMessage(message,bot)
    },2000)
  })
}

function userMessageDelete(msg,bot){
  bot.deleteMessage(msg.channel.id,msg.id,"Attachments Only")
  .then(() => {
    deleteMessage(msg,bot)
  })
}

function attachmentsOnly(msg,bot,prefix){
 try {
  const attachmentsChannels = fs.readFileSync("./attachments.json")
  let attachmentsOnlyChannels = JSON.parse(attachmentsChannels);
  const channel = attachmentsOnlyChannels.some(channels => channels === msg.channel.id);
  if(channel === true && msg.attachments.length === 0){
     userMessageDelete(msg,bot)
  }
  if(msg.content.startsWith(`${prefix}set-attachments-channel`) && msg.channelMentions.length > 0 && msg.member.permissions.has("banMembers")){
    const channelMentions = msg.channelMentions[0];
    const checkChannels = attachmentsOnlyChannels.some(item => item === channelMentions);
    if(checkChannels === true)return console.log("true");
    attachmentsOnlyChannels.push(channelMentions);
    const addedChannel = JSON.stringify(attachmentsOnlyChannels,null,2);
    fs.writeFile("./attachments.json",addedChannel,err => {
      if(err) return console.log(err.message);
      bot.createMessage(msg.channel.id,"added attachments only channels")
    })
  }
  
  if(msg.content.startsWith(`${prefix}unset-attachments-channel`) && msg.channelMentions.length > 0 && msg.member.permissions.has("banMembers")){
     const channelMentions = msg.channelMentions[0];
     const channelCheck = attachmentsOnlyChannels.some(item => item === channelMentions);
     if(channelCheck === false)return console.log("already unset");
     const removeChannel = attachmentsOnlyChannels.filter(channel => channel !== channelMentions);
     const channelRemoveToJson = JSON.stringify(removeChannel,null,2);
     fs.writeFile("./attachments.json",channelRemoveToJson,err => {
        if(err)return console.log(err.message);
        bot.createMessage(msg.channel.id,"successfully unset attachments channel")
     })
  }
 }
 catch(error){
   console.log(error.message)
 }
}

module.exports = attachmentsOnly