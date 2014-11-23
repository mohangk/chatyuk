#/usr/bin/bash sh

# if vagrant status | grep -q "poweroff"
# then
#   vagrant up
# else
#   echo "vagrant is still running"
# fi


vagrant ssh -c "
  sudo service prosody restart
"
