import React, { useState, useEffect } from "react";

import "./MyProfile.css";

import { get } from "../../utilities";
import { post } from "../../utilities";

import { Link } from "@reach/router";

import Button from 'react-bootstrap/Button';

const MyProfile = (props) => {
  useEffect(() => {
    props.refreshProfile();
  },[]);

  let masterModal = null;
  if (props.user_googleid && props.user_name){
    masterModal=<>
      <h1>My Profile</h1>
      <h2><span><img src={props.photoLink} alt="Profile Image" className="MyProfile-profilePhoto"></img></span><span className="u-margin-left-m">{props.user_name}</span></h2>
      <p><span className="u-bold">Email:</span> <span className="u-colorPrimary">{props.email}</span></p>
      <p><span className="u-bold">Class Year:</span> <span className="u-colorPrimary">{props.classYear}</span></p>
      <p><span className="u-bold">Major:</span> <span className="u-colorPrimary">{props.major}</span></p>
      <Button><Link to="/editMyProfile/"><span className="u-colorWhite">Edit</span></Link></Button>
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
