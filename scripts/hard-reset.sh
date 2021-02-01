#!/bin/bash
set -uo pipefail
IFS=$'\n\t'

set -x

pushd ..

# Clean docker
docker-compose down
docker image prune -f
docker rmi terminal_web_terminal_web

# Re-install NPM stuff
rm -rf ./node_modules/
rm package-lock.json
npm cache clean --force
npm install

# Rebuild image
docker-compose build --no-cache
docker-compose up

popd
