import React, { useState } from "react";
import { Popover, Button, AppBar, TextareaAutosize, Box } from "@mui/material";
import "./startChat.css";
import axios from "axios";
// import Home from './Home/Home.jsx'
import * as XMPP from "stanza";
// import { Collaborate } from "../../commmon/icons";

const StartChat = (props) => {
  const { setOpenChat, set, selectedRecord, client } = props;
  const [msg, setMsg] = useState("");
  const storeMsg = (message) => {
    setMsg(message);
    // console.log("MSG: ", msg);
  };

  const sendMsg = () => {
    // console.log(selectedRecord);
    // axios.post(url, { id: selectedRecord.id, message: msg }).finally(() => {
    //   setMsg("");
    // });
    console.log("inside send message");
    // client.sendMessage({
    //   to: "vageesh@walmart.com",
    //   body: "You sent: ",
    // });
    client.sendMessage("Hello");
  };

  return (
    <>
      <div className="chat-header">
        <div className="salutation">{/* <img src={Collaborate}></img> */}</div>
        <div className="context"></div>
      </div>
      <div className="chat-body"></div>
      <div className="chat-footer">
        <Box sx={{ flexGrow: 1 }}></Box>
        <TextareaAutosize
          aria-label="empty textarea"
          placeholder=""
          style={{ width: 440, height: 50 }}
          className="msg-section"
          onChange={(e) => storeMsg(e.target.value)}
          value={msg}
        ></TextareaAutosize>

        <Button onClick={sendMsg}>Send</Button>
      </div>
    </>
  );
};

export default StartChat;
