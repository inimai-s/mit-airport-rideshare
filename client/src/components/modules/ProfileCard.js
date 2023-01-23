import React, { useState, useEffect } from "react";

import { get } from "../../utilities";
import { post } from "../../utilities";

import "./ProfileCard.css";
import Button from 'react-bootstrap/Button';

/**
 * Card is a component for displaying content like stories
 *
 */


const ProfileCard = (props) => {
  
    const handleLeaveRide=()=>{
        console.log(`Need to leave ${props.user_name.replace(/ .*/,'')}'s Ride`)

        if(props.user_googleid === props.my_googleid) {
          alert("You can't leave this ride because you are the ride captain");
          return;
        }

        const body = {
          _id: props._id,
          my_googleid: props.my_googleid,
        }
    
        post("/api/leaveRide", body).then((ride) => {
          location.reload();
        });
      };

  return (
    <div className="Card-container">
      <div className="Card-story">
        <h2><img src={props.photoLink} alt="Profile Image" className="Card-profilePhoto"/><span className="u-margin-left-m">{props.user_name}</span></h2>
        <p className="Card-storyContent"><span className="u-bold">Class Year:</span> <span className="u-colorPrimary">{props.classYear}</span></p>
        <br></br>
        <p className="Card-storyContent"><span className="u-bold">Destination:</span> <span className="u-colorPrimary">{props.destination}</span></p>
        <p className="Card-storyContent"><span className="u-bold">Meet-up Location:</span> <span className="u-colorPrimary">{props.meetup_location}</span></p>
        <p className="Card-storyContent"><span className="u-bold">Departure Start Date/Time:</span> <span className="u-colorPrimary">{props.start_date} {props.start_time}</span></p>
        <p className="Card-storyContent"><span className="u-bold">Departure End Date/Time:</span> <span className="u-colorPrimary">{props.end_date} {props.end_time}</span></p>
        {/* <p className="Card-storyContent"><span className="u-bold">Max # people who can join:</span> <span className="u-colorPrimary">{props.maxPeople}</span></p> */}
        <p className="Card-storyContent"><span className="u-bold">Extra Information:</span> <span className="u-colorPrimary">{props.extra_ride_info}</span></p>
        <p className="Card-storyContent"><span className="u-bold">Additional Spots Filled:</span> <span className="u-colorPrimary">{props.user_googleId_joined.length - 1} / {props.maxPeople}</span></p>
        <br></br>
        <Button className="u-backgroundColorPrimary" onClick={handleLeaveRide}>Leave {props.user_name.replace(/ .*/,'')}'s Ride</Button>
      </div>
    </div>
  );
};

export default ProfileCard;
