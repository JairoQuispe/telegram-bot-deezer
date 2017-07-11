'use strict';
const musicStream = require('./musicStream');
const Deezer = require("node-deezer-api");

module.exports = function dAlb(ctx,id){
	Deezer.then(dz => {
		let deezer = dz;
		let songs = [];

		deezer.getAlbumTracks(id).then(tracks => {
			let items = tracks.data;
			for(let i in items){
				musicStream(ctx,items[i].id);
			}
		})
	})
}