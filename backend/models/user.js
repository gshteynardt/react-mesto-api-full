const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const isEmail = require('validator/lib/isEmail');
const isURL = require('validator/lib/isURL');
const UnauthorizedErr = require('../errors/unauthorized-err');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: [true, 'email must be unique'],
    validate: {
      validator: (value) => isEmail(value),
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    select: false,
  },
  name: {
    type: String,
    required: false,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    required: false,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    required: false,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (value) => isURL(value),
      message: (props) => `${props.value} is not a valid avatar url!`,
    },
  },
});

userSchema.statics.findUsersByCredentials = async function (email, password) {
  try {
    const user = await this.findOne({ email }).select('+password');
    if (!user) {
      throw new UnauthorizedErr('Неправильные почта или пароль');
    }

    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      throw new UnauthorizedErr('Неправильные почта или пароль');
    }
    return user;
  } catch (err) {
    return err;
  }
  return null;
};

module.exports = mongoose.model('user', userSchema);
