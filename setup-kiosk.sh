#!/bin/bash

# copy files to 'deployment' location

mkdir /usr/share/dashboard
cp -r ./** /usr/share/dashboard

# setup kiosk mode

echo "
/usr/share/dashboard/start.sh
/usr/bin/chromium --kiosk --ignore-certificate-errors --disable-restore-session-state \"https://www.google.com\"
" > /etc/xdg/lxsession/LXDE-pi/autostart

# restart computer

reboot
