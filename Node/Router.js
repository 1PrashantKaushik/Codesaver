const express = require("express");
const app = express.Router();
const bodyParser = require("body-parser");
const api = require("./Api");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/userdata", async (req, res) => {
  try {
    console.log("..>>>", req.body);
    await api.save(req.body);
    res.send({ status: 200 });
  } catch (err) {
    res.send({ status: 400 });
  }
});

app.post("/retrievedata", async (req, res) => {
  try {
    console.log("It's Running===>>");
    let alldatafromdb = await api.getherAllData(req.body);
    res.send({ data: alldatafromdb });
  } catch (err) {
    res.send({ error: "Data not found" });
  }
});

app.post("/deletelistitem", async (req, res) => {
  try {
    console.log("....<<<<<<", req.body);
    await api.delete(req.body);
    res.send({ status: 200 });
  } catch (err) {
    res.send({ status: err });
  }
});

app.post("/editlistitem", async (req, res) => {
  try {
    console.log("The data Item Coming for Edit ", req.body);
    await api.edit(req.body);
    res.send({ status: 200 });
  } catch (err) {
    res.send({ status: 404 });
  }
});
module.exports = app;
