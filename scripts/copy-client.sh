#!/usr/bin/env bash
# This script copy client application from client/dist to the /static_assets
echo "Copying built client app to the /static_assets"
cp -R ./client/dist static_assets/
