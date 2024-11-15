import React from "react";
import { NavLink } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Typography,
  Paper,
} from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    minHeight: 360,
    paddingTop: 15,
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    width: "100%",
  },
  textField: {
    "& .MuiInputBase-input": {
      height: "5px",
      textAlign: "left",
    },
    "& .MuiInputLabel-root": {
      fontSize: "14px",
      top: "-5px",
      textAlign: "left",
    },
    '& input[type="file"]': {
      height: "25px",
    },
  },
  uploadArea: {
    padding: 10,
    margin: "10px 0",
    padding: "20px",
    textAlign: "center",
    cursor: "pointer",
  },
  TitleCard: {
    display: "flex",
    justifyContent: "space-between",
    padding: "20px 10px !important",
    alignItems: "center",
  },
  TitleText: {
    fontSize: "18px",
    fontWeight: "bold",
  },
  chatContainer: {
    marginTop: "20px",
    padding: "30px",
    borderRadius:10,
    backgroundColor:"#f0f4fb",
    margin:20,

  },
  message: {
    margin: "10px 0",
    padding: "10px",
    borderRadius: "8px",
    maxWidth: "70%",
  },
  senderMessage: {
    backgroundColor: "#e3f2fd",
    marginLeft: "auto",
  },
  receiverMessage: {
    backgroundColor: "#f1f1f1",
  },
  messageHeader: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "12px",
    fontWeight: "bold",
    marginBottom: "5px",
  },
  messageBody: {
    fontSize: "14px",
    lineHeight: "1.5",
  },
  queryHeader: {
    display: "flex",
    justifyContent: "space-between",
    margin: "0 25px",
    padding: "10px 0",
    
  },
}));

const Create = () => {
  const classes = useStyles();

  // Sample chat messages (Sender and Receiver)
  const messages = [
    {
      sender: "John Doe",
      description: "This is a sample message from the sender.",
      date: "2024-11-14 10:30 AM",
      type: "sender", // Type can be 'sender' or 'receiver'
    },
    {
      sender: "Jane Smith",
      description: "This is a response from the receiver to the sender's query.",
      date: "2024-11-14 10:35 AM",
      type: "receiver",
    },
  
  ];

  return (
    <Container disableGutters>
      <Grid container spacing={2}>
        <Grid item xs={12} className={classes.TitleCard}>
          <Typography variant="h5" className={classes.TitleText}>
            Query Details - Project Name
          </Typography>
          <NavLink to={"/layout/dashboard"}>
            <Button variant="contained" color="primary">
              Go Back
            </Button>
          </NavLink>
        </Grid>
      </Grid>
      <Grid container fullWidth spacing={2}>
        <Card className={classes.card}>
            {/* Chat Conversation Section */}
            <div className={classes.queryHeader}>
              <Box style={{display:'flex'}}>
                <Typography variant="body1" style={{lineHeight: 0,}}>Query Title:</Typography>
                <Typography variant="h6" style={{lineHeight: 0,paddingLeft:10}}> Sample Query Title</Typography>
              </Box>
              <Box style={{display:'flex'}}>
                <Typography variant="body1" style={{lineHeight: 0,}}>Query Status:</Typography>
                <Typography variant="h6" style={{ color: "green", lineHeight: 0,paddingLeft:10 }}>
                   Success
                </Typography>
              </Box>
            </div>

            <div className={classes.chatContainer}>
              <Typography variant="h6">Chat Conversation</Typography>
              {messages.map((message, index) => (
                <Box
                  key={index}
                  className={`${classes.message} ${message.type === "sender" ? classes.senderMessage : classes.receiverMessage}`}
                >
                  <div className={classes.messageHeader}>
                    <Typography variant="body2">{message.sender}</Typography>
                    <Typography variant="body2">{message.date}</Typography>
                  </div>
                  <Typography variant="body2" className={classes.messageBody}>
                    {message.description}
                  </Typography>
                </Box>
              ))}
            </div>
           
          <div style={{ display: "flex", flexWrap: "wrap" }}>
          <Grid item xs={12} style={{marginLeft:25}}>
          <Typography type="h6" >Response Message:-</Typography>
          </Grid>
            <Grid item xs={5} style={{ margin: "10px auto 20px auto" }}>
              <FormControl style={{ marginTop: 5 }} fullWidth>
                <TextField
                  className={classes.textField}
                  id="mailSubject"
                  label="From"
                  variant="outlined"
                />
              </FormControl>
            </Grid>

            <Grid item xs={5} style={{ margin: "10px auto 20px auto" }}>
              <FormControl style={{ marginTop: 5 }} fullWidth>
                <InputLabel id="assign-to-label" style={{ left: 12, top: -10 }}>
                  Assign to
                </InputLabel>
                <Select id="assign-to" labelId="assign-to-label" variant="outlined" label="Assign to">
                  <MenuItem value="">Select</MenuItem>
                  <MenuItem value="AM 1">AM 1</MenuItem>
                  <MenuItem value="AM 2">AM 2</MenuItem>
                  <MenuItem value="AM 3">AM 3</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={5} style={{ margin: "10px auto 20px auto" }}>
              <FormControl style={{ marginTop: 5 }} fullWidth>
                <InputLabel id="relevant-to-label" style={{ left: 12, top: -10 }}>
                  Relevant to
                </InputLabel>
                <Select id="relevant-to" labelId="relevant-to-label" variant="outlined" label="Relevant to">
                  <MenuItem value="">Select</MenuItem>
                  <MenuItem value="Query 1">Query 1</MenuItem>
                  <MenuItem value="Query 2">Query 2</MenuItem>
                  <MenuItem value="Query 3">Query 3</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={5} style={{ margin: "10px auto 20px auto" }}>
              <FormControl style={{ marginTop: 5 }} fullWidth>
                <TextField
                  className={classes.textField}
                  id="query-title"
                  label="Title of Query *"
                  variant="outlined"
                />
              </FormControl>
            </Grid>

            <Grid item xs={11} style={{ margin: "10px auto 20px auto" }}>
              <FormControl style={{ marginTop: 5 }} fullWidth>
                <TextField
                  className={classes.textField}
                  id="query-description"
                  label="Description of Query *"
                  variant="outlined"
                  multiline
                  rows={4}
                />
              </FormControl>
            </Grid>

            <div style={{ width: "90%", margin: "10px auto 20px auto" }}>
              <Typography variant="h5">Requirement Sheet</Typography>
              <Paper
                variant="outlined"
                className={classes.uploadArea}
                style={{
                  border: "1px dashed #3f51b5",
                  backgroundColor: "#ffffff",
                }}
              >
                <Box>
                  <CloudUploadIcon style={{ fontSize: 56, color: "#3f51b5" }} />
                  <Typography variant="body1" style={{ marginTop: "10px" }}>
                    Drag & Drop the files here or click to select one
                  </Typography>
                  <Typography variant="body2" style={{ marginTop: "10px" }}>
                    Max. File Size: 2 Mb <br />
                    Supported Files: JPG, PNG, PDF, XCL, DOC ONLY.
                  </Typography>
                </Box>
              </Paper>

              <Button variant="contained" color="primary" style={{ marginTop: "20px" }}>
                SUBMIT
              </Button>
            </div>

          
          </div>
        </Card>
      </Grid>
    </Container>
  );
};

export default Create;
