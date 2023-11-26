/* File JavaScript per la scrittura di transazioni su blockchain */

// includiamo il modulo del file system
var fs = require('fs'); 

// includiamo il modulo web3; questo ci servirà per creare una connessione web3
const Web3 = require('web3');

// includiamo il modulo readline-sync che ci permette di gestire un processo sincrono (cioè inserire un input da tastiera)
var readlineSync = require('readline-sync');

//creiamo questi 2 file che contengono i nomi dei 2 file creati dallo script "HashFunction"
const file1 = 'IMAGE_HASH.txt'
const file2 = 'MEASURES_HASH.txt'

//dichiariamo le variabili che andranno ad ospitare, corrispettivamente, l'indirizzo del nodo e l'indirizzo dell'account 
var rpcURL
var account

// Lettura sincrona dei due file contenenti i codici hash
var Image_Hash = fs.readFileSync(file1, 'utf8');
var Measures_Hash = fs.readFileSync(file2, 'utf8');

//inseriamo un do while per non permettere ad utenti malevoli o sbadati di creare errori durante l'esecuzione delle operazioni
var s=0;
do {
// Specifichiamo con quale nodo (e quindi con quale account) vogliamo andare a scrivere sulla blockchain
var response = readlineSync.question('PLEASE, ENTER THE NODE WITH WHICH YOU WANT TO WRITE ON BLOCKCHAIN: ');
if(response!='1' && response!='2' && response!='3'){
	console.log("WRONG ENTRY!");
	s=1;
	}
	else{s=0}
}
while (s);


switch (response) {
  case '1':
	// NODO 1
	rpcURL = "http://localhost:22000";
	account = "0xed9d02e382b34818e88b88a309c7fe71e65f419d";
    break;
  
  case '2':
    // NODO 2
	rpcURL = "http://localhost:22001";
	account = "0xca843569e3427144cead5e4d5999a3d0ccf92b8e";
    break;
  
  case '3':
    // NODO 3
	rpcURL = "http://localhost:22002";
	account = "0x0fbdc686b912d7722dc86510934589e0aaf3b55a";
    break;
  
}


// creiamo un'istanza di una connessione web3; questo ci servirà per dialogare con la blockchain
const web3 = new Web3(rpcURL)

// Collegamento al contratto
var abi = [{"constant":false,"inputs":[{"name":"_data_ora","type":"string"},{"name":"_hash_immagine","type":"string"},{"name":"_hash_misure","type":"string"},{"name":"_account_sender","type":"string"}],"name":"addFunction","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"packCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"image_hash","type":"string"}],"name":"getIDByImageHash","outputs":[{"name":"result","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"measures_hash","type":"string"}],"name":"getIDByMeasuresHash","outputs":[{"name":"result","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"ID","type":"uint256"}],"name":"getAllByID","outputs":[{"name":"result","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"packs","outputs":[{"name":"_id","type":"uint256"},{"name":"_data_ora","type":"string"},{"name":"_hash_immagine","type":"string"},{"name":"_hash_misure","type":"string"},{"name":"_account_sender","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}];


// Inseriamo l'address del contratto utilizzando un processo sincrono di immissione di input da tastiera
var address = readlineSync.question('\nPLEASE, ENTER CONTRACT ADDRESS: ');

// creiamo l'oggetto contract; in questo modo possiamo interagire con lo smart contract come se fosse un oggetto JavaScript
const contract = new web3.eth.Contract(abi, address)

// salviamo nella variabile d la data della transazione e nella variabile t l'orario della transazione
var d=new Date().toDateString() 
var t=new Date().toLocaleTimeString();
var data_ora= d + " " + t;



//inseriamo un do while per non permettere ad utenti malevoli o sbadati di creare errori durante l'esecuzione delle operazioni
var r=0;
do {
// Specifichiamo con quale nodo (e quindi con quale account) vogliamo andare a scrivere sulla blockchain
var risp = readlineSync.question('\nARE YOU SURE THAT YOU WANT TO WRITE ON BLOCKCHAIN? \nTipe 1 for YES and 2 for NO: ');
if(risp!='1' && risp!='2'){
	console.log("WRONG ENTRY!");
	r=1;
	}
	else{r=0}
}
while (r);

// con quest'if implementiamo un'ulteriore conferma per evitare casi di uso improprio (misuse case) da parte di un utente sbadato che non ha intenzioni malevole
if (risp==1){
	/* 
	SCRITTURA TRANSAZIONE:
	Con il primo console.log stampiamo l'indirizzo dell'account che ha effettuato la transazione.
	Con il secondo e il terzo console.log stampiamo gli hash di immagine e misure.
	*/
	console.log("\nTRANSACTION FROM ACCOUNT: " + account);
	console.log("IMAGE HASH: " + Image_Hash);
	console.log("MEASURES HASH: " + Measures_Hash);
	// chiamiamo la funzione addFunction() contenuta nello smart contract che ci permette di andare a scrivere nella blockchain: data e ora, hash dell'immagine, hash delle misure e indirizzo dell'account che ha effettuato la scrittura
	contract.methods.addFunction(data_ora, Image_Hash, Measures_Hash, account).send({from:account})
}

else{
	console.log("\nOPERATION CANCELED!");
}

// Utilizziamo la funzione unlinkSync() per effettuare la rimozione dei 2 file che contengono gli hash di misure e immagine dato che ormai non ci servono più. In questo modo evitiamo attacchi che possono andare a violare le nostre policy di sicurezza.
try {
  fs.unlinkSync(file1);
  fs.unlinkSync(file2);
  //file removed
} catch(err) {
  console.error(err)
}