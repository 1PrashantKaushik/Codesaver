const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const Router = require("./Router");
const Signuprouter = require("./signuprouter");
const Loginrouter = require("./loginrouter");

app.use(cors());
mongoose.connect("mongodb://localhost:27017/database");

app.use("/", Router);
app.use("/", Signuprouter);
app.use("/", Loginrouter);

app.listen(8081, () => {
  console.log("server is listening at port 8081");
});
