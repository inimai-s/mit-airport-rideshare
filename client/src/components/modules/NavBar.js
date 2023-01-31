import React from "react";
import { Link } from "@reach/router";

import "./NavBar.css";

import { GoogleOAuthProvider, GoogleLogin, GoogleLogout, googleLogout } from "@react-oauth/google";

import "../../utilities.css";

import flightTakeoffLogo from "./images/flightTakeoffLogo.png"

import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "354424873499-ns84n5jbt5benp32pf6fkvar91ffghi5.apps.googleusercontent.com";

const NavBar = (props) => {
  // console.log(`This is the props.photoLink: ${props.photoLink}`);

  return (
    <>
      <Navbar fixed="top" collapseOnSelect expand="lg" variant="dark" className="u-backgroundColorPrimary">
        <Container>
          <Navbar.Brand>
            <Link to="/" className="u-margin-right-m"><img src={flightTakeoffLogo} alt="Logo" className="NavBar-photo" /></Link>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link>
                <Link to="/findARide/" className="NavBar-link">
                  Find a Ride
                </Link>
              </Nav.Link>

              <Nav.Link>
                <Link to="/rideHistory" className="NavBar-link">
                  Ride History
                </Link>
              </Nav.Link>

              <Nav.Link>
                <Link to="/chat/" className="NavBar-link">
                  My Chats
                </Link>
              </Nav.Link>
            </Nav>

            <Nav className="NavBar-reactNav">
              <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
                {props.user_googleid ? (
                  <>
                    <Nav.Link>
                      <Link to="/myProfile/" className="NavBar-link">
                        <img src={props.photoLink} alt="Profile Image" className="NavBar-photo" />
                      </Link>
                    </Nav.Link>
                      
                    <Nav.Link>
                      <Button className="u-margin-right-xl" variant="light" onClick={() => {
                          googleLogout();
                          props.handleLogout();
                        }}>
                        Logout
                      </Button>
                    </Nav.Link>
                  </>
                ) : (
                  <div>
                    <Nav.Link>
                      <GoogleLogin 
                      onSuccess={props.handleLogin} 
                      onError={(err) => console.log(err)} 
                      />
                    </Nav.Link>
                  </div>
                  
                )}
              </GoogleOAuthProvider>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
    
    
  );
};

export default NavBar;
