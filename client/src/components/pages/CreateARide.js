import React, { useState, useEffect } from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { get } from "../../utilities";
import { post } from "../../utilities";

import { Link } from "@reach/router";

const CreateARide = (props) => {
  // Radio buttons for MIT vs. Logan Airport destination
  const [destinationMIT, setDestinationMIT]=useState(false);
  const [destinationLogan, setDestinationLogan]=useState(false);

  // Destination
  const handleDestinationMITChange = (event) => {
      const value=event.target.checked;
      setDestinationMIT(value)
      setDestinationLogan(!value)
  };

  const handleDestinationLoganChange = (event) => {
    const value=event.target.checked;
    setDestinationLogan(value)
    setDestinationMIT(!value)
  };

  // Your meet up Location
  const [meetupLocationText,setMeetupLocationText]=useState("");

  const handleMeetupLocationChange = (event) => {
      const value=event.target.value;
      setMeetupLocationText(value);
  };

  // Max people in car
  const [maxPeopleText,setMaxPeopleText]=useState("");

  const handleMaxPeopleChange = (event) => {
      const value=event.target.value;
      setMaxPeopleText(value);
  };

  // Start date
  const [startDate, setStartDate] = useState("");
  const handleStartDateChange=(event)=>{
    const value = event.target.value;
    setStartDate(value);
  }

  // End date
  const [endDate, setEndDate] = useState("");
  const handleEndDateChange=(event)=>{
    const value = event.target.value;
    setEndDate(value);
    setStartDate(value);
  }

  // Start Time
  const [startTime, setStartTime] = useState("");
  const handleStartTimeChange=(event)=>{
    const value = event.target.value;
    setStartTime(value);
  }

  // End Time
  const [endTime, setEndTime] = useState("");
  const handleEndTimeChange=(event)=>{
    const value = event.target.value;
    setEndTime(value);
    setStartTime(value);
  }

  // Clas year checkboxes
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

  // Extra ride info
  const [extraRideInfo, setExtraRideInfo] = useState("");
  const handleExtraRideInfo=(event)=>{
    const value=event.target.value;
    setExtraRideInfo(value);
  }

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };
  
  const handleShow = () => setShow(true);

  // Submit button
  const submitRide = () => {
    // Send stuff to Mongo

    // Send an alert if the form is not completely filled
    if ((!destinationMIT && !destinationLogan) || !meetupLocationText ||
        !maxPeopleText || !startDate || !startTime || !endDate || !endTime ||
        (!freshmanBox && !sophomoreBox && !juniorBox && !seniorBox)) {
          alert("Please fill out the entire form before submitting!")
          return;
    }


    let stringDestination="MIT";
    if (destinationMIT===false){
      stringDestination="Logan Airport";
    }

    console.log(`Here is props.user_googleid: ${props.user_googleid}`)
    console.log(`Here is props.user_name: ${props.user_name}`)

    const body = {
      user_googleid: props.user_googleid,
      user_name: props.user_name,
      photoLink:props.photoLink,
      classYear:props.classYear,
      destination: stringDestination,
      meetup_location: meetupLocationText,
      start_date: startDate,
      start_time: startTime,
      end_date: endDate,
      end_time: endTime,
      maxPeople: parseInt(maxPeopleText),
      freshman_box: freshmanBox,
      sophomore_box: sophomoreBox,
      junior_box: juniorBox,
      senior_box: seniorBox,
      extra_ride_info: extraRideInfo,
      user_googleId_joined:[props.user_googleid],
      active: true,
    };

    console.log(`props.user_googleid: ${props.user_googleid}`);
    console.log(`body.user_googleid: ${body.user_googleid}`);

    post("/api/ride", body).then((ride) => {
      console.log(body);
      handleShow();
    });

    // Clear the form
    setMeetupLocationText("");
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
    setExtraRideInfo("");
    setMaxPeopleText("");
  };

  let masterModal = null;
  if (props.user_googleid && props.user_name){
    masterModal=<>
      <h1>Create A Ride</h1>
      <p>You will be the "Captain" for this shared ride!
      <br></br><br></br>Others can join on <Link to="/findARide/">Find a Ride</Link></p>
      <br></br>
      <div className="u-lightGreyCard">
        <span className="u-bold">Destination:</span>
        <input className="u-margin-left-m" type="radio" name="destination" value="mit" checked={destinationMIT} onChange={handleDestinationMITChange} required/><span className="u-colorPrimary u-margin-left-s">MIT</span>
        <input className="u-margin-left-m" type="radio" name="destination" value="loganAirport" checked={destinationLogan} onChange={handleDestinationLoganChange} required/><span className="u-colorPrimary u-margin-left-s">Logan Airport</span>

        <br></br><br></br>

        <span className="u-bold u-margin-right-m">Meet-up Location for the riders:</span>
        <input type="text" value={meetupLocationText} onChange={handleMeetupLocationChange} required/>

        <br></br><br></br>

        {/* <span className="u-bold u-margin-right-m">Departure Start Date/Time:</span>
        <input type="date" value={startDate} onChange={handleStartDateChange} required/>
        <input type="time" value={startTime} onChange={handleStartTimeChange} required/>

        <br></br><br></br>

        <span className="u-bold u-margin-right-m">Departure End Date/Time:</span>
        <input type="date" value={endDate} onChange={handleEndDateChange} required/>
        <input type="time" value={endTime} onChange={handleEndTimeChange} required/> */}

        <span className="u-bold u-margin-right-m">Ride Departure Date and Time:</span>
        <input type="date" value={endDate} onChange={handleEndDateChange} required/>
        <input type="time" value={endTime} onChange={handleEndTimeChange} required/>

        <br></br><br></br>

        <span className="u-bold u-margin-right-m">Max # people who can join you:</span>
        <input className="u-textbox-number" type="number" min="0" max="10" value={maxPeopleText} onChange={handleMaxPeopleChange} required="required"/>

        <br></br><br></br>

        <span className="u-bold">Class Years you're comfortable riding with:</span>
        <input className="u-margin-left-m" type="checkbox" checked={freshmanBox} onChange={handleFreshmanBoxChange} required="required"/>
        <span className="u-colorPrimary u-margin-left-s">Freshman</span>
        <input className="u-margin-left-m" type="checkbox" checked={sophomoreBox} onChange={handleSophomoreBox} required="required"/>
        <span className="u-colorPrimary u-margin-left-s">Sophomore</span>
        <input className="u-margin-left-m" type="checkbox" checked={juniorBox} onChange={handleJuniorBox} required="required"/>
        <span className="u-colorPrimary u-margin-left-s">Junior</span>
        <input className="u-margin-left-m" type="checkbox" checked={seniorBox} onChange={handleSeniorBox} required="required"/>
        <span className="u-colorPrimary u-margin-left-s">Senior</span>

        <br></br><br></br>

        <span className="u-bold u-margin-right-m">Any Extra Info?</span>
        <input type="text" value={extraRideInfo} onChange={handleExtraRideInfo} required="required"/>

        <br></br><br></br>
        
        <Button className="u-backgroundColorPrimary" onClick={submitRide}>Submit!</Button>
      </div>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Successfully created a ride!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            People can join your ride on <Link to="/findARide/">Find a Ride</Link>
            <br></br><br></br>

            A group chat has also been created for your ride in <Link to="/chat/">My Chats</Link>
          </Modal.Body>
        </Modal>
      
    </>
  }else{
    masterModal=<>
      <h1>Create A Ride</h1>
      <h4>Please login to Google with an @mit.edu email first!</h4>
    </>
  }

  return (
    <><Container className="u-marginTopPage u-marginBottomPage">{masterModal}</Container></>
  );
};

export default CreateARide;
