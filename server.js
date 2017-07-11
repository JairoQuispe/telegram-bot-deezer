'use strict';

let token = process.argv[2];
const Telegraf = require('telegraf'),
	  bot = new Telegraf(`${token}`);
const { Extra, Markup } = require('telegraf');

const search = require('./search');
const musicStream = require('./musicStream');
const getAlbum = require('./album');
const dAlb = require('./dAlb');
const getArt = require('./getArt');
bot.command('start', (ctx) => {
  ctx.reply('Bienvenido');
})

bot.command('search', (ctx) => {
	let texto = ctx.update.message["text"];
	texto = texto.replace(/\/search /, "");
	search(ctx,texto);
});

bot.hears(/\/m_(\d+)*/, (ctx) => {
	ctx.reply('Descargando Música');
	musicStream(ctx,ctx.match[1])
});

bot.hears(/\/alb_(\d+)*/, (ctx) => {
  getAlbum(ctx,ctx.match[1]);
})

bot.hears(/\/art_(\d+)*/, (ctx) => {
  getArt(ctx,ctx.match[1]);
})

bot.action(/.+/, (ctx) => {
	let	id = ctx.match[0];
	let val = function(id){
		var p = /^(dAlb\w)(\d*)*/;
	    return (id.match(p)) ? RegExp.$1 : false;
	}
	if (val !== false) {
		id = id.replace('dAlb_','')
		dAlb(ctx,id);
		console.log("Listo para descargar canciones de un album "+id);
	}
	
});
bot.startPolling();
