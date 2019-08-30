module.exports = (sequelize, type) => {
  const Cover = sequelize.define(
    'cover',
    {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: type.STRING,
        allowNull: false,
        unique: {
          msg: "Такое покрытие уже сущесвует"
        },
        validate: {
          notNull: {
            msg: "Введите покрытие"
          },
          isIn: {
            args: [["Трава", "Каучуковое", "Исскуственная трава", "Резиновое"]],
            msg: "Такого поля не сущесвует"
          }
        }
      }
    },
    {
      timestamps: false
    }
  );
  return Cover;
};