/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");
const Ride = require("./models/Ride")

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  console.log(`req info: ${JSON.stringify(req.user)}`)
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user)
    socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|
router.get("/rides", (req, res) => {
  // TODO (step1) get all the rides from the database and send response back to client 
  Ride.find({}).then((rides) => res.send(rides));
});

router.post("/ride", (req, res) => {
  // TODO (step1) create a new Ride document and put it into the collection using the model

  // Use req.body for POST request
  let ourRide = new Ride({
    user_googleid:req.body.user_googleid,
    user_name:req.body.user_name,
    photoLink:req.body.photoLink,
    classYear:req.body.classYear,
    destination: req.body.destination,
    meetup_location: req.body.meetup_location,
    start_date: req.body.start_date,
    start_time: req.body.start_time,
    end_date: req.body.end_date,
    end_time: req.body.end_time,
    freshman_box: req.body.freshman_box,
    sophomore_box: req.body.sophomore_box,
    junior_box: req.body.junior_box,
    senior_box: req.body.senior_box,
    extra_ride_info: req.body.extra_ride_info,
  });

  // saves the newStory to MongoDB
  ourRide.save().then((ride) => res.send(ride));;
});

router.post("/updateUser", (req, res) => {
  console.log("Updating user");

  User.findOne({ user_googleid: req.body.user_googleid }).then((existingUser) => {
    console.log("Stuff is happening")
    existingUser.classYear = req.body.classYear;
    existingUser.major = req.body.major;
    existingUser.save();
  });
});



// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
