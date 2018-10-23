const mongoose = require("mongoose");

// const userSchema = mongoose.Schema({
//   name: { type: String },
//   mycodes: { type: Array }
// });

const registerSchema = mongoose.Schema({
  name: { type: String },
  password: { type: String },
  phone: { type: String },
  email: { type: String },
  mycodes: { type: Array }
});

// module.exports = mongoose.model("users", userSchema);
module.exports = mongoose.model("users", registerSchema);
