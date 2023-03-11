@ECHO OFF
start cmd.exe /k "cd %~dp0 & cd server & npm install & npm start"
cd %~dp0 & cd client & npm install & npm start




