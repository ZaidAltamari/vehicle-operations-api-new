@echo off
title API Monitor
color 0A

:loop
cls
echo ========================================
echo  Vehicle Operations API Monitor
echo ========================================
echo.
echo  Fetching data from: https://vehicle-operations-api-new-6.onrender.com/api/vehicles/
echo  Time: %time%
echo.

curl -s https://vehicle-operations-api-new-6.onrender.com/api/vehicles/

echo.
echo.
echo  Press Ctrl+C to stop monitoring
echo  Next update in 10 seconds...

timeout /t 10 /nobreak > nul
goto loop
