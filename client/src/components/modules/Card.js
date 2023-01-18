import React, { useState, useEffect } from "react";

import { get } from "../../utilities";

import "./Card.css";

/**
 * Card is a component for displaying content like stories
 *
 * Proptypes
 * @param {string} _id of the ride
 * @param {string} user_name
 * @param {string} destination
 * @param {string} mit_location
 */

const Card = (props) => {

  return (
    <div className="Card-container">
      <div className="Card-story">
        <span className="u-bold">{props.user_name}</span>
        <p className="Card-storyContent">{props.destination}</p>
        <p className="Card-storyContent">{props.mit_location}</p>
      </div>
    </div>
  );
};

export default Card;
