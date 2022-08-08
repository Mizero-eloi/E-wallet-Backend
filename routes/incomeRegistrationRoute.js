const express = require("express");
const { getAllIncomes } = require("../controllers/allIncomes");
const { incomeRegistration } = require("../controllers/incomeRegistration");
const auth = require("../middlewares/auth");
const owner = require("../middlewares/owner");

const router = express.Router();

router.post("/create/:walletId", auth, owner, incomeRegistration);
router.get("/:walletId", auth, owner, getAllIncomes);
module.exports = router;
