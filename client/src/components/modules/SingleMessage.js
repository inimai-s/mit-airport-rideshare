import React, { useState, useEffect } from "react";

import "./SingleMessage.css";

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
      <span className="SingleMessage-myContent">{props.message.content}</span>
    </div>
    </>
  }else{
    messageModal=<>
    <div className={"u-flex u-flex-alignCenter SingleMessage-container"}>
      <span className="SingleMessage-sender u-bold">{props.message.sender.user_name + ":"}</span>
      <span className="SingleMessage-content">{props.message.content}</span>
    </div>
    </>
  }
  return (
    messageModal
  );
}

export default SingleMessage;
