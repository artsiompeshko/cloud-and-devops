#!/usr/bin/env bash

# This script build client angular appplication and zip it

# navigate to the client directory
cd client

# build client app
echo "Building client app..."
npm run build

# zipping client app

# navigate to the /dist
cd dist

# zip
echo "Zipping client app..."
zip -r client.zip .
