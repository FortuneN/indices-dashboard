#!/bin/bash

# sudo this script

[ "$UID" -eq 0 ] || exec sudo "$0" "$@"

# install

chmod +x *.sh
apt-get install unclutter xdotool -y
mkdir -p /usr/share/indices-dashboard
cp -r -f ./** /usr/share/indices-dashboard
ln -f /usr/share/indices-dashboard/start-indices-dashboard.sh /etc/init.d/start-indices-dashboard.sh

# restart

reboot
