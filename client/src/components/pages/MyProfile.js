import React, { useState, useEffect } from "react";

import "./MyProfile.css";

import { get } from "../../utilities";
import { post } from "../../utilities";

const MyProfile = (props) => {
  
  let masterModal = null;
  if (props.user_googleid && props.user_name){
    masterModal=<>
      <h1>My Profile</h1>
      <img src={props.photoLink} alt="Profile Image" className="profilePhoto"></img>
      <h1>{props.user_name}</h1>
      <h4>Email: {props.email}</h4>
    </>
  }else{
    masterModal=<>
      <h1>My Profile</h1>
      <h4>Please login to Google first!</h4>
    </>
  }

  return (
    <>{masterModal}</>
  );
};

export default MyProfile;
