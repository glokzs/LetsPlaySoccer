const mysql = require('mysql2');
// create locally file, name it 'mysqlpass.js'
// write following in it:
//-----------------------------------------------
//module.exports = {
//     _user: 'your_sql_user',
//     _password: 'your_sql_password'
// };
//------------------------------------------------
const {_user, _password} = require('./mysqlpass');

const connection = mysql.createConnection({
  host: "localhost",
  user: _user,
  password: _password,
  multipleStatements: true
});

const query =
  `
	CREATE DATABASE IF NOT EXISTS LetsPlaySoccer;
	
	use LetsPlaySoccer;
	
	INSERT INTO users (
    password,
    phoneNumber,
    displayName,
    email,
    avatar,
    role
  ) VALUES (
    '$2b$10$NwDdDQTGWur5NfGZoQPO9uS0/X3u1DHoI7LnYIeUBt6s7vUxuL9uG',
    '+77771112211',
    'Есен Ахметов',
    'test@test.kz',
    'test_user1.jpeg',
    'user'
  );
	
	INSERT INTO users (
    password,
    phoneNumber,
    displayName,
    email,
    avatar,
    role
  ) VALUES (
    '$2b$10$NwDdDQTGWur5NfGZoQPO9uS0/X3u1DHoI7LnYIeUBt6s7vUxuL9uG',
    '+77771112212',
    'Владислав Цой',
    'tsoy@test.kz',
    'test_user2.jpeg',
    'user'
  );
  
  INSERT INTO users (
    password,
    phoneNumber,
    displayName,
    email,
    avatar,
    role
  ) VALUES (
    '$2b$10$NwDdDQTGWur5NfGZoQPO9uS0/X3u1DHoI7LnYIeUBt6s7vUxuL9uG',
    '+77771112213',
    'Геннадий Кадыров',
    'gena@test.kz',
    'test_user3.jpeg',
    'user'
  );
  
  INSERT INTO users (
    password,
    phoneNumber,
    displayName,
    email,
    avatar,
    role
  ) VALUES (
    '$2b$10$NwDdDQTGWur5NfGZoQPO9uS0/X3u1DHoI7LnYIeUBt6s7vUxuL9uG',
    '+77771112214',
    'Абай Ибрагимов',
    'blink@test.kz',
    'test_user5.jpeg',
    'user'
  );
  
    INSERT INTO users (
    password,
    phoneNumber,
    displayName,
    email,
    avatar,
    role
  ) VALUES (
    '$2b$10$NwDdDQTGWur5NfGZoQPO9uS0/X3u1DHoI7LnYIeUBt6s7vUxuL9uG',
    '+77771112215',
    'Кемаль Доронин',
    'football@test.kz',
    'test_user5.jpeg',
    'user'
  );
  
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
        lat,
        lng,
        phoneNumber,
        email,
        timetable,
        webSite,
        formats,
        images,
        minPrice,
        typeId,
        coverId
    )
    VALUES (
        'Жарыс Арена',
        'Жарыс Арена — это воздухоопорный комплекс, открывшийся в сентябре 2017 года, с двумя полями для мини-футбола, которые при желании можно объединить в одно. На полях уложен искусственный газон. Комплекс работает круглосуточно.',
        'ул. Розыбакиева 289/1, блок 33',
        43.24812998918575,
        76.90917719621213,
        '["+77009998877", "+77478964545", "+77773332211"]',
        'email@test.test',
        '{
            "monday":
                [
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
                ],
            "tuesday":
                [
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
                ],
            "wednesday":
                [
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
                ],
            "thursday":
                [
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
                ],
            "friday":
                [
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
                ],
            "saturday":
                [
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
                ],
            "sunday": []
        }',
        'www.examle.com',
        '["5x5", "7x7", "9x9"]',
        '["qwerty1.jpg","qwerty2.jpeg","qwerty3.jpeg","qwerty4.jpeg"]',
        5000,
        1,
        2
    );
    INSERT INTO fields (
        name,
        description,
        address,
        lat,
        lng,
        phoneNumber,
        email,
        timetable,
        webSite,
        formats,
        images,
        minPrice,
        typeId,
        coverId
    )
    VALUES (
        'Тестовое поле',
        'Жарыс Арена — это воздухоопорный комплекс, открывшийся в сентябре 2017 года, с двумя полями для мини-футбола, которые при желании можно объединить в одно. На полях уложен искусственный газон. Комплекс работает круглосуточно.',
        'ул. Тестовая 244, блок 23',
        43.24270181047419,
        76.9339942932129,
        '["+77009998877", "+77478964545", "+77773332211"]',
        'hello@fs.mail',
        '{
            "monday":
                [
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
                ],
            "tuesday":
                [
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
                ],
            "wednesday":
                [
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
                ],
            "thursday":
                [
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
                ],
            "friday":
                [
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
                ],
            "saturday":
                [
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
                ],
            "sunday": []
        }',
        'www.test.com',
        '["5x5", "7x7", "9x9"]',
        '["qwerty5.jpeg","qwerty6.jpeg","qwerty7.jpeg","qwerty8.jpeg"]',
        6000,
        2,
        1
    );
    INSERT INTO fields (
        name,
        description,
        address,
        lat,
        lng,
        phoneNumber,
        email,
        timetable,
        webSite,
        formats,
        images,
        minPrice,
        typeId,
        coverId
    )
    VALUES (
        'Hello Арена Huge',
        'Hello Арена Huge — это воздухоопорный комплекс, открывшийся в сентябре 2017 года, с двумя полями для мини-футбола, которые при желании можно объединить в одно. На полях уложен искусственный газон. Комплекс работает круглосуточно.',
        'ул. Розыбакиева 289/1, блок 33',
        43.25295489540681,
        76.93983078002931,
        '["+77009998877", "+77478964545"]',
        'hello@hello.kz',
        '{
            "monday":
                [
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
                ],
            "tuesday":
                [
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
                ],
            "wednesday":
                [
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
                ],
            "thursday":
                [
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
                ],
            "friday":
                [
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
                ],
            "saturday":
                [
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
                ],
            "sunday":
                [
                    {
                        "from":"9:00",
                        "to":"12:00",
                        "price":5000
                    },
                    {
                        "from":"12:00",
                        "to":"15:00",
                        "price":4000
                    }
                ]
        }',
        'www.examle.com',
        '["5x5", "7x7"]',
        '["qwerty9.jpeg","qwerty10.jpeg","qwerty11.jpeg"]',
        4500,
        1,
        4
    );
    
    
    
    INSERT INTO fields (
        name,
        description,
        address,
        lat,
        lng,
        phoneNumber,
        email,
        timetable,
        webSite,
        formats,
        images,
        minPrice,
        typeId,
        coverId
    )
    VALUES (
        'Футбольное поле Каравелла',
        'Футбольное поле Каравелла — это воздухоопорный комплекс, открывшийся в сентябре 2017 года, с двумя полями для мини-футбола, которые при желании можно объединить в одно. На полях уложен искусственный газон. Комплекс работает круглосуточно.',
        'Адрес: мкр 1, ул. Жубанова 18Б, между Саина и Алтынсарина (Правды)',
        43.26812998918575,
        76.92917719621213,
        '["+77009998877", "+77478964545", "+77773332211"]',
        'email@test.test',
        '{
            "monday":
                [
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
                ],
            "tuesday":
                [
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
                ],
            "wednesday":
                [
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
                ],
            "thursday": [],
            "friday":
                [
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
                ],
            "saturday":
                [
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
                ],
            "sunday": []
        }',
        'www.examle.com',
        '["5x5", "7x7", "9x9"]',
        '["qwerty1.jpg","qwerty2.jpeg","qwerty3.jpeg","qwerty4.jpeg"]',
        5000,
        1,
        2
    );
    INSERT INTO fields (
        name,
        description,
        address,
        lat,
        lng,
        phoneNumber,
        email,
        timetable,
        webSite,
        formats,
        images,
        minPrice,
        typeId,
        coverId
    )
    VALUES (
        'Футбольное поле на территории "АУЭС"',
        'Футбольное поле на территории "АУЭС" — это воздухоопорный комплекс, открывшийся в сентябре 2017 года, с двумя полями для мини-футбола, которые при желании можно объединить в одно. На полях уложен искусственный газон. Комплекс работает круглосуточно.',
        'Алматы, ул.Байтурсынова, 126',
        43.23295489540681,
        76.93983078002931,
        '["+77009998877", "+77478964545", "+77773332211"]',
        'hello@fs.mail',
        '{
            "monday":
                [
                    {
                        "from":"6:00",
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
                ],
            "tuesday":
                [
                    {
                        "from":"9:00",
                        "to":"12:00",
                        "price":5000
                    },
                    {
                        "from":"12:00",
                        "to":"15:00",
                        "price":4000
                    }
                ],
            "wednesday":
                [
                    {
                        "from":"9:00",
                        "to":"12:00",
                        "price":5000
                    },
                    {
                        "from":"12:00",
                        "to":"15:00",
                        "price":4000
                    }
                ],
            "thursday":
                [
                    {
                        "from":"9:00",
                        "to":"12:00",
                        "price":4000
                    },
                    {
                        "from":"12:00",
                        "to":"18:00",
                        "price":9000
                    },
                    {
                        "from":"18:00",
                        "to":"23:00",
                        "price":7000
                    }
                ],
            "friday":
                [
                    {
                        "from":"7:00",
                        "to":"13:00",
                        "price":8000
                    },
                    {
                        "from":"14:00",
                        "to":"15:00",
                        "price":9000
                    },
                    {
                        "from":"15:00",
                        "to":"20:00",
                        "price":7000
                    }
                ],
            "saturday": [],
            "sunday": []
        }',
        'www.test.com',
        '["5x5", "7x7", "9x9"]',
        '["qwerty5.jpeg","qwerty6.jpeg","qwerty7.jpeg","qwerty8.jpeg"]',
        6000,
        2,
        1
    );
    INSERT INTO fields (
        name,
        description,
        address,
        lat,
        lng,
        phoneNumber,
        email,
        timetable,
        webSite,
        formats,
        images,
        minPrice,
        typeId,
        coverId
    )
    VALUES (
        'Спартак в парке ЦПКиО',
        'Мини-футбольное поле Спартак в парке ЦПКиО — это воздухоопорный комплекс, открывшийся в сентябре 2017 года, с двумя полями для мини-футбола, которые при желании можно объединить в одно. На полях уложен искусственный газон. Комплекс работает круглосуточно.',
        'Территория парка им. Горького въезд с ул. Орманова',
        43.24295489540681,
        76.94983078002931,
        '["+77009998877", "+77478964545"]',
        'hello@hello.kz',
        '{
            "monday":
                [
                    {
                        "from":"6:00",
                        "to":"18:00",
                        "price":5000
                    },
                    {
                        "from":"18:00",
                        "to":"23:00",
                        "price":10000
                    },
                    {
                        "from":"23:00",
                        "to":"06:00",
                        "price":7000
                    }
                ],
            "tuesday":
                [
                    {
                        "from":"9:00",
                        "to":"12:00",
                        "price":5000
                    },
                    {
                        "from":"12:00",
                        "to":"15:00",
                        "price":6000
                    },
                    {
                        "from":"15:00",
                        "to":"20:00",
                        "price":10000
                    }
                ],
            "wednesday":
                [
                    {
                        "from":"7:00",
                        "to":"14:00",
                        "price":6000
                    },
                    {
                        "from":"14:00",
                        "to":"19:00",
                        "price":4000
                    },
                    {
                        "from":"19:00",
                        "to":"22:00",
                        "price":7000
                    }
                ],
            "thursday":
                [
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
                ],
            "friday":
                [
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
                ],
            "saturday":
                [
                    {
                        "from":"9:00",
                        "to":"12:00",
                        "price":5000
                    },
                    {
                        "from":"12:00",
                        "to":"15:00",
                        "price":4000
                    }
                ],
            "sunday":
                [
                    {
                        "from":"9:00",
                        "to":"12:00",
                        "price":5000
                    },
                    {
                        "from":"12:00",
                        "to":"15:00",
                        "price":4000
                    }
                ]
        }',
        'www.examle.com',
        '["5x5", "7x7"]',
        '["qwerty9.jpeg","qwerty10.jpeg","qwerty11.jpeg"]',
        4500,
        1,
        4
    );
    

	
`;

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  connection.query(query, function (err, result) {
    if (err) throw err;
    console.log("Result: " , result);
    connection.destroy();
  });
});

