'use strict';
const Deezer = require("node-deezer-api");
const { Extra, Markup } = require('telegraf');

module.exports = function getArt(ctx,id){
	const defaultMarkup = Extra.HTML();
	const artId = id;
	function artName(ctx,artId){
		Deezer.then(dz => {
			let deezer = dz
			deezer.getArtist(id).then(artist => {
				art(deezer,ctx,artist)
			}).catch(err => console.log(err));
		}).catch(err => console.log(err));

	}
	function art(deezer,ctx,artist){
		let artName = artist.name;
		let id = artist.id;
		deezer.getArtistAlbums(id).then(resp => {
			//console.log(resp.data)
			let items = resp.data;
			let albums = [];
			for( let i in items){
				albums.push(`💿<i>${items[i].title}</i> [/alb_${items[i].id}]`);
			}
			let list = albums.join('\n');
			ctx.reply(`<b>### Artista : ${artName} ###</b> \n ${list}`, defaultMarkup);
		})

	}
	artName(ctx,artId)
}