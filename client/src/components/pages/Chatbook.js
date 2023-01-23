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

  const [activeChat, setActiveChat] = useState({
    recipient: {
      _id: "dummy id",
      rideName: "dummy ride name",
    },
    messages: [],
  });

  const loadMessageHistory = (recipient) => {
    get("/api/chat", { recipient_id: recipient._id }).then((messages) => {
      setActiveChat({
        recipient: recipient,
        messages: messages,
      });
    }).then(() => {
      console.log(`activeChat: ${JSON.stringify(activeChat)}`);
    });
  };

  useEffect(() => {
    loadMessageHistory(activeChat.recipient);
  }, [activeChat.recipient._id]);

  useEffect(() => {
    const query = {
      my_googleid: props.user_googleid,
    };

    get("/api/getActiveJoinedRides", query).then((rideObjs) => {
      // console.log("getting Joined Rides list");
      // console.log(`rideObjs: ${rideObjs}`);
      // console.log(`props.user_googleid for Chatbook.js: ${props.user_googleid}`);
  
      let reversedRideObjs = rideObjs.reverse();
      setRidesJoined(reversedRideObjs);
  
      if (reversedRideObjs.length > 0){
        let recipient = {
          _id: rideObjs[0]._id,
          rideName: `${rideObjs[0].user_name}'s Ride to ${rideObjs[0].destination}, ${rideObjs[0].start_date}`
        }

        console.log(`recipient being passed into loadMessageHistory: ${JSON.stringify(recipient)}`)
        loadMessageHistory(recipient);
      }
    });
  }, []);

  useEffect(() => {
    const addMessages = (data) => {
      console.log(`data.recipient._id: ${data.recipient._id}`);
      console.log(`data.sender._id: ${data.sender._id}`);
      console.log(`activeChat.recipient._id: ${activeChat.recipient._id}`);

      if (data.recipient._id === activeChat.recipient._id) {
        console.log("data.recipient._id === activeChat.recipient._id")
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

  const setActiveUser = (rideObj) => {
    if (rideObj._id !== activeChat.recipient._id) {
      let myRecipient = {
        _id: rideObj._id,
        rideName: `${rideObj.user_name}'s Ride to ${rideObj.destination}, ${rideObj.start_date}`
      }

      setActiveChat({
        recipient: myRecipient,
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
    if (ridesJoined.length > 0){
      masterModal=<>
      <h1>My Chats</h1>
      <div className="u-flex u-relative Chatbook-container">
        <div className="Chatbook-userList">
          <ChatList
            setActiveUser={setActiveUser}
            userId={props.userId}
            ridesJoined={ridesJoined}
            // users={activeUsers}
            active={activeChat.recipient._id}
          />
        </div>
        <div className="Chatbook-chatContainer u-relative">
          <Chat data={activeChat} />
        </div>
      </div>
      </>
    }else{
      masterModal=<>
      <h1>My Chats</h1>
      <p>You are not part of any rides, join or create one now to be part of a chat!</p>
      </>
    }
    
  }

  return (
    <><Container className="u-marginTopPage u-marginBottomPage">{masterModal}</Container></>
  );
}

export default Chatbook;
