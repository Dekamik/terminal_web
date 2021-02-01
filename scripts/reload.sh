#!/bin/bash
set -xeuo pipefail
IFS=$'\n\t'

pushd ..

docker-compose down
docker image prune -f
docker-compose build --no-cache
docker-compose up

popd
