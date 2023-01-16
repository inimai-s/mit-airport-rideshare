const mongoose = require("mongoose");

//define a comment schema for the database
const NewRideSchema = new mongoose.Schema({
  creator_name: String,
  destination: String,
  mit_location: String,
});

// compile model from schema
module.exports = mongoose.model("newRide", NewRideSchema);
