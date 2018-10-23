const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const Router = require("./Router");
const Signuprouter = require("./signuprouter");
const Loginrouter = require("./loginrouter");

app.use(cors());
mongoose.connect(
  "mongodb://database:database12@ds231529.mlab.com:31529/database12"
);

app.use("/", Router);
app.use("/", Signuprouter);
app.use("/", Loginrouter);

app.listen(8081, () => {
  console.log("server is listening at port 8081");
});
