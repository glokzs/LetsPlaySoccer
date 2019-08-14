const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1qaz@WSX29",
    multipleStatements: true
});

const query =
    `
	CREATE DATABASE IF NOT EXISTS LetsPlaySoccer;
	
	use LetsPlaySoccer;
	
	INSERT INTO covers (name) VALUES ('Трава');
	INSERT INTO covers (name) VALUES ('Каучуковое');
	INSERT INTO covers (name) VALUES ('Исскуственная трава');
	INSERT INTO covers (name) VALUES ('Резиновое');

	INSERT INTO types (name) VALUES ('Крытое поле');
	INSERT INTO types (name) VALUES ('Открытое поле');
	
	INSERT INTO formats (name) VALUES ('5x5');
	INSERT INTO formats (name) VALUES ('7x7');
	INSERT INTO formats (name) VALUES ('9x9');

    INSERT INTO fields (
        name, 
        description, 
        address, 
        latitude, 
        longitude, 
        phoneNumber, 
        email, 
        timetable, 
        webSite, 
        covers, 
        formats, 
        types,
        images
    ) 
    VALUES (
        'Жарыс Арена',
        'Жарыс Арена — это воздухоопорный комплекс, открывшийся в сентябре 2017 года, с двумя полями для мини-футбола, которые при желании можно объединить в одно. На полях уложен искусственный газон. Комплекс работает круглосуточно.',
        'ул. Розыбакиева 289/1, блок 33',
        0,
        0,
        '+77009998877',
        'email@test.test',
        '[
            {
                "from":"9:00",
                "to":"12:00",
                "price":5000
            },
            {
                "from":"12:00",
                "to":"15:00",
                "price":4000
            },
            {
                "from":"15:00",
                "to":"20:00",
                "price":7000
            }
        ]',
        'www.examle.com',
        'Трава',
        '["5x5", "7x7", "9x9"]',
        'Крытое поле',
        '["qwerty1.jpg","qwerty2.jpeg","qwerty3.jpeg","qwerty4.jpeg"]'
    );
    INSERT INTO fields (
        name, 
        description, 
        address, 
        latitude, 
        longitude, 
        phoneNumber, 
        email, 
        timetable, 
        webSite, 
        covers, 
        formats, 
        types,
        images
    ) 
    VALUES (
        'Тестовое поле',
        'Жарыс Арена — это воздухоопорный комплекс, открывшийся в сентябре 2017 года, с двумя полями для мини-футбола, которые при желании можно объединить в одно. На полях уложен искусственный газон. Комплекс работает круглосуточно.',
        'ул. Тестовая 244, блок 23',
        0,
        0,
        '+77778001020',
        'hello@fs.mail',
        '[
            {
                "from":"9:00",
                "to":"15:00",
                "price":4000
            },
            {
                "from":"15:00",
                "to":"19:00",
                "price":8000
            },
            {
                "from":"19:00",
                "to":"22:00",
                "price":7000
            }
        ]',
        'www.test.com',
        'Трава',
        '["5x5", "7x7", "9x9"]',
        'Крытое поле',
        '["qwerty5.jpeg","qwerty6.jpeg","qwerty7.jpeg","qwerty8.jpeg"]'
    );
    INSERT INTO fields (
        name, 
        description, 
        address, 
        latitude, 
        longitude, 
        phoneNumber, 
        email, 
        timetable, 
        webSite, 
        covers, 
        formats, 
        types,
        images
    ) 
    VALUES (
        'Hello Арена Huge',
        'Hello Арена Huge — это воздухоопорный комплекс, открывшийся в сентябре 2017 года, с двумя полями для мини-футбола, которые при желании можно объединить в одно. На полях уложен искусственный газон. Комплекс работает круглосуточно.',
        'ул. Розыбакиева 289/1, блок 33',
        0,
        0,
        '+77478901212',
        'hello@hello.kz',
        '[
            {
                "from":"9:00",
                "to":"12:00",
                "price":6000
            },
            {
                "from":"12:00",
                "to":"15:00",
                "price":5000
            },
            {
                "from":"15:00",
                "to":"20:00",
                "price":7000
            }
        ]',
        'www.examle.com',
        'Каучуковое',
        '["5x5", "7x7", "9x9"]',
        'Открытое поле',
        '["qwerty9.jpeg","qwerty10.jpeg","qwerty11.jpeg"]'
    );
	
`;

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    connection.query(query, function (err, result) {
        if (err) throw err;
        console.log("Result: " , result);
    });
});
