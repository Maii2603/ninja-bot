const fs = require("fs");

function alreadySetChannel(msg,bot){
  const reminderEmbed = {
    embed:{
      title:"🥷 |  Welcome Channel is already set-up", 
      description:"To unset the welcome channel just type\n\n`*unset-welcome-channel [channel]`", 
      color:0xff0000
    }
  }
  bot.createMessage(msg.channel.id,reminderEmbed)
}

function noDescription(msg,bot){
  const noDescriptionEmbed = {
    embed:{
      title:"No Description", 
      description:"Missing Arguments Description is required\n\n`*set-welcome-channel [channel] [description]`", 
      color:0xff0000
    }
  }
  bot.createMessage(msg.channel.id,noDescriptionEmbed)
}

function successRemove(msg,bot){
  const successRemoveEmbed = {
    embed:{
      author:{
        name:`${msg.author.username}#${msg.author.discriminator}`, 
        icon_url:msg.author.avatarURL
      }, 
      title:"Successfully Unset Welcome Channel", 
      color:0x00ff00
    }
  }
  bot.createMessage(msg.channel.id,successRemoveEmbed);
}

function alreadyRemoveChannel(msg,bot){
   const alreadyRemoveEmbed = {
     embed:{
       title:"🥷 | There is no Welcome Channel set up", 
       description:"Set a welcome chanmel\n\n`*set-welcome-channel [channel] [description]`", 
       color:0xff0000
     }
   }
   return bot.createMessage(msg.channel.id,alreadyRemoveEmbed)
}

function addWelcomeChannel(msg,bot){
    const channelId = msg.channelMentions[0];
    const getWelcomeChannels = fs.readFileSync("./welcome.json");
     const welcomeChannels = JSON.parse(getWelcomeChannels);
     const description = msg.content.split(" ").slice(2).join(" ");
     const channelChecker = welcomeChannels.some(channel => msg.channelMentions.includes(channel.id));
     if(channelChecker === true) return alreadySetChannel(msg,bot);
     if(!description)return noDescription(msg,bot);
     const newWelcomeChannel = {
       id:`${channelId}`, 
       description:`${description}`
     }
     welcomeChannels.push(newWelcomeChannel);
     const addedWelcomeChannels = JSON.stringify(welcomeChannels,null,2);
       const addedWelcomeEmbed = {
       embed:{
         title:"Added Welcome Channel", 
         author:{
            name:`${msg.author.username}#${msg.author.discriminator}`, 
            icon_url:`${msg.author.avatarURL}`
         }, 
         description:`<#${channelId}> Is now Added as Welcome Channel`, 
         color:0x00ff00
       }
     } 
     fs.writeFile("./welcome.json",addedWelcomeChannels,err => {
       if(err)return console.log(err.message);
       bot.createMessage(msg.channel.id,addedWelcomeEmbed)
     }) 
}

function removeWelcome(msg,bot){
  const getWelcomeChannels = fs.readFileSync("./welcome.json");
  const welcomeChannels = JSON.parse(getWelcomeChannels);
  const channelMention = msg.channelMentions[0];
  const removeWelcomeChannel = welcomeChannels.filter(channel => channel.id !== channelMention);
  const channelCheck = welcomeChannels.some(item => item.id === channelMention);
 if(channelCheck === true){
    const channelRemove = JSON.stringify(removeWelcomeChannel,null,2);
    fs.writeFile("./welcome.json",channelRemove,err => {
       if(err) return console.log(err.message);
       successRemove(msg,bot)
    })
  }
  if(channelCheck === false){
    alreadyRemoveChannel(msg,bot)
  }
}

function setWelcomeChannel(msg,bot,prefix){
  if(msg.content.startsWith(`${prefix}set-welcome-channel`) && msg.channelMentions.length > 0){
     addWelcomeChannel(msg,bot)
  }
  
  if(msg.content.startsWith(`${prefix}unset-welcome-channel`) && msg.channelMentions.length > 0){
      removeWelcome(msg,bot)
  }
}

module.exports = setWelcomeChannel

