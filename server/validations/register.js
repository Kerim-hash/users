const { check } = require("express-validator");

module.exports = registerValidations = [
  check("email", "Введите E-Mail").isEmail().withMessage("Неверный E-Mail"),
  check("username", "Укажите логин").isString().isLength({ min: 2, max: 35 }),
  check("birthday", "укажите дату рождения").isString(),
  check("gender", "укажите пол").isString(),
  check("password", "Укажите пароль")
    .isString()
    .isLength({ min: 8, max: 30 })
    .withMessage(
      "Пароль должен состоять не менее чем из 8 символов и не более 30 символов"
    ),
];
