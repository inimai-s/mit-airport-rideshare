import React, { useState, useEffect } from "react";
import Card from "../modules/Card.js";

import { get } from "../../utilities";
import { post } from "../../utilities";

const FindARide = (props) => {
  const [rides, setRides] = useState([]);

  // called when the "Feed" component "mounts", i.e.
  // when it shows up on screen
  useEffect(() => {
    get("/api/rides").then((rideObjs) => {
      let reversedRideObjs = rideObjs.reverse();
      setRides(reversedRideObjs);
    });
  }, []);

  let ridesList = null;
  const hasRides = rides.length !== 0;
  if (hasRides) {
    ridesList = rides.map((rideObj) => (
      <Card
        key={`Card_${rideObj._id}`}
        _id={rideObj._id}
        user_name={rideObj.user_name}
        destination={rideObj.destination}
        mit_location={rideObj.mit_location}
      />
    ));
  } else {
    ridesList = <div>No rides!</div>;
  }

  let masterModal = null;
  if (props.user_googleid && props.user_name){
    masterModal=<>
      <h1>Find A Ride</h1>
      {ridesList}
    </>
  }else{
    masterModal=<>
      <h1>Find A Ride</h1>
      <h4>Please login to Google first!</h4>
    </>
  }

  return (
    <>{masterModal}</>
  );
};

export default FindARide;
