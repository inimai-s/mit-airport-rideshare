import React, { useState, useEffect } from "react";

// import { NewStory } from "../modules/NewPostInput.js";

import { get } from "../../utilities";
import { post } from "../../utilities";

const CreateARide = (props) => {
  // Radio buttons for MIT vs. Logan Airport destination
  const [destinationMIT, setDestinationMIT]=useState(false);
  const [destinationLogan, setDestinationLogan]=useState(false);

  // Destination
  const handleDestinationMITChange = (event) => {
      const value=event.target.checked;
      setDestinationMIT(value)
  };

  const handleDestinationLoganChange = (event) => {
    const value=event.target.checked;
    setDestinationLogan(value)
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
      user_googleId_joined:[],
    };

    console.log(`props.user_googleid: ${props.user_googleid}`);
    console.log(`body.user_googleid: ${body.user_googleid}`);

    post("/api/ride", body).then((ride) => {
      //don't actually need to do anything
      console.log(body); //DELETE
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
  };

  let masterModal = null;
  if (props.user_googleid && props.user_name){
    masterModal=<>
      <h1>Create A Ride</h1>
      <p>You will be the "Captain" for this shared ride, and others can join on the "Find a Ride" page.</p>
      <br></br>
      <div>
        <span className="u-bold">Destination:</span>
        <input className="u-margin-left-m" type="radio" name="destination" value="mit" checked={destinationMIT} onChange={handleDestinationMITChange}/><span className="u-colorPrimary">MIT</span>
        <input className="u-margin-left-m" type="radio" name="destination" value="loganAirport" checked={destinationLogan} onChange={handleDestinationLoganChange}/><span className="u-colorPrimary">Logan Airport</span>

        <br></br><br></br>

        <span className="u-bold">Meet-up Location for the riders:</span>
        <input className="u-margin-left-m" type="text" value={meetupLocationText} onChange={handleMeetupLocationChange} />

        <br></br><br></br>

        <span className="u-bold">Departure Start Date/Time:</span>
        <input className="u-margin-left-m" type="date" value={startDate} onChange={handleStartDateChange}/>
        <input type="time" value={startTime} onChange={handleStartTimeChange} />

        <br></br><br></br>

        <span className="u-bold">Departure End Date/Time:</span>
        <input className="u-margin-left-m" type="date" value={endDate} onChange={handleEndDateChange}/>
        <input type="time" value={endTime} onChange={handleEndTimeChange} />

        <br></br><br></br>

        <span className="u-bold">Max # people who can join you:</span>
        <input className="u-margin-left-m u-textbox-number" type="number" value={maxPeopleText} onChange={handleMaxPeopleChange} />

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

        <br></br><br></br>

        <span className="u-bold">Any Extra Information?</span>
        <input className="u-margin-left-m" type="text" value={extraRideInfo} onChange={handleExtraRideInfo} />

        <br></br><br></br>
        
        <button onClick={submitRide}>Submit!</button>
      </div>
    </>
  }else{
    masterModal=<>
      <h1>Create A Ride</h1>
      <h4>Please login to Google with an @mit.edu email first!</h4>
    </>
  }

  return (
    <>{masterModal}</>
  );
};

export default CreateARide;
