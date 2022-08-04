const express = require("express");
const { getAllIncomes } = require("../controllers/allIncomes");
const { incomeRegistration } = require("../controllers/incomeRegistration");
const auth = require("../middlewares/auth");

const router = express.Router();

router.post("/create/:walletId", auth, incomeRegistration);
router.get("/:walletId", auth, getAllIncomes);
module.exports = router;
