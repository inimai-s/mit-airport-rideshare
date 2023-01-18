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
  const [mitLocationText,setMitLocationText]=useState("");

  const handleMitLocationChange = (event) => {
      const value=event.target.value;
      setMitLocationText(value);
  };

  const [startDate, setStartDate] = useState(null);
  const handleStartDateChange=(event)=>{
    const value = event.target.value;
    setStartDate(value);
  }

  const [endDate, setEndDate] = useState(null);
  const handleEndDateChange=(event)=>{
    const value = event.target.value;
    setEndDate(value);
  }

  // Submit button
  const submitRide = () => {
    // Send stuff to Mongo
    let stringDestination="MIT";
    if (destinationMIT===false){
      stringDestination="Logan Airport";
    }

    const body = {
      user_id: props.userId,
      user_name: props.userFirstLastName,
      destination: stringDestination,
      mit_location: mitLocationText};

    post("/api/ride", body).then((ride) => {
      //don't actually need to do anything
    });

    // Clear the form
    setMitLocationText("");
    setDestinationMIT(false);
    setDestinationLogan(false);
  };

  let masterModal = null;
  if (props.userId && props.userFirstLastName){
    masterModal=<>
      <h1>Create A Ride</h1>
      <h4>You will be the "Captain" for this shared ride, and others can join on the "Find a Ride" page.</h4>
      <div>
        <h4>Destination</h4>
        <input type="radio" name="destination" value="mit" checked={destinationMIT} onChange={handleDestinationMITChange}/> MIT
        <input type="radio" name="destination" value="loganAirport" checked={destinationLogan} onChange={handleDestinationLoganChange}/>Logan Airport

        <h4>Your Meet-up Location</h4>
        <input type="text" value={mitLocationText} onChange={handleMitLocationChange} />
        
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
