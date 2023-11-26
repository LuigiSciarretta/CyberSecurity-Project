/* File JavaScript per la lettura di transazioni su blockchain */


// includiamo il modulo web3; questo ci servirà per creare una connessione web3
const Web3 = require('web3')

// includiamo il modulo readline-sync che ci permette di gestire un processo sincrono (cioè inserire un input da tastiera)
var readlineSync = require('readline-sync');

//dichiariamo le variabili che andranno, corrispettivamente, ad ospitare l'indirizzo del nodo e l'indirizzo dell'account 
var rpcURL
var account

//inseriamo un do while per non permettere ad utenti malevoli o sbadati di creare errori durante l'esecuzione delle operazioni
var s=0;
do {
// Specifichiamo con quale nodo (e quindi con quale account) vogliamo andare a leggere dalla blockchain
var response = readlineSync.question('PLEASE, ENTER THE NODE WITH WHICH YOU WANT TO READ FROM BLOCKCHAIN: ');
if(response!='1' && response!='2' && response!='3' && response!='4' && response!='5' && response!='6' && response!='7'){
	console.log("WRONG ENTRY!");
	s=1;
	}
	else{s=0}
}
while (s);


switch (response) {
  case '1':
  {
	// NODO 1
	rpcURL = "http://localhost:22000";
	account = "0xed9d02e382b34818e88b88a309c7fe71e65f419d";
    break;
  }
  case '2':
  {
    // NODO 2
	rpcURL = "http://localhost:22001";
	account = "0xca843569e3427144cead5e4d5999a3d0ccf92b8e";
    break;
  }
  case '3':
  {
    // NODO 3
	rpcURL = "http://localhost:22002";
	account = "0x0fbdc686b912d7722dc86510934589e0aaf3b55a";
    break;
  }
  case '4':
  {
    // NODO 4
	rpcURL = "http://localhost:22003";
	account = "0x9186eb3d20cbd1f5f992a950d808c4495153abd5";
    break;
  }
  case '5':
  {
    // NODO 5
	rpcURL = "http://localhost:22004";
	account = "0x0638e1574728b6d862dd5d3a3e0942c3be47d996";
    break;
  }
  case '6':
  {
    // NODO 6
	rpcURL = "http://localhost:22005";
	account = "0xae9bc6cd5145e67fbd1887a5145271fd182f0ee7";
    break;
  }
  case '7':
  {
    // NODO 7
	rpcURL = "http://localhost:22006";
	account = "0xcc71c7546429a13796cf1bf9228bff213e7ae9cc";
    break;
  }
}



// creiamo un'istanza di una connessione web3; questo ci servirà per dialogare con la blockchain
const web3 = new Web3(rpcURL)

// Collegamento al contratto
var abi = [{"constant":false,"inputs":[{"name":"_data_ora","type":"string"},{"name":"_hash_immagine","type":"string"},{"name":"_hash_misure","type":"string"},{"name":"_account_sender","type":"string"}],"name":"addFunction","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"packCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"image_hash","type":"string"}],"name":"getIDByImageHash","outputs":[{"name":"result","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"measures_hash","type":"string"}],"name":"getIDByMeasuresHash","outputs":[{"name":"result","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"ID","type":"uint256"}],"name":"getAllByID","outputs":[{"name":"result","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"packs","outputs":[{"name":"_id","type":"uint256"},{"name":"_data_ora","type":"string"},{"name":"_hash_immagine","type":"string"},{"name":"_hash_misure","type":"string"},{"name":"_account_sender","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}];

// Inseriamo l'address del contratto utilizzando un processo sincrono di immissione di input da tastiera
var address = readlineSync.question('PLEASE, ENTER CONTRACT ADDRESS: ');

// Inseriamo l'ID per identificare a quali hash di immagine e misure si riferisce; quest'input viene fatto attraverso processo sincrono
var id = readlineSync.question('PLEASE, ENTER THE ID: ');

// creiamo l'oggetto contract; in questo modo possiamo interagire con lo smart contract come se fosse un oggetto JavaScript
const contract = new web3.eth.Contract(abi, address)

console.log('')

/* 
LETTURA TRANSAZIONE 
Chiamiamo la funzione getAllByID() contenuta nello smart contract; questo metodo ha come parametro l'indice della transazione che si vuole visualizzare.
*/
contract.methods.getAllByID(id).call((err, result) => {console.log(result)})