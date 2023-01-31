import React, { useState, useEffect } from "react";

import "./Card.css";

import "./SingleRideName.css";

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
 * Component to render an online user
 *
 * Proptypes
 * @param {(UserObject) => ()} setActiveUser function that takes in user,
 *  sets it to active
 * @param rideJoined
 * @param {boolean} active
 */
const SingleRideName = (props) => {
  const [members,setMembers] = useState([]);
  const handleMembers=(val)=>{
    setMembers(old => {return [...old, val]});
  };

  useEffect(() => {
    get("/api/getOneRide",{_id:props.rideJoined._id}).then((ride) => {
      for (var i = 0; i<ride.user_googleId_joined.length; i++) {
        if(i===0){
          setMembers([]);
        }

        get("/api/getName2",{user_googleid:ride.user_googleId_joined[i]}).then((user) => {
          handleMembers({photoLink:user.photoLink,
          });
        })
      }
    })
  },[props.rideJoined._id]);

  return (
    <div
      className={`SingleRideName-container u-pointer ${props.active ?
        "SingleRideName-container--active" : ""
        }`}
      onClick={() => {
        props.setActiveUser(props.rideJoined);
      }}
    >
      {props.rideJoined.user_name}'s Ride to {props.rideJoined.destination}, {(props.rideJoined.start_date).substring(5,7)}/{(props.rideJoined.start_date).substring(8,10)}/{(props.rideJoined.start_date).substring(0,4)} 
      <br></br>
      {members.map((m,i) => (
        <img key={i} src={m.photoLink} alt="Profile Image" className="SingleRideName-profilePhoto"/>
      ))}
    </div>
  );
}

export default SingleRideName;
