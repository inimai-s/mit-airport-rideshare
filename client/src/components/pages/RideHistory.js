import React, { useState, useEffect } from "react";

import "./RideHistory.css";

import { get } from "../../utilities";
import { post } from "../../utilities";

import { Link } from "@reach/router";

import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import RideHistoryCard from "../modules/RideHistoryCard";

const RideHistory = (props) => {

  const [oldRides, setOldRides] = useState([]);

  const query = {
    my_googleid: props.user_googleid,
  };

  get("/api/getInactiveJoinedRides", query).then((rideObjs) => {
    console.log("getting ride history list");
    console.log(`props.user_googleid for MyProfile.js: ${props.user_googleid}`)
    let reversedRideObjs = rideObjs.reverse();
    setOldRides(reversedRideObjs);
  });

  let rideHistoryModal = null;
  const hasJoinedRides = oldRides.length !== 0;
  if (hasJoinedRides) {
    rideHistoryModal = oldRides.map((rideObj) => (
      <RideHistoryCard
        key={`RideHistoryCard_${rideObj._id}`}
        _id={rideObj._id}
        user_name={rideObj.user_name}
        user_googleid={rideObj.user_googleid}
        photoLink={rideObj.photoLink}
        classYear={rideObj.classYear}
        destination={rideObj.destination}
        meetup_location={rideObj.meetup_location}
        start_date={rideObj.start_date}
        start_time={rideObj.start_time}
        end_date={rideObj.end_date}
        end_time={rideObj.end_time}
        maxPeople={rideObj.maxPeople}
        extra_ride_info={rideObj.extra_ride_info}
        user_googleId_joined={rideObj.user_googleId_joined}
        freshman_box={rideObj.freshman_box}
        sophomore_box={rideObj.sophomore_box}
        junior_box={rideObj.junior_box}
        senior_box={rideObj.senior_box}
        my_googleid={props.user_googleid}
      />
    ));
  } else {
    rideHistoryModal = <div>No ride history!</div>;
  }

  let masterModal = null;
  if (props.user_googleid && props.user_name){
    masterModal=<>
      <h1>My Ride History</h1>
      <p>This page shows your completed rides!</p>
    </>
  }else{
    masterModal=<>
      <h1>My Ride History</h1>
      <h4>Please login to Google with an @mit.edu email first!</h4>
    </>
  }

  return (
    <>
      <Container className="u-marginTopPage">{masterModal}</Container>
      <Container className="u-marginBottomPage">{rideHistoryModal}</Container>
    </>
  );
};

export default RideHistory;
