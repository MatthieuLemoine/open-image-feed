# open-image-feed

A open source self-hosted image feed.

### Install

**Install RethinkDB**

    source /etc/lsb-release && echo "deb http://download.rethinkdb.com/apt $DISTRIB_CODENAME main" | sudo tee /etc/apt/sources.list.d/rethinkdb.list
    wget -qO- https://download.rethinkdb.com/apt/pubkey.gpg | sudo apt-key add -
    sudo apt-get update
    sudo apt-get install rethinkdb

**Install dependencies & build**

    npm i
    npm run build

**SSL certificate**

If you don't want to use self-signed certificates see this gist : [How to use Let's encrypt with nginx](https://gist.github.com/MatthieuLemoine/fa827c009ad031459bf2)

**Nginx vhost example**

    server {
      listen 443 ssl;
      server_name example.com;
      ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
      ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;
      ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
      ssl_prefer_server_ciphers on;
      ssl_ciphers 'EECDH+AESGCM:EDH+AESGCM:AES256+EECDH:AES256+EDH';

      location /.well-known/acme-challenge {
        root /var/www/letsencrypt;
      }

      location = /robots.txt {
         alias /var/www/robots/no_robots.txt;
      }

      access_log /var/log/nginx/example.log;
      location / {
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
        proxy_set_header X-NginX-Proxy true;
        proxy_pass_header Set-Cookie;
        proxy_cache_bypass $cookie_nocache $arg_nocache $arg_comment;
        proxy_pass http://localhost:8888;
        proxy_redirect off;
      }
    }
    server {
      listen 80;
      server_name feed.example.com;
      return 301 https://$host$request_uri;
    }

### Run

    npm start


### TODO

- Form validation
- Posts pagination
- RethinkDB auth
