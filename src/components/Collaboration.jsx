import React, { useState } from "react";
import { Popover, Button, AppBar, TextareaAutosize, Box } from "@mui/material";
import "./collaboration.css";
import axios from "axios";

const Collaboration = () => {
  const data = [
    {
      id: 1,
      name: "Lijeesh",
    },
    {
      id: 2,
      name: "Abhay",
    },
    {
      id: 3,
      name: "Vageesh",
    },
    {
      id: 4,
      name: "Kumar",
    },
  ];

  const [openChat, setOpenChat] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [msg, setMsg] = useState("");

  const openPopUp = (id) => {
    // console.log("Opening with id: ", id);
    setSelectedRecord(id);
    setOpenChat(true);
  };

  const storeMsg = (message) => {
    setMsg(message);
    // console.log("MSG: ", msg);
  };

  const handleClose = () => {
    setOpenChat(false);
  };

  const url = "http://localhost:3000";

  const sendMsg = () => {
    console.log(selectedRecord);
    axios.post(url, { id: selectedRecord.id, message: msg }).finally(() => {
      setMsg("");
    });
  };

  return (
    <>
      <table>
        {data.map((record) => {
          return (
            <tr>
              <td width="50">{record.id}</td>
              <td width="50">{record.name}</td>
              <td width="50">
                <Button onClick={() => openPopUp(record)}>Collaborate</Button>
              </td>
            </tr>
          );
        })}
      </table>
      <div className="chat-dialog">
        <Popover
          // id={id}
          open={openChat}
          // anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          className="chat-popup"
        >
          <div className="chat-footer">
            <Box sx={{ flexGrow: 1 }}>
              {" "}
              {/* <AppBar>{selectedRecord.name}</AppBar>{" "} */}
            </Box>
            <TextareaAutosize
              aria-label="empty textarea"
              placeholder="Empty"
              style={{ width: 440, height: 50 }}
              className="msg-section"
              onChange={(e) => storeMsg(e.target.value)}
              value={msg}
            >
              {/* {msg} */}
            </TextareaAutosize>
            {/* <textarea
              className="msg-section"
              onChange={(e) => storeMsg(e.target.value)}
            >
              {msg}
            </textarea> */}
            <Button onClick={sendMsg}>Send</Button>
          </div>
        </Popover>
      </div>
    </>
  );
};

export default Collaboration;
