const express = require("express");
const app = express.Router();
const bodyParser = require("body-parser");
const api = require("./Api");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/register", async (req, res) => {
  try {
    let exist = false;
    let errors = {};
    let alluser = await api.getherData();
    console.log("All Data are", alluser);
    for (let i = 0; i < alluser.length; i++) {
      if (alluser[i].phone === req.body.phone) {
        errors.phone = "Phone Number Exist";
        exist = true;
      }
      if (alluser[i].email === req.body.email) {
        errors.email = "Email Exist";
        exist = true;
      }
      if (exist) break;
    }
    if (exist) {
      res.send({ errors, isExist: exist });
    } else {
      await api.register(req.body);
      res.send({ message: "Successfully Registered" });
    }
  } catch (err) {
    throw err;
  }
});

module.exports = app;
