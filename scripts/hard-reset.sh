#!/bin/bash
set -xeuo pipefail
IFS=$'\n\t'

pushd ..

# Clean docker
docker-compose down
docker image prune -f
docker rmi terminal_web_terminal_web || true

# Reinstall npm stuff
rm -rf ./node_modules/ || true
rm package-lock.json || true
npm cache clean --force
npm install

# Rebuild image
docker-compose build --no-cache

popd
