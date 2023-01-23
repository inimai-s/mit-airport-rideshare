import React, { useState, useEffect } from "react";
import SingleRideName from "./SingleRideName.js";

import "./SingleRideName.css";

/**
 * List of users that are online to chat with and all chat
 *
 * Proptypes
 * @param ridesJoined to display
 * @param {UserObject} active user in chat
 * @param {string} userId id of current logged in user
 * @param {(UserObject) => ()} setActiveUser function that takes in user, sets it to active
 */
const ChatList = (props) => {
  return (
    <>
      {props.ridesJoined
        .map((rideJoined, i) => (
          <SingleRideName
            key={i}
            setActiveUser={props.setActiveUser}
            rideJoined={rideJoined}
            active={rideJoined._id === props.active}
          />
        ))}
    </>
  );
}

export default ChatList;
