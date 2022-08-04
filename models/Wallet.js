const mongoose = require("mongoose");
const Joi = require("joi");

const walletSchema = new mongoose.Schema({
  owner: {
    type: new mongoose.Schema({
      username: {
        type: String,
        minlength: 5,
        maxlength: 50,
        required: true,
      },
    }),
  },

  incomes: {
    type: [
      new mongoose.Schema({
        label: {
          type: String,
          minlength: 5,
          maxlength: 50,
          required: true,
        },
        amount: {
          type: Number,
          minlength: 5,
          maxlength: 50,
          required: true,
        },
        description: {
          type: String,
          minlength: 5,
          maxlength: 100,
          required: true,
        },
        dateCreated: {
          type: Date,
          required: true,
        },
      }),
    ],
  },
  expenses: {
    type: [
      new mongoose.Schema({
        label: {
          type: String,
          minlength: 5,
          maxlength: 50,
          required: true,
        },
        amount: {
          type: Number,
          minlength: 5,
          maxlength: 50,
          required: true,
        },
        description: {
          type: String,
          minlength: 5,
          maxlength: 100,
          required: true,
        },
        dateCreated: {
          type: Date,
          required: true,
        },
      }),
    ],
  },
  dateCreated: {
    type: Date,
    default: Date.now(),
    required: true,
  },
});

const Wallet = mongoose.model("wallet", walletSchema);

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

module.exports.Wallet = Wallet;
module.exports.validateUserRegistration = validateUserRegistration;
module.exports.checkEmail = checkEmail;
module.exports.validateUserEntry = validateUserEntry;
module.exports.validateUserProfile = validateUserProfile;
