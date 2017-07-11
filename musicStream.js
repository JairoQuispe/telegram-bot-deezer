'use strict';
const Deezer = require("node-deezer-api"),
	  fixName = require('./fixName');

module.exports = function musicStream(ctx,id){
	Deezer.then(dz => {
		let deezer = dz;
		let trackId = id;
		deezer.getTrack(trackId).then(track => {
			let metadata = {
					title: fixName(track['SNG_TITLE']),			
					performer: fixName(track["ART_NAME"]),
					duration: track["DURATION"]
			};
			deezer.decryptTrack(track).then(buffer => {
				return ctx.replyWithAudio({
					source: new Buffer(buffer)
				},metadata);
		    }).catch(err => console.log(err));
		}).catch(err => console.log(err));
	});
}