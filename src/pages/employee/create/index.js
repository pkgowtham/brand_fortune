import React, { useState } from "react";
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
  Checkbox,ListItemText
} from "@material-ui/core";
import { useLocation, useNavigate } from "react-router-dom";

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
    // minWidth:'500px',
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
    firstname: user?.firstname ? user.firstname : "",
    lastname: user?.lastname ? user.lastname : "",
    email: user?.email ? user.email : "",
    password: user?.password ? user.password : "",
    mobile: user?.mobile ? user.mobile : "",
    role: user?.role ? user.role : [],
  });
  console.log(inputvalue);
  const [error, setError] = useState({
    firstname: false,
    lastname: false,
    email: false,
    password: false,
    mobile: false,
    role: false,
  });
  const regex = {
    firstname: /^[a-zA-Z]*$/,
    lastname: /^[a-zA-Z]*$/,
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
  ];
  const handelTextinput = (e) => {
    const { name, value } = e.target;
    // setInputvalue(e.target.value);
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
        isError = !roleValues.includes(value);
        break;

      default:
        break;
    }
    setError({ ...error, [name]: isError });
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", inputvalue);
    setInputvalue({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      mobile: "",
      role: "",
      createdAt: "",
      updatedAt: "",
    });
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
        <Grid item xs={6} style={{ margin: "10px auto 20px auto" }}>
          <FormControl className={classes.formControl} fullWidth>
            <InputLabel id="demo-mutiple-checkbox-label"> Role</InputLabel>
            <Select
              labelId="demo-mutiple-checkbox-label"
              id="demo-mutiple-checkbox"
              variant="outlined"
              multiple
              label="Role"
              name="role"
              value={inputvalue.role}
              onChange={handelTextinput}
              inputProps={{
                name: "role",
                id: "outlined-age-native-simple",
              }}
              renderValue={(selected) => selected.join(", ")}
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
                  <Checkbox
                    checked={inputvalue.role.indexOf(name) > -1}
                  />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        {/* <Grid item xs={6}>
          <FormControl variant="outlined" className={classes.formControlSelect}>
            <InputLabel htmlFor="outlined-age-native-simple">Role</InputLabel>
            <Select
              native
              label="Role"
              name="role"
              value={inputvalue.role}
              onChange={handelTextinput}
              inputProps={{
                name: "role",
                id: "outlined-age-native-simple",
              }}
            >
              <option aria-label="Select Role" value="" />
              <option value="ACCOUNT_MANAGER">Account Manager</option>
              <option value="CATALOG_CURATOR">Catalog Curator</option>
              <option value="CATALOG_EXCECUTIVE">Catalog Excecutive</option>
              <option value="CATALOG_LEAD">Catalog Lead</option>
              <option value="CATALOG_REVIEWER">Catalog Reviewer</option>
              <option value="ANALYSIS_EXECUTIVES">Analysis Executives</option>
              <option value="ANALYSIS_LEAD">Analysis Lead</option>
            </Select>
          </FormControl>
        </Grid> */}
      </Grid>
      <div className={classes.button}>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          onClick={handelSubmit}
          disabled={Object.values(error).includes(true)}
        >
          Submit
        </Button>
      </div>
    </Container>
  );
}

export default Create;
