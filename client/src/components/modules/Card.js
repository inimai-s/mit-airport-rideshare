import React, { useState, useEffect } from "react";

import { get } from "../../utilities";

import "./Card.css";

/**
 * Card is a component for displaying content like stories
 *
 */

const Card = (props) => {

  return (
    <div className="Card-container">
      <div className="Card-story">
        <h2>{props.user_name}</h2>
        <p className="Card-storyContent"><span className="u-bold">Destination:</span> {props.destination}</p>
        <p className="Card-storyContent"><span className="u-bold">Meet-up Location:</span> {props.meetup_location}</p>
        <p className="Card-storyContent"><span className="u-bold">Departure Start Date/Time:</span> {props.start_date} {props.start_time}</p>
        <p className="Card-storyContent"><span className="u-bold">Departure End Date/Time:</span> {props.end_date} {props.end_time}</p>
      </div>
    </div>
  );
};

export default Card;
