# open-image-feed
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

### Running

Runs like a typical express app:

    npm start


## Directory Layout
    
    server.js           --> app config
    package.json        --> for npm
    public/             --> all of the files to be used in on the client side
      css/              --> css files
        app.css         --> default stylesheet
      img/              --> image files
      js/               --> javascript files
        app.js          --> declare top-level app module
        controllers.js  --> application controllers
        directives.js   --> custom angular directives
        filters.js      --> custom angular filters
        services.js     --> custom angular services
    routes/
      api.js            --> route for serving JSON
      index.js          --> route for serving HTML pages and partials
    views/
      index.jade        --> main page for app
      layout.jade       --> doctype, title, head boilerplate
      partials/         --> angular view partials (partial jade templates)
        home.jade
