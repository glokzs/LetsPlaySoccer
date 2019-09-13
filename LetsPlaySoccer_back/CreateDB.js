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
    '12',
    '+77779996633',
    'John Doe',
    'asda@sdf.sf',
    'sdfds.jpg',
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
    '12',
    '+77007894512',
    'Harry Potter',
    'asda@sdf.sf',
    'qwer.jpg',
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
    '12',
    '+77011234578',
    'Billy Clang',
    'asdddddddd@sdf.sf',
    'qwer3.jpg',
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
        latitude,
        longitude,
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
        0,
        0,
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
        latitude,
        longitude,
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
        0,
        0,
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
        latitude,
        longitude,
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
        0,
        0,
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
	
`;

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  connection.query(query, function (err, result) {
    if (err) throw err;
    console.log("Result: " , result);
  });
});
