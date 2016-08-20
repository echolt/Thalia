#!/bin/sh

# Todo:
# Allow different ports
# Check that port isn't being used

echo Hello user, running David Ma\'s nodejs server at localhost, and serving using gulp
echo
sudo node server/index.js $1 $2 &
gulp serve -t -s $1
