const express = require("express");
const { getAllIncomes } = require("../controllers/allIncomes");

const auth = require("../middlewares/auth");

const router = express.Router();

router.get("/", auth, getAllIncomes);

module.exports = router;
