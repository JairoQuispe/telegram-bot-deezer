'use strict';
const Deezer = require("node-deezer-api");
const { Extra, Markup } = require('telegraf');

module.exports = function getAlbum(ctx,id){
	const defaultMarkup = Extra
							.HTML()
							.markup((m) => m.inlineKeyboard([
								m.callbackButton('😎 Descargar Todo 😎', `dAlb_${id}`)
								])
							);
	Deezer.then(dz => {
		let deezer = dz;
		let songs = [];

		deezer.getAlbum(id).then(resp => {
			
			let art = resp.contributors[0].name
			let albumTitle = resp.title;
			let tracks = resp.tracks

			let items = tracks.data;

		    let list,n;
		    
		    	for (let i in items){
		            n = Number(i);
		            n = n + 1; 
		            let titulo = items[i].title;
		            let d = items[i].id;
		            songs.push(`<i>${n}.- ${titulo}</i> \n\t\t Descargar: /m_${d}`);
		          //console.log(`Titulo: ${items[i].title}`);
		        }
		    list = songs.join('\n');
		    //console.log(resp);
		    
		    ctx.reply(`<b>### ${art} - ${albumTitle} ###</b> \n\n ${list}`,defaultMarkup);
		}); 
	});
}