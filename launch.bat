@echo off

break > log.txt
break > notif-log.txt
break > lookup-log.txt
break > logo-log.txt
break > summary-log.txt

start cmd.exe /k "python crypto-notif-ServiceA/notif.py >> notif-log.txt 2>&1"

start cmd.exe /k "cd Crypto-Lookup-Microservice & node . >> lookup-log.txt 2>&1"

start cmd.exe .k "cd logo-service & node . >> logo-log.txt 2>&1"

start cmd.exe /k "cd summary-service & node . >> summary-log.txt 2>&1"

echo Launching Cryptogenius-Core...
python stock-and-crypto-trading_sim/main.py >> log.txt 2>&1

type log.txt


:: https://stackoverflow.com/questions/29387642/how-do-i-kill-all-cmd-exe-except-the-one-currently-running-from-batch

call getCmdPID
set "current_pid=%errorlevel%"

for /f "skip=3 tokens=2 delims= " %%a in ('tasklist /fi "imagename eq node.exe"') do (
    if "%%a" neq "%current_pid%" (
        TASKKILL /f /PID %%a >nul 2>nul
    )
)

for /f "skip=3 tokens=2 delims= " %%a in ('tasklist /fi "imagename eq cmd.exe"') do (
    if "%%a" neq "%current_pid%" (
        TASKKILL /f /PID %%a >nul 2>nul
    )
)

for /f "skip=3 tokens=2 delims= " %%a in ('tasklist /fi "imagename eq python3.12.exe"') do (
    if "%%a" neq "%current_pid%" (
        TASKKILL /F /PID %%a >nul 2>nul
    )
)



