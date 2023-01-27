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

  const [members,setMembers] = useState("");
  const handleMembers=(val)=>{
    const mem = members.concat(val).concat(" ");
    setMembers(mem);
  };

  useEffect(() => {
    for (var i = 0; i<props.user_googleId_joined.length; i++) {
      get("/api/getName2",{user_googleid:props.user_googleId_joined[i]}).then((user) => {
        handleMembers(user.user_name);
      })
    }
  },[props.user_googleId_joined]);

  return (
    <div className="u-lightGreyCard Card-container">
      <Row>
        <Col xs={5}>
          <h2><img src={props.photoLink} alt="Profile Image" className="Card-profilePhoto"/><span className="u-margin-left-m">{props.user_name}</span></h2>
          <p className="Card-storyContent"><span className="u-bold">Class Year:</span> <span className="u-colorPrimary">{props.classYear}</span></p>
          <br></br>
          <p className="Card-storyContent"><span className="u-bold">Additional Spots Filled:</span> <span className="u-colorPrimary">{props.user_googleId_joined.length - 1} / {props.maxPeople}</span></p>
          <Button className="u-backgroundColorPrimary u-margin-top-s" onClick={handleRideJoined}>Join {props.user_name.replace(/ .*/,'')}'s Ride</Button>
        </Col>

        <Col xs={7}>
          <p className="Card-storyContent"><span className="u-bold">Destination:</span> <span className="u-colorPrimary">{props.destination}</span></p>
          <p className="Card-storyContent"><span className="u-bold">Meet-up Location:</span> <span className="u-colorPrimary">{props.meetup_location}</span></p>
          <br></br>
          {/* <p className="Card-storyContent"><span className="u-bold">Departure Start Date/Time:</span> <span className="u-colorPrimary">{modified_start_date} {modified_start_time}</span></p>
          <p className="Card-storyContent"><span className="u-bold">Departure End Date/Time:</span> <span className="u-colorPrimary">{modified_end_date} {modified_end_time}</span></p> */}

          <p className="Card-storyContent"><span className="u-bold">Ride Departure:</span> <span className="u-colorPrimary">{modified_end_date} at {modified_end_time}</span></p>
          <br></br>
          <p className="Card-storyContent"><span className="u-bold">Extra Information:</span> <span className="u-colorPrimary">{props.extra_ride_info}</span></p>
          <p className="Card-storyContent"><span className="u-bold">Current Ride Members:</span> <span className="u-colorPrimary">{members}</span></p>
        </Col>
      </Row>

      <br></br>

      

      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Successfully joined!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You can see all the rides you've joined in <Link to="/myProfile/">My Profile</Link>
          <br></br><br></br>

          You've also been added to the group chat for {props.user_name}'s ride to {props.destination}!
          <br></br><br></br>
          <Button className="u-backgroundColorPrimary">
            <Link to="/chat/" className="u-noTextDecoration">
              <span className="u-colorWhite">Go to My Chats page!</span>
            </Link>
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Card;
