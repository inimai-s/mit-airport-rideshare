import React from "react";
import { Link } from "@reach/router";

import "./NavBar.css";

import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";

import "../../utilities.css";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "354424873499-ns84n5jbt5benp32pf6fkvar91ffghi5.apps.googleusercontent.com";

/**
 * The navigation bar at the top of all pages. Takes no props.
 */
const NavBar = (props) => {
  return (
    <nav className="NavBar-container">
      <div className="NavBar-title u-inlineBlock"><Link to="/" className="NavBar-title">MIT Airport Rideshare</Link></div>
      <div className="NavBar-linkContainer u-inlineBlock">
        <Link to="/createARide/" className="NavBar-link">
          Create a Ride
        </Link>
        <Link to="/findARide/" className="NavBar-link">
          Find a Ride
        </Link>

        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          {props.userId ? (
            <button
              onClick={() => {
                googleLogout();
                props.handleLogout();
              }}
            >
              Logout
            </button>
          ) : (
            <GoogleLogin onSuccess={props.handleLogin} onError={(err) => console.log(err)} />
          )}
        </GoogleOAuthProvider>
      </div>
    </nav>
  );
};

export default NavBar;
