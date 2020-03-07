#!/bin/bash

# copy files to 'deployment' location

mkdir /usr/share/dashboard
cp -r ./** /usr/share/dashboard

# deploy web app startup script

cp ./start-dashboard-app.sh /etc/init.d

# setup kiosk mode

echo "
/usr/bin/chromium --kiosk --ignore-certificate-errors --disable-restore-session-state \"https://www.google.com\"
" > /etc/xdg/lxsession/LXDE-pi/autostart

# restart computer

reboot
