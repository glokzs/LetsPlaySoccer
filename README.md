 


1. Установить NodeJS и через его установить npm (на сайте NodeJS есть инструкция)
2. Клонирование проекта (git clone git@github.com:RabigaSB/LetsPlaySoccer.git или git clone https://github.com/RabigaSB/LetsPlaySoccer, если нету git'a то устанавливаем его npm i git)
3. Далее в папке lets-play-soccer-front запускаем npm i или yarn add (скачать зависимости)
4. В папке Lets-play-soccer-back запускаем npm i или yarn add (скачать зависимости) 
5. Скачайте MySQL https://www.mysql.com/downloads/
6. Создаёшь базу данных в MySQL с названием LetsPlaySoccer
7. Вводим команду npm run dev в папке Lets-play-soccers-back
8. Запускаем фикстуры (node CreateDb.js)
9. Снова запускаем npm run dev
10. Заходим в config.js В папке lets-play-soccer-front/src и раскомментируем первые пять строчек и кломентируем с 8 по 12 строчки
11. В папке lets-play-soccer-front запускаем команду npm start
