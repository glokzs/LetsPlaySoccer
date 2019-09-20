const {User} = require("../sequelize");

const auth = async (req, res, next) => {
  const token = req.get('Authorization');
  if (!token) {
    return res.status(401).send({message: "Токен не предоставлен"});
  }
  const user = await User.findOne({where: {token}});
  if(!user) {
    return res.status(401).send({message: "Пользователь не найден"});
  }

  req.user = user;
  next();
};

module.exports = auth;
