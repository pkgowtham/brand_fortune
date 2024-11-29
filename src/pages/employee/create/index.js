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
  const user = location?.state;

  console.log("users", user);

  const [inputvalue, setInputvalue] = useState({
    firstname: user?.firstName ? user.firstName : "",
    lastname: user?.lastName ? user.lastName : "",
    email: user?.email ? user.email : "",
    password: user?.password ? user.password : "",
    mobile: user?.mobile ? user.mobile : "",
    role: user?.role ? user.role : [],
    subrole: user?.subrole ? user.subrole : [],
    
  });
  console.log(inputvalue);
  const [error, setError] = useState({
    firstname: false,
    lastname: false,
    email: false,
    password: false,
    mobile: false,
    role: false,
    subrole: false,
  });
  const regex = {
    firstname: /^[A-Za-z\s]+$/,
    lastname: /^[A-Za-z\s]+$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    mobile: /^[0-9]{1,10}$/,
    password:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>\/?~`-]).{8,}$/,
  };

  const roleValues = [
    "MANAGEMENT",
    "ACCOUNT_MANAGER",
    "CATALOG_CURATOR",
    "CATALOG_EXCECUTIVE",
    "CATALOG_LEAD",
    "CATALOG_REVIEWER",
    "ANALYSIS_EXECUTIVES",
    "ANALYSIS_LEAD",
    "ADMIN"
  ];
  const subroleValues = ["DISCOUNT", "LIVE_CHECK", "SYN", "UPLOAD"];

  const formCreate = async () => {
    console.log("Formmessage", inputvalue);
    const token = localStorage.getItem("accessToken");

    await axio
      .post(
        "/user/create",
        {
          firstName: `${inputvalue.firstname}`,
          lastName: `${inputvalue.lastname}`,
          mobile: `${inputvalue.mobile}`,
          email: `${inputvalue.email}`,
          role: `${inputvalue.role}`,
          password: `${inputvalue.password}`,
          subrole: `${inputvalue.subrole}`,
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
        navigate("/layout/employee");
        setInputvalue({
          firstname: "",
          lastname: "",
          email: "",
          password: "",
          mobile: "",
          role: [],
          subrole: "",
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
        `/user/update`,
        {
          _id: user._id,
          firstName: `${inputvalue.firstname}`,
          lastName: `${inputvalue.lastname}`,
          mobile: `${inputvalue.mobile}`,
          email: `${inputvalue.email}`,
          role: `${inputvalue.role}`,
          password: `${inputvalue.password}`,
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
          firstname: "",
          lastname: "",
          email: "",
          password: "",
          mobile: "",
          role: [],
        });
        enqueueSnackbar("Successfully Updated", { variant: "success" });
        navigate("/layout/employee");
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
      case "firstname":
        isError = !regex.firstname.test(value);
        break;
      case "lastname":
        isError = !regex.lastname.test(value);
        break;
      case "email":
        isError = !regex.email.test(value);
        break;
      case "password":
        isError = !regex.password.test(value);
        break;
      case "mobile":
        isError = !regex.mobile.test(value);
        break;
      case "role":
        console.log("roelVlue", value);
        isError = !value.every((val) => roleValues.includes(val));
        break;
      case "subrole":
        isError = !value.every((val) => subroleValues.includes(val));
        break;

      default:
        break;
    }
    setError({ ...error, [name]: isError });
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    if (user) {
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
            onClick={() => navigate("/layout/employee")}
          >
            Go Back
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <FormControl className={classes.formControl}>
            <TextField
              id="firstname"
              label="Firstname"
              variant="outlined"
              name="firstname"
              value={inputvalue.firstname}
              onChange={handelTextinput}
              error={error.firstname}
              helperText={error.firstname ? "Enter a valid name" : ""}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl className={classes.formControl}>
            <TextField
              id="lastname"
              label="Lastname"
              variant="outlined"
              name="lastname"
              value={inputvalue.lastname}
              onChange={handelTextinput}
              error={error.lastname}
              helperText={error.lastname ? "Enter a valid name" : ""}
            />
          </FormControl>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <FormControl className={classes.formControl}>
            <TextField
              id="Email"
              label="Email"
              variant="outlined"
              name="email"
              value={inputvalue.email}
              onChange={handelTextinput}
              error={error.email}
              helperText={error.email ? "Enter a valid Email" : ""}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl className={classes.formControl}>
            <TextField
              id="Password"
              label="Password"
              variant="outlined"
              name="password"
              value={inputvalue.password}
              onChange={handelTextinput}
              error={error.password}
              helperText={error.password ? "Enter a valid Password" : ""}
            />
          </FormControl>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <FormControl className={classes.formControl}>
            <TextField
              id="Mobile"
              label="Mobile"
              variant="outlined"
              name="mobile"
              value={inputvalue.mobile}
              onChange={handelTextinput}
              error={error.mobile}
              helperText={error.mobile ? "Enter a valid Number" : ""}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6} s>
          <FormControl className={classes.formControl} fullWidth>
            <InputLabel id="demo-mutiple-checkbox-label" style={{ left: 35, top: 15,cursor:'pointer' }}> 
            Role
            </InputLabel>
            <Select  
              labelId="demo-mutiple-checkbox-label"
              id="demo-mutiple-checkbox"
              variant="outlined"
              multiple
              label="Role"
              name="role"
              value={inputvalue.role ? inputvalue.role : []}
              onChange={handelTextinput}
              inputProps={{
                name: "role",
                id: "outlined-age-native-simple",
              }}
              renderValue={(selected) => selected.join(",")}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 48 * 4.5 + 8,
                    width: 250,
                  },
                },
              }}
            >
              {roleValues.map((name) => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={inputvalue.role.indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* sub role */}
      {inputvalue.role.includes("ANALYSIS_EXECUTIVES") && (
        <Grid item xs={6} s>
        <FormControl className={classes.formControl} fullWidth>
          <InputLabel id="sub-role" style={{ left: 31, top: 15,cursor:'pointer' }}> 
          SubRole
          </InputLabel>
          <Select
            labelId="sub-role"
            id="sub-role"
            variant="outlined"
            multiple
            label="subrole"
            name="subrole"
            value={inputvalue.subrole}
            onChange={handelTextinput}
            inputProps={{
              name: "subrole",
              id: "sub-role",
            }}
            renderValue={(selected) => selected.join(",")}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 48 * 4.5 + 8,
                  width: 250,
                },
              },
            }}
          >
            {subroleValues.map((dat) => (
              <MenuItem key={dat} value={dat}>{dat.toLocaleLowerCase}
               <Checkbox checked={inputvalue.subrole.indexOf(dat) > -1} />
               <ListItemText primary={dat} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      )}

<Grid item xs={12}>
        <FormControl fullWidth style={{padding: '10px 20px'}}>
           
          <TextField
            id="description"
            label="Description"
            name="description"
            value={inputvalue.description}
            onChange={handelTextinput}
            multiline
            
            rows={4}  // Number of visible text rows
            variant="outlined"
          />
        </FormControl>
      </Grid>

      <div className={classes.button}>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          onClick={handelSubmit}
          disabled={Object.values(error).includes(true)}
        >
          {user ? "Update":"Submit" }
        </Button>
      </div>
    </Container>
  );
}

export default Create;
