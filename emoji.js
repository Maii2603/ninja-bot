
function staticEmojis(msg,bot,title,state){
  const getStaticEmojis = msg.channel.guild.emojis;
  const filterStaticEmojis = getStaticEmojis.filter(emojis => emojis.animated === state);
  let emojiS = filterStaticEmojis.map(emojis => {
    if(emojis.animated === true){
      //console.log(`a:${emojis.name}:${emojis.id}`)
      return `<a:rgb_ball:904898143051718676> a: ${emojis.name} :${emojis.id}\n\n`
    }
    if(emojis.animated === false){
      //console.log(`<:${emojis.name}:${emojis.id}>`)
      return `<a:rgb_ball:904898143051718676> : ${emojis.name} :${emojis.id}\n\n`
    }
  });
  emojiS = emojiS.join(" ");
  
  const embedStaticEmojis = {
    embed:{
      title:title, 
      description:emojiS, 
      color:0x00ffff
    }
  }
  bot.createMessage(msg.channel.id,embedStaticEmojis)
}


function getEmoji(msg,bot,prefix){
  if(msg.content === `${prefix}static-emojis-id`){
    staticEmojis(msg,bot,"STATIC EMOJIS",false)
  }
  if(msg.content ===`${prefix}animated-emojis-id`){
    staticEmojis(msg,bot,"ANIMATED EMOJIS",true)
  }
}

module.exports = getEmoji