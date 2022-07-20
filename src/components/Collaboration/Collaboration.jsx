import React, { useState } from "react";
import { Popover, Button, AppBar, TextareaAutosize, Box } from "@mui/material";
import "./collaboration.css";
import axios from "axios";
import Home from "./Home/Home.jsx";
import UserSearch from "./UserSearch/UserSearch.jsx";
import StartChat from "./StartChat/StartChat.jsx";
import * as XMPP from "stanza";

let globalClient;

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
  const url = "wss://v0c03qe.openfire.lab.walmart.com/ws/";
  // const url = "https://gmail.com";

  const client = XMPP.createClient({
    jid: "abhay@walmart.com",
    password: "abhay",

    // If you have a .well-known/host-meta.json file for your
    // domain, the connection transport config can be skipped.
    transports: {
      websocket: url,
      // bosh: "https://example.com:5281/http-bind",
    },
  });

  window.client = client;

  client.on("session:started", () => {
    console.log("session:started");
    client.getRoster();
    client.sendPresence();
    var globalClient = client;
  });

  client.on("chat", (msg) => {
    console.log("chAT", msg);
    console.log("chat", msg);
    // client.sendMessage({
    //   to: msg.from,
    //   body: "You sent: " + msg.body,
    // });
    client.sendMessage("You sent: ");
  });

  client.on("headline", (msg) => {
    console.log("chAT", msg);
    console.log("chat", msg);
  });

  client.on("muc:invite", (MUCInviteEvent) => {
    console.log("muc:invite", MUCInviteEvent);
    client.joinRoom(MUCInviteEvent.room, "ABHAY");
  });

  const handleClose = () => {
    setOpenChat(false);
  };

  const openPopUp = (id) => {
    // console.log("Opening with id: ", id);
    setSelectedRecord(id);
    setOpenChat(true);
    console.log("client: ", client);
    client.connect();
  };

  const renderHome = false;

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
          {renderHome ? (
            <Home />
          ) : (
            <StartChat
              setOpenChat={setOpenChat}
              selectedRecord={selectedRecord}
              setSelectedRecord={setSelectedRecord}
              client={client}
            />
          )}
        </Popover>
      </div>
    </>
  );
};

export default Collaboration;
