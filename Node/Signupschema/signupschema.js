const mongoose = require("mongoose");

const registerSchema = mongoose.Schema({
  name: { type: String },
  password: { type: String },
  phone: { type: String },
  email: { type: String },
  mycodes: { type: Array }
});

module.exports = mongoose.model("register
eduser", registerSchema);
