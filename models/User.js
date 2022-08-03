const mongoose = require("mongoose");
const Joi = require("joi");
const config = require("config");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    minlength: 5,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },

  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1000,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
    },
    config.get("jwtPrivateKey")
  );
  return token;
};

const User = mongoose.model("user", userSchema);

const validateUserEntry = (user) => {
  const schema = Joi.object().keys({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(8).required(),
  });

  return schema.validate(user);
};
const validateUserRegistration = (user) => {
  const schema = Joi.object().keys({
    username: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(8).required(),
  });

  return schema.validate(user);
};

const validateUserProfile = (profile) => {
  const schema = Joi.object().keys({
    name: Joi.string().min(5).max(255).required(),
    username: Joi.string().min(5).max(50).required(),
    birthDate: Joi.date().required(),
    gender: Joi.string().min(4).max(50).required(),
    bio: Joi.string(),
  });

  return schema.validate(profile);
};

const checkEmail = (user) => {
  const schema = Joi.object().keys({
    userInput: Joi.string().min(5).max(255).required().email(),
  });

  return schema.validate(user);
};

module.exports.User = User;
module.exports.validateUserRegistration = validateUserRegistration;
module.exports.checkEmail = checkEmail;
module.exports.validateUserEntry = validateUserEntry;
module.exports.validateUserProfile = validateUserProfile;
