#!/usr/bin/env bash

# This script build client angular appplication

# remove previous build
echo "Removing static_assets directory..."
rm -r static_assets

# navigate to the client directory
cd client

# build client app
echo "Building client app..."
npm run build
