@echo off

:MENU
CLS
ECHO.
ECHO ...............................................
ECHO WHICH OPERATION DO YOU WANT TO DO?
ECHO ...............................................
ECHO.
ECHO PRESS 1 FOR CALCULATE HASHES OF IMAGE AND MEASURES
ECHO PRESS 2 FOR WRITE A TRANSACTION ON BLOCKCHAIN
ECHO PRESS 3 FOR READ A TRANSACTION FROM THE BLOCKCHAIN
ECHO PRESS 4 FOR FIND A TRANSACTION ID BY AN IMAGE HASH
ECHO PRESS 5 FOR FIND A TRANSACTION ID BY A MEASURES HASH
ECHO PRESS 6 FOR SEE ALL CONTAINERS (BOTH ACTIVE AND STOPPED)
ECHO PRESS 7 FOR EXIT
ECHO.
SET /P M=Type 1, 2, 3, 4, 5, 6 or 7, then press ENTER: 
IF %M%==1 GOTO calculate_hash
IF %M%==2 GOTO write_transaction
IF %M%==3 GOTO read_transaction
IF %M%==4 GOTO getIDByImageHash
IF %M%==5 GOTO getIDByMeasuresHash
IF %M%==6 GOTO containers 
IF %M%==7 GOTO EOF

:calculate_hash
@echo off
CLS
echo NOW WE CALCULATE THE HASHES OF IMAGE AND MEASURES!
echo.
node HashFunction.js
echo.
pause
GOTO MENU

:write_transaction
@echo off
CLS
echo LET'S EXECUTE THE SMART CONTRACT (INDICATING BY ITS ADDRESS) IN ORDER TO WRITE THE HASHES OF MEASURES AND IMAGE ON THE BLOCKCHAIN!
echo.
node WriteTransaction.js
echo.
pause
GOTO MENU

:read_transaction
@echo off
CLS
echo NOW WE SHOE WHAT WHAT WE HAVE WRITTEN ON BLOCKCHAIN INDICATING THE ID RELATED TO THE TRANSACTION THAT WE WANT TO VIEW! 
echo.
node ReadTransaction.js
echo.
pause
GOTO MENU

:getIDByImageHash
@echo off
CLS
echo NOW YOU CAN ENTER AN IMAGE HASH TO FIND OUT THE TRANSACTION ID FOR THIS HASH 
echo.
node ReadIDByImage.js
echo.
pause
GOTO MENU

:getIDByMeasuresHash
@echo off
CLS
echo NOW YOU CAN ENTER A MEASURES HASH TO FIND OUT THE TRANSACTION ID FOR THIS HASH 
echo.
node ReadIDByMeasures.js
echo.
pause
GOTO MENU

:containers
@echo off
CLS
cd ..
docker ps -a
cd CyberSecurity
echo.
pause
GOTO MENU