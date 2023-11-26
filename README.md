# CyberSecurity
Il progetto realizzato consiste nell’implementazione di un sistema che permetta di digitalizzare in maniera sicura i dati relativi ad un cantiere edilizio. Per far questo ci siamo serviti di tecnologie e metodi che ci hanno consentito di informatizzare il sistema di registrazione delle informazioni sul giornale dei lavori al fine di assicurare che il lavoro venga fatto e registrato regolarmente. In particolare, ciò che si dovrà registrare sul giornale dei lavori saranno misure ed immagini (e altre meta-informazioni). 

Per lo sviluppo di questo progetto ci siamo serviti di: 
-	un drone per l’acquisizione delle immagini; 
-	un servizio di fotogrammetria per il calcolo delle misure a partire dalle immagini scattate dal drone; 
-	opportune tecnologie che ci consentiranno di registrare e memorizzare tutto ciò che sarà di nostro interesse. 

Descriviamo l’iter delle operazioni che sono di interesse del nostro sistema: 
1.	Il drone acquisirà immagini dall’alto; 
2.	Invio delle immagini al servizio di fotogrammetria che ne calcolerà le relative misure; 
3.	Registrazione sul giornale dei lavori delle misure e delle relative immagini. 
 
La forza del nostro progetto è, quindi, quella di digitalizzare queste operazioni di registrazione delle informazioni al fine di creare un sistema che migliori quello odierno sotto il punto di vista della sicurezza, degli illeciti, della portabilità, della disponibilità, dell’integrità e dell’affidabilità. Per realizzare questo ci si è affidati alla tecnologia Blockchain, che garantisce sicurezza e affidabilità dell’informazione memorizzata.  

Con questa guida andremo a mostrare, in prima battuta, come predisporre l’ambiente di sviluppo e di esecuzione del nostro sistema. Fatto questo, poi, vi accompagneremo passo dopo passo attraverso tutte le funzionalità del nostro sistema.


## Predisporre l’ambiente di sviluppo e di esecuzione
Ora procederemo all’installazione e alla configurazione di Docker, Node.js (con tutti i pacchetti necessari), e Quorum.

### Installazione Docker
Per scaricare l’applicativo di Docker ci siamo recati sul sito ufficiale e abbiamo scaricato la versione per Windows reperibile al seguente link: https://www.docker.com/products/docker-desktop. Una volta effettuato il download, seguire i classici passi di installazione di un qualunque software.



### Installazione Node.js
Per scaricare l’applicativo di Node.js ci siamo recati sul sito ufficiale e abbiamo scaricato la versione per Windows reperibile al seguente link: https://nodejs.org/it/. Una volta effettuato il download, seguire i classici passi di installazione di un qualunque software.

Consiglio: nel momento in cui apparirà la seguente schermata, consigliamo di spuntare la checkbox che acconsentirà ad installare automaticamente tutti i tool necessari:

![](github%20pictures%20for%20README/0.png)

Una volta completata l'installazione, possiamo verificare se Node.js è stato correttamente installato aprendo una nuova finestra del terminale e lanciando il comando “node -v”. Il risultato che si otterrà, se tutto è andato a buon fine, sarà il seguente:

![](github%20pictures%20for%20README/0b.png)



### Installazione Quorum
In questa fase mostreremo quali sono gli step necessari per configurare Quorum sulla nostra macchina.
In questa guida presenteremo 2 metodi per configurare Quorum sulla nostra macchina:
1)	Il primo metodo, che è quello che consigliamo se si dispone di un PC abbastanza potente, è quello di configurare la release ufficiale di Quorum direttamente dal github di ConsenSys (cioè quello che originariamente apparteneva a JPMorgan Chase). Per far questo, ci si dovrà recare nella sezione github relativa alla blockchain Quorum sviluppata da JPMorgan Chase (https://github.com/ConsenSys/quorum-examples) e si dovranno le istruzioni per la configurazione di Quorum con Docker (che sul README.md della pagina vengono riportate sotto la voce di “Running with Docker”).
Il vantaggio di questa versione è che comprende tantissime funzionalità!
Lo svantaggio, ovviamente, lo riscontriamo computazionalmente. Infatti, per mandare in esecuzione i 7 nodi (previsti da questa versione di Quorum) con Docker in maniera fluida ed utilizzabile, serve una potenza di calcolo che non tutti i PC comuni hanno.

    Requisiti minimi consigliati: 
    - almeno un processore Intel® i7;
    - almeno 8 GB di RAM;
    - SSD.

    Per verificare che tutto è andato a buon fine eseguire i seguenti passaggi: aprire il terminale, spostarsi nella cartella che ospita i 7 nodi appena installati, eseguire l’istruzione “docker ps -a” per vedere tutti i container che ci sono (sia quelli attivi e sia quelli stoppati). Se tutto è andato nel verso giusto dovrebbero apparire 7 container per i nodi, 7 transaction manager ed 1 container chiamato “cakeshop” (che è un’interfaccia alla blockchain che ci dà la possibilità di visualizzare lo stato della blockchain e di vedere lo stato del proprio nodo, di vedere le transazioni, ecc…).
    
    A questo punto, se tutto è andato a buon fine, nella cartella di destinazione è stata creata una cartella chiamata “quorum-examples”.

2)	Il secondo metodo, che è quello che consigliamo se non si dispone di un PC abbastanza potente, è quello di configurare quorum tramite la versione presente nel seguente link: https://docs.goquorum.consensys.net/en/stable/HowTo/GetStarted/Wizard/GettingStarted/.
Seguire le istruzioni che si trovano nella pagina oppure procedere con i seguenti passi:

     a)	Aprire il terminale e lanciare il comando “npm install -g quorum-wizard”.

     b)	Lanciare il comando “quorum-wizard”.

     c)	Scegliere la configurazione che si preferisce. Nel nostro sistema le scelte che sono state effettuate sono state le seguenti:
     
     ![](github%20pictures%20for%20README/1.PNG)
     ![](github%20pictures%20for%20README/2.PNG)
     
     Qui dobbiamo scegliere quale algoritmo del consenso adottare (noi abbiamo scelto “istanbul”):
     ![](github%20pictures%20for%20README/3.PNG)
     
     A questo punto il sistema ci chiederà quanti nodi vogliamo installare. Chiaramente, maggiore è il numero di nodi che contemporaneamente dovranno essere mandati in esecuzione e maggiori saranno le risorse computazionali che verranno richieste alla macchina. 
     Nota: noi abbiamo scelto 3 nodi.
     ![](github%20pictures%20for%20README/4.PNG)
     
     
     
     Qui viene scelta la versione di Quorum:
     
     ![](github%20pictures%20for%20README/5.PNG)
     
     
     
     Qui viene scelta la versione di Tessera (piattaforma per la gestione della privacy):
     ![](github%20pictures%20for%20README/6.PNG)
     ![](github%20pictures%20for%20README/7.PNG)
     ![](github%20pictures%20for%20README/8.PNG)
     
     Se tutto è andato a buon fine, dovremmo avere questa situazione:
     ![](github%20pictures%20for%20README/9.PNG)
     
     Quindi è stata creata la cartella “network” e all’interno è stata creata la cartella chiamata “3-nodes-istanbul-tessera-bash” (nome che abbiamo dato noi in uno degli step di configurazione) che contiene tutti i file (tra cui “docker-compose.yml”).
     
     
     Fatto questo ci spostiamo nella cartella “3-nodes-istanbul-tessera-bash”:
     
     ![](github%20pictures%20for%20README/10.PNG)
     
     
     Poi lanciamo il comando “start.cmd”:
     
     ![](github%20pictures%20for%20README/11.PNG)
     
     
     Fatto questo, la situazione che avremo nell’applicazione Docker sarà la seguente:
     ![](github%20pictures%20for%20README/12.PNG)
     Se i container sono verdi vuol dire che i nodi sono accesi; se sono grigi, invece, vuol dire che sono stoppati.



## Esecuzione del sistema
Come operazione preliminare, recarsi nella cartella di riferimento che ospita tutto il sistema appena installato e mandare in esecuzione il seguente comando:
```
git clone https://github.com/CyberGruppo5/CyberSecurity.git
```
Nota: se abbiamo installato la blockchain a 7 nodi (quindi seguendo il metodo 1) la cartella nella quale andare ad effettuare il comando “git clone” sarà “.\quorum-examples\examples\7nodes”. Se abbiamo installato la blockchain a 3 nodi (quindi seguendo il metodo 2) la cartella nella quale andare ad effettuare il comando “git clone” sarà “.\network\3-nodes-istanbul-tessera-bash”.

A questo punto è necessario installare i pacchetti Node.js che saranno necessari per l’esecuzione del nostro sistema; per farlo apriamo il terminale, spostiamoci nella cartella CyberSecurity che si è generata dopo aver lanciato il comando “git clone” e mandiamo in esecuzione l’istruzione “npm init” mantenendo le configurazioni di default che ci verranno chieste. Fatto questo, lanciare uno per volta i seguenti comandi che ci permetteranno di installare i pacchetti necessari per l’esecuzione del nostro sistema:
-	npm install web3
-	npm install readline
-	npm install readline-sync
-	npm install crypto
-	npm install image-hash


Ora abbiamo terminato la parte di installazione e configurazione, e siamo pronti per l’esecuzione!




Successivamente verrà mostrato l’iter da seguire per mandare in esecuzione il sistema. Si noti che nell’esempio che mostreremo abbiamo preso in considerazione il caso di una blockchain a 3 nodi; nel caso in cui si dispone della blockchain a 7 nodi, verranno specificati i file complementari da eseguire.
Gli step da seguire sono:

1)	Per prima cosa mandare in esecuzione Docker e accendere tutti i nodi. 
2)	Una volta che tutti i nodi sono accesi, entrare nella cartella di riferimento (che nel nostro caso si trova nel percorso “C:\Users\Luca\network\3-nodes-istanbul-tessera-bash” mentre nel caso dei 7 nodi si trova nella cartella “7nodes”) accedere alla cartella che si è generata dopo aver lanciato il comando “git clone” (che si chiamerà CyberSecurity) ed eseguire il file .cmd denominato “GETH.cmd” (“GET7.cmd” per blockchain a 7 nodi).

       La schermata che ci si presenterà davanti sarà la seguente:

       ![](github%20pictures%20for%20README/13.png)

       A questo punto dobbiamo scegliere con quale nodo andare a fare il deploy dello smart contract sulla blockchain. 
       Attenzione: solo il nodo con il quale andremo a caricare lo smart contract potrà andare a scrivere sulla blockchain. Questa funzionalità che ci permette di fare questo è stata implementata proprio all’interno dello smart contract.

       Una volta scelto il nodo (nel caso preso in esempio abbiamo scelto il nodo 1) la schermata che ci si presenterà davanti sarà la seguente:
       ![](github%20pictures%20for%20README/14.png)

       A questo punto andremo ad eseguire il comando “loadScript(“SmartContract.js”)” che ci permette di mandare in esecuzione lo script “SmartContract.js”, all’interno della Geth JavaScript console, necessario per caricare lo smart contract sulla blockchain. La schermata che ci si presenterà davanti sarà la seguente:

       ![](github%20pictures%20for%20README/15.png)

       Come vediamo, il contratto è stato caricato e ci è stato restituito il TransactionHash e l’address del contratto. Per concludere questo step, ci copiamo l’indirizzo del contratto che ci servirà per andare ad effettuare le operazioni di scrittura e/o lettura sulla blockchain.
       
       <br />

    

3)	Tornare nella cartella “CyberSecurity” e mandare in esecuzione il file .cmd denominato “MENU.cmd” (“MENU7.cmd” per blockchain a 7 nodi).
La schermata che ci si presenterà davanti sarà la seguente:


    ![](github%20pictures%20for%20README/16.png)


    Descriviamo queste 6 funzionalità:
    
    a)	l’opzione numero 1 ci consente di calcolare l’hash dell’immagine e delle misure che andremo poi a scrivere sulla blockchain;
    
    b)	l’opzione numero 2 ci consente di andare a scrivere l’hash dell’immagine e l’hash delle misure che ci siamo calcolati con l’opzione numero 1;
    
    c)	l’opzione numero 3 ci consente di andare ad effettuare un’operazione di lettura sulla blockchain;
    
    d)	l’opzione numero 4 ci consente di andare a controllare se un’immagine (tramite il suo hash) è già stata registrata sulla blockchain;
    
    e)	l’opzione numero 5 ci consente di andare a controllare se una misura (tramite il suo hash) è già stata registrata sulla blockchain;
    
    f)	l’opzione numero 6 ci consente di visualizzare tutti i container che ci sono su Docker (sia quelli attivi e sia quelli stoppati).
    
    <br />


    Una volta selezionata una delle 6 opzioni, l’utente verrà guidato al fine di eseguire correttamente la funzionalità scelta.


    Di seguito verrà riportata una simulazione di esecuzione:

    **OPZIONE 1**: 
    Selezionando l’opzione 1, dando in input il path dell’immagine (che si trova nel percorso .\CyberSecurity\immagini) e il path della misura (che si trova nel percorso .\CyberSecurity\misure), ci ritornerà in output il percorso dove sono stati generati i 2 file temporanei che contengono l’hash dell’immagine e l’hash delle misure relative a quell’immagine.

    Possiamo vederne un esempio di esecuzione nella seguente figura:
    ![](github%20pictures%20for%20README/17.PNG)
    
    <br />

    **OPZIONE 2**:
    Selezionando l’opzione 2, dando in input il nodo con il quale vogliamo andare a scrivere sulla blockchain (che, come abbiamo precisato in precedenza, dovrà essere lo stesso con il quale abbiamo effettuato il deploy dello smart contract sulla blockchain) e l’indirizzo dello smart contract (che abbiamo ottenuto nello step 2), otterremo la scrittura sulla blockchain delle seguenti informazioni: ID, hash dell’immagine, hash delle misure, timestamp e account del nodo con il quale abbiamo effettuato la transazione. Si noti inoltre che, come effetto di quest’operazione, vengono eliminati i 2 file temporanei che contengono gli hash dell’immagine e delle misure; questo ci consente di evitare attacchi che possono andare a violare le nostre policy di sicurezza.

    Possiamo vederne un esempio di esecuzione nella seguente figura:
    ![](github%20pictures%20for%20README/18.PNG)
    
    <br />

    **OPZIONE 3**:
    Selezionando l’opzione 3, dando in input il nodo con il quale vogliamo andare ad effettuare l’operazione di lettura sulla blockchain, l’indirizzo dello smart contract (che abbiamo ottenuto nello step 2) e l’ID della transazione che vogliamo andare a leggere, otterremo in output tutte le informazioni che sono state scritte sulla blockchain relativamente all’ID selezionato.

    Possiamo vederne un esempio di esecuzione nella seguente figura:
    ![](github%20pictures%20for%20README/19.PNG)
    
    <br />

    **OPZIONE 4**:
    Selezionando l’opzione 4, dando in input il nodo con il quale vogliamo andare ad effettuare l’operazione di lettura sulla blockchain, l’indirizzo dello smart contract (che abbiamo ottenuto nello step 2) e l’hash dell’immagine che vogliamo andare a cercare, otterremo in output l’ID relativo all’hash dell’immagine inserito in input. Grazie a questa funzionalità possiamo partire da un’immagine e verificare se è stata già scritta sulla blockchain e, nel caso è stata già scritta, andare a visualizzare le relative informazioni recuperando l’ID e ritornando ad effettuare l’opzione 3 del menù.

    Possiamo vederne un esempio di esecuzione nella seguente figura:
    ![](github%20pictures%20for%20README/20.PNG)
    
    <br />

    **OPZIONE 5**:
    Selezionando l’opzione 5, dando in input il nodo con il quale vogliamo andare ad effettuare l’operazione di lettura sulla blockchain, l’indirizzo dello smart contract (che abbiamo ottenuto nello step 2) e l’hash della misura che vogliamo andare a cercare, otterremo in output l’ID relativo all’hash della misura inserito in input. Grazie a questa funzionalità possiamo partire da una misura e verificare se è stata già scritta sulla blockchain e, nel caso è stata già scritta, andare a visualizzare le relative informazioni recuperando l’ID e ritornando ad effettuare l’opzione 3 del menù.

    Possiamo vederne un esempio di esecuzione nella seguente figura:
    ![](github%20pictures%20for%20README/21.PNG)
    
    <br />

    **OPZIONE 6**:
    Selezionando l’opzione 6 possiamo visualizzare tutti i container che ci sono su Docker (sia quelli attivi e sia quelli stoppati).

    Possiamo vederne un esempio di esecuzione nella seguente figura:
    ![](github%20pictures%20for%20README/22.PNG)
