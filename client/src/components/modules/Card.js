import React, { useState, useEffect } from "react";

import { get } from "../../utilities";

import "./Card.css";
import BlankProfileImage from './BlankProfileImage.jpg';

/**
 * Card is a component for displaying content like stories
 *
 */

const Card = (props) => {

  return (
    <div className="Card-container">
      <div className="Card-story">
        <h2><img src={props.photoLink} referrerpolicy="no-referrer" alt="Profile Image" className="Card-profilePhoto"/><span className="u-margin-left-m">{props.user_name}</span></h2>
        <p className="Card-storyContent"><span className="u-bold">Class Year:</span> <span className="u-colorPrimary">{props.classYear}</span></p>
        <br></br>
        <p className="Card-storyContent"><span className="u-bold">Destination:</span> <span className="u-colorPrimary">{props.destination}</span></p>
        <p className="Card-storyContent"><span className="u-bold">Meet-up Location:</span> <span className="u-colorPrimary">{props.meetup_location}</span></p>
        <p className="Card-storyContent"><span className="u-bold">Departure Start Date/Time:</span> <span className="u-colorPrimary">{props.start_date} {props.start_time}</span></p>
        <p className="Card-storyContent"><span className="u-bold">Departure End Date/Time:</span> <span className="u-colorPrimary">{props.end_date} {props.end_time}</span></p>
        <p className="Card-storyContent"><span className="u-bold">Extra Information:</span> <span className="u-colorPrimary">{props.extra_ride_info}</span></p>
      </div>
    </div>
  );
};

export default Card;
