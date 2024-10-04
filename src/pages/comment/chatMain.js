import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Typography,
  Avatar,
  TextField,
  Divider,
  IconButton,
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import axios from "axios";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

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
    margin: "15px 0",
    minHeight: "70%",
  },
  messageFromCurrentUser: {
    justifyContent: "flex-end",
  },
  messageFromOtherUser: {
    justifyContent: "flex-start",
  },
  chatMessageCard: {
    width:'100%',
    backgroundColor: "#D3D3D3",
    borderRadius: "8px",
    padding: "10px",
    maxWidth: "350px",
  },
  chatMessage1:{
    display:'flex',
    flexDirection:'column',
    // gap:'10px',
    textAlign:'end'
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
const ChatMain = ({ id }) => {
  const classes = useStyles();

  const auth = useSelector((state) => state.auth);

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

  const [chatData, setChatData] = React.useState([]);
  const [inputvalue, setInputvalue] = useState("");
  const [error, setError] = useState(false);


  const initialChatList = async () => {
    const token = localStorage.getItem("accessToken");

    await axios
      .get(`http://3.108.100.249/api/v1/comment/getlist?_id=${id}`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : null,
        },
      })
      .then((response) => {
        console.log("chat", response);
        setChatData(response.data.payload.data);
      })
      .catch((err) => {
        console.log("ERR", err);
      });
  };

  useEffect(() => {
    console.log("runing");
    initialChatList();
  }, []);

  const chatMessage = async () => {
    console.log("message", inputvalue);
    const token = localStorage.getItem("accessToken");
    await axios
      .post(
        "http://3.108.100.249/api/v1/comment/create",
        {
          message: `${inputvalue}`,
          project: `${id}`,
        },
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : null,
          },
        }
      )
      .then((response) => {
        console.log("chatmessage", response);
        setInputvalue("");
        initialChatList();
      })
      .catch((err) => {
        console.log("Errr message", err);
      });
  };

  useEffect(() => {
    console.log("runingchatmessage");
    chatMessage();
  }, []);

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
    setError(false)
    if(/^[a-zA-Z]+$/.test(e.target.value) ){

      setInputvalue(e.target.value);
    }else{
      setError(true)
    }
  };
  return (
    <div className={classes.chatMainContentCon}>
      <div style={{ minHeight: "650px" }}>
        {Array.isArray(chatData) && chatData.length > 0 ? (
          chatData.map((chat, idx) => {
            const time = formatTimestamp(chat.timestamp);
            const isCurrentUser =
              chat.user.id === auth?.payloadLogin?.payload?.data?.user?._id;
            const messageClass = isCurrentUser
              ? classes.messageFromOtherUser
              : classes.messageFromCurrentUser

            return (
              <div
                key={idx}
                className={`${classes.chatMessageCardCon} ${messageClass}`}
              >
                {/* {!isCurrentUser && (
                  <Avatar
                    className={classes.Avatar}
                    alt=""
                    src={"https://cms.interiorcompany.com/wp-content/uploads/2024/01/red-velvet-types-of-red-roses.jpg"} // Assuming avatar URL is provided
                  />
                )} */}
                <div className={classes.chatMessageCard}>
                  <div className={classes.chatMessage1}>
                  <Typography variant="overline" color="primary" style={{lineHeight:'2'}} >{auth.payloadLogin.payload.data.user.firstName}</Typography>
                  <Typography variant="caption" style={{color:'#757575', lineHeight:0,textTransform:'lowercase', letterSpacing:0}}>{auth.payloadLogin.payload.data.user.role[0]}</Typography> 
                    <Typography variant="body1" style={{marginTop:'20px'}}>{chat.message}</Typography>
                  </div>
                  <div className={classes.chatMessTimeCon}>
                    <Typography variant="caption" style={{color:'#757575'}}>{dayjs(chat.createdAt).format("h:mm A")}</Typography>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <Typography>No chat data available.</Typography>
        )}
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
        <Typography>{error?"Error Occured":null}</Typography>
        <IconButton color="primary" onClick={chatMessage}>
          <SendIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default ChatMain;
