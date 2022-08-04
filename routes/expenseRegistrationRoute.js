const express = require("express");
const { expenseRegistration } = require("../controllers/expenseRegistration");

const auth = require("../middlewares/auth");

const router = express.Router();

router.post("/create/:walletId", auth, expenseRegistration);

module.exports = router;
