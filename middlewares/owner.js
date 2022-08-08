const { Wallet } = require("../models/Wallet");

module.exports = async (req, res, next) => {
  // checking the owner of the wallet
  const wallet = await Wallet.findById(req.params.walletId);
  if (wallet) {
    const owner = wallet.owner;
    if (owner._id != req.user._id) {
      return res
        .status(400)
        .send("You do not have permission to access this wallet");
    }

    next();
  }
};
