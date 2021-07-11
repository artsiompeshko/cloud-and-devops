# cloud-and-devops

## Bash scripts

### Zip client

Navigate to the projcet root and run `./scripts/build-client-zip.sh`.

## Setup and run

### Local machine

In order to run the application in production mode, please run `npm run serve:prod`. It will build client and server apps and then start server app on the specified ENV_PORT.

### With docker

In order to run the application, please install docker and docker-compose on your machine:
`docker-compose up --build`

### building lambda

To build the lambda code:
`npm run build:notifications`

Then output will be in ./src/models/notifications/dist/bundle.js and can be manually deployed in AWS.
