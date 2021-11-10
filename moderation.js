class Moderation{
  constructor(bot){
    this.bot = bot;
  }
  
  errorMessage(err,msg){
    const error = err.message;
    const errorEmbed = {
      embed:{
        title:`🥷 | ${error}`, 
        color:0xFF0000
      }
    }
    return this.bot.createMessage(msg.channel.id,errorEmbed)
  }
  
  async kickUser(msg,userId){
   if(userId === undefined) {
     const failedKick = {
       embed:{
         title:`Invalid Command`, 
         description:"`*kick [user] [reason]`", 
         color:0xFF0000
       }
     }
     this.bot.createMessage(msg.channel.id,failedKick)
     return;
   }
   const reason = !msg.content.split(" ").slice(2).join(" ") ? "No reason given" : msg.content.split(" ").slice(2).join(" ");
    const userKickedEmbed = {
      embed:{
        title:`User Has Been Kicked`, 
        description:`🥷Reason\n\n${reason}`, 
        color:0x00F8FF
      }
    }
    this.bot.kickGuildMember(msg.channel.guild.id,userId,reason)
    .then(() => {
       this.bot.createMessage(msg.channel.id,userKickedEmbed)
    })
   .catch(err => {
     this.errorMessage(err,msg)
   })
  }
  
  async banUser(msg,userId,daysMessageDelete){
    if(userId === undefined){
      const failedBan = {
        embed:{
          title:"Invalid Command", 
          description:"`*ban [user] [reason] [deleteMessageDays]`", 
          color:0xFF0000
        }
      }
      this.bot.createMessage(msg.channel.id,failedBan);
      return;
    }
    let reason = msg.content.split(" ").slice(2);
    reason.pop()
    reason = reason.join(" ")
    reason = reason || "No reason given";
    this.bot.banGuildMember(msg.channel.guild.id,userId,daysMessageDelete,reason)
    .then(() => {
      const successBan = {
        embed:{
          title:"User Has Been Banned", 
          description:`🥷Reason\n\n${reason}`, 
          color:0x00F8FF
        }
      }
      this.bot.createMessage(msg.channel.id,successBan)
    })
   .catch(err => {
     this.errorMessage(err,msg)
   }) 
  }
  
  kickMember(msg,prefix){
    if(msg.author.bot)return;
    if(msg.content.startsWith(`${prefix}kick`) && msg.mentions.length > 0 && msg.member.permissions.has("kickMembers")){
      const userToKick = msg.mentions[0].id;
      this.kickUser(msg,userToKick)
    }
    if(msg.content.startsWith(`${prefix}kick`) && msg.mentions.length === 0 && msg.member.permissions.has("kickMembers")){
      let userToKick = msg.content.split(" ").slice(1).shift();
      const getUser = msg.channel.guild.members;
      const user = getUser.get(userToKick)
      const userId = user === undefined ? undefined : user.id
      this.kickUser(msg,userId)
    }
  }
  
  banMember(msg,prefix){
    if(msg.author.bot)return;
    if(msg.content.startsWith(`${prefix}ban`) && msg.mentions.length > 0 && msg.member.permissions.has("banMembers")){
      const userId = msg.mentions[0].id;
      let deleteMessageDays = msg.content.split(" ").slice(3).pop();
      deleteMessageDays = deleteMessageDays || 0
      this.banUser(msg,userId,Number(deleteMessageDays))
    }
    if(msg.content.startsWith(`${prefix}ban`) && msg.mentions.length === 0 && msg.member.permissions.has("banMembers")){
      const userId = msg.content.split(" ").slice(1).shift();
      const getUser = msg.channel.guild.members;
      const getUserId = getUser.get(userId);
      const user = getUserId === undefined ? undefined : getUserId.id
      let deleteMessageDays = msg.content.split(" ").slice(3).pop();
      deleteMessageDays = deleteMessageDays || 0
      this.banUser(msg,user,Number(deleteMessageDays));
    }
  }
}

module.exports = Moderation

