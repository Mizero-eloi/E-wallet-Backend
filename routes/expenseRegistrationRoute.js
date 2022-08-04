const express = require("express");
const { getAllExpenses } = require("../controllers/allExpenses");
const { expenseRegistration } = require("../controllers/expenseRegistration");

const auth = require("../middlewares/auth");

const router = express.Router();

router.post("/create/:walletId", auth, expenseRegistration);
router.get("/:walletId", auth, getAllExpenses);

module.exports = router;
