import React from "react";
import { Link } from "@reach/router";

import "./Footer.css";
import "../../utilities.css";

import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const Footer = () => {
  return (
    <div className="Footer-websiteFooter">
        <Container>
          <h5>MIT Airport Rideshare</h5>
          <br></br>
          <p>Team rEActIon<br></br>
          Created for 6.9620 web.lab at MIT<br></br><br></br>
          Copyright 2023</p>
        </Container>
    </div>
  );
};

export default Footer;
