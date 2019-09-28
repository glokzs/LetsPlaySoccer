#!/usr/bin/env bash

cd lets_play_soccer-front
npm run build
scp -r build root@lets-play-soccer.ltestl.com:/root/front



# поставка бэка
ssh root@lets-play-soccer.ltestl.com <<SSH
  cd lets-play-soccer.ltestl.com/LetsPlaySoccer
  git pull
  cd LetsPlaySoccer_back
  npm i
  mysql -u root -ppassword10 <<SQL
    drop database LetsPlaySoccer;
    create database LetsPlaySoccer;
    use LetsPlaySoccer;
SQL
  pm2 restart server.js
  node CreateDB.js
SSH
