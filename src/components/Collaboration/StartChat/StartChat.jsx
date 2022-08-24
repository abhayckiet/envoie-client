import React, { useState } from "react";
import { Popover, Button, AppBar, TextareaAutosize, Box } from "@mui/material";
import "./startChat.css";
import axios from "axios";
import Message from './Message.jsx'
import * as XMPP from "stanza";
// import  {Back, Kebab, Expand, Avatar, Clock, SendDisabled, Search}  from "../../../common/icons";
import Back from "../../../common/icons/Back.svg";
import Avatar from "../../../common/icons/Avatar.svg";
import KebabMenu from "../../../common/icons/KebabMenu.svg";
import Clock from "../../../common/icons/Clock.svg";
import Expand from "../../../common/icons/Expand.svg";

const StartChat = (props) => {
  const { setOpenChat, set, selectedRecord, client } = props;
  const [msg, setMsg] = useState("");

const msgs = [
  {text:"Hello", sender: "JJ"},
  {text:"Hi", sender: ""},
  {text:"Ssup?", sender: "JJ"},
  {text:"Fine", sender: ""}
]

  const storeMsg = (message) => {
    setMsg(message);
    // console.log("MSG: ", msg);
  };

  const sendMsg = (myMsg) => {
    // console.log(selectedRecord);
    // axios.post(url, { id: selectedRecord.id, message: msg }).finally(() => {
    //   setMsg("");
    // });
    myMsg.stopPropagation();
    console.log("inside send message", myMsg);
    // client.sendMessage({
    //   to: "vageesh@walmart.com",
    //   body: "You sent: ",
    // });
    client.getRoster();
    client.sendPresence();
    client.joinRoom("b5783755-3db5-4eba-b837-553db5debaf8", "gsuserpartner4%40gmail.com" );
    client.sendMessage({
      // to: "po12345@conference.walmart.com",
      to: "b5783755-3db5-4eba-b837-553db5debaf8",
      body: "You sent: " + '22a'
    });
  };

  return (
    <>
      <div className="chat-header">
        <div className="header">
          {/* {Collaborate} */}
          <img className="img-back" src={Back} />
          <div className="user-avatar">
            <img className="img-avatar" src={Avatar} />
          </div>
          <div className="user-info">
            <div className="context">PO 12345</div><div className="last-seen"> <img className="img-clock" src={Clock} /> A few mins ago</div></div>

          <img className="img-kebab-menu" src={KebabMenu} />
          <img className="img-expand" src={Expand} />
        </div>
        <div className="context"></div>
      </div>
      <div className="chat-body">
        <Message msgs={msgs}/>
      </div>
      <div className="chat-footer">
        <Box sx={{ flexGrow: 1 }}></Box>
        <TextareaAutosize
          aria-label="empty textarea"
          placeholder=""
          style={{ width: 100, height: 50 }}
          className="msg-section"
          onChange={(e) => storeMsg(e.target.value)}
          value={msg}
        >
          
        </TextareaAutosize>
        <Button onClick={(e)=>sendMsg(e)}>Send</Button>
       
      </div>
    </>
  );
};

export default StartChat;
