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
          <p className="Card-storyContent"><span className="u-bold">Departure Start Date/Time:</span> <span className="u-colorPrimary">{props.start_date} {props.start_time}</span></p>
          <p className="Card-storyContent"><span className="u-bold">Departure End Date/Time:</span> <span className="u-colorPrimary">{props.end_date} {props.end_time}</span></p>
          <br></br>
          <p className="Card-storyContent"><span className="u-bold">Extra Information:</span> <span className="u-colorPrimary">{props.extra_ride_info}</span></p>
        </Col>
      </Row>

      

      
      <br></br>
    </div>
  );
};

export default RideHistoryCard;
