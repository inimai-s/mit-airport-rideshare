import React, { useState, useEffect } from "react";

import "./MyProfile.css";

import { get } from "../../utilities";
import { post } from "../../utilities";

// const User = require("../../../../server/models/user");


const MyProfile = (props) => {
  console.log(`Props: ${JSON.stringify(props)}`)
  const [currentClassYear, setCurrentClassYear] = useState(props.classYear);
  const [currentMajor, setCurrentMajor] = useState(props.major);

  const [classYearFreshman, setClassYearFreshman]=useState(false);
  const [classYearSophomore, setClassYearSophomore]=useState(false);
  const [classYearJunior, setClassYearJunior]=useState(false);
  const [classYearSenior, setClassYearSenior]=useState(false);

  const handleFreshmanChange = (event) => {
      const value=event.target.checked;
      setClassYearFreshman(value);

      // setClassYearFreshman(false)
      setClassYearSophomore(false)
      setClassYearJunior(false)
      setClassYearSenior(false)
  };

  const handleSophomoreChange = (event) => {
    const value=event.target.checked;
    setClassYearSophomore(value);

    setClassYearFreshman(false)
    // setClassYearSophomore(false)
    setClassYearJunior(false)
    setClassYearSenior(false)
  };

  const handleJuniorChange = (event) => {
    const value=event.target.checked;
    setClassYearJunior(value);

    setClassYearFreshman(false)
    setClassYearSophomore(false)
    // setClassYearJunior(false)
    setClassYearSenior(false)
  };

  const handleSeniorChange = (event) => {
    const value=event.target.checked;
    setClassYearSenior(value);

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
    let classYearText="Unknown";
    
    if (classYearFreshman===true){
      console.log(`Freshman selected`)
      setCurrentClassYear("Freshman");
      classYearText="Freshman";
    }else if (classYearSophomore===true){
      console.log(`Soph selected`)
      setCurrentClassYear("Sophomore");
      classYearText="Sophomore";
    }else if (classYearJunior===true){
      console.log(`Junior selected`)
      setCurrentClassYear("Junior");
      classYearText="Junior";
    }else if (classYearSenior===true){
      console.log(`Senior selected`)
      setCurrentClassYear("Senior");
      classYearText="Senior";
    }

    setCurrentClassYear(classYearText);
    setCurrentMajor(majorText);

    const body = {
      user_googleid: props.user_googleid,
      classYear:classYearText,
      major:majorText,
    };

    console.log(`This is the body being posted: ${JSON.stringify(body)}`)
    
    post("/api/updateUser", body).then((ride) => {
      //don't actually need to do anything
    });
    
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
      <h2><span><img src={props.photoLink} alt="Profile Image" className="MyProfile-profilePhoto"></img></span><span className="u-margin-left-m">{props.user_name}</span></h2>
      <p><span className="u-bold">Email:</span> <span className="u-colorPrimary">{props.email}</span></p>
      <p><span className="u-bold">Class Year:</span> <span className="u-colorPrimary">{currentClassYear}</span></p>
      <p><span className="u-bold">Major:</span> <span className="u-colorPrimary">{currentMajor}</span></p>

      <br></br>
      <h2>Edit Info:</h2>
      <span className="u-bold">Class Year:</span>
      <input className="u-margin-left-m" type="radio" name="classYear" value="Freshman" checked={classYearFreshman} onChange={handleFreshmanChange}/> <span className="u-colorPrimary">Freshman</span>
      <input className="u-margin-left-m" type="radio" name="classYear" value="Sophomore" checked={classYearSophomore} onChange={handleSophomoreChange}/> <span className="u-colorPrimary">Sophomore</span>
      <input className="u-margin-left-m" type="radio" name="classYear" value="Junior" checked={classYearJunior} onChange={handleJuniorChange}/> <span className="u-colorPrimary">Junior</span>
      <input className="u-margin-left-m" type="radio" name="classYear" value="Senior" checked={classYearSenior} onChange={handleSeniorChange}/> <span className="u-colorPrimary">Senior</span>
      
      <br></br><br></br>
      <span className="u-bold">Major:</span>
      <input className="u-margin-left-m" type="text" value={majorText} onChange={handleMajorChange} />

      <br></br><br></br>
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
