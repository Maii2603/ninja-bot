class Embed{
  
  
  constructor(bot){
    this.bot = bot;
  }
  
  errorEmbed(msg,errorName = "error"){
    const embededError = {
      embed:{
        author:{
          name:` | ${errorName}`, 
          icon_url:msg.author.avatarURL
        }, 
        footer:{
          text:"*embed-help for more info"
        }, 
        color:0xff0000
      }
    }
    return embededError;
  }
  
  errorMessage(msg,err){
   if(err){
    const errorMessage = err.message.split('\n')[0];
    const invalidBody = this.errorEmbed(msg,errorMessage);
    return this.bot.createMessage(msg.channel.id,invalidBody)
   } 
  }
 
 setUpEmbed(msg,channelId){
   const embedParameters = msg.content.split("+").slice(1);
   let [title,thumbnail,description,imageUrl,footer,color] = embedParameters;
   const colors = Number(`0x${color}`)
   const personalEmbed = {
     embed:{
       title:title,
       thumbnail:{
         url:thumbnail
       }, 
       author:{
         name:` | ${msg.author.username}`,
         icon_url:`${msg.author.avatarURL}`
       }, 
       description:description, 
       image:{
         url:imageUrl
       }, 
       footer:{
         text:footer
       }, 
       color:colors
     }
   }
   return this.bot.createMessage(channelId,personalEmbed)
 }
 
  userEmbed(msg,prefix){
    
    if(msg.content === `${prefix}embed-help` && msg.member.permissions.has("kickMembers")){
      const embedInstruction = {
        embed:{
          title:"Embed", 
          description:"🥷  Title\n\n🥷  Thumbnail\n\n🥷  Description\n\n🥷  Image\n\n🥷  Footer\n\n 🥷  Color\n\n 🥷  Channel",
          footer:{
            text:"*embed+[title]+[thumbnail URL]+[description]+[image URL]+[footer text]+[HEX-Color]+[Channel ID]"
          }, 
          color:0x00F8FF
        }
      }
      this.bot.createMessage(msg.channel.id,embedInstruction)
    }
    
   if(msg.content.startsWith(`${prefix}embed+`) && msg.channelMentions.length > 0 && msg.member.permissions.has("kickMembers")){
     const channelId = msg.channelMentions[0];
       this.setUpEmbed(msg,channelId)
      .catch(err => {
        this.errorMessage(msg,err)
      });
    }
    if(msg.content.startsWith(`${prefix}embed+`) && msg.channelMentions.length === 0){
      const channelId = msg.content.split("+");
      this.setUpEmbed(msg,channelId[channelId.length -1 ])
      .catch(err => {
        this.errorMessage(msg,err)
      })
    }
    
  }
  
  
}

module.exports = Embed 