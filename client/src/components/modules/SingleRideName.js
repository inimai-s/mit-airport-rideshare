import React, { useState, useEffect } from "react";

import "./SingleRideName.css";

/**
 * Component to render an online user
 *
 * Proptypes
 * @param {(UserObject) => ()} setActiveUser function that takes in user,
 *  sets it to active
 * @param rideJoined
 * @param {boolean} active
 */
const SingleRideName = (props) => {
  return (
    <div
      className={`SingleRideName-container u-pointer ${props.active ?
        "SingleRideName-container--active" : ""
        }`}
      onClick={() => {
        props.setActiveUser(props.rideJoined);
      }}
    >
      {props.rideJoined.user_name}'s Ride to {props.rideJoined.destination}, {props.rideJoined.start_date} 
    </div>
  );
}

export default SingleRideName;
