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
  let start_pref_ms = new Date(start_date_pref.concat(" ").concat(start_time_pref));
  let end_pref_ms = new Date(end_date_pref.concat(" ").concat(end_time_pref));
  return ((start_pref_ms<=ride_start_ms) && (ride_start_ms<=end_pref_ms));
};

const checkInInterval = (ride_start_time,ride_end_time, ride_start_date, ride_end_date, start_date_pref,start_time_pref) => {
  let ride_start_ms = new Date(ride_start_date.concat(" ").concat(ride_start_time));
  let ride_end_ms = new Date(ride_end_date.concat(" ").concat(ride_end_time));
  let start_pref_ms = new Date(start_date_pref.concat(" ").concat(start_time_pref));
  return ((ride_start_ms<=start_pref_ms) && (start_pref_ms<=ride_end_ms));
}

const filterByDate = (start_date_pref, end_date_pref, ride_start_date, ride_start_time) => {
  let ride_start_ms = new Date(ride_start_date.concat(" ").concat(ride_start_time));
  let start_pref_ms = new Date(start_date_pref.concat(" ").concat("00:00"));
  let end_pref_ms = new Date(end_date_pref.concat(" ").concat("23:59"));
  return ((start_pref_ms<=ride_start_ms) && (ride_start_ms<=end_pref_ms));
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

router.get("/activeRides", (req, res) => {
  // TODO (step1) get all the rides from the database and send response back to client 
  Ride.find({active: true}).then((rides) => {
    console.log(req.query.user_googleid);
    let unfilledRides=rides.filter(ride => ((!(ride.user_googleId_joined.includes(req.query.user_googleid))) && (ride.user_googleId_joined.length-1)<ride.maxPeople));

    // console.log(`unfilled length: ${unfilledRides.length}`);

    let validClassYearRides = [];

    for(var i=0;i<unfilledRides.length;i++) {
      // console.log(`req.query.classYear: ${req.query.classYear}`);
      if(req.query.classYear === "Freshman") {
        if(unfilledRides[i].freshman_box) {
          validClassYearRides.push(unfilledRides[i]);
          console.log(`length: ${validClassYearRides.length}`);
        }
      } else if (req.query.classYear === "Sophomore") {
        if(unfilledRides[i].sophomore_box) {
          validClassYearRides.push(unfilledRides[i]);
          console.log(`length: ${validClassYearRides.length}`);
        }
      } else if (req.query.classYear === "Junior") {
        if(unfilledRides[i].junior_box) {
          validClassYearRides.push(unfilledRides[i]);
          console.log(`length: ${validClassYearRides.length}`);
        }
      } else if (req.query.classYear === "Senior") {
        if(unfilledRides[i].senior_box) {
          validClassYearRides.push(unfilledRides[i]);
          console.log(`length: ${validClassYearRides.length}`);
        }
      }
    }

    res.send(validClassYearRides);
    });
});

router.get("/inactiveRides", (req, res) => {
  Ride.find({active: false}).then((rides) => res.send(rides));
});

router.get("/getName2",(req,res) => {
  User.findOne({user_googleid:req.query.user_googleid}).then((user) => {
    //console.log(`USER NAME FROM API: ${user.user_name} from ${req.query.user_googleid}`);
    res.send(user);
  });
});

router.get("/filterRides", (req,res) => {
  Ride.find({active: true}).then((rides) => {
    let filter1 = [...rides];
    if (req.query.destination!=="") {
      filter1 = rides.filter(ride => checkDestination(ride.destination,req.query.destination));
    }
    let filter2 = [...filter1];
    if (req.query.start_date!=="" && req.query.start_time==="" && req.query.end_time==="" && req.query.end_date==="") {
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
    if (req.query.start_date!=="" && req.query.end_date!=="" && req.query.start_time==="" && req.query.end_time==="") {
      filter5=filter4.filter(ride => filterByDate(req.query.start_date,req.query.end_date,ride.start_date,ride.start_time));
    }
    let filter6=[...filter5]
    if (req.query.start_time!=="" && req.query.end_time!=="" && req.query.start_date==="" && req.query.end_date==="") {
      filter6=filter5.filter(ride => filterByTime(ride.start_time,ride.end_time,req.query.start_time,req.query.end_time));
    }
    let filter7 = [...filter6];
    if (req.query.start_time!=="" && req.query.start_date!=="" && req.query.end_time==="" && req.query.end_date==="") {
      filter7=filter6.filter(ride => checkInInterval(ride.start_time,ride.end_time, ride.start_date, ride.end_date, req.query.start_date,req.query.start_time));
    }
    let unfilledRides=filter7.filter(ride => (!(ride.user_googleId_joined.includes(req.query.user_googleid)) && (ride.user_googleId_joined.length-1)<ride.maxPeople));
    res.send(unfilledRides);
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
    active: req.body.active,
    most_recent_message: req.body.most_recent_message,
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
    console.log(`req.body ${req.body}`)
    console.log(`req.body.classYear ${req.body.classYear}`)
    console.log(`req.body.major ${req.body.major}`)

    if(req.body.classYear !== ""){
      existingUser.classYear = req.body.classYear;
    }
    
    if(req.body.major !== ""){
      existingUser.major = req.body.major;
    }
    
    existingUser.save();
  }).then(() => {
    res.send({});
  });
});

router.get("/getOneRide",(req,res) =>{
  Ride.findOne({_id:req.query._id}).then((ride) => {
    res.send(ride);
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

router.get("/getActiveJoinedRides", (req, res) => {
  console.log("in get joined rides request");
  joined_rides_list = [];
  console.log(`my google id: ${req.my_googleid}`);
  Ride.find({active: true}).then((rides) => {
    for(var i=0;i<rides.length;i++) {
      if(rides[i].user_googleId_joined.includes(req.query.my_googleid)) {
        joined_rides_list.push(rides[i]);
      }
    }
  }).then(() => {
    res.send(joined_rides_list);
  });
});

router.get("/getInactiveJoinedRides", (req, res) => {
  // console.log("in get joined rides request");
  ride_history_list = [];
  console.log(`my google id: ${req.my_googleid}`);
  Ride.find({active: false}).then((rides) => {
    for(var i=0;i<rides.length;i++) {
      if(rides[i].user_googleId_joined.includes(req.query.my_googleid)) {
        ride_history_list.push(rides[i]);
      }
    }
  }).then(() => {
    res.send(ride_history_list);
  });
});

router.get("/getAllJoinedRides", (req, res) => {
  console.log("in get joined rides request");
  joined_rides_list = [];
  console.log(`my google id: ${req.my_googleid}`);
  Ride.find().then((rides) => {
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

  // console.log("==================================")
  // console.log(`ride_end_date: ${ride_end_date}`);
  // console.log(`ride_end_time: ${ride_end_time}`);

  // console.log(`current_ms: ${current_ms}`);
  // console.log(`ride_ms: ${ride_ms.getTime()}`);

  return current_ms > ride_ms.getTime();
}

router.post("/setRideCardActivity", (req, res) => {
  console.log("Setting expired ride cards to inactive");

  Ride.find({active: true}).then((rides) => {
    for (var i=0;i<rides.length;i++) {
      isExpired = checkIfExpired(rides[i].end_date, rides[i].end_time);
      if(isExpired) {
        // console.log("deleting");
        console.log(`rides[i]: ${rides[i]._id}`);
        rides[i].active = false;
        rides[i].save();
        // Ride.deleteOne({_id: rides[i]._id}).then((student) => console.log("Deleted"));
      }
    }
  }).then(() => {
    res.send({});
  });
});

// Chats

router.get("/chat", (req, res) => {
  let query;

  // get messages that are from me->you OR you->me
  // query = {
  //   $or: [
  //     { "sender._id": req.user._id, "recipient._id": req.query.recipient_id },
  //     { "sender._id": req.query.recipient_id, "recipient._id": req.user._id },
  //   ],
  // };

  Message.find({"recipient._id": req.query.recipient_id}).then((messages) => res.send(messages));
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

  console.log(`JSON stringify of message: ${message}`)

  socketManager.getIo().emit("message", message);
  
  // socketManager.getSocketFromUserID(req.user._id).emit("message", message);
  // if (req.user._id !== req.body.recipient._id) {
  //   socketManager.getSocketFromUserID(req.body.recipient._id).emit("message", message);
  // }
  
});

router.post("/updateMostRecentMessage", (req, res) => {
  Ride.findOne({ _id: req.body._id }).then((existingRide) => {
    const start = new Date(2023,1,1);
    const end = new Date();
    const elapsed = end.getTime() - start.getTime(); // elapsed time in milliseconds

    existingRide.most_recent_message = elapsed;
    existingRide.save();
  }).then(() => {
    res.send({});
  });
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
