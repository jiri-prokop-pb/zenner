#!/usr/bin/env bash
#
set -ex

cd browser-ipc-bridge
./install.sh
cd ..

cd cli
./install.sh
cd ..

# cd browser-extension
# ./install.sh
# cd ..

# cd raycast
# ./install.sh
# cd ..