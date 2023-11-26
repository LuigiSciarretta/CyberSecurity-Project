/* File JavaScript per il calcolo dei codici hash */

// carichaim il modulo image-hash
var { imageHash }= require('image-hash');
// includiamo il modulo del file system
var fs = require('fs');
// questo modulo ci fornisce funzionalità crittografiche che includono le funzioni hash (che sono quelle che servono a noi)
var crypto = require('crypto');
// includiamo il modulo per leggere ciò che inseriamo da tastiera e che verrà gestito in maniera asincrona
const readline = require('readline');

// in queste variabili andiamo a salvarci gli hash calcolati che poi dovranno essere scritti sui file .txt
let Image_Hash;
let Measures_Hash;

// Usiamo la promise per gestire il processo asincrono e, quindi, non rischiare di rimanere bloccati all'interno della funzione di callback
const question = (str) => new Promise(resolve => rl.question(str, resolve));

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Questo codice ci permettere di prendere in input i file delle misure e dell'immagine (specificandone eventualmente il path oltre che il nome) e di generare 2 file .txt contenenti gli hash delle misure e dell'iimmagine.
const step = {
    
    start: async () => {
        return step.percorso();	
    },
    
    percorso: async () => {
		// le prossime 2 istruzioni ci permettonon di dare in input le misure e l'immagine e di salvarne il percorso nelle costanti "Measures_Path" per le misure e "Image_Path" per l'immagine
        const Measures_Path = await question("PLEASE, ENTER THE MEASURES PATH: ");
        const Image_Path = await question("PLEASE, ENTER THE IMAGE PATH: ");
        
		console.log('');
        
        fs.createReadStream(Measures_Path).
		// l'algoritmo che è stato scelto per il calcolo dell'hash è SHA256
        pipe(crypto.createHash('sha256').
        setEncoding('hex')).
        on('finish', function () {
            Measures_Hash = (this.read()) 
            
            // Scrittura dell'hash delle misure sul file MEASURES_HASH.txt
            fs.writeFile('MEASURES_HASH.txt', Measures_Hash, function (err) {
                if (err) throw err;
				// se non ci sono errori, dopo aver salvato l'hash dentro IMAGE_HASH.txt viene stampato su terminale "MEASURES HASH SAVED!"
                console.log('MEASURES HASH SAVED!');
				//con __dirname stampiamo il path dove andiamo a salvare il file hashMis.txt
				console.log('You can find the file at the following path: ' + __dirname);
            });
        });
        
        // Metodo hash per il file .JPG
        imageHash(Image_Path, 16, true, (error, data) => {
            if (error) throw error; 
            Image_Hash = (data); 
        
            // Scrittura dell'hash dell'immagine sul file IMAGE_HASH.txt
            fs.writeFile('IMAGE_HASH.txt', Image_Hash, function (err) {
                if (err) throw err;
				// se non ci sono errori, dopo aver salvato l'hash dentro IMAGE_HASH.txt viene stampato su terminale "IMAGE HASH SAVED!"
                console.log('IMAGE HASH SAVED!');
				//con __dirname stampiamo il path dove andiamo a salvare il file hashImm.txt
				console.log('You can find the file at the following path: ' + __dirname);
            });
        });
        return step.end();	
    },
    
    end: async () => {
        rl.close();
    },
};

//Invocazione della routine
step.start(); 