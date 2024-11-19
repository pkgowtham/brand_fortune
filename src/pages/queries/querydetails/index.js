import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Container,
  TextField,
  Typography,
  makeStyles,
  FormControl,
  Grid,
  Select,
  MenuItem,
  Input,
  InputLabel,Box,
  Checkbox,
  ListItemText,
  FormHelperText,
} from "@material-ui/core";
import { useLocation, useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { axio } from "../../../axios";
import {
  deleteProject,
  getListProject,
  initialStateDeleteProject,
  initialStateGetListProject,
} from "../../../service/project/action";
import { INTERNAL } from "../../../constant/internal";
import { filterDataProject } from "../../../service/internal/action";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
    padding: "20px",
    backgroundColor: "white",
    borderRadius: "10px",
    boxShadow:
      "0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)",
  },
  formControl: {
    width: "100%",
    padding: "20px",
  },
  formControlSelect: {
    width: "100%",
    marginTop: "20px",
    marginLeft: "20px",
  },
  button: {
    marginTop: "45px",
  },
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

function Create() {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const articleType = location?.state;
  const [brandList, setBrandList] = React.useState([]);
  const [moduleData, setModuleData] = React.useState([]);
  const auth = useSelector((state) => state.auth);
  const [selectedRole, setSelectedRole] = useState("");
  const dispatch = useDispatch();
  const internal = useSelector((store) => store.internal);
  const project = useSelector((store) => store.project);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const [file, setFile] = useState(null);

  console.log("articleTypes", articleType);

  const [inputvalue, setInputvalue] = useState({
    title: "",
    question: "",
    projectRole: "", // Ensure this is initialized as an empty string
    assignId: "",
    _id: "",
  });
  const [deleterows, setDeleterows] = useState([]);

  console.log(inputvalue);
  const [error, setError] = useState({
    label: false,
    brand: false,
  });

  
  const regex = {
    label: /^[A-Za-z\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/,
  };
   

  const { _id: locationProjectId } = location.state || {};
  console.log(locationProjectId);

   
  const formCreate = async () => {
    console.log("Formmessage", inputvalue);
    const token = localStorage.getItem("accessToken");
    const projectId = locationProjectId || inputvalue._id;
    const senderId = inputvalue._id || auth?.payloadLogin?.payload?.data?.user?._id;

    console.log("Project Id", projectId);

    // Create an object for the form data
    const data = {
        title: inputvalue.title,
        question: inputvalue.question,
        projectRole: selectedRole,
        projectId: projectId,
        senderId: senderId,
        assignId: selectedUser,
    };

    // Create a new FormData object
    const formData = new FormData();

    // Append the 'data' object as a JSON string
    formData.append("data", JSON.stringify(data));

    if (file) {
      formData.append("attachment", file); // Append the file as 'attachment'
    }

    // Make the POST request with the FormData containing the JSON string
    await axio
      .post(
        "/quering/create",
        formData,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : null,
          },
        }
      )
      .then((response) => {
        console.log("formmessage", response);
        enqueueSnackbar("Successfully Created", { variant: "success" });
        navigate("/layout/dashboard");
      })
      .catch((err) => {
        enqueueSnackbar("Please Fill the Form", { variant: "error" });
        console.log("formErrr message", err);
      });
};

 

  const getProjectDispatchFunc = (
    offset = INTERNAL.DEFAULT_INITIAL_PAGE_AFTER_SIDE_EFFECTS,
    pageSize = INTERNAL.DEFAULT_ITEMS_PER_PAGE_TABLE_VIEW
  ) => {
    dispatch(
      getListProject({
        role: auth?.payloadLogin?.payload?.data?.user?.role[0],
        currentPage: offset,
        itemsPerPage: pageSize,
        ...internal.filterDataProject,
      })
    );
  };

  useEffect(() => {
    dispatch(filterDataProject({}));
  }, []);

  useEffect(() => {
    getProjectDispatchFunc();
  }, [internal.filterDataProject]);

  const handleUserChange = (event) => {
    setSelectedUser(event.target.value);
    setSelectedRole(""); // Reset the selected role when username changes
  };

  // Handle project role selection change
  const handleProjectRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  useEffect(() => {
    if (project.isErrorGet) {
      setOpenBackdrop(false);
      enqueueSnackbar("Something went wrong. Please reload again.", {
        variant: "error",
      });
      dispatch(initialStateGetListProject());
    }
  }, [project.isErrorGet]);

  const handelTextinput = (e) => {
    const { name, value } = e.target;
    setInputvalue((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError({ ...error, [name]: false });
    let isError = false;
    switch (name) {
      case "label":
        isError = !regex.label.test(value);
        break;

      case "brand":
        isError = false;
        break;

      default:
        break;
    }
    setError({ ...error, [name]: isError });
  };

  
  const handelSubmit = (e) => {
    e.preventDefault();

    formCreate();

    console.log("Form submitted:", inputvalue);
  };

  const uniqueUsers = brandList
    .flatMap((brand) => brand.userId)
    .filter(
      (user, index, self) =>
        index === self.findIndex((u) => u.firstName === user.firstName) // Ensure unique firstName
    );
  console.log("Assignto:", uniqueUsers);

 

  
  const handelTextinputAssign = (event) => {
    const { name, value } = event.target;
    setInputvalue({
      ...inputvalue,
      [name]: value, // Dynamically set the field based on name
    });
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile); // Store the file in state
    }
  };
  

  // Message Display

  

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
    

    <Container >
       <Grid container spacing={2}>
        <Grid item xs={12} className={classes.TitleCard}>
          <Typography variant="h5" className={classes.TitleText}>
            Query Details - Project Name
          </Typography>
          <NavLink to={"/layout/queries"}>
            <Button variant="contained" color="primary">
              Go Back
            </Button>
          </NavLink>
        </Grid>
      </Grid>

       <div className={classes.mainContainer}>
       <div className={classes.queryHeader} style={{marginBottom:20}}>
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

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <FormControl className={classes.formControl}>
            <TextField
              id="senderId"
              label={
                auth?.payloadLogin?.payload?.data?.user?.firstName || "User"
              } // Display the first name if available
              variant="outlined"
              name="senderId"
              value={inputvalue._id} // Assuming inputvalue._id contains the user ID
              onChange={handelTextinputAssign} // This function should handle updates for _id or other fields
              error={error.senderId}
              helperText={error.senderId ? "Enter a valid name" : ""}
            />
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="assign-to-label">Select Assign to</InputLabel>
            <Select
              labelId="assign-to-label"
              id="assign-to"
              value={selectedUser}
              onChange={handleUserChange}
              label="Select Assign to"
              input={<Input />}
            >
              {(() => {
                const uniqueUserNames = new Set();
                const userList = (
                  project?.payloadGetList?.payload?.data || []
                ).flatMap((row) =>
                  ["accountManager", "leadOne", "leadTwo", "curator"]
                    .map((role) => row[role]?.userName)
                    .filter(Boolean)
                );
                userList.forEach((userName) => uniqueUserNames.add(userName));
                return [...uniqueUserNames].map((userName) => (
                  <MenuItem key={userName} value={userName}>
                    <ListItemText primary={userName} />
                  </MenuItem>
                ));
              })()}
            </Select>
          </FormControl>
        </Grid>

        {/* Project Role Dropdown */}
        <Grid item xs={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="project-role-label">Select Project Role</InputLabel>
            <Select
              labelId="project-role-label"
              id="project-role"
              value={selectedRole}
              onChange={handleProjectRoleChange} // Use new handler
              label="Select Project Role"
              input={<Input />}
              disabled={!selectedUser} // Disable if no username is selected
            >
              {(project?.payloadGetList?.payload?.data || []).flatMap((row) => {
                // Filter roles based on selected user
                return ["accountManager", "leadOne", "leadTwo", "curator"].map(
                  (role) => {
                    const userName = row[role]?.userName;
                    if (userName === selectedUser) {
                      return (
                        <MenuItem key={`${role}-${userName}`} value={role}>
                          <ListItemText primary={role} />
                        </MenuItem>
                      );
                    }
                    return null;
                  }
                );
              })}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <FormControl className={classes.formControl}>
            <TextField
              id="title"
              label="Title of Query *"
              variant="outlined"
              name="title"
              value={inputvalue.title}
              onChange={handelTextinput}
              error={error.title}
              helperText={error.title ? "Enter a valid title" : ""}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl className={classes.formControl}>
            <TextField
              id="question"
              label="Question"
              variant="outlined"
              name="question"
              row={5}
              value={inputvalue.question}
              onChange={handelTextinput}
              error={error.question}
              helperText={error.question ? "Enter a valid question" : ""}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12}>
  <FormControl className={classes.formControl}>
    <input
      type="file"
      id="attachment"
      name="attachment"
      onChange={handleFileChange} // Handle file change
      accept="image/*,application/pdf,.docx,.xlsx,.txt" // Adjust the accepted file types as needed
    />
  </FormControl>
</Grid>

      </Grid>

      <div className={classes.button}>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          onClick={handelSubmit}
          disabled={Object.values(error).includes(true)}
        >
          Create
        </Button>
      </div>

      </div>
    </Container>
  );
}

export default Create;
