const { check } = require("express-validator");

module.exports = loginValidations = [
  check("email", "Введите E-Mail")
    .isEmail()
    .withMessage("Неверный E-Mail"),
  check("password", "Укажите пароль")
    .isString()
    .isLength({ min: 8, max: 30 })
    .withMessage(
      "Пароль должен состоять не менее чем из 8 символов и не более 30 символов"
    ),
];
