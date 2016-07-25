# Open Image Feed

A open source self-hosted real-time :zap: image feed.

## Description :page_facing_up:

Open Image Feed's goal is to provide a ready to run image feed which can be hosted on any server or computer.

### What is an image feed ?

You surely know some image feeds like [9GAG](http://9gag.com).
The idea behind a image feed is to provide an easy way for users to share an image (which can be animated) and to comment other users' posts.

### How OIF differs from others image feeds ?

- **Open source** :octocat: :
    - Everyone can contribute
    - Everybody have free access to it.
- **Self-hosted** :globe_with_meridians: :
    - You need to install it on a server to make your instance accessible for others to use
    - You keep control of your data
    - You can deploy as many instances of OIF that you want : an instance for your work place :office:, another for your friends or familly :house:...
- **Real-time** :zap: :
    - Real-time loading of new posts / comments / likes
    - Real-time reloading of updated posts / comments / likes

![Is this real life ?](http://i.giphy.com/Lgb9p7eXSEcp2.gif)

### Where can i find a live example ?

You can find one at https://oif.matthieulemoine.com.

Please do not hesitate to sign up and post some content.

## Functionalities :blue_book:

- Authentication :lock:
- User profile :man: :woman:
- Posts with image and title
- Comments :pencil2:
- Likes :+1:
- Infinite scroll loading
- Real-time :zap: update thanks to the power of **RethinkDB** & **socket.io**

## Install :electric_plug:

**Install RethinkDB**

    source /etc/lsb-release && echo "deb http://download.rethinkdb.com/apt $DISTRIB_CODENAME main" | sudo tee /etc/apt/sources.list.d/rethinkdb.list
    wget -qO- https://download.rethinkdb.com/apt/pubkey.gpg | sudo apt-key add -
    sudo apt-get update
    sudo apt-get install rethinkdb

**Install dependencies & build**

    npm i
    npm run build

## Run :runner:

    npm start

## Tooling :wrench:

- [React](https://facebook.github.io/react/)
- [Redux](http://redux.js.org/)
- [Node.js](https://nodejs.org)
- [RethinkDB](http://rethinkdb.com/)
- [Thinky](https://thinky.io/)
- [socket.io](http://socket.io/)

## Need help or found a bug :question:

If you need help or found a bug, do not hesitate to open an [issue](https://github.com/MatthieuLemoine/open-image-feed/issues).

## Contribute :pencil:

Feel free to contribute. Every contributions are welcome.
Please read the [contribution guidelines](https://github.com/MatthieuLemoine/open-image-feed/blob/master/CONTRIBUTING.md) first.
