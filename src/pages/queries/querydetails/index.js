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
  InputLabel, Box,
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
import { format } from 'date-fns';

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
    borderRadius: 10,
    backgroundColor: "#f0f4fb",
    margin: 20,

  },
  message: {
    margin: "10px 0",
    padding: "10px",
    borderRadius: "8px",
    maxWidth: "50%",
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
  imagePreview: {
    width: '20%', // Ensures the image is responsive and fits the container width
    height: 'auto',
    borderRadius: '4px', // Optional: adds rounded corners to the image
    
    marginTop: theme.spacing(1),
  },
  downloadLink: {
    textDecoration: 'none',
    color: theme.palette.primary.main, // Style the link as per your design
    marginTop: theme.spacing(1),
    textAlign:"left",
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
  const [query, setQuery] = useState(null);
  const [setMessages] = useState([]);


  console.log("articleTypes", articleType);

  const [inputvalue, setInputvalue] = useState({

    answer: "",
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
  const { title_id } = location.state || {};

  console.log("Main Product Id", locationProjectId);





  const formCreate = async () => {

    const token = localStorage.getItem("accessToken");
    console.log("Token 2", token)
    // Create an object for the form data


    const data = {
      answer: inputvalue.answer,
      _id: title_id,
    };


    const formData = new FormData();

    // Append the 'data' object as a JSON string
    formData.append("data", JSON.stringify(data));

    // if (file) {
    //   formData.append("attachment", file); 
    // }

    // Make the POST request with the FormData containing the JSON string
    await axio
      .put(
        "/quering/update",
        formData,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : null,
          },
        }
      )
      .then((response) => {
        console.log("formmessage", response);
        enqueueSnackbar("Successfully Answered", { variant: "success" });
        navigate("/layout/queries", { state: { _id: query?.projectId?._id } });
      })
      .catch((err) => {
        enqueueSnackbar("Please Fill the Form", { variant: "error" });
        console.log("formErrr message", err);
      });
  };



  const initialTableData = async () => {
    console.log("initialTableData", deleterows);
    const token = localStorage.getItem("accessToken");

    console.log("Token 11", token)

    await axio
      .get("/user/getlist", {
        headers: {
          Authorization: token ? `Bearer ${token}` : null,
        },
      })
      .then((tableresponse) => {
        console.log("tableresponse", tableresponse.data.payload.data);
        setDeleterows(tableresponse.data.payload.data);
      })
      .catch((err) => {
        console.log("tableERR", err);
      });
  };

  useEffect(() => {
    
    initialTableData();
  }, []);

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

  const getQueryList = async () => {


    const token = localStorage.getItem("accessToken");
    const projectId = locationProjectId || inputvalue._id;

    console.log("analystData", projectId);
    await axio
      .get(
        `quering/getlist?projectId=${projectId}`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : null,
          },
        }
      )
      .then((queryResponse) => {
        const data = queryResponse.data.payload.data;

        // Find the query matching the title_id
        const matchedItem = data.find((item) => item._id === title_id);
        console.log("Item ID:", data._id);

        if (matchedItem) {
          setQuery(matchedItem);
          setMessages(matchedItem.data || []); // Assuming messages are inside the query item
        } else {
          console.log("No matching data found for title_id");
        }
      })
      .catch((err) => {
        console.log("queryError", err);
      });
  };

  useEffect(() => {
    if (title_id) {
      getQueryList();
    }
  }, [title_id]);




  const messages = [
    {
      sender: "John Doe",
      description: "This is a sample message from the sender.",
      date: "2024-11-14 10:30 AM",
      type: "sender", // Type can be 'sender' or 'receiver'
    },
    {
      sender: "John Doe",
      description: "This is a sample message from the sender.",
      date: "2024-11-14 10:30 AM",
      type: "sender", // Type can be 'sender' or 'receiver'
    },


  ];


  return (


    <Container >
      <Grid container spacing={2}>
        <Grid item xs={12} className={classes.TitleCard}>
          <Typography variant="h5" className={classes.TitleText}>
            Query Details 
          </Typography>
          <NavLink to="/layout/queries" state={{ _id: query?.projectId?._id }}>
            <Button variant="contained" color="primary">
              Go Back
            </Button>
          </NavLink>
        </Grid>
      </Grid>

      <div className={classes.mainContainer}>
        <div>
          {query && (
            <>
              {/* Query Header */}
              <div className={classes.queryHeader} style={{ marginBottom: 20 }}>
                <Box style={{ display: 'flex' }}>
                  <Typography variant="body1" style={{ lineHeight: 0 }}>Query Title:</Typography>
                  <Typography variant="h6" style={{ lineHeight: 0, paddingLeft: 10 }}>
                    {query.title}
                  </Typography>
                </Box>
                <Box style={{ display: 'flex' }}>
                  <Typography variant="body1" style={{ lineHeight: 0 }}>Query Status:</Typography>
                  <Typography
  variant="h6"
  style={{    color: query.status === 'COMPLETE' ? 'green' : 'red',    lineHeight: 0,    paddingLeft: 10,  }}
>  {query.status}  </Typography>
                </Box>
              </div>

              {/* Chat Section */}
              <div className={classes.chatContainer}>
                <Typography variant="h6">Chat Conversation</Typography>
                {query ? (
                  <>
                    {/* Sender message */}
                    {query.senderId && (
                      <Box className={`${classes.message} ${classes.senderMessage}`}>
                        <div className={classes.messageHeader}>
                          <Typography variant="body2">
                            {query.senderId.firstName} {/* Display sender's first name */}
                          </Typography>
                          <Typography variant="body2">{format(new Date(query.createdAt), 'MM/dd/yyyy')}</Typography>
                        </div>
                        <Typography variant="body2" className={classes.messageBody}>
                          {query.question} {/* Display sender's question */}
                        </Typography>

                        {query.attachment && (
          <Box className={classes.attachment}>
            {/* <Typography variant="body2">Attachment:</Typography> */}

            {/* Check if attachment is an image by URL */}
            {query.attachment.endsWith('.jpg') || query.attachment.endsWith('.jpeg') || query.attachment.endsWith('.png') ? (
              <Box>
                <img 
                  src={query.attachment} 
                  alt="Attachment" 
                  className={classes.imagePreview} 
                />
                
                <a 
                  href={query.attachment} 
                  download
                  className={classes.downloadLink}
                >
                <Typography>  Download Attachment</Typography>
                </a>
              </Box>
            ) : (
              <Box>
                <a 
                  href={query.attachment} 
                  download
                  className={classes.downloadLink}
                >
                  Download Attachment
                </a>
              </Box>
            )}
          </Box>
        )}

                      </Box>
                    )}

                    {/* Receiver message */}
                    {query.answer && (
                      <Box className={`${classes.message} ${classes.receiverMessage}`}>
                        <div className={classes.messageHeader}>
                          <Typography variant="body2">{query.assignId.firstName}</Typography> {/* Display "Receiver" for the receiver message */}
                          <Typography variant="body2">{format(new Date(query.createdAt), 'MM/dd/yyyy')}</Typography>
                        </div>
                        <Typography variant="body2" className={classes.messageBody}>
                          {query.answer} {/* Display receiver's answer */}
                        </Typography>
                      </Box>
                    )}
                  </>
                ) : (
                  <Typography variant="body2">No messages yet.</Typography>
                )}
              </div>

            </>
          )}
        </div>

        <Grid container spacing={2}>
        {query && query.status === 'PENDING' ? (
          <Typography variant="h6" style={{ lineHeight: 0, paddingLeft: 25, marginTop: 20, }}> Response Message:</Typography>
          
        ): null }
        
          <Grid item xs={12}>
  {query && query.status === 'PENDING' ? (
    <FormControl className={classes.formControl}>
      <TextField
        id="answer"
        label="Answer"
        variant="outlined"
        name="answer"
        multiline
        rows={5} // Sets the number of visible rows for the text area
        value={inputvalue.answer}
        onChange={handelTextinput}
        error={error.answer}
        helperText={error.answer ? "Enter a valid answer" : ""}
      />
    </FormControl>
  ): null}
</Grid>

        

        </Grid>

       <div className={classes.button}>
       {query && query.status === 'PENDING' ? (
    <Button
      variant="contained"
      color="primary"
      type="submit"
      onClick={handelSubmit}
      disabled={Object.values(error).includes(true)}
    >
      Update
    </Button>
 ): null}
</div>
      </div>
    </Container>
  );
}

export default Create;
