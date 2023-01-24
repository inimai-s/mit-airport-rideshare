import React, { useState, useEffect } from "react";

import { get } from "../../utilities";
import { post } from "../../utilities";

import "./ProfileCard.css";

import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

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
  
    <div className="u-lightGreyCard ProfileCard-container">
      <Row>
        <Col xs={5}>
          <h2><img src={props.photoLink} alt="Profile Image" className="Card-profilePhoto"/><span className="u-margin-left-m">{props.user_name}</span></h2>
          <p className="Card-storyContent"><span className="u-bold">Class Year:</span> <span className="u-colorPrimary">{props.classYear}</span></p>
          <br></br>
          <p className="Card-storyContent"><span className="u-bold">Additional Spots Filled:</span> <span className="u-colorPrimary">{props.user_googleId_joined.length - 1} / {props.maxPeople}</span></p>
          <Button className="u-backgroundColorPrimary u-margin-top-s" onClick={handleLeaveRide}>Leave {props.user_name.replace(/ .*/,'')}'s Ride</Button>
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
    </div>
  );
};

export default ProfileCard;
