# room-temperature-rpi
Simple Node JS web application making use of rpi-temp to display the local temperature.

# to run
node ./server.js

# to run even when there are no active terminals
node ./server.js
Press 'ctrl+z' to pause the process.
Enter 'bg' to resume the process in the background.
Enter 'disown' to make sure the process keeps running.
To stop the process, use 'ps -e  | grep node' to find the correct PID,
and 'kill <PID>' to stop the process.
