#!/bin/bash

# start web app

cd /usr/share/indices-dashboard
nohup python -m SimpleHTTPServer &

# disable blank screen

xset s noblank
xset s off
xset -dpms

# hide mouse pointer

#unclutter -idle 0.5 -root &

# make sure chromium is never in a catastrophic-exit state

sed -i 's/"exited_cleanly":false/"exited_cleanly":true/' /home/pi/.config/chromium/Default/Preferences
sed -i 's/"exit_type":"Crashed"/"exit_type":"Normal"/' /home/pi/.config/chromium/Default/Preferences

# start chromium

#/usr/bin/chromium-browser --noerrdialogs --disable-infobars --kiosk http://localhost:8000
/usr/bin/chromium-browser http://localhost:8000
