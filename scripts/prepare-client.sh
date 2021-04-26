#!/usr/bin/env bash

# This script prepare client assets and put them into static_assets
sh ./scripts/build-client.sh
sh ./scripts/copy-client.sh

echo "Client app build is finished"

