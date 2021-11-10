function wrongParameter(msg,bot){
 const wrongParameterEmbed = {
   embed:{
      author:{
        name:` | only numbers is allowed`, 
        icon_url:msg.author.avatarURL
      }, 
      color:0xff0000
    }
  }
  return bot.createMessage(msg.channel.id,wrongParameterEmbed);
}

function successPurgeMessages(msg,bot,numberMessagesDeleted){
  const successPurgeEmbed = {
    embed:{
      author:{
        name:` | ${msg.author.username}`, 
        icon_url:`${msg.author.avatarURL}`
        }, 
       description:`${numberMessagesDeleted -1} message(s) deleted`, 
       color:0x00ff00
    }
  }
  return bot.createMessage(msg.channel.id,successPurgeEmbed);
}


function purgeAction(msg,bot){
 const messagesToDelete = msg.content.split(" ")[1];
 const numbersToDelete = Number(messagesToDelete) + 1;
 if(isNaN(numbersToDelete)){
   wrongParameter(msg,bot)
   return;
 }
 else return msg.channel.purge({limit:numbersToDelete});
}

function deletePurgeBotMessage(msg,bot){
  const channelId = msg.channel.id;
  const msgId = msg.id;
  return bot.deleteMessage(channelId,msgId);
}

function deleteBotMessage(msg,bot){
  setTimeout(() => {
    deletePurgeBotMessage(msg,bot)
  },2000)
}

async function purgeMessages(msg,bot,prefix){
  try {
  if(msg.content.startsWith(`${prefix}purge`) && msg.member.permissions.has("banMembers")){
    const numberMessagesDeleted = await purgeAction(msg,bot);
    const botMessage = await successPurgeMessages(msg,bot,numberMessagesDeleted);
    return deleteBotMessage(botMessage,bot)
   }
  } 
  catch{
    error => console.log(erorr.message)
  }
}

module.exports = purgeMessages