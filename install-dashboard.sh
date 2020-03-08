#!/bin/bash

# sudo this script

[ "$UID" -eq 0 ] || exec sudo "$0" "$@"

# ensure all files are readable

chmod -R +r **

# ensure all scripts are executable

chmod -R +x *.sh

# install unclutter

apt-get install unclutter -y

# create and start service

cp -f indices-dashboard.service /lib/systemd/system
systemctl enable indices-dashboard.service
systemctl start  indices-dashboard.service

# restart

reboot
