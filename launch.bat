@echo off

break > log.txt
break > notif-log.txt

start cmd.exe /k "echo Launching Notification Service... & python crypto-notif-ServiceA/notif.py >> notif-log.txt 2>&1"

start cmd.exe /k "echo Launching Lookup Service... & cd Crypto-Lookup-Microservice & node ."

echo Launching Cryptogenius-Core...
python cryptogenius-core/main.py >> log.txt 2>&1

type log.txt




