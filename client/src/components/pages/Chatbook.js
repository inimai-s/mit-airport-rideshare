import React, { useEffect, useState } from "react";
import ChatList from "../modules/ChatList.js";
import Chat from "../modules/Chat.js";
import { socket } from "../../client-socket.js";
import { get } from "../../utilities";

import "./Chatbook.css";

import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const ALL_CHAT = {
  _id: "ALL_CHAT",
  name: "ALL CHAT",
};

/**
 * Page component to display when at the "/chat" route
 *
 * Proptypes
 * @param {string} userId id of current logged in user
 */
const Chatbook = (props) => {
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

  const [ridesJoined, setRidesJoined] = useState([]);
  // const [activeUsers, setActiveUsers] = useState([]);

  const [activeChat, setActiveChat] = useState({
    recipient: ALL_CHAT,
    messages: [],
  });

  const loadMessageHistory = (recipient) => {
    get("/api/chat", { recipient_id: recipient._id }).then((messages) => {
      setActiveChat({
        recipient: recipient,
        messages: messages,
      });
    });
  };

  // useEffect(() => {
  //   document.title = "Chatbook";
  // }, []);

  useEffect(() => {
    loadMessageHistory(activeChat.recipient);
  }, [activeChat.recipient._id]);

  const query = {
    my_googleid: props.user_googleid,
  };

  get("/api/getJoinedRides", query).then((rideObjs) => {
    console.log("getting Joined Rides list");
    console.log(`rideObjs: ${rideObjs}`);
    console.log(`props.user_googleid for Chatbook.js: ${props.user_googleid}`);
    let reversedRideObjs = rideObjs.reverse();
    setRidesJoined(reversedRideObjs);
  });

  useEffect(() => {
    // put stuff in here eventually
  }, []);

  useEffect(() => {
    const addMessages = (data) => {
      if (
        (data.recipient._id === activeChat.recipient._id &&
          data.sender._id === props.userId) ||
        (data.sender._id === activeChat.recipient._id &&
          data.recipient._id === props.userId) ||
        (data.recipient._id === "ALL_CHAT" && activeChat.recipient._id === "ALL_CHAT")
      ) {
        setActiveChat(prevActiveChat => ({
          recipient: prevActiveChat.recipient,
          messages: prevActiveChat.messages.concat(data),
        }));
      }
    };
    socket.on("message", addMessages);
    return () => {
      socket.off("message", addMessages);
    };
  }, [activeChat.recipient._id, props.userId]);

  // useEffect(() => {
  //   const callback = (data) => {
  //     setActiveUsers([ALL_CHAT].concat(data.activeUsers));
  //   };
  //   socket.on("activeUsers", callback);
  //   return () => {
  //     socket.off("activeUsers", callback);
  //   };
  // }, []);

  const setActiveUser = (user) => {
    if (user._id !== activeChat.recipient._id) {
      setActiveChat({
        recipient: user,
        messages: [],
      });
    }
  };

  let masterModal = null;

  if (!props.userId) {
    masterModal=<>
    <h1>My Chats</h1>
    <h4>Please login to Google with an @mit.edu email first!</h4>
    </> 
  }else{
    masterModal=<>
    <h1>My Chats</h1>
    <div className="u-flex u-relative Chatbook-container">
      <div className="Chatbook-userList">
        <ChatList
          setActiveUser={setActiveUser}
          userId={props.userId}
          ridesJoined={ridesJoined}
          // users={activeUsers}
          active={activeChat.recipient}
        />
      </div>
      <div className="Chatbook-chatContainer u-relative">
        <Chat data={activeChat} />
      </div>
    </div>
    </>
  }

  return (
    <><Container className="u-marginTopPage u-marginBottomPage">{masterModal}</Container></>
  );
}

export default Chatbook;
