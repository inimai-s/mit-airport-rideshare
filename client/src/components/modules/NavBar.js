import React from "react";
import { Link } from "@reach/router";

import "./NavBar.css";

/**
 * The navigation bar at the top of all pages. Takes no props.
 */
const NavBar = () => {
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
      </div>
    </nav>
  );
};

export default NavBar;
