const mongoose = require("mongoose");

//define a comment schema for the database
const RideSchema = new mongoose.Schema({
  user_id: String,
  user_name: String,
  destination: String,
  mit_location: String,
});

// compile model from schema
module.exports = mongoose.model("ride", RideSchema);
