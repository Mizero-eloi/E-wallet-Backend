const express = require("express");
const mongoose = require("mongoose");

const app = express();

// Connecting to the database
mongoose
  .connect("mongodb://localhost/e-wallet")
  .then(() => console.log("MONGODB CONNECTED !!"))
  .catch((ex) => console.log("MONGODB CONNECTION FAILED ", ex));

// Initializing a port
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`listening at port ${port}`);
});
