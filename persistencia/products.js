const fs = require('fs');
const { throws } = require('assert');
//Manejo de archivos Fylesistem
module.exports = {
    leer : async (archivo) => {
        try{
            const file = await fs.readFileSync(`./data/${archivo}`,'utf-8')
            const fileParse = JSON.parse(file);
            return fileParse;
        }catch(error){
            console.log('error:',error)
        }
         
    },
    escribir : (archivo,contenido)=>{
        try{
            fs.writeFileSync(`./data/${archivo}`,JSON.stringify(contenido,null,'\t'));
        }catch(error){
            console.log('ERROR!!',error)
            throw error;
        }
    }
}