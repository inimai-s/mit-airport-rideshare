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
const Ride = require("./models/Ride");
const Message = require("./models/message");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");
const { listen } = require("socket.io");
const { length } = require("file-loader");

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

const checkTime = (ride_start_date, ride_start_time, ride_end_date, ride_end_time, start_date_pref, start_time_pref, end_date_pref, end_time_pref) => {
  let ride_start_ms = new Date(ride_start_date.concat(" ").concat(ride_start_time));
  let ride_end_ms = new Date(ride_end_date.concat(" ").concat(ride_end_time));
  let start_pref_ms = new Date(start_date_pref.concat(" ").concat(start_time_pref));
  let end_pref_ms = new Date(end_date_pref.concat(" ").concat(end_time_pref));
  return ((ride_start_ms<=end_pref_ms) && (ride_end_ms>=start_pref_ms));
};

const checkInInterval = (ride_start_time,ride_end_time, ride_start_date, ride_end_date, start_date_pref,start_time_pref) => {
  let ride_start_ms = new Date(ride_start_date.concat(" ").concat(ride_start_time));
  let ride_end_ms = new Date(ride_end_date.concat(" ").concat(ride_end_time));
  let start_pref_ms = new Date(start_date_pref.concat(" ").concat(start_time_pref));
  return ((ride_start_ms<=start_pref_ms) && (start_pref_ms<=ride_end_ms));
}

const filterByTime = (ride_start_time, ride_end_time, start_time_pref, end_time_pref) => {
  let ride_start_date="2023-01-01";
  let ride_end_date = "2023-01-01";
  let start_date_pref="2023-01-01";
  let end_date_pref="2023-01-01";
  let ride_start_ms = new Date(ride_start_date.concat(" ").concat(ride_start_time));
  let ride_end_ms = new Date(ride_end_date.concat(" ").concat(ride_end_time));
  if (ride_start_ms>ride_end_ms) {
    ride_end_date="2023-01-02";
  }
  let start_pref_ms = new Date(start_date_pref.concat(" ").concat(start_time_pref));
  let end_pref_ms = new Date(end_date_pref.concat(" ").concat(end_time_pref));
  if (start_pref_ms>end_pref_ms) {
    end_date_pref="2023-01-02";
  }
  return checkTime(ride_start_date,ride_start_time,ride_end_date,ride_end_time,start_date_pref,start_time_pref,end_date_pref,end_time_pref);
};

const checkClassYear = (ride_class_year, pref_f, pref_sph, pref_j, pref_s) => {
  let canRide = false;
  if ((ride_class_year==="Freshman") && (pref_f==="true")) {
    canRide = true;
  }
  else if ((ride_class_year==="Sophomore") && (pref_sph==="true")) {
    canRide = true;
  }
  else if ((ride_class_year==="Junior") && (pref_j==="true")) {
    canRide = true;
  }
  else if ((ride_class_year==="Senior") && (pref_s==="true")) {
    canRide = true;
  }
  return canRide;
};

const checkDestination = (ride_destination, pref_destination) => {
  return (ride_destination === pref_destination);
};

router.get("/rides", (req, res) => {
  // TODO (step1) get all the rides from the database and send response back to client 
  Ride.find({}).then((rides) => res.send(rides));
});

router.get("/filterRides", (req,res) => {
  Ride.find({}).then((rides) => {
    let filter1 = [...rides];
    if (req.query.destination!=="") {
      filter1 = rides.filter(ride => checkDestination(ride.destination,req.query.destination));
    }
    let filter2 = [...filter1];
    if (req.query.start_date!=="") {
      filter2=filter1.filter(ride => (ride.start_date===req.query.start_date));
    }
    let filter3 = [...filter2];
    if ((req.query.freshman_box==="true") || (req.query.sophomore_box==="true") || (req.query.junior_box==="true") || (req.query.senior_box==="true")) {
      filter3=filter2.filter(ride => checkClassYear(ride.classYear,req.query.freshman_box,req.query.sophomore_box,req.query.junior_box,req.query.senior_box));
    }
    let filter4 = [...filter3];
    if (req.query.start_date!=="" && req.query.end_date!=="" && req.query.start_time!=="" && req.query.end_time!=="") {
      filter4 = filter3.filter(ride => checkTime(ride.start_date,ride.start_time,ride.end_date,ride.end_time,req.query.start_date,req.query.start_time,req.query.end_date,req.query.end_time));
    }
    let filter5=[...filter4]
    if (req.query.start_date!=="" && req.query.end_date!=="") {
      filter5=filter4.filter(ride => (ride.start_date===req.query.start_date && ride.end_date===req.query.end_date));
    }
    let filter6=[...filter5]
    if (req.query.start_time!=="" && req.query.end_time!=="" && req.query.start_date==="" && req.query.end_date==="") {
      filter6=filter5.filter(ride => filterByTime(ride.start_time,ride.end_time,req.query.start_time,req.query.end_time));
    }
    let filter7 = [...filter6];
    if (req.query.start_time!=="" && req.query.start_date!=="" && req.query.end_time==="" && req.query.end_date==="") {
      filter7=filter6.filter(ride => checkInInterval(ride.start_time,ride.end_time, ride.start_date, ride.end_date, req.query.start_date,req.query.start_time));
    }
    res.send(filter7);
  }); 
});


//router.get("/filterRides",(req,res)=>{
//  Ride.find({destination: req.query.destination, start_date: req.query.start_date, end_date: req.query.end_date, end_time: req.query.end_time, freshman_box:req.query.freshman_box, sophomore_box:req.query.sophomore_box, junior_box: req.query.junior_box, senior_box:req.query.senior_box}).then((rides) => res.send(rides));
//});

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

// Chats

router.get("/chat", (req, res) => {
  let query;

  // get messages that are from me->you OR you->me
  query = {
    $or: [
      { "sender._id": req.user._id, "recipient._id": req.query.recipient_id },
      { "sender._id": req.query.recipient_id, "recipient._id": req.user._id },
    ],
  };

  Message.find(query).then((messages) => res.send(messages));
});

router.post("/message", auth.ensureLoggedIn, (req, res) => {
  console.log(`Received a chat message from ${req.user.user_name}: ${req.body.content}`);

  // insert this message into the database
  const message = new Message({
    recipient: req.body.recipient,
    sender: {
      _id: req.user._id,
      user_name: req.user.user_name,
    },
    content: req.body.content,
  });
  message.save();

  socketManager.getSocketFromUserID(req.user._id).emit("message", message);
  if (req.user._id !== req.body.recipient._id) {
    socketManager.getSocketFromUserID(req.body.recipient._id).emit("message", message);
  }
  
});

router.get("/activeUsers", (req, res) => {
  res.send({ activeUsers: socketManager.getAllConnectedUsers() });
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
