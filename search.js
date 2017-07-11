'use strict';
const Deezer = require("node-deezer-api");
const { Extra, Markup } = require('telegraf');

module.exports = function search(ctx, texto){
  console.log(`se busca ${texto}`);
  Deezer.then(dz => {
    const defaultMarkup = Extra.HTML();
    let deezer = dz;
    let search = texto;
    let songs = [];
    deezer.search(search,'track').then(resp => {

      let items = resp.data;
      let list,n;
        for (let i in items){
            n = Number(i);
            n = n + 1; 
            songs.push(`N°: ${n}\n\t\t\🎵: <b>${items[i].title}</b> [/m_${items[i].id}]\n\t\t\t🗣: ${items[i].artist.name} [/art_${items[i].artist.id}]\n\t\t\💿: ${items[i].album.title} [/alb_${items[i].album.id}]`);
          //console.log(`Titulo: ${items[i].title}`);
        }
        list = songs.join('\n');
        ctx.reply(list,defaultMarkup);
        //ctx.reply(songs[0]);
    });
    
  }).catch(err => console.log(err));
}