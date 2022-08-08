const express = require("express");
const { getAllExpenses } = require("../controllers/allExpenses");
const { expenseRegistration } = require("../controllers/expenseRegistration");

const auth = require("../middlewares/auth");
const owner = require("../middlewares/owner");

const router = express.Router();

router.post("/create/:walletId", auth, owner, expenseRegistration);
router.get("/:walletId", auth, owner, getAllExpenses);

module.exports = router;
