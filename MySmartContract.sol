//QUESTO SMART CONTRACT IMPLEMENTA LE FUNZIONI DI AGGIUNTA SULLA BLOCKCHAIN E DI LETTURA DALLA BLOCKCHAIN AVENDO UN ID OPPURE AVENDO UN HASH DELL'IMMAGINE O UN HASH DELLE MISURE PRECEDENTEMENTE INSERITO

pragma solidity >=0.4.0 <0.7.0;

contract hash_mapping{

    uint256 public packCount;
    mapping(uint256 => Pack) public packs;
    address DirettoreLavori;
	
	//ci è servito definire queste 4 stringhe perché servono per andare a comporre il messaggio da dare in output all'utente
	string a="DATE-TIME: ";
	string b="IMAGE HASH IS: ";
	string c="MEASURES HASH IS: ";
	string d="THE ACCOUNT THAT WROTE THIS TRANSACTION IS: ";

	//la funzione require rientra nelle best practice per la sicurezza di uno smart contract e viene utilizzata per garantire che solo chi ha caricato il contratto può andare a scrivere sulla blockchain (cioè ad utilizzare la funzione "addFunction")
    modifier onlyOwner() {
        require(msg.sender == DirettoreLavori); 
        _;
    }
    
	//questo è il metodo costruttore grazie al quale inizializziamo la variabili di tipo address denominata "DirettoreLavori" valorizzandola con l'indirizzo del nodo che ha caricato lo smart contract; in questo modo permettiamo solo a colui che ha caricato il contratto di poter fare la scrittura sulla blockchain.
    constructor() public {
        DirettoreLavori = msg.sender;
    }
    
	//questa struttura contiene: id, timestamp, hash dell'immagine, hadh delle misure, indirizzo di chi ha effettuato la transazione
    struct Pack {
        uint _id;
		string _data_ora;
        string _hash_immagine;
        string _hash_misure;
		string _account_sender;
    }
    
	//questa è una funzione fondamentale del nostro sistema e ci permette di scrivere sulla blockchain.
	//Nota: grazie all'aggiunta di onlyOwner, che ha al suo interno la funzione require, noi permettiamo di scrivere sulla blockchain (cioè di utilizzare la funzione "addFunction") solo all'account che ha caricato lo smart contract.
    function addFunction(string memory _data_ora, string memory _hash_immagine, string memory _hash_misure, string memory _account_sender) public onlyOwner {
        conta();
        packs[packCount] = Pack(packCount, _data_ora, _hash_immagine, _hash_misure, _account_sender);
    }
    
	//grazie a questa funzione incrementiamo il contatore di 1 unità. Questo ci serve perchè andrà a popolare il campo _id della struttura denominata "Pack" ad ogni nuovo inserimento
    function conta() internal{
        packCount +=1; 
    }

	// QUESTA FUNZIONE, PASSANDO L'ID, MI PERMETTE DI RECUPERARE TUTTI I DATI DI UNA TRANSAZIONE: DATA E ORA, HASH DELL'IMMAGINE, HASH DELLE MISURE E INDIRIZZO DELL'ACCOUNT CHE HA EFFETTUATO LA SCRITTURA
    function getAllByID(uint256 ID) view public returns (string memory result) {
		if (bytes(packs[ID]._data_ora).length==0 || bytes(packs[ID]._hash_immagine).length==0 || bytes(packs[ID]._hash_misure).length==0 || bytes(packs[ID]._account_sender).length==0){
			return "ID NOT EXISTING!";
		}
		else{
			return string(abi.encodePacked(a, packs[ID]._data_ora, "\n", b, packs[ID]._hash_immagine, "\n", c, packs[ID]._hash_misure, "\n", d, packs[ID]._account_sender)); 
		}
    }  
    
    // QUESTA FUNZIONE CI PERMETTE DI RECUPERARE L'ID DI UNA TRANSAZIONE PASSANDO L'HASH DELL'IMMAGINE
    function getIDByImageHash(string memory image_hash) view public returns (uint256 result){
    	for(uint i=1;i<=packCount;i++){
		    if(keccak256(abi.encodePacked(packs[i]._hash_immagine)) == keccak256(abi.encodePacked(image_hash))) {
		        return packs[i]._id;
		    }	
	    }
    }
	
	// QUESTA FUNZIONE CI PERMETTE DI RECUPERARE L'ID DI UNA TRANSAZIONE PASSANDO L'HASH DELLE MISURE
	function getIDByMeasuresHash(string memory measures_hash) view public returns (uint256 result){
		for(uint i=1;i<=packCount;i++){
		    if(keccak256(abi.encodePacked(packs[i]._hash_misure)) == keccak256(abi.encodePacked(measures_hash))) {
		        return packs[i]._id;
		    }	
	    }
    }    
}