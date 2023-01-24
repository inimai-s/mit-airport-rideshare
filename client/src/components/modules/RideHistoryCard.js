import React, { useState, useEffect } from "react";

import { get } from "../../utilities";
import { post } from "../../utilities";

import "./Card.css";

import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

/**
 * Card is a component for displaying content like stories
 *
 */


const RideHistoryCard = (props) => {
  let modified_start_date = "";
  let modified_start_time = "";
  let modified_end_date = "";
  let modified_end_time = "";

  const modifyDate = (date) => {
    // 'date' is in the format YYYY-MM-DD
    // we want to return MM/DD/YYYY
    return date.substring(5,7).concat("/").concat(date.substring(8)).concat("/").concat(date.substring(0,4));
  };

  const modifyTime = (time) => {
    // 'time' is in the format HH:MM
    let hour_int = parseInt(time.substring(0,2));

    if(hour_int === 0) {
      return "12".concat(time.substring(2)).concat(" AM");
    }
    if(hour_int < 12) {
      return time.concat(" AM");
    }
    if(hour_int === 12) {
      return time.concat(" PM");
    }

    let new_hour_int = hour_int - 12;
    let new_hour_str = new_hour_int.toString();
    if(new_hour_int < 10) {
      new_hour_str = "0".concat(new_hour_str);
    }

    return new_hour_str.concat(time.substring(2)).concat(" PM");
  };

  modified_start_date = modifyDate(props.start_date);
  modified_end_date = modifyDate(props.end_date);
  modified_start_time = modifyTime(props.start_time);
  modified_end_time = modifyTime(props.end_time);

  return (
    <div className="u-lightGreyCard Card-container">
      {/* <Row>
        <Col xs={5}>

        </Col>

        <Col xs={7}>

        </Col>
      </Row> */}

      <Row>
        <Col xs={5}>
          <h2><img src={props.photoLink} alt="Profile Image" className="Card-profilePhoto"/><span className="u-margin-left-m">{props.user_name}</span></h2>
          <p className="Card-storyContent"><span className="u-bold">Class Year:</span> <span className="u-colorPrimary">{props.classYear}</span></p>
          <br></br>
          <p className="Card-storyContent"><span className="u-bold">Additional Spots Filled:</span> <span className="u-colorPrimary">{props.user_googleId_joined.length - 1} / {props.maxPeople}</span></p>
        </Col>
        
        <Col xs={7}>
          <p className="Card-storyContent"><span className="u-bold">Destination:</span> <span className="u-colorPrimary">{props.destination}</span></p>
          <p className="Card-storyContent"><span className="u-bold">Meet-up Location:</span> <span className="u-colorPrimary">{props.meetup_location}</span></p>
          <br></br>
          <p className="Card-storyContent"><span className="u-bold">Departure Start Date/Time:</span> <span className="u-colorPrimary">{modified_start_date} {modified_start_time}</span></p>
          <p className="Card-storyContent"><span className="u-bold">Departure End Date/Time:</span> <span className="u-colorPrimary">{modified_end_date} {modified_end_time}</span></p>
          <br></br>
          <p className="Card-storyContent"><span className="u-bold">Extra Information:</span> <span className="u-colorPrimary">{props.extra_ride_info}</span></p>
        </Col>
      </Row>

      

      
      <br></br>
    </div>
  );
};

export default RideHistoryCard;
