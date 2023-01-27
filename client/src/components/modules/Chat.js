import React, { useState, useEffect } from "react";
import SingleMessage from "./SingleMessage.js";
import { NewMessage } from "./NewPostInput.js";

import "./Chat.css";

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
  return (
    <div className="u-flexColumn Chat-container u-extraLightGreyCard">
      <h3 className="u-colorMediumBlue">Chat: {props.data.recipient.rideName}</h3>
      <br></br>
      <div className="Chat-historyContainer">
        {props.data.messages.map((m, i) => (
<<<<<<< HEAD
          <SingleMessage message={m} key={i}  userId={props.userId}/>
=======
          <SingleMessage message={m} key={i} userId={props.userId}/>
>>>>>>> 675a6e14390baab2f762d97b8e0ac41e13c95def
        ))}
      </div>
      <div className="Chat-newContainer">
        <NewMessage recipient={props.data.recipient} />
      </div>
    </div>
  );
}

export default Chat;
