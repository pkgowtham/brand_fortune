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
}));

function Create() {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const fileCategory = location?.state;

  console.log("fileCategorys", fileCategory);

  const [inputvalue, setInputvalue] = useState({
    label: "",    
  });
  const [deleterows, setDeleterows] = useState([]);

  console.log(inputvalue);
  const [error, setError] = useState({
    label: false,  
  });

  useEffect(() => {
    if (fileCategory?.label) {    
      setInputvalue({ label: fileCategory.label});
    }
  }, []);
  const regex = {
    label: /^[A-Za-z\s]+$/,
  };
  

 

  const formCreate = async () => {
    console.log("Formmessage", inputvalue);
    const token = localStorage.getItem("accessToken");

    await axio
      .post(
        "/filecategory/create",
        {
          label: `${inputvalue.label}`,

       
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
        navigate("/layout/filecategory");
        setInputvalue({
          label: "",
          
        });
      })
      .catch((err) => {
        enqueueSnackbar("Error Occured", {
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
        `/filecategory/update`,
        {
          _id: fileCategory._id,
          label: `${inputvalue.label}`,
         
        },
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : null,
          },
        }
      )
      .then((updateresponse) => {
        console.log("formupdate", updateresponse);
        setInputvalue({
          label: "",
        
        });
        enqueueSnackbar("Successfully Updated", { variant: "success" });
        navigate("/layout/filecategory");
      })
      .catch((err) => {
        enqueueSnackbar("Error Occured", {
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
      case "label":
        isError = !regex.label.test(value);
        break;

      

      default:
        break;
    }
    setError({ ...error, [name]: isError });
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    if (fileCategory) {
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
            onClick={() => navigate("/layout/filecategory")}
          >
            Go Back
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <FormControl className={classes.formControl}>
            <TextField
              id="label"
              label="Name"
              variant="outlined"
              name="label"
              value={inputvalue.label}
              onChange={handelTextinput}
              error={error.label}
              helperText={error.label ? "Enter a valid name" : ""}
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
          {fileCategory ? "Update" : "Submit"}
        </Button>
      </div>
    </Container>
  );
}

export default Create;
