#!/bin/bash

# copy files to deployment location

mkdir /usr/share/dashboard
cp -r -f ./** /usr/share/dashboard

# deploy web app startup script

ln -s -f /etc/init.d/start-dashboard.sh /usr/share/dashboard/start-dashboard.sh

# restart computer

reboot
