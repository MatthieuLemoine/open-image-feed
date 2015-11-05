# open-image-feed
A open source self-hosted image feed.

## How to use

Clone the repository, run `npm install`

### Install

<ul>
    <li>Install npm & Node</li>
    <li>Install Mongo : https://docs.mongodb.org/master/tutorial/install-mongodb-on-ubuntu/</li>
    <li>Create a user in Mongo and a db open-image-feed</li>
    <li>Create a db.js file : <br>     
        
        `echo "module.exports = { 'url' : 'mongodb://username:password@host:port/database }" > db.js`
        
    </li>
</ul>

### Running the app

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
