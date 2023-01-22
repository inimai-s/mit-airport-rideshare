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

router.get("/filterRides",(req,res)=>{
  Ride.find({destination: req.query.destination, start_date: req.query.start_date, end_date: req.query.end_date, end_time: req.query.end_time, freshman_box:req.query.freshman_box, sophomore_box:req.query.sophomore_box, junior_box: req.query.junior_box, senior_box:req.query.senior_box}).then((rides) => res.send(rides));
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
    maxPeople: req.body.maxPeople,
    freshman_box: req.body.freshman_box,
    sophomore_box: req.body.sophomore_box,
    junior_box: req.body.junior_box,
    senior_box: req.body.senior_box,
    extra_ride_info: req.body.extra_ride_info,
    user_googleId_joined: req.body.user_googleId_joined,
  });

  // saves the newStory to MongoDB
  ourRide.save().then((ride) => res.send(ride));;
});

router.get("/user_classYear_major", (req, res) => {
  // req.query for GET requests
  console.log(`user_googleid to look for: ${req.query.user_googleid}`);
  User.find({user_googleid: req.query.user_googleid}).then((users) => {
    if(users.length >0){
      const user=users[0];
      const user_classYear_major={classYear:user.classYear,major:user.major};
      res.send(user_classYear_major);
    }else{
      res.send({});
    }
  });
});

router.get("/users", (req, res) => {
  // req.query for GET requests
  console.log(`user_googleid to look for: ${req.query.user_googleid}`);
  User.find({user_googleid: req.query.user_googleid}).then((users) => res.send(users));
});

router.post("/updateUser", (req, res) => {
  console.log("Updating user");

  User.findOne({ user_googleid: req.body.user_googleid }).then((existingUser) => {
    console.log("Updating user info")
    existingUser.classYear = req.body.classYear;
    existingUser.major = req.body.major;
    existingUser.save();
  }).then(() => {
    res.send({});
  });
});

router.post("/joinRide", (req, res) => {
  console.log("Joining a Ride");

  Ride.findOne({_id: req.body._id}).then((ride) => {
    ride.user_googleId_joined.push(req.body.my_googleid);
    ride.save();
  }).then(() => {
    res.send({});
  });
});

router.post("/leaveRide", (req, res) => {
  console.log("Leaving a Ride");

  Ride.findOne({_id: req.body._id}).then((ride) => {
    const index = ride.user_googleId_joined.indexOf(req.body.my_googleid);
    ride.user_googleId_joined.splice(index, 1);
    ride.save();
  }).then(() => {
    res.send({});
  });
});

router.get("/getJoinedRides", (req, res) => {
  console.log("in get joined rides request");
  joined_rides_list = [];
  console.log(`my google id: ${req.my_googleid}`);
  Ride.find({}).then((rides) => {
    for(var i=0;i<rides.length;i++) {
      if(rides[i].user_googleId_joined.includes(req.query.my_googleid)) {
        joined_rides_list.push(rides[i]);
      }
    }
  }).then(() => {
    res.send(joined_rides_list);
  });
});

const checkIfExpired = (ride_end_date, ride_end_time) => {
  // returns a boolean: true if the current time is past the endDate + endTime
  let current_ms = Date.now();
  let ride_ms = new Date(ride_end_date.concat(" ").concat(ride_end_time));

  return current_ms > ride_ms;
}

router.get("/deleteRideCard", (req, res) => {
  console.log("Deleting expired ride cards");

  Ride.find({}).then((rides) => {
    for (var i=0;i<rides.length;i++) {
      isExpired = checkIfExpired(rides[i].end_date, rides[i].end_time);
      if(isExpired) {
        console.log("deleting");
        console.log(`rides[i]: ${rides[i]._id}`);
        Ride.deleteOne({_id: rides[i]._id}).then((student) => console.log("Deleted"));
      }
    }
  })
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
