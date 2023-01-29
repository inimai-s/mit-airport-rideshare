import React, { useState, useEffect } from "react";

import "./SingleMessage.css";

import Linkify from 'react-linkify';

/**
 * Renders a single chat message
 *
 * Proptypes
 * @param {MessageObject} message
 */
const SingleMessage = (props) => {

  let messageModal=<></>

  console.log(`props.message.sender._id ${props.message.sender._id}`)
  console.log(`props.userId ${props.userId}`)

  if (props.message.sender._id === props.userId){
    messageModal=<>
    <div className={"u-flex u-flex-alignCenter SingleMessage-container"}>
      <span className="SingleMessage-myContent">
        <Linkify componentDecorator={(decoratedHref, decoratedText, key) => (
          <a target="blank" href={decoratedHref} key={key} className="SingleMessage-myLink">
              {decoratedText}
          </a>
        )}>
            {props.message.content}
        </Linkify>
      </span>
    </div>
    </>
  }else if(props.message.sender.user_name=="ridechatbot"){
    messageModal=<>
    <div className={"u-flex u-flex-alignCenter SingleMessage-container"}>
      <span className="SingleMessage-rideChatBotContent">
        <Linkify componentDecorator={(decoratedHref, decoratedText, key) => (
          <a target="blank" href={decoratedHref} key={key} className="SingleMessage-myLink">
              {decoratedText}
          </a>
        )}>
            {props.message.content}
        </Linkify>
      </span>
    </div>
    </>
  }else{
    messageModal=<>
    <div className={"u-flex u-flex-alignCenter SingleMessage-container"}>
      <span className="SingleMessage-sender u-bold">{props.message.sender.user_name + ":"}</span>
      
      <span className="SingleMessage-content">
        <Linkify componentDecorator={(decoratedHref, decoratedText, key) => (
          <a target="blank" href={decoratedHref} key={key}>
              {decoratedText}
          </a>
        )}>
            {props.message.content}
        </Linkify>
      </span>
    </div>
    </>
  }
  return (
    messageModal
  );
}

export default SingleMessage;
