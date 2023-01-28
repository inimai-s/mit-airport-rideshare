import React, { useState, useEffect } from "react";

import "./Card.css";

import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const SingleMember = (props) => {
  let memberModal=<>
    <p><img src={props.message.photoLink} alt="Profile Image" className="Card-profilePhoto"/><span className="u-margin-left-m">{props.message.user_name}</span></p>
  </>
  
  return (
    memberModal
  );
}

export default SingleMember;
