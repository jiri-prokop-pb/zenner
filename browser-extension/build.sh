#!/usr/bin/env bash
#
set -ex

npm install
bun build src/app.ts --outdir dist --format cjs
mv dist/app.js dist/background.js
web-ext build --overwrite-dest