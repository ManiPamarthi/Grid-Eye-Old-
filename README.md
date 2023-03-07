# Grid-Eye-Old-

# GridEye Central Web Application

GridEye Central Web Application

## Table of Contents

- [Prerequisites](#prerequisites)
- [Local Setup](#local-setup)
- [Build](#build)

## Prerequisites
- Clone this repository into your machine using any git desktop client or command line.
- Install the recommended and stable version of Node.js, preferably 14.x.
- *Optional:* Install [nvm](https://github.com/creationix/nvm) for managing multiple versions of Node.js if needed.

## Local Setup
- Go to the cloned repository code directory on your machine.<br />
- Run `npm install` to install all the dependencies.<br />
- Then run `npm start` which runs the web application locally.

After launching the application, you will be presented with the dashboard screen on the following URL:

`http://localhost:3000/`

## Build

- Run `npm run-script build` to build the production ready version of this web application, corresponding build files gets generated under the 'build' folder of the base directory.

## Nginx

- Nginx settings are available in a config file '.nginx.conf' under the base directory.
