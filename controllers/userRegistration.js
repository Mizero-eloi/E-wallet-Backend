const { User, validateUserRegistration } = require("../models/User");
const _ = require("lodash");
const Fawn = require("fawn");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const { Wallet } = require("../models/Wallet");

Fawn.init("mongodb://localhost/e-wallet");
module.exports.userRegistration = async (req, res, next) => {
  // validate the user's given data and return if it is not valid
  const { error } = validateUserRegistration(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // checking if the user  already exists and return it true

  let email = await User.findOne({
    email: req.body.email,
  });

  if (email) return res.status(400).send("Email does already exists !");

  let username = await User.findOne({
    username: req.body.username,
  });

  if (username) return res.status(400).send("Username does already exists !");

  const user = new User(_.pick(req.body, ["email", "password", "username"]));

  // hashing the password
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  // saving the user and providing them token

  // initializing the user's wallet
  const wallet = new Wallet({
    owner: {
      _id: user._id,
      username: user.username,
    },
  });

  try {
    // creating  a fawn task
    new Fawn.Task().save("users", user).save("wallets", wallet).run();

    const token = user.generateAuthToken();
    res
      .header("x-auth-token", token)
      .header("access-control-expose-headers", "x-auth-token")
      .send(_.pick(user, ["email", "username"]));
  } catch (ex) {
    res.status(500).send("Somewhing went wrong !");
    console.log(ex);
  }
};
