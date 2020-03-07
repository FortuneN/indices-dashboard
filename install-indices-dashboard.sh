#!/bin/bash

# sudo this script

[ "$UID" -eq 0 ] || exec sudo "$0" "$@"

# install

apt-get install unclutter -y

chmod +x *.sh
mkdir -p /usr/share/indices-dashboard
cp -r -f ./** /usr/share/indices-dashboard
ln -f /usr/share/indices-dashboard/start-indices-dashboard.sh /etc/init.d/start-indices-dashboard.sh

# restart

reboot
