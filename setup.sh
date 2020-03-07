#!/bin/bash

# copy files to 'deployment' location

sudo mkdir /usr/share/dashboard
sudo cp -r ./** /usr/share/dashboard

# setup kiosk mode

sudo echo "
/usr/share/dashboard/setup.sh
/usr/bin/chromium --kiosk --ignore-certificate-errors --disable-restore-session-state \"https://www.google.com\"
" > /etc/xdg/lxsession/LXDE-pi/autostart

# restart computer

sudo reboot
