const { Wallet } = require("../models/Wallet");

module.exports.walletCreation = async (req, res, next) => {
  try {
    // getting the logged in user
    const user = req.user;
    // initializing the user's wallet
    const wallet = new Wallet({
      owner: {
        _id: user._id,
        username: user.username,
      },
      isAdmin: true,
    });

    // creating the wallet
    await wallet.save();
    res.status(200).send(wallet);
  } catch (err) {
    res.status(500).send("Something went wrong");
    console.log(err);
  }
};
