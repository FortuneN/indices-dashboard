#!/bin/bash

sudo apt-get purge wolfram-engine scratch scratch2 nuscratch sonic-pi idle3 -y
sudo apt-get purge smartsim java-common minecraft-pi libreoffice* -y

sudo apt-get clean
sudo apt-get autoremove -y

sudo apt-get update
sudo apt-get upgrade

sudo apt-get install xdotool unclutter chromium-browser sed

#echo "
#@xset s off
#@xset -dpms
#@xset s noblank
#@sed -i 's/\"exited_cleanly\": false/\"exited_cleanly\": true/' ~/.config/chromium-browser Default/Preferences
#@chromium-browser --noerrdialogs --kiosk https://blockdev.io --incognito --disable-translate
#" > /etc/xdg/lxsession/LXDE/autostart
#~/.config/lxsession/LXDE-pi/autostart
