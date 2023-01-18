const mongoose = require("mongoose");

//define a comment schema for the database
const RideSchema = new mongoose.Schema({
  user_googleid: String,
  user_name: String,
  photoLink:String,
  classYear:String,
  destination: String,
  meetup_location: String,
  start_date: String,
  start_time: String,
  end_date: String,
  end_time: String,
  freshman_box: Boolean,
  sophomore_box: Boolean,
  junior_box: Boolean,
  senior_box: Boolean,
  extra_ride_info: String,
});

// compile model from schema
module.exports = mongoose.model("ride", RideSchema);
