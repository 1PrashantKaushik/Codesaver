const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const Router = require("./Router");

app.use(cors());
mongoose.connect("mongodb://localhost:27017/database");

app.use("/", Router);

app.listen(8081, () => {
  console.log("server is listening at port 8081");
});
