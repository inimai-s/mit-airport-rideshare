const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  user_name: String,
  user_googleid: String,
  email: String,
  photoLink: String,
});

// compile model from schema
module.exports = mongoose.model("user", UserSchema);
