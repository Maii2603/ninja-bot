function getCommands(msg,bot,prefix){
  const allCommands = {
    embed:{
      title:"LIST OF MY COMMANDS", 
      thumbnail:{
        url:"https://raw.githubusercontent.com/Maii2603/images-for-discord-/main/20211107_105333_0000.png"
      }, 
      fields:[{
        name:"<a:spinning_shuriken:904878410847903767> Prefix", 
        value:`<a:rgb_ball:904898143051718676> ${prefix}`
      },{
        name:"<a:spinning_shuriken:904878410847903767> Anime Search", 
        value:`<a:rgb_ball:904898143051718676> anime [anime-name]`
      },{
        name:"<a:spinning_shuriken:904878410847903767> Chat Bot", 
        value:"<a:rgb_ball:904898143051718676> setChannel [channel]"
      },{
        name:"<a:spinning_shuriken:904878410847903767> Attachments Channel", 
        value:"<a:rgb_ball:904898143051718676> set-attachments-channel [channel]"
      },{
        name:"<a:spinning_shuriken:904878410847903767> Unset Chat Bot", 
        value:"<a:rgb_ball:904898143051718676> unsetChannel [channel]"
      },{
        name:"<a:spinning_shuriken:904878410847903767> Unset Attachements Channel", 
        value:"<a:rgb_ball:904898143051718676> unset-attachments-channel [channel]"
      },{
        name:"<a:spinning_shuriken:904878410847903767> Get User Info", 
        value:"<a:rgb_ball:904898143051718676> info [user]"
      },{
        name:"<a:spinning_shuriken:904878410847903767> Moderation", 
        value:"<a:rgb_ball:904898143051718676> kick [user]\n<a:rgb_ball:904898143051718676> ban [user]\n<a:rgb_ball:904898143051718676> mute [user]\n<a:rgb_ball:904898143051718676> unmute [user]"
      },{
        name:"<a:spinning_shuriken:904878410847903767> Purge Messages", 
        value:"<a:rgb_ball:904898143051718676> purge [number of messages]"
      },{
         name:"<a:spinning_shuriken:904878410847903767> Server Emoji", 
         value:"<a:rgb_ball:904898143051718676> animated-emojis-id\n<a:rgb_ball:904898143051718676> static-emojis-id",
       },{
        name:"<a:spinning_shuriken:904878410847903767> Fun Commands", 
        value:"<a:rgb_ball:904898143051718676> kiss,kill,slap,pat,hug,\n<a:rgb_ball:904898143051718676> bonk,cuddle,bully,lick"
      },{
          name:"<a:spinning_shuriken:904878410847903767> Set Welcome Channel", 
        value:"<a:rgb_ball:904898143051718676> set-welcome-channel [channel] [description]" 
      },{
          name:"<a:spinning_shuriken:904878410847903767> Unset Welcome Channel", 
        value:"<a:rgb_ball:904898143051718676> unset-welcome-channel [channel]"
      },{
          name:"<a:spinning_shuriken:904878410847903767> Custom Embed", 
        value:"<a:rgb_ball:904898143051718676> embed+"
      }], 
      footer:{
        icon_url:`${msg.channel.guild.iconURL}`,
        text:"  | Add the prefix before the command name"
      }, 
      color:0x00ffff
    }
  }
  return bot.createMessage(msg.channel.id,allCommands)
}

function commands(msg,bot,prefix){
  if(msg.content === `${prefix}help`){
     getCommands(msg,bot,prefix)
  }
}

module.exports = commands