import React from "react";
import { Link } from "@reach/router";

import "./NavBar.css";

import { GoogleOAuthProvider, GoogleLogin, GoogleLogout, googleLogout } from "@react-oauth/google";

import "../../utilities.css";

import flightTakeoffLogo from "./images/flightTakeoffLogo.png"

import Button from 'react-bootstrap/Button';

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "354424873499-ns84n5jbt5benp32pf6fkvar91ffghi5.apps.googleusercontent.com";

const NavBar = (props) => {
  console.log(`This is the props.photoLink: ${props.photoLink}`);

  return (
    <nav className="NavBar-container">
      <div className="NavBar-flex NavBar-linkContainer">
        <Link to="/" className="NavBar-title"><img src={flightTakeoffLogo} alt="Logo" className="NavBar-photo" /></Link>
        
        {/* <Link to="/createARide/" className="NavBar-link">
          Create a Ride
        </Link> */}

        <Link to="/findARide/" className="NavBar-link">
          Find a Ride
        </Link>

        <Link to="/chat/" className="NavBar-link">
          My Chats
        </Link>

        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          {props.user_googleid ? (
            <>
              <Link to="/myProfile/" className="NavBar-link">
                <img src={props.photoLink} alt="Profile Image" className="NavBar-photo" />
              </Link>

              <Button variant="light" onClick={() => {
                  googleLogout();
                  props.handleLogout();
                }}

                className="u-margin-left-m">
                Logout
              </Button>
            </>
          ) : (
            <div>
              <GoogleLogin 
              onSuccess={props.handleLogin} 
              onError={(err) => console.log(err)} 
              />
            </div>
            
          )}
        </GoogleOAuthProvider>
      </div>
    </nav>
  );
};

export default NavBar;
