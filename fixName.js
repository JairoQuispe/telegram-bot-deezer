'use strict';

/* ESTE MODULO ES PARA REEMPLAZAR LOS CARACTERES */
module.exports = function fixName(input,file){
	let specialCharTable = ["ç", "Ç", "ğ", "Ğ", "ı", "I", "i", "İ", "ş", "Ş"];
	let specialCharTo = ["c", "C", "g", "G", "i", "I", "i", "I", "s", "S"];
	let regEx = new RegExp('[,/\\\\:*?""<>|]', 'g');
    if(!file) {
      regEx = new RegExp('[/\\\\""<>|]', 'g');
    }
    let fixedName = input.replace(regEx, '_');
    for(let i in specialCharTable) {
      regEx = new RegExp(specialCharTable[i], 'g');
      fixedName = fixedName.replace(regEx, specialCharTo[i]);
    }
    while(fixedName && fixedName.slice(-1) === ".") { 
      fixedName = fixedName.slice(0, -1);
    }
    return fixedName;
};