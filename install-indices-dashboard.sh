#!/bin/bash

# demand higher privilage

[ "$UID" -eq 0 ] || exec sudo "$0" "$@"

# install

chmod +x *.sh
mkdir -p /usr/share/indices-dashboard
cp -r -f ./** /usr/share/indices-dashboard
ln -s -f /etc/init.d/start-indices-dashboard.sh /usr/share/indices-dashboard/start-indices-dashboard.sh

# restart

reboot
