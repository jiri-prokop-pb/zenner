#!/usr/bin/env bash
#
set -ex

cd browser-ipc-bridge
./build.sh
cd ..

cd cli
./build.sh
cd ..

cd browser-extension
./build.sh
cd ..

cd raycast
./build.sh
cd ..