import React, { useState } from "react";
import "./message.css";

const Message = (props) => {
const {msgs} = props;

  return (
    <>
    {msgs.map((msg)=>
    <div className={msg.sender?"incoming-msg":"outgoing-msg"}>
        {/* {msg.text} */}
    </div>
)}
    </>
  );
};

export default Message;
