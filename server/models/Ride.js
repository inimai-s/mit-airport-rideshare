const mongoose = require("mongoose");

//define a comment schema for the database
const RideSchema = new mongoose.Schema({
  user_googleid: String,
  user_name: String,
  destination: String,
  mit_location: String,
  start_date: String,
  start_time: String,
  end_date: String,
  end_time: String,
});

// compile model from schema
module.exports = mongoose.model("ride", RideSchema);
