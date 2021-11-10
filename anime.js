class AnimeFunCommands{
  constructor(bot){
    this.bot = bot;
  }
  
  async animeStaticImage(axios,msg){
   const staticKeyWords = /^(\*waifu)$|^(\*neko)$|^(\*megumin)$|^(\*shinobu)$/ig
   const args = msg.content.split(" ")[0].toLowerCase();
   if(args.match(staticKeyWords)){
     const staticAnimeUrl = args.match(staticKeyWords)[0].slice(1);
     const getStaticAnime = await axios.get(`https://api.waifu.pics/sfw/${staticAnimeUrl}`);
     const staticAnimeImage = await getStaticAnime.data.url;
     const staticEmbed = {
       embed:{
         title:`${staticAnimeUrl}`, 
         image:{
           url:String(staticAnimeImage)
         }
       }
     }
     this.bot.createMessage(msg.channel.id,staticEmbed);
   }
 }

 
async dynamicAnimeImages(axios,msg){
  const dynamicKeyWords = /^(\*kiss)$|^(\*kill)$|^(\*slap)$|^(\*bonk)$|^(\*bite)$|^(\*lick)$|^(\*hug)$|^(\*cuddle)$|^(\*bully)$|^(\*pat)$/ig
  const args = msg.content.split(" ")[0].toLowerCase();
  if(args.match(dynamicKeyWords) && msg.mentions.length > 0){
     const urlAnimeParameter = args.match(dynamicKeyWords)[0].slice(1);
     const getDynamicAnime = await axios.get(`https://api.waifu.pics/sfw/${urlAnimeParameter}`);
     const getAnimeImage = await getDynamicAnime.data.url;
     const dynamicEmbed = {
       embed:{
         title:`${msg.author.username} ${urlAnimeParameter} ${msg.mentions[0].username}`, 
         image:{
           url:await String(getAnimeImage)
         }, 
         footer:{
           text:` | ${msg.author.username}#${msg.author.discriminator}`, 
           icon_url:msg.author.avatarURL
         }, 
         color:0x00F8FF
       }
     }
    return this.bot.createMessage(msg.channel.id,dynamicEmbed)
  }
 }
}

module.exports = AnimeFunCommands


