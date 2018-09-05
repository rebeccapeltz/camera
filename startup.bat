REM camera
REM start "C:\Users\kiosk\projects\camera\startcam.bat"
start cmd /C \Users\kiosk\projects\camera\startcam.bat

REM wait 10 seconds
timeout /t 10

start microsoft-edge:http://localhost:9090