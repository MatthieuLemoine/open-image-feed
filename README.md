# open-image-feed

A open source self-hosted image feed.

### Install

**Install RethinkDB**

    source /etc/lsb-release && echo "deb http://download.rethinkdb.com/apt $DISTRIB_CODENAME main" | sudo tee /etc/apt/sources.list.d/rethinkdb.list
    wget -qO- https://download.rethinkdb.com/apt/pubkey.gpg | sudo apt-key add -
    sudo apt-get update
    sudo apt-get install rethinkdb

**Install Horizon**

    npm i -g horizon

**Install dependencies & build**

    npm i
    npm run build
    hz init

***SSL certificate***

Create a self-signed certificate for test purpose using :

    hz create-cert

Or add path to your cert.pem and key.pem in your config.tml

### Run

    npm start
