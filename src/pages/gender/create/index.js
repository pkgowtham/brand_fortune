import React, { useState, useEffect } from "react";
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
  InputLabel,
  Checkbox,
  ListItemText,
  FormHelperText,
} from "@material-ui/core";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { axio } from "../../../axios";

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
  description: {
    padding: '10px',
    border: '1px solid #c4c4c4',
    borderRadius: '3px',
    fontFamily: '"Roboto", "Helvetica", "Arial", "sans-serif"',
    fontSize: '1rem',
    width: '100%',
    minHeight: '100px', // Adjust height as needed
    '&:focus': {
      outline: 'none',
      borderColor: '#3f51b5', // Example focus color
    },
  },
  error: {
    borderColor: '#f44336', // Error color
  },
}));

function Create() {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const gender = location?.state;

  console.log("genders", gender);

  const [inputvalue, setInputvalue] = useState({
    name: "",
    code: "",
  });
  const [deleterows, setDeleterows] = useState([]);

  console.log(inputvalue);
  const [error, setError] = useState({
    name: false,
    code: false,
  });

  useEffect(() => {
    if (gender) {
      setInputvalue({
        name: gender.name || "", // Prefill name
        code: gender.code || "", // Prefill code
      });
    }
  }, [gender]);
  
  // const regex = {
  //   label: /^[A-Za-z\s]+$/,
  // };
  const regex = {
    name: /^[A-Za-z\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/,
  };
  // const initialTableData = async () => {
  //   console.log("initialTableData", deleterows);

  //   const token = localStorage.getItem("accessToken");

  //   await axio
  //     .get("/brand/getlist", {
  //       headers: {
  //         Authorization: token ? `Bearer ${token}` : null,
  //       },
  //     })
  //     .then((tableresponse) => {
  //       console.log("tableresponse", tableresponse);
  //       setDeleterows(tableresponse.data.payload.data);
  //     })
  //     .catch((err) => {
  //       console.log("tableERR", err);
  //     });
  // };

  // useEffect(() => {
  //   console.log("tableruning");
  //   initialTableData();
  // }, []);

  const formCreate = async () => {
    console.log("Formmessage", inputvalue);
    const token = localStorage.getItem("accessToken");

    await axio
      .post(
        "/gender/create",
        {
          name: `${inputvalue.name}`,

          code: `${inputvalue.code}`,
        },
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : null,
          },
        }
      )
      .then((response) => {
        console.log("formmessage", response);
        enqueueSnackbar("Successfully Created", { variant: "success" });
        navigate("/layout/gender");
        setInputvalue({
          name: "",
          code: "",
        });
      })
      .catch((err) => {
        enqueueSnackbar("Please Fill the Form", {
          variant: "error",
        });
        console.log("formErrr message", err);
      });
  };

  const formUpdate = async () => {
    console.log("Formupdate", inputvalue);
    const token = localStorage.getItem("accessToken");

    await axio
      .put(
        `/gender/update`,
        
        {
          _id: gender._id,
          name: `${inputvalue.name}`,
          code: `${inputvalue.code}`,
        },
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : null,
          },
        },
       
       
      )
      .then((updateresponse) => {
        console.log("formupdate", updateresponse);
        setInputvalue({
          name: "",
          code: "",
        });
        enqueueSnackbar("Successfully Updated", { variant: "success" });
        navigate("/layout/gender");
      })
      .catch((err) => {
        enqueueSnackbar("Please Fill the Form", {
          variant: "error",
        });
        console.log("updateErrr message", err);
      });
  };

  const handelTextinput = (e) => {
    const { name, value } = e.target;
    setInputvalue((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError({ ...error, [name]: false });
    let isError = false;
    switch (name) {
      case "name":
        isError = !regex.name.test(value);
        break;

      case "code":
        isError = false;
        break;

      default:
        break;
    }
    setError({ ...error, [name]: isError });
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    if (gender) {
      console.log("im here1");
      formUpdate();
    } else {
      formCreate();
    }
    console.log("Form submitted:", inputvalue);
  };
  return (
    <Container className={classes.mainContainer}>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Typography variant="h5">Add Details</Typography>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={() => navigate("/layout/gender")}
          >
            Go Back
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <FormControl className={classes.formControl}>
            <TextField
              id="name"
              label="Gender Name"
              variant="outlined"
              name="name"
              value={inputvalue.name}
              onChange={handelTextinput}
              error={error.name}
              helperText={error.name ? "Enter a valid name" : ""}
            />
          </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
         <Grid item xs={6}>
         <FormControl className={classes.formControl}>
            <TextField
              id="code"
              label="Code"
              variant="outlined"
              name="code"
              value={inputvalue.code}
              onChange={handelTextinput}
              error={error.code}
              helperText={error.code ? "Enter a valid code" : ""}
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
          {gender ? "Update" : "Submit"}
        </Button>
      </div>
    </Container>
  );
}

export default Create;
