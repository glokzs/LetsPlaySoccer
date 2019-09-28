#!/usr/bin/env bash

cd dir
npm build
scp -r build root@lets-play-soccer.ltestl.com:/root/front
cd -



# поставка бэка
ssh root@lets-play-soccer.ltestl.com <<SSH
  cd back...dir
  git pull
  service back stop
  # migrate
  mysql <<SQL
    drop database xxx
SQL
  run
SSH
