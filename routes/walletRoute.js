const express = require("express");
const { walletCreation } = require("../controllers/walletRegistration");
const auth = require("../middlewares/auth");

const router = express.Router();

router.get("/create", auth, walletCreation);

module.exports = router;
