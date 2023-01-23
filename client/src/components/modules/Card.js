import React, { useState, useEffect } from "react";

import { get } from "../../utilities";
import { post } from "../../utilities";

import { Link } from "@reach/router";

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


const Card = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    location.reload();
  };
  
  const handleShow = () => setShow(true);

  const handleRideJoined=()=>{
    console.log(`Need to join ${props.user_name.replace(/ .*/,'')}'s Ride`)

    if(props.user_googleid === props.my_googleid) {
      alert("You are the ride captain of this ride!");
      return;
    }

    if(props.user_googleId_joined.length - 1 >= props.maxPeople) { // -1 to exclude the ride captain
      alert("This ride is at max capacity!");
      return;
    }

    if(props.user_googleId_joined.includes(props.my_googleid)) {
      alert("You have already joined this ride!");
      return;
    }

    const body = {
      _id: props._id,
      my_googleid: props.my_googleid,
    }

    post("/api/joinRide", body).then((ride) => {
      handleShow();
    });

    //-------------------------------------------------------------------
    const event = {
      'summary': 'Google I/O 2015',
      'location': '800 Howard St., San Francisco, CA 94103',
      'description': 'A chance to hear more about Google\'s developer products.',
      'start': {
        'dateTime': '2023-01-23T09:00:00-07:00',
        'timeZone': 'America/Los_Angeles',
      },
      'end': {
        'dateTime': '2023-01-23T17:00:00-07:00',
        'timeZone': 'America/Los_Angeles',
      },
      'recurrence': [
        'RRULE:FREQ=DAILY;COUNT=2'
      ],
      'attendees': [
        {'email': 'inimai@mit.edu'},
        {'email': 'sbrin@example.com'},
      ],
      'reminders': {
        'useDefault': false,
        'overrides': [
          {'method': 'email', 'minutes': 24 * 60},
          {'method': 'popup', 'minutes': 10},
        ],
      },
    };
    
    calendar.events.insert({
      auth: auth,
      calendarId: 'primary',
      resource: event,
    }, function(err, event) {
      if (err) {
        console.log('There was an error contacting the Calendar service: ' + err);
        return;
      }
      console.log('Event created: %s', event.htmlLink);
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

        <Button className="u-backgroundColorPrimary" onClick={handleRideJoined}>Join {props.user_name.replace(/ .*/,'')}'s Ride</Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Successfully joined! </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            You've been added to the group chat for {props.user_name}'s ride to {props.destination}!
            <br></br><br></br>
            <Button className="u-backgroundColorPrimary">
              <Link to="/chat/" className="u-noTextDecoration">
                <span className="u-colorWhite">Go to chat!</span>
              </Link>
            </Button>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default Card;
