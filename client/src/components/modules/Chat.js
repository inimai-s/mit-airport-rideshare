import React, { useState, useEffect } from "react";
import SingleMessage from "./SingleMessage.js";
import SingleMember from "./SingleMember.js";
import { NewMessage } from "./NewPostInput.js";

import { get } from "../../utilities";
import { post } from "../../utilities";

import { Link } from "@reach/router";

import "./Chat.css";

import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

/**
 * @typedef UserObject
 * @property {string} _id
 * @property {string} name
 */
/**
 * @typedef MessageObject
 * @property {UserObject} sender
 * @property {string} content
 */
/**
 * @typedef ChatData
 * @property {MessageObject[]} messages
 * @property {UserObject} recipient
 */

/**
 * Renders main chat window including previous messages,
 * who is being chatted with, and the new message input.
 *
 * Proptypes
 * @param {ChatData} data
 */

const Chat = (props) => {
  useEffect(() => {
    const el = document.getElementById('Chat-historyContainer');
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  });

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => setShow(true);

  const [members,setMembers] = useState([]);
  const handleMembers=(val)=>{
    setMembers(old => {return [...old, val]});
  };

  useEffect(() => {
    if (props.data.recipient._id !== "dummy id"){
      get("/api/getOneRide",{_id:props.data.recipient._id}).then((ride) => {
        for (var i = 0; i<ride.user_googleId_joined.length; i++) {
          if(i===0){
            setMembers([]);
          }

          get("/api/getName2",{user_googleid:ride.user_googleId_joined[i]}).then((user) => {
            handleMembers({user_name:user.user_name,
              photoLink:user.photoLink,
            });
          })
        }
      })
    }
  },[props.data.recipient._id]);

  return (
    <div className="u-flexColumn Chat-container u-extraLightGreyCard">
      <Row>
        <Col xs={10}>
          <h3 className="u-colorMediumBlue">Chat: {props.data.recipient.rideName}</h3>
        </Col>

        <Col>
          <Button variant="secondary" onClick={handleShow}>
            Chat Members
          </Button>
        </Col>
      </Row>

      <br></br>
      <div className="Chat-historyContainer" id="Chat-historyContainer">
        {props.data.messages.map((m, i) => (
          <SingleMessage message={m} key={i} userId={props.userId}/>
        ))}
      </div>
      <div className="Chat-newContainer">
        <NewMessage recipient={props.data.recipient} />
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Chat Members</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {members.map((m,i) => (
            <SingleMember message={m} key={i}/>
          ))}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Chat;
