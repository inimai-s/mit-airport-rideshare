import React, { useState, useEffect } from "react";

import "./MyProfile.css";

import { get } from "../../utilities";
import { post } from "../../utilities";

const MyProfile = (props) => {
  const [currentClassYear, setCurrentClassYear] = useState(props.classYear);
  const [currentMajor, setCurrentMajor] = useState(props.major);

  const [classYearFreshman, setClassYearFreshman]=useState(false);
  const [classYearSophomore, setClassYearSophomore]=useState(false);
  const [classYearJunior, setClassYearJunior]=useState(false);
  const [classYearSenior, setClassYearSenior]=useState(false);

  const handleFreshmanChange = (event) => {
      const value=event.target.checked;
      setClassYearFreshman(value)

      // setClassYearFreshman(false)
      setClassYearSophomore(false)
      setClassYearJunior(false)
      setClassYearSenior(false)
  };

  const handleSophomoreChange = (event) => {
    const value=event.target.checked;
    setClassYearSophomore(value)

    setClassYearFreshman(false)
    // setClassYearSophomore(false)
    setClassYearJunior(false)
    setClassYearSenior(false)
  };

  const handleJuniorChange = (event) => {
    const value=event.target.checked;
    setClassYearJunior(value)

    setClassYearFreshman(false)
    setClassYearSophomore(false)
    // setClassYearJunior(false)
    setClassYearSenior(false)
  };

  const handleSeniorChange = (event) => {
    const value=event.target.checked;
    setClassYearSenior(value)

    setClassYearFreshman(false)
    setClassYearSophomore(false)
    setClassYearJunior(false)
    // setClassYearSenior(false)
  };

  const [majorText,setMajorText]=useState("");

  const handleMajorChange = (event) => {
    const value=event.target.value;
    setMajorText(value);
  };

  // Deal with hitting the submit button
  const submitProfileUpdates = () => {
    if (classYearFreshman){
      setCurrentClassYear("Freshman");
    }else if (classYearSophomore){
      setCurrentClassYear("Sophomore");
    }else if (classYearJunior){
      setCurrentClassYear("Junior");
    }else if (classYearSenior){
      setCurrentClassYear("Senior");
    }

    setCurrentMajor(majorText);

    setClassYearFreshman(false);
    setClassYearSophomore(false);
    setClassYearJunior(false);
    setClassYearSenior(false);
    setMajorText("");
  };

  let masterModal = null;
  if (props.user_googleid && props.user_name){
    masterModal=<>
      <h1>My Profile</h1>
      <img src={props.photoLink} alt="Profile Image" className="profilePhoto"></img>
      <h1>{props.user_name}</h1>
      <h4>Email: {props.email}</h4>
      <h4>Class Year: {currentClassYear}</h4>
      <h4>Major: {currentMajor}</h4>
      <br></br>
      <h2>Edit Info:</h2>
      <p>Class Year:</p>
      <input type="radio" name="classYear" value="Freshman" checked={classYearFreshman} onChange={handleFreshmanChange}/> Freshman
      <input type="radio" name="classYear" value="Sophomore" checked={classYearSophomore} onChange={handleSophomoreChange}/> Sophomore
      <input type="radio" name="classYear" value="Junior" checked={classYearJunior} onChange={handleJuniorChange}/> Junior
      <input type="radio" name="classYear" value="Senior" checked={classYearSenior} onChange={handleSeniorChange}/> Senior

      <p>Major:</p>
      <input type="text" value={majorText} onChange={handleMajorChange} />
      <button onClick={submitProfileUpdates} className="u-marginLeft-m">Submit Edits!</button>
    </>
  }else{
    masterModal=<>
      <h1>My Profile</h1>
      <h4>Please login to Google with an @mit.edu email first!</h4>
    </>
  }

  return (
    <>{masterModal}</>
  );
};

export default MyProfile;
