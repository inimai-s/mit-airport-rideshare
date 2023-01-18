import React, { useState, useEffect } from "react";

// import { NewStory } from "../modules/NewPostInput.js";

import { get } from "../../utilities";
import { post } from "../../utilities";

const CreateARide = (props) => {
  // Radio buttons for MIT vs. Logan Airport destination
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

  // Your MIT Location
  const [meetupLocationText,setMeetupLocationText]=useState("");

  const handleMeetupLocationChange = (event) => {
      const value=event.target.value;
      setMeetupLocationText(value);
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

  // Submit button
  const submitRide = () => {
    // Send stuff to Mongo
    let stringDestination="MIT";
    if (destinationMIT===false){
      stringDestination="Logan Airport";
    }

    console.log(`Here is props.user_googleid: ${props.user_googleid}`)
    console.log(`Here is props.user_name: ${props.user_name}`)

    const body = {
      user_googleid: props.user_googleid,
      user_name: props.user_name,
      destination: stringDestination,
      meetup_location: meetupLocationText,
      start_date: startDate,
      start_time: startTime,
      end_date: endDate,
      end_time: endTime,
      freshman_box: freshmanBox,
      sophomore_box: sophomoreBox,
      junior_box: juniorBox,
      senior_box: seniorBox,
    };

    console.log(`props.user_googleid: ${props.user_googleid}`);
    console.log(`body.user_googleid: ${body.user_googleid}`);

    post("/api/ride", body).then((ride) => {
      //don't actually need to do anything
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
  };

  let masterModal = null;
  if (props.user_googleid && props.user_name){
    masterModal=<>
      <h1>Create A Ride</h1>
      <h4>You will be the "Captain" for this shared ride, and others can join on the "Find a Ride" page.</h4>
      <div>
        <h4>Destination</h4>
        <input type="radio" name="destination" value="mit" checked={destinationMIT} onChange={handleDestinationMITChange}/> MIT
        <input type="radio" name="destination" value="loganAirport" checked={destinationLogan} onChange={handleDestinationLoganChange}/>Logan Airport

        <h4>Your Meet-up Location</h4>
        <input type="text" value={meetupLocationText} onChange={handleMeetupLocationChange} />

        <h4>Departure Start Date/Time</h4>
        <input type="date" value={startDate} onChange={handleStartDateChange}/>
        <input type="time" value={startTime} onChange={handleStartTimeChange} />

        <h4>Departure End Date/Time</h4>
        <input type="date" value={endDate} onChange={handleEndDateChange}/>
        <input type="time" value={endTime} onChange={handleEndTimeChange} />

        <h4>Class Years You Wish to Ride With</h4>
          <input type="checkbox" checked={freshmanBox} onChange={handleFreshmanBoxChange} />
          <span>Freshman</span>
          <input type="checkbox" checked={sophomoreBox} onChange={handleSophomoreBox} />
          <span>Sophomore</span>
          <input type="checkbox" checked={juniorBox} onChange={handleJuniorBox} />
          <span>Junior</span>
          <input type="checkbox" checked={seniorBox} onChange={handleSeniorBox} />
          <span>Senior</span>
        <button onClick={submitRide}>Submit!</button>
      </div>
    </>
  }else{
    masterModal=<>
      <h1>Create A Ride</h1>
      <h4>Please login to Google first!</h4>
    </>
  }

  return (
    <>{masterModal}</>
  );
};

export default CreateARide;
