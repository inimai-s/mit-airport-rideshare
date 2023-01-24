import React from "react";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";

import "../../utilities.css";
import "./Skeleton.css";

import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import findARide from './images/undraw_findARide.svg';
import joinARide from './images/undraw_joinARide.svg';
import goTravel from './images/undraw_goTravel.svg';

import { Link } from "@reach/router";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "354424873499-ns84n5jbt5benp32pf6fkvar91ffghi5.apps.googleusercontent.com";

const Skeleton = ({ userId, handleLogin, handleLogout }) => {
  return (
    <>
      <div className="Skeleton-websiteHeader">
        <Container>
          <h1>MIT Airport Rideshare</h1>
          <br></br>
          <h5>Find other MIT students <br></br><br></br>
          Rideshare to & from Logan Airport!</h5>
        </Container>
      </div>

      <div className="Skeleton-marginBottomLarge">
        <Container>
          <br></br><br></br>

          <Row className="text-center">
            <h5>Our platform enables you to connect with other MIT students<br></br><br></br>
            Carpool to the airport together!</h5>
          </Row>
          <br></br><br></br>

          <p className="Skeleton-primaryBlueLine"></p>
          <br></br>
          
          <Row className="text-center">
            <Col>
              <h2 className="u-textCenter u-colorPrimary u-marginBottomM">How it Works</h2>
            </Col>
          </Row>
          <br></br>

          <Row>
            <Col xs={4} className="explanations movingImg">
              <img src={findARide} className="explanation-img" alt="Find a Ride" />
              <h4 className="u-colorPrimary">Find a Ride</h4>
              <p>Find a rideshare group that works for your schedule, or create one!</p>
            </Col>

            <Col xs={4} className="explanations movingImg">
              <img src={joinARide} className="explanation-img" alt="Join a Ride" />
              <h4 className="u-colorPrimary">Join a Ride</h4>
              <p>Join a rideshare group, or wait for others to join yours!</p>
            </Col>

            <Col xs={4} className="explanations movingImg">
              <img src={goTravel} className="explanation-img" alt="Travel together" />
              <h4 className="u-colorPrimary">Chat Together</h4>
              <p>Chat with your rideshare group members to sort out logistics, then travel together!</p>
            </Col>
          </Row>

          <br></br><br></br>
          <Row>
            <Col xs={4}><h4 className="text-center">Save money on ridesharing<br></br><br></br></h4></Col>
            <Col xs={4}></Col>
            <Col xs={4}></Col>
          </Row>
          <Row>
            <Col xs={4}></Col>
            <Col xs={4}><h4 className="text-center u-colorPrimary">Feel safer when carpooling<br></br><br></br></h4></Col>
            <Col xs={4}></Col>
          </Row>
          <Row>
            <Col xs={4}></Col>
            <Col xs={4}></Col>
            <Col xs={4}><h4 className="text-center u-colorMediumBlue">Meet other MIT students!<br></br><br></br></h4></Col>
          </Row>
          <br></br><br></br>

          <Row className="text-center">
            <Col>
              <Button size="lg" className="u-backgroundColorPrimary"><Link to="/findARide/" className="u-noTextDecoration"><span className="u-colorWhite">Let's Go!</span></Link></Button>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Skeleton;
