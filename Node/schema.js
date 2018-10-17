const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String },
  mycodes: { type: Array }
});

module.exports = mongoose.model("users", userSchema);
