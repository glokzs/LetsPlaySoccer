module.exports = (sequelize, type) => {
  const Format = sequelize.define(
    'format',
    {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: type.STRING,
        validate: {
          is: {
            args: /^[0-9]{1,2}x[0-9]{1,2}$/,
            msg: "Формат должен быть в таком виде, например 7x7."
          },
          isEqual(value) {
            const formatArray = value.split("x");
            if(formatArray[0] !== formatArray[1]) {
              throw new Error("Формат должен быть в таком виде, например 7x7.");
            }
          }
        },
        unique: {
          msg: "Такой формат уже сущесвует."
        },
      }
    },
    {
      timestamps: false
    }
  );
  return Format;
};