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
  const url = "wss://openfire.envoie.gs.dev.walmart.com/ws/";
  // const openfireUrl = "https://openfire.admin.console.lab.walmart.com/plugins/"
  // const url = "https://gmail.com";

  const client = XMPP.createClient({
    jid: "gsuserpartner4%40gmail.com@walmart.com",
    password: "50c3e38c-cdae-46ea-9e92-e5f6ccb3e4bb",

    // If you have a .well-known/host-meta.json file for your
    // domain, the connection transport config can be skipped.
    transports: {
      websocket: url,
      // bosh: "https://example.com:5281/http-bind",
    },
  });

  window.client = client;

  client.on("session:started", () => {
    console.log("session:started", client.sendMessage);
    client.getRoster();
    client.sendPresence();
    //    client.sendMessage({
    //   // to: "po12345@conference.walmart.com",
    //   to: "vageesh@walmart.com",
    //   body: "You sent: " + "Hello12345",
    //   type: "chat"
    // });

    // <roomName>PO123</roomName>
    // <naturalName>PO123-2</naturalName>
    // <description>PO123</description>
    // <subject>PO123 Subject</subject>
    // <maxUsers>100</maxUsers>
    // <persistent>true</persistent>
    // <publicRoom>true</publicRoom>
    // <registrationEnabled>true</registrationEnabled>
    // <canAnyoneDiscoverJID>true</canAnyoneDiscoverJID>
    // <canOccupantsChangeSubject>true</canOccupantsChangeSubject>
    // <canOccupantsInvite>true</canOccupantsInvite>
    // <canChangeNickname>true</canChangeNickname>
    // <logEnabled>true</logEnabled>
    // <loginRestrictedToNickname>false</loginRestrictedToNickname>
    // <membersOnly>false</membersOnly>
    // <moderated>false</moderated>
    // <owners>
    //     <owner>vageesh@walmart.com</owner>
    // </owners>
    // <admins>
    //     <admin>abhay@walmart.com</admin>
    // </admins>
    // <members>
    //     <member>pavan@walmart.com</member>
    // </members>

    const createRoomBody = {
      "roomName": "Abhay100",
      "description": "Abhay100",
      "subject": "PO123 Subject",
      "naturalName": "PO123-2",
      "maxUsers": 100,
      "persistent": true,
      "publicRoom": true,
      "registrationEnabled": true,
      "canAnyoneDiscoverJID": true,
      "canOccupantsChangeSubject": true,
      "canOccupantsInvite": true,
      "canChangeNickname": true,
      "logEnabled": true,
      "loginRestrictedToNickname": false,
      "membersOnly": false,
      "moderated": false,
      "owners": [
        "vageesh@walmart.com"
      ],
      "admins": [
        "abhay@walmart.com"
      ],
      "members": [
        "pavan@walmart.com"
      ]
    }

    const postHeaders = {
      'Authorization': 'not_random'
    }

    // axios.post(`${openfireUrl}restapi/v1/envoie/muc`,createRoomBody, {
    //   headers: postHeaders
    // })
    // .then((resp)=>{console.log("create room resp: ",resp)})
    // .catch((err)=>{console.log("create room err: ",err)})
  });

  client.on("chat", (msg) => {
    console.log("chAT", msg);
    // console.log("chat", msg);
    // client.sendMessage({
    //   to: msg.from,
    //   body: "You sent: " + msg.body,
    // });
    client.sendMessage("You sent: ");
  });

  client.on("message:error", (msg) => {
    console.log("groupchat:", msg);
    // console.log("chat", msg);
    // client.sendMessage({
    //   to: msg.from,
    //   body: "You sent: " + msg.body,
    // });
    // client.sendMessage("You sent: ");
  });

  client.on("headline", (msg) => {
    console.log("chAT", msg);
    console.log("chat", msg);
  });

  client.on("muc:invite", (MUCInviteEvent) => {
    console.log("muc:invite", MUCInviteEvent);
    client.joinRoom(MUCInviteEvent.room, "gsuserpartner4%40gmail.com" );
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

  // {
  //   "conversationId": "string",
  //   "title": "testingfromnew2",
  //   "description": "string",
  //   "context": {
  //     "contextId": "string"
  //   },
  //   "members": [
  //     {
  //       "loginId": "gsuserpartner4@gmail.com"
  //     },
  //     {
  //       "loginId": "gsuserpartner2@gmail.com"
  //     }
  //   ]
  // }

  const createBaseUrl = "https://envoie.gs.dev.walmart.com/v1/conversation";
  const createHeaders= {"Authorization": 'Bearer ',
    "Content-Type": 'application/json' };
  const createBody =   {
    "title": "PO1",
    "description": "string",
    "context": {
      "contextId": "string"
    },
    "members": [
      {
        "loginId": "gsuserpartner3@gmail.com"
      },
      {
        "loginId": "gsuserpartner2@gmail.com"
      }
    ]
  };

  const initiateConv = () => {
    axios.post(createBaseUrl, createBody, {
        headers: createHeaders
      })
    .then((resp)=>{console.log("Create Resp: ",resp)})
    .catch((err) => {console.log("Create Err: ",err)});
  }

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
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          className="chat-popup"
        >
          <Button onClick={initiateConv}>Start</Button>
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
