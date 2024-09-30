import React, { useState } from "react";
import { useStyle } from "../chatStyle";
import { messages, currentUser } from "../chatData";
import {
  makeStyles,
  Typography,
  Avatar,
  TextField,
  Divider,
  IconButton,
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send"

const useStyles = makeStyles((theme) => ({
  chatMainContentCon: {
    margin: "0",
    padding: "0 ",
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
    
  },
  chatMessageCardCon: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    margin: "5px 0",
    minHeight:"70%"
  },
  messageFromCurrentUser: {
    justifyContent: "flex-end",
  },
  messageFromOtherUser: {
    justifyContent: "flex-start",
  },
  chatMessageCard: {
    backgroundColor: "#D3D3D3",
    borderRadius: "8px",
    padding: "10px",
    maxWidth: "70%",
  },
  chatMessTimeCon: {
    float: "right",
    fontSize: "0.7rem",
    color: "black",
  },
  Avatar: {
    borderRadius: "50%",
  },
}));
const ChatMain = () => {
  const classes = useStyles();

  const message = [
    {
      id: "1234567890",
      text: "Having difficulty in requirement sheet",
      sender: {
        id: "user123",
        username: "john_doe",
        avatar: "https://example.com/avatar/john_doe.png",
      },
      timestamp: "2024-09-01T12:34:56Z",
      chatRoomId: "room123",
      isRead: false,
    },
    {
      id: "1234567891",
      text: "I will solve by myself",
      sender: {
        id: "user456",
        username: "jane_doe",
        avatar: "https://example.com/avatar/jane_doe.png",
      },
      timestamp: "2024-09-01T12:35:56Z",
      chatRoomId: "room123",
      isRead: true,
    },
   
  ];

  const [renderingValue, setRenderingValue] = useState(message);
  const [inputvalue, setInputvalue] = useState('');

  

  const handleSendMessage = () => {
     setRenderingValue([...renderingValue, {
      id: "1234567891",
      text: inputvalue,
      sender: {
        id: "user123",
        username: "jane_doe",
        avatar: "https://example.com/avatar/jane_doe.png",
      },
      timestamp: Date.now(),
      chatRoomId: "room123",
      isRead: true,
    }]);
    setInputvalue("")
  
  };

  const formatTimestamp = (timestamp) => {
    const dateObj = new Date(timestamp);
    const date = dateObj.toLocaleDateString();
    const timeOptions = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    const time = dateObj.toLocaleTimeString(undefined, timeOptions);
    return { date, time };
  };
  const handleTextInput = (e) => {
    setInputvalue(e.target.value);
   };
  return (
    <div className={classes.chatMainContentCon}>
      <div style={{minHeight:"650px"}}>
      {renderingValue.map((chat, idx) => {
        const { time } = formatTimestamp(chat.timestamp);
        const isCurrentUser = chat.sender.id === currentUser.id;
        const messageClass = isCurrentUser
          ? classes.messageFromCurrentUser
          : classes.messageFromOtherUser;
        return (
          <div
            key={idx}
            className={`${classes.chatMessageCardCon} ${messageClass}`}
          >
            {!isCurrentUser && (
              <Avatar
                className="Avatar"
                alt=""
                src="https://media.istockphoto.com/id/2157531592/photo/lotus-flower.jpg?s=2048x2048&w=is&k=20&c=z4ZjNylCWsZ5bMrYa4nwRViwVIwY4sjAC6y13vD9wJI="
              />
            )}
            <div className={classes.chatMessageCard}>
              <div>
                <Typography variant="p">{chat.text}</Typography>
              </div>
              <div className={classes.chatMessTimeCon}>
                <Typography variant="p">{time}</Typography>
              </div>
            </div>
          </div>
        );
      })}
      </div>
      <Divider />
      <div
        className="inputcontainer"
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "20px",
        }}
      >
        <IconButton color="primary">{/* <AttachFileIcon/> */}</IconButton>
        <TextField
          className="inputfield"
          style={{ width: "100%" }}
          variant="outlined"
          value={inputvalue}
          onChange={handleTextInput}
          placeholder=" Type a message.... "
        />
        <IconButton color="primary" onClick={handleSendMessage}>
          <SendIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default ChatMain;
