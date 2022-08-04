const express = require("express");
const { incomeRegistration } = require("../controllers/incomeRegistration");
const auth = require("../middlewares/auth");

const router = express.Router();

router.post("/create/:walletId", auth, incomeRegistration);

module.exports = router;
