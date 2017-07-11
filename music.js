Deezer.then(dz => {
		let deezer = dz;
		let trackId = ctx.match[0];
		

		deezer.getTrack(trackId).then(track => {

			let metadata = {
					title: fixName(track['SNG_TITLE']),			
					artist: fixName(track["ART_NAME"]),
        			album: track["ALB_TITLE"]
			};
			let duration = track["DURATION"];
			ctx.reply(`🎵 ${metadata.title} 👍`).then(next);

			if(track["ALB_PICTURE"]) {
		    	metadata.image = deezer.albumPicturesHost + track["ALB_PICTURE"] + deezer.albumPictures.big;
		    }
		    if(metadata.image) {
		    	let imagefile = fs.createWriteStream(__dirname + "/img/" + fixName(metadata.title, true) + ".jpg");
		        http.get(metadata.image, function(response) {
		          if(!response) {
		            metadata.image = undefined;
		            return;
		          }
		          response.pipe(imagefile);
		          metadata.image = (__dirname + '/img/' + fixName(metadata.title, true) + ".jpg").replace(/\\/g, "/");
		        });
		    }
			deezer.decryptTrack(track).then(buffer => {
				
				let fileName = `${metadata.artist} - ${metadata.title}`;
				let filePath = __dirname+`/${fileName}`;
		        //console.log(filePath);
		        fs.writeFile(`${fileName}.mp3`,buffer, function(err){
		        	console.log(metadata);
		        	nodeID3.write(metadata, `${filePath}.mp3`);
		        	console.log(`Descargando ${fileName}`);
		        	console.log(`${filePath}.mp3`);
		        	return ctx.replyWithAudio({
		        		source: `${filePath}.mp3`
		        	},{
		        		duration: duration,
		        		title: metadata.title,
		        		performer: metadata.artist
		        	});
		        });
		    }).catch(err => console.log(err));

		}).catch(err => console.log(err));
	});

