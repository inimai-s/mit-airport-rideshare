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
import AddToCalendar from "react-add-to-calendar";

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
          const newBody={
            recipient: {
              _id: ride._id,
              rideName: `${ride.user_name}'s Ride to ${ride.destination}, ${ride.start_date}`,
            },
            content: `${props.my_user_name} left the ride`,
          };
    
          post("/api/userMessage", newBody);

          const updateRecentMessageBody = {
            _id: ride._id,
          };
      
          post("/api/updateMostRecentMessage", updateRecentMessageBody).then((ride) => {
              // Do nothing
          });
          
          location.reload();
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
    setMembers(mem => mem.concat(val).concat(", "));
  };

  useEffect(() => {
    for (var i = 0; i<props.user_googleId_joined.length; i++) {
      get("/api/getName2",{user_googleid:props.user_googleId_joined[i]}).then((user) => {
        handleMembers(user.user_name);
      })
    }
  },[props.user_googleId_joined]);
  
  let ride_start_ms = new Date(props.start_date.concat(" ").concat(props.start_time));
  let ride_title = props.user_name.concat("'s Ride to ").concat(props.destination);
  let ride_end_ms = new Date(ride_start_ms.getTime() + 30*60000);
  const event = {
    title: ride_title,
    description: props.extra_ride_info,
    startTime: ride_start_ms,
    endTime: ride_end_ms,
    location: props.meetup_location,
  };
  let icon = { 'calendar-plus-o': 'left' };

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

          {/* <p className="Card-storyContent"><span className="u-bold">Departure Start Date/Time:</span> <span className="u-colorPrimary">{modified_start_date} {modified_start_time}</span></p> */}
          <p className="Card-storyContent"><span className="u-bold">Ride Departure:</span> <span className="u-colorPrimary">{modified_end_date} at {modified_end_time}</span></p>
          <br></br>

          <p className="Card-storyContent"><span className="u-bold">Extra Information:</span> <span className="u-colorPrimary">{props.extra_ride_info}</span></p>  
          <p className="Card-storyContent"><span className="u-bold">Current Ride Members:</span> <span className="u-colorPrimary">{members.slice(0,-2)}</span></p>
          <br></br>

          <div className="calendarButtonClass u-backgroundColorMedBlue u-fontsize-m u-pointer u-margin-top-s u-alignText u-colorWhite u-calendarButtonWidth">
            <AddToCalendar event={event} buttonLabel="Add Ride to Calendar" buttonTemplate={icon}/>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ProfileCard;
