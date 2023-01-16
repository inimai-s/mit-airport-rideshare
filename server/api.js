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
const NewRide = require("./models/newRide")

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
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
router.get("/newRides", (req, res) => {
  // TODO (step1) get all the newRides from the database and send response back to client 
  NewRide.find({}).then((newRides) => res.send(newRides));
});

router.post("/newRide", (req, res) => {
  // TODO (step1) create a new NewRide document and put it into the collection using the model
  
  // Use req.body for POST request
  const ourRide = new NewRide({
    creator_name:req.body.creator_name,
    destination: req.body.destination,
    mit_location: req.body.mit_location,
  });

  // saves the newStory to MongoDB
  ourRide.save().then((newRide) => res.send(newRide));
});


// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
