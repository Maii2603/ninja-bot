function animeInfoEmbed(animeDetails,msg){
  const {title,synopsis,thumbnail,image,episodes,ratings,guidance,status,type,releaseDate,links} = animeDetails;
  const embedAnimeInfo = {
    embed:{
      title:`${title}`, 
      url:links, 
      author:{
        name:` | ${msg.author.username}#${msg.author.discriminator}`, 
        icon_url:`${msg.author.avatarURL}`
      }, 
      description:`SYNOPSIS\n\n${synopsis}`, 
      thumbnail:{
        url:thumbnail
      }, 
      image:{
        url:image
      }, 
      fields:[{
        name:"🥷   | EPISODES",
        value:episodes
      },{
        name:"🥷   | RATINGS", 
        value:ratings
      },{
        name:"🥷   | AGE-RATING", 
        value:guidance
      },{
        name:"🥷   | STATUS", 
        value:status
      },{
        name:"🥷   | TYPE", 
        value:type
      }],
      footer:{
        text:`Start Date ${releaseDate}`
      }, 
      color:0x00FFFF
    }
  }
  return embedAnimeInfo
}

function embedError(msg,bot){
  const errorMessage = {
    embed:{
      description:"🥷  | To search for anime just type `*anime [name]`", 
      footer:{
        text:"Invalid Anime Name"
      }, 
      color:0xff0000
    }
  }
  return bot.createMessage(msg.channel.id,errorMessage);
}

async function searchAnime(msg,bot,prefix,axios){
 try {
  const animeUserSearch = msg.content.split(" ").slice(1).join(" ");
  const getAnime = await axios.get(`https://kitsu.io/api/edge/anime?filter[text]=${animeUserSearch}&page[limit]=1`);
  const animeData = await getAnime.data.data;
  const animeInfo = await animeData[0].attributes;
  return animeInfoEmbed({
    title:`${animeInfo.canonicalTitle.toUpperCase()}`, 
    synopsis:`${animeInfo.synopsis}`,
    thumbnail:`${animeInfo.posterImage.original}`,
    image:`${animeInfo.posterImage.original}`,
    episodes:`${animeInfo.episodeCount}`, 
    ratings:`${animeInfo.averageRating}`, 
    guidance:`${animeInfo.ageRating}`, 
    status:`${animeInfo.status}`, 
    type:`${animeInfo.showType}`, 
    releaseDate:`${animeInfo.startDate}`, 
    links:`${animeData[0].links.self}`
  },msg)
 }
 catch(error){
    embedError(msg,bot)
    return;
 }
}

async function loadAnimeData(msg,bot,prefix,axios){
   if(msg.content.startsWith(`${prefix}anime`)){
     return bot.createMessage(msg.channel.id,await searchAnime(msg,bot,prefix,axios))
            .catch(error => {
              if(error)return;
            })
   }
}

module.exports = loadAnimeData