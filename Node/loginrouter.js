const express = require("express");
const app = express.Router();
const bodyParser = require("body-parser");
const api = require("./Api");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/login", async (req, res) => {
  try {
    console.log("Body Comes in Login Router is", req.body);
    let exist = false;
    let errors = {};
    let alluser = await api.getherData();
    for (let i = 0; i < alluser.length; i++) {
      if (
        alluser[i].email === req.body.email &&
        alluser[i].password === req.body.password
      ) {
        exist = true;
        res.send({ message: "Successfully Login", isExist: exist });
      }
    }
    if (exist === false) {
      errors.message = "Please Check Email And Password";
      res.send({ errors, isExist: exist });
    }
  } catch (err) {
    throw err;
  }
});

module.exports = app;
