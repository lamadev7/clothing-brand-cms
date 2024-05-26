#  11VERSE-API PAYLOAD-CMS

## Deployment [Ubuntu OS]

- Enter into vps terminal using SSH

```bash
  ssh root@192.00.00.00
```

- Update apt package manager

```bash
  sudo apt-get update
```


- Install NPM package manager

```bash
  sudo apt-get install npm
```

- Install NVM (n) which is used to install and switch node version

```bash
  npm i -g n
```

- Install git

```bash
  sudo apt-get install git
```

- Generate SSH key fingerprints using ssh-keygen

```bash
  ssh-keygen -t rsa -b 4096 -C "abc@gmail.com"
```

- Copy the id_rsa.pub file fingerprint and create new ssh key in github settings>SSH AND GPG KEY and paste the fingerprints.

- Clone your project using git

```bash
  git clone ssh://github/your_project
```

- Open your project directory and install all depedency located in package.json

```bash
  cd project_name

  npm install
```


- Create new .env file and paste .env value from your local machine

```bash
  touch .env

  vim .env

  # paste your .env value and save

```

- Now, start your project

```bash
    npm start
```




## Setup Firewall

- Enable Firewall

```bash
  sudo ufw enable 

```

- Check if firwall status is active or not
```bash
  sudo ufw status
```

- Allow port
```bash
  sudo ufw allow ssh (Port 22)
  sudo ufw allow http (Port 80)
  sudo ufw allow https (Port 443)
```

## Setup Nginx Proxy Server
- Install Nginx
```bash
  sudo apt install ngnix
```

- Open default nginx config file inside /etc/ngnix/sites-available using vim
```bash
  vim /etc/nginx/sites-available/default
```

- Paste this default configuration
```bash
  server {
        listen 80 default_server;
        listen [::]:80 default_server;

        # SSL configuration

        root /var/www/html;

        # Add index.php to the list if you are using PHP
        index index.html index.htm index.nginx-debian.html;

        server_name _;

        location / {
          proxy_pass http://localhost:9000/;
          proxy_http_version 1.1;
          proxy_set_header Upgrade $http_upgrade;
          proxy_set_header Connection 'upgrade';
          proxy_set_header Host $host;
          proxy_cache_bypass $http_upgrade;
        }
  }
```

## Setup SSL Certificates using certbot
- Install certbot
```bash
  sudo add-apt-repository ppa:certbot/certbot
  sudo apt-get update
```

- Install apt-get
```bash
  sudo apt-get update
```

- Install python certbot using apt-get
```bash
  sudo apt-get install python3-certbot-nginx
```

- Install python certbot using apt-get
```bash
  sudo apt-get install python3-certbot-nginx
```

- Apply link to your domain
