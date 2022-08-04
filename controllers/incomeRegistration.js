const { Wallet, validateTransactionRegistration } = require("../models/Wallet");
const { updateCollectionPushToArray } = require("../services/queries");
validateTransactionRegistration;

module.exports.incomeRegistration = async (req, res, next) => {
  // Validating the user's input
  const { error } = validateTransactionRegistration(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // initializing the income object
  const income = {
    label: req.body.label,
    amount: req.body.amount,
    description: req.body.description,
  };

  try {
    updateCollectionPushToArray({
      Collection: Wallet,
      filters: { _id: req.params.walletId },
      array: "incomes",
      updates: income,
      res,
    });
  } catch (ex) {
    console.log(ex);
    res.status(500).send("Somethign went wrong!");
  }
};
