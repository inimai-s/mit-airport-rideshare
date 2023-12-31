import React, { useState, useEffect } from "react";

import "./MyProfile.css";

import { get } from "../../utilities";
import { post } from "../../utilities";

import { Link } from "@reach/router";

import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import ProfileCard from "../modules/ProfileCard";

const MyProfile = (props) => {

  useEffect(() => {
    post("/api/setRideCardActivity").then(() => {
      // do nothing
    })
  },[]);

  const [ridesJoined, setRidesJoined] = useState([]);
  
  useEffect(() => {
    props.refreshProfile();
  },[]);

  useEffect(() => {
    const query = {
      my_googleid: props.user_googleid,
    };

    get("/api/getActiveJoinedRides", query).then((rideObjs) => {
      // console.log("getting Joined Rides list");
      // console.log(`props.user_googleid for MyProfile.js: ${props.user_googleid}`)
      let reversedRideObjs = rideObjs.reverse();
      setRidesJoined(reversedRideObjs);
    });
  }, [props.user_googleid]);

  let ridesJoinedModal = null;
  const hasJoinedRides = ridesJoined.length !== 0;
  if (hasJoinedRides) {
    ridesJoinedModal = ridesJoined.map((rideObj) => (
      <ProfileCard
        key={`ProfileCard_${rideObj._id}`}
        _id={rideObj._id}
        user_name={rideObj.user_name}
        user_googleid={rideObj.user_googleid}
        photoLink={rideObj.photoLink}
        classYear={rideObj.classYear}
        destination={rideObj.destination}
        meetup_location={rideObj.meetup_location}
        start_date={rideObj.start_date}
        start_time={rideObj.start_time}
        end_date={rideObj.end_date}
        end_time={rideObj.end_time}
        maxPeople={rideObj.maxPeople}
        extra_ride_info={rideObj.extra_ride_info}
        user_googleId_joined={rideObj.user_googleId_joined}
        freshman_box={rideObj.freshman_box}
        sophomore_box={rideObj.sophomore_box}
        junior_box={rideObj.junior_box}
        senior_box={rideObj.senior_box}
        my_googleid={props.user_googleid}
        my_user_name={props.user_name}
      />
    ));
  } else {
    ridesJoinedModal = <div>You are not currently part of any active rides!</div>;
  }

  let masterModal = null;
  if (props.user_googleid && props.user_name){
    masterModal=<>
    <h1>My Profile</h1>
    <br></br>

    <div className="u-darkGreyOutline">
      <h2><span><img src={props.photoLink} alt="Profile Image" className="MyProfile-profilePhoto"></img></span><span className="u-margin-left-m">{props.user_name}</span></h2>
      <p><span className="u-bold">Email:</span> <span className="u-colorPrimary">{props.email}</span></p>
      <p><span className="u-bold">Class Year:</span> <span className="u-colorPrimary">{props.classYear}</span></p>
      <p><span className="u-bold">Major:</span> <span className="u-colorPrimary">{props.major}</span></p>
      <Button className="u-backgroundColorPrimary"><Link to="/editMyProfile/" className="u-noTextDecoration"><span className="u-colorWhite">Edit</span></Link></Button>
    </div>
    <br></br><br></br>
    <h2>My Active Rides:</h2>{ridesJoinedModal}
    </>
  }else{
    masterModal=<>
      <h1>My Profile</h1>
      <h4>Please login to Google with an @mit.edu email first!</h4>
    </>
  }

  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);

  const handleGoToEditProfile = () => {
    setShow(false);
    location.replace("/editMyProfile/");
  };

  let updateProfileModal = null;
  if(props.classYear === "" || props.classYear === "Unknown" || props.major === "" || props.major === "Unknown") {
    updateProfileModal = <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Please Edit Your Profile!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        You'll need to input your class year in order to view a list of available rides in <Link to="/findARide/">Find a Ride</Link>
        <br></br><br></br>
        As for your major, feel free to input anything! That's just for fun :)
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleGoToEditProfile}>
            Edit Profile
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  }

  return (
    <>
      <Container className="u-marginTopPage u-marginBottomPage">{masterModal}</Container>

      {updateProfileModal}
    </>
  );
};

export default MyProfile;
