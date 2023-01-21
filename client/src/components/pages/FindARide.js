import React, { useState, useEffect } from "react";
import Card from "../modules/Card.js";

import { get } from "../../utilities";
import { post } from "../../utilities";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const FindARide = (props) => {
  useEffect(() => {
    get("/api/deleteRideCard").then(() => {
      // do nothing
    })
  },[]);

  const [rides, setRides] = useState([]);

  //modal states and functions------------------
  const [destinationMIT, setDestinationMIT]=useState(false);
  const [destinationLogan, setDestinationLogan]=useState(false);

  const handleDestinationMITChange = (event) => {
    const value=event.target.checked;
    setDestinationMIT(value)
  };

  const handleDestinationLoganChange = (event) => {
    const value=event.target.checked;
    setDestinationLogan(value)
  };

  const [startDate, setStartDate] = useState("");
  const handleStartDateChange=(event)=>{
    const value = event.target.value;
    setStartDate(value);
  }

  const [endDate, setEndDate] = useState("");
  const handleEndDateChange=(event)=>{
    const value = event.target.value;
    setEndDate(value);
  }

  const [startTime, setStartTime] = useState("");
  const handleStartTimeChange=(event)=>{
    const value = event.target.value;
    setStartTime(value);
  }

  const [endTime, setEndTime] = useState("");
  const handleEndTimeChange=(event)=>{
    const value = event.target.value;
    setEndTime(value);
  }

  const [freshmanBox, setFreshmanBox] = useState(false);
  const handleFreshmanBoxChange=(event)=>{
    const value=event.target.checked;
    setFreshmanBox(value);
  }

  const [sophomoreBox, setSophomoreBox] = useState(false);
  const handleSophomoreBox=(event)=>{
    const value=event.target.checked;
    setSophomoreBox(value);
  }

  const [juniorBox, setJuniorBox] = useState(false);
  const handleJuniorBox=(event)=>{
    const value=event.target.checked;
    setJuniorBox(value);
  }

  const [seniorBox, setSeniorBox] = useState(false);
  const handleSeniorBox=(event)=>{
    const value=event.target.checked;
    setSeniorBox(value);
  }
  //------------------------------------------------

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
        maxPeople={rideObj.maxPeople}
        extra_ride_info={rideObj.extra_ride_info}
        user_googleId_joined={rideObj.user_googleId_joined}
        freshman_box={rideObj.freshman_box}
        sophomore_box={rideObj.sophomore_box}
        junior_box={rideObj.junior_box}
        senior_box={rideObj.senior_box}
      />
    ));
  } else {
    ridesList = <div>No rides!</div>;
  }

  let stringDestination="MIT";
  if (destinationMIT===false){
    stringDestination="Logan Airport";
  }
  
  const body = {
    destination: stringDestination,
    start_date: startDate,
    start_time: startTime,
    end_date: endDate,
    end_time: endTime,
    freshman_box: freshmanBox,
    sophomore_box: sophomoreBox,
    junior_box: juniorBox,
    senior_box: seniorBox,
  };


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleSave = () => {
    setShow(false);
    get("/api/filterRides",body).then((rideObjs) => {
    let reversedRideObjs = rideObjs.reverse();
      setRides(reversedRideObjs);
    });
  };
  const handleShow = () => setShow(true);
  const handleClear=()=>{
    setDestinationMIT(false);
    setDestinationLogan(false);
    setStartDate("");
    setStartTime("");
    setEndDate("");
    setEndTime("");
    setFreshmanBox(false);
    setSophomoreBox(false);
    setJuniorBox(false);
    setSeniorBox(false);

    get("/api/rides").then((rideObjs) => {
      let reversedRideObjs = rideObjs.reverse();
      setRides(reversedRideObjs);
    });
  };

  let masterModal = null;
  if (props.user_googleid && props.user_name){
    masterModal=<>
      <h1>Find A Ride</h1>
      
      <Button variant="primary" onClick={handleShow}>
        Filter Rides
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Filter Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <span className="u-bold">Destination: </span>
          <input type="radio" name="destination" value="mit" checked={destinationMIT} onChange={handleDestinationMITChange}/><span className="u-colorPrimary">MIT</span>
          <input type="radio" name="destination" value="loganAirport" checked={destinationLogan} onChange={handleDestinationLoganChange}/><span className="u-colorPrimary">Logan Airport</span>

          <br></br><br></br>

          <span className="u-bold">Departure Start Date/Time:</span>
          <input className="u-margin-left-m" type="date" value={startDate} onChange={handleStartDateChange}/>
          <input type="time" value={startTime} onChange={handleStartTimeChange} />

          <br></br><br></br>

          <span className="u-bold">Departure End Date/Time:</span>
          <input className="u-margin-left-m" type="date" value={endDate} onChange={handleEndDateChange}/>
          <input type="time" value={endTime} onChange={handleEndTimeChange} />

          <br></br><br></br>

          <span className="u-bold">Class Years you're comfortable riding with:</span>
          <input className="u-margin-left-m" type="checkbox" checked={freshmanBox} onChange={handleFreshmanBoxChange} />
          <span className="u-colorPrimary">Freshman</span>
          <input className="u-margin-left-m" type="checkbox" checked={sophomoreBox} onChange={handleSophomoreBox} />
          <span className="u-colorPrimary">Sophomore</span>
          <input className="u-margin-left-m" type="checkbox" checked={juniorBox} onChange={handleJuniorBox} />
          <span className="u-colorPrimary">Junior</span>
          <input className="u-margin-left-m" type="checkbox" checked={seniorBox} onChange={handleSeniorBox} />
          <span className="u-colorPrimary">Senior</span>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClear}>
            Clear Preferences
          </Button>
          <Button variant="primary" onClick={handleSave}>
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
