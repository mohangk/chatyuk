#!/usr/bin/env bash

echo '---------------------------------------------------------------------------------------';
echo 'This provisioning script assumes a fresh box and will fail if run on a provisioned box.'; 
echo 'If you want to reprovision please destroy your box and run again.';
echo '---------------------------------------------------------------------------------------';

#1. add deb repo for latest prosody. Warning - removes any old prosody sources
sudo rm /var/lib/apt/lists/packages.prosody*

echo deb http://packages.prosody.im/debian $(lsb_release -sc) main | sudo tee -a /etc/apt/sources.list
wget https://prosody.im/files/prosody-debian-packages.key -O- | sudo apt-key add -
sudo apt-get update
sudo apt-get install prosody -y

#2. Prosody config change. Warning - blows aways any local changes
sudo cp /vagrant/configs/prosody.cfg.lua /etc/prosody/prosody.cfg.lua

#3. Start prosody
sudo service prosody restart
