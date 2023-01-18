import React, { useState, useEffect } from "react";
import Card from "../modules/Card.js";

import { get } from "../../utilities";
import { post } from "../../utilities";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const FindARide = (props) => {
  const [rides, setRides] = useState([]);

  // called when the "Feed" component "mounts", i.e.
  // when it shows up on screen
  useEffect(() => {
    get("/api/rides").then((rideObjs) => {
      let reversedRideObjs = rideObjs.reverse();
      setRides(reversedRideObjs);
    });
  }, []);

  let ridesList = null;
  const hasRides = rides.length !== 0;
  if (hasRides) {
    ridesList = rides.map((rideObj) => (
      <Card
        key={`Card_${rideObj._id}`}
        _id={rideObj._id}
        user_name={rideObj.user_name}
        photoLink={rideObj.photoLink}
        classYear={rideObj.classYear}
        destination={rideObj.destination}
        meetup_location={rideObj.meetup_location}
        start_date={rideObj.start_date}
        start_time={rideObj.start_time}
        end_date={rideObj.end_date}
        end_time={rideObj.end_time}
      />
    ));
  } else {
    ridesList = <div>No rides!</div>;
  }

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  let masterModal = null;
  if (props.user_googleid && props.user_name){
    masterModal=<>
      <h1>Find A Ride</h1>
      
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {ridesList}
    </>
  }else{
    masterModal=<>
      <h1>Find A Ride</h1>
      <h4>Please login to Google with an @mit.edu email first!</h4>
    </>
  }

  return (
    <>{masterModal}</>
  );
};

export default FindARide;
