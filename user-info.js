function memberJoined(member){
  const userJoined = new Date(member);
  const userJoinedString = String(userJoined);
  const cutDate = userJoinedString.split(" ");
  cutDate.shift();
  const userJoinString = cutDate.slice(0,3).join(" ");
  return userJoinString
}

function undefinedUser(msg,bot,userMention){
  const userEmbed = {
    embed:{
      author:{
        name:` | Can't Find User ${userMention}`, 
        icon_url:msg.author.avatarURL
      }, 
      color:0xff0000
    }
  }
  return bot.createMessage(msg.channel.id,userEmbed)
}

function infoMentionUser(msg,bot,userMention){
 try {
 const allMembers = msg.channel.guild.members.values();
 const arrayMembers = Array.from(allMembers);
 const filteredMembers = arrayMembers.filter(item => item.id === userMention);
 const memberJoinedAt = memberJoined(filteredMembers[0].joinedAt);
 const memberAccountCreated = memberJoined(filteredMembers[0].createdAt);
 let mapRoles = filteredMembers[0].roles.map(item => `<@&${item}>`);
 const rolesLength = mapRoles.length;
 mapRoles = mapRoles.join(" ");
 if(mapRoles.length === 0)mapRoles = "None"
 if(mapRoles.length > 1023) mapRoles = "Too Many Roles"
 const {username,discriminator,avatarURL,mention,id} = filteredMembers[0];
 const userObjPerms = msg.channel.guild.permissionsOf(id).json;
 const userPerms = [];
 userPerms.push(userObjPerms);
 const allUserPerms = userPerms.map(item => {
   const userKeys = Object.keys(item);
   const filteredPerms = userKeys.filter(value => item[value] === true);
   return filteredPerms
 })
 let permissions = allUserPerms[0].map(perms => perms);
 permissions = permissions.join(" | ");
 const userInfoEmbed = {
   embed:{
     thumbnail:{
       url:avatarURL
     }, 
       author:{
         name:`${username}#${discriminator}`, 
         icon_url:avatarURL
       }, 
       description:mention, 
       fields:[{
         name:"<a:spinning_shuriken:904878410847903767> Joined", 
         value:memberJoinedAt
       },{
         name:"<a:spinning_shuriken:904878410847903767> Registered", 
         value:memberAccountCreated
       },{
         name:`<a:spinning_shuriken:904878410847903767> Roles [${rolesLength}]`, 
         value:mapRoles
       },{
         name:"<a:spinning_shuriken:904878410847903767> Permissions", 
         value:permissions
       }], 
       footer:{
         text:`ID | ${id}`
       }, 
       color:0x00ffff
    }
  }
  return bot.createMessage(msg.channel.id,userInfoEmbed)
  .catch(err => {
    return console.log(err.message)
  }) 
 }
 catch(err){
    return undefinedUser(msg,bot,userMention)
 }
}

function getInfoUser(msg,bot,prefix){
  let channelMentions;
  let userID = msg.content.split(" ");
  userID.shift();
  userID = userID.join("");
  const infoId = /[0-9]{18}/i
   if(msg.content.startsWith(`${prefix}info`) && msg.mentions.length > 0){
      channelMentions = msg.mentions[0].id;
      infoMentionUser(msg,bot,channelMentions)
   } 
   if(msg.content === `${prefix}info` && msg.mentions.length === 0){
     channelMentions = msg.author.id;
     infoMentionUser(msg,bot,channelMentions)
   }
   
   if(msg.content.startsWith(`${prefix}info`) && userID.match(infoId) && msg.mentions.length === 0){
     infoMentionUser(msg,bot,userID)
   }
}

module.exports = getInfoUser