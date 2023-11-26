@echo off
echo WELCOME, NOW WE ARE STARTING THE BLOCKCHAIN!
ECHO.
cd ..
docker-compose up -d

cd CyberSecurity

:MENU
ECHO.
ECHO ...............................................
ECHO WHICH BLOCKCHAIN NODE DO YOU WANT TO ENTER THE GETH JAVASCRIPT CONSOLE WITH?
ECHO ...............................................
ECHO.
ECHO PRESS 1 FOR NODE 1
ECHO PRESS 2 FOR NODE 2
ECHO PRESS 3 FOR NODE 3
ECHO PRESS 4 FOR NODE 4
ECHO PRESS 5 FOR NODE 5
ECHO PRESS 6 FOR NODE 6
ECHO PRESS 7 FOR NODE 7
ECHO PRESS 8 FOR EXIT
ECHO.
SET /P M=Type 1, 2, 3, 4, 5, 6, 7 or 8, then press ENTER: 
IF %M%==1 GOTO nodo1
IF %M%==2 GOTO nodo2
IF %M%==3 GOTO nodo3
IF %M%==4 GOTO nodo4
IF %M%==5 GOTO nodo5
IF %M%==6 GOTO nodo6
IF %M%==7 GOTO nodo7
IF %M%==8 GOTO EOF
:nodo1
ECHO.
FOR /F "tokens=* USEBACKQ" %%g IN (`docker-compose ps -q node1`) DO set DOCKER_CONTAINER=%%g
docker cp SmartContract.js %DOCKER_CONTAINER%:/SmartContract.js
docker-compose exec node1 /bin/sh -c "geth --exec 'loadScript(\"SmartContract.js\")' attach qdata/dd/geth.ipc" > nul 2>&1
docker exec -it quorum-examples_node1_1 geth attach /qdata/dd/geth.ipc
pause
CLS
GOTO MENU

:nodo2
ECHO.
FOR /F "tokens=* USEBACKQ" %%g IN (`docker-compose ps -q node2`) DO set DOCKER_CONTAINER=%%g
docker cp SmartContract.js %DOCKER_CONTAINER%:/SmartContract.js
docker-compose exec node2 /bin/sh -c "geth --exec 'loadScript(\"SmartContract.js\")' attach qdata/dd/geth.ipc" > nul 2>&1
docker exec -it quorum-examples_node2_1 geth attach /qdata/dd/geth.ipc
pause
CLS
GOTO MENU

:nodo3
ECHO.
FOR /F "tokens=* USEBACKQ" %%g IN (`docker-compose ps -q node3`) DO set DOCKER_CONTAINER=%%g
docker cp SmartContract.js %DOCKER_CONTAINER%:/SmartContract.js
docker-compose exec node3 /bin/sh -c "geth --exec 'loadScript(\"SmartContract.js\")' attach qdata/dd/geth.ipc" > nul 2>&1
docker exec -it quorum-examples_node3_1 geth attach /qdata/dd/geth.ipc
pause
CLS
GOTO MENU

:nodo4
ECHO.
FOR /F "tokens=* USEBACKQ" %%g IN (`docker-compose ps -q node4`) DO set DOCKER_CONTAINER=%%g
docker cp SmartContract.js %DOCKER_CONTAINER%:/SmartContract.js
docker-compose exec node4 /bin/sh -c "geth --exec 'loadScript(\"SmartContract.js\")' attach qdata/dd/geth.ipc" > nul 2>&1
docker exec -it quorum-examples_node4_1 geth attach /qdata/dd/geth.ipc
pause
CLS
GOTO MENU

:nodo5
ECHO.
FOR /F "tokens=* USEBACKQ" %%g IN (`docker-compose ps -q node5`) DO set DOCKER_CONTAINER=%%g
docker cp SmartContract.js %DOCKER_CONTAINER%:/SmartContract.js
docker-compose exec node5 /bin/sh -c "geth --exec 'loadScript(\"SmartContract.js\")' attach qdata/dd/geth.ipc" > nul 2>&1
docker exec -it quorum-examples_node5_1 geth attach /qdata/dd/geth.ipc
pause
CLS
GOTO MENU

:nodo6
ECHO.
FOR /F "tokens=* USEBACKQ" %%g IN (`docker-compose ps -q node6`) DO set DOCKER_CONTAINER=%%g
docker cp SmartContract.js %DOCKER_CONTAINER%:/SmartContract.js
docker-compose exec node6 /bin/sh -c "geth --exec 'loadScript(\"SmartContract.js\")' attach qdata/dd/geth.ipc" > nul 2>&1
docker exec -it quorum-examples_node6_1 geth attach /qdata/dd/geth.ipc
pause
CLS
GOTO MENU

:nodo7
ECHO.
FOR /F "tokens=* USEBACKQ" %%g IN (`docker-compose ps -q node7`) DO set DOCKER_CONTAINER=%%g
docker cp SmartContract.js %DOCKER_CONTAINER%:/SmartContract.js
docker-compose exec node7 /bin/sh -c "geth --exec 'loadScript(\"SmartContract.js\")' attach qdata/dd/geth.ipc" > nul 2>&1
docker exec -it quorum-examples_node7_1 geth attach /qdata/dd/geth.ipc
pause
CLS
GOTO MENU