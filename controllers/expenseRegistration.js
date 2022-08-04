const { validateTransactionRegistration, Wallet } = require("../models/Wallet");
const { updateCollectionPushToArray } = require("../services/queries");

module.exports.expenseRegistration = async (req, res, next) => {
  // Validating the user's input
  const { error } = validateTransactionRegistration(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // initializing the expense object
  const expense = {
    label: req.body.label,
    amount: req.body.amount,
    description: req.body.description,
  };

  try {
    updateCollectionPushToArray({
      Collection: Wallet,
      filters: { _id: req.params.walletId },
      array: "expenses",
      updates: expense,
      res,
    });
  } catch (ex) {
    console.log(ex);
    res.status(500).send("Something went wrong!");
  }
};
