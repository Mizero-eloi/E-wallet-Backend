const { Wallet } = require("../models/Wallet");

module.exports.getAllIncomes = async (req, res, next) => {
  // Getting the documents
  const wallet = await Wallet.findById(req.params.walletId);
  if (!wallet) res.status(400).send("wallet does not exist !");
  res.status(200).send(wallet.incomes);
};
