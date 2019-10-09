 


1. Установить NodeJS и через него установить npm (на сайте NodeJS есть инструкция)
2. Клонирование проекта (git clone git@github.com:RabigaSB/LetsPlaySoccer.git или git clone https://github.com/RabigaSB/LetsPlaySoccer, если нету git'a то устанавливаем его)
3. Далее в папке lets-play-soccer-front запускаем npm i или yarn add (скачать зависимости)
4. В папке Lets-play-soccer-back запускаем npm i или yarn add (скачать зависимости) 
5. Скачайте MySQL https://www.mysql.com/downloads/
6. Создаем в корне бэка mysqlpass.js и указваем юзера с паролем к mysql
7. Создаёте базу данных в MySQL с названием LetsPlaySoccer
8. Вводим команду npm run dev в папке Lets-play-soccers-back
9. Запускаем фикстуры (node CreateDb.js)
10. В папке lets-play-soccer-front запускаем команду npm start
