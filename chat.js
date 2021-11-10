const fs = require("fs");
function embedError(msg,bot){
  const errorEmbed = {
    embed:{
       description:"🥷 |  Type only letters characters",
       footer:{
         text:"Invalid message"
       }, 
       color:0xff0000
    }
  }
  return bot.createMessage(msg.channel.id,errorEmbed)
}

async function chatMessage(msg,bot,prefix,axios){
 try {
 const getChannels = fs.readFileSync("./setup.json");
 const channels = JSON.parse(getChannels); 
 const setUpChannel = channels.some(item => item.includes(msg.channel.id))
 if(msg.content.startsWith(`${prefix}unsetChannel`) || msg.content.startsWith(`${prefix}setChannel`))return;
 if(setUpChannel === true){
  const userMessages = msg.content;
  const getReply = await axios.get(`https://api.monkedev.com/fun/chat?msg=${msg.content}`);
  const reply = await getReply.data.response;
  const embedReply = {
      description:`🥷 | ${reply}`
  }
  bot.sendChannelTyping(msg.channel.id)
  .then(() => {
    setTimeout(() => {
        return msg.channel.createMessage({
        embed:embedReply, 
        messageReferenceID:msg.id
      })  
    },500)
  })
   .catch(error => {
     return;
   })
 }
 }
 catch(error){
   embedError(msg,bot)
   return;
 }
}

module.exports = chatMessage
