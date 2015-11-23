# open-image-feed [![Build Status](https://travis-ci.org/MatthieuLemoine/open-image-feed.svg)](https://travis-ci.org/MatthieuLemoine/open-image-feed)

A open source self-hosted image feed.

## How to use

Clone the repository, run `npm install`

### Install


**Install npm & Node**

    sudo apt-get install npm
    sudo apt-get install nodejs
    sudo apt-get install nodejs-legacy
**Install Mongo**

    sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
    echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.0.list
    sudo apt-get update
    sudo apt-get install -y mongodb-org
**Create a user in Mongo and a db** (optional)

**Create a db.js file**

    echo "module.exports = { 'url' : 'mongodb://username:password@host:port/database' }" > db.js

**Install Gulp**

    npm install -g gulp

### Running

Build

    gulp dev watch

Run

    npm start

## Directory Layout

    server.js                       --> express server
    package.json                    --> back dependencies
    gulpfile.js                     --> build commands
    .travis.yml                     --> travis config file
    config/                         --> config files
    models/                         --> app models
    public/                         --> angular app
      bower.json                    --> front dependencies
      css/                          --> css files
        app.css                     --> default stylesheet
      img/                          --> image files
      js/                           --> javascript files
        activities/                 --> activities module
        posts/                      --> posts module
        users/                      --> custom angular directives
        openImageFeed.module.js     --> main module
    routes/                         --> routes
    views/
      index.jade                    --> main page for app
      layout.jade                   --> doctype, title, head boilerplate
      partials/                     --> angular view partials (partial jade templates)
        activities/                 --> activities module related view
        posts/                      --> posts module related view
        users/                      --> users module related view
