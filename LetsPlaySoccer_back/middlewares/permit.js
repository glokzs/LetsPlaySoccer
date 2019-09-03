const permit = (...roles) => {
  return (req, res, next) => {
    if(!req.user) {
      return res.status(401).send({message: "Неаутентифицированный пользователь"});
    }
    if(!roles.includes(req.user.role)) {
      return res.status(403).send({message: "Не авторизованный доступ"});
    }
    next();
  }
};

module.exports = permit;
