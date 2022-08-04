const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connecting to the database
mongoose
  .connect("mongodb://localhost/e-wallet")
  .then(() => console.log("MONGODB CONNECTED !!"))
  .catch((ex) => console.log("MONGODB CONNECTION FAILED ", ex));

app.use("/signup", require("./routes/userRegistrationRoute"));
app.use("/login", require("./routes/userLogInRoute"));
app.use("/wallet", require("./routes/walletRoute"));
app.use("/income", require("./routes/incomeRegistrationRoute"));
app.use("/expense", require("./routes/expenseRegistrationRoute"));

// Initializing a port
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`listening at port ${port}`);
});
