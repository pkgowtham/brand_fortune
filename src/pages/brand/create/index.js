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
  const brand = location?.state;

  console.log("brands", brand);

  const [inputvalue, setInputvalue] = useState({
    label: brand?.label ? brand.label : "",
    // value: brand?.value ? brand.value : "",
    // description: brand?.description ? brand.description : "",
    userId: brand?.userId ? brand.userId : [],
  });
  const [deleterows, setDeleterows] = useState([]);
  console.log(inputvalue);

  useEffect(() => {
    if (brand?.userId) {
      let temp = [];
      brand.userId.map((user) => {
        temp.push(user._id);
      });
      setInputvalue({ label: brand.label, userId: temp });
    }
  }, []);

  const [error, setError] = useState({
    label: false,
    // value: false,
    // description: false,
    userId: false,
  });
  // const regex = {
  //   label: /^[A-Za-z\s]+$/,
  //   // value: /^[A-Za-z\s]+$/,
  //   // description: /^[A-Za-z\s]+$/,
  // };
  const regex = {
    label: /^[A-Za-z\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/,
  };
  const initialTableData = async () => {
    console.log("initialTableData", deleterows);

    const token = localStorage.getItem("accessToken");

    await axio
      .get("/user/getlist", {
        headers: {
          Authorization: token ? `Bearer ${token}` : null,
        },
      })
      .then((tableresponse) => {
        console.log("tableresponse", tableresponse);
        setDeleterows(tableresponse.data.payload.data);
      })
      .catch((err) => {
        console.log("tableERR", err);
      });
  };

  useEffect(() => {
    console.log("tableruning");
    initialTableData();
  }, []);

  const formCreate = async () => {
    console.log("Formmessage", inputvalue);
    const token = localStorage.getItem("accessToken");

    await axio
      .post(
        "/brand/create",
        {
          label: `${inputvalue.label}`,
          // value: `${inputvalue.value}`,
          // description: `${inputvalue.description}`,
          userId: `${inputvalue.userId}`,
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
        navigate("/layout/brand");
        setInputvalue({
          label: "",
          // value: "",
          // description: "",
          userId: "",
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
        `/brand/update`,
        {
          _id: brand._id,
          label: `${inputvalue.label}`,
          // value: `${inputvalue.value}`,
          // description: `${inputvalue.description}`,
          userId: `${inputvalue.userId}`,
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
          // value: "",
          // description: "",
          userId: "",
        });
        enqueueSnackbar("Successfully Updated", { variant: "success" });
        navigate("/layout/brand");
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
      case "label":
        isError = !regex.label.test(value);
        break;
      // case "value":
      //   isError = !regex.value.test(value);
      //   break;
      // case "description":
      //   isError = !regex.description.test(value);
      //   break;
      case "userId":
        isError = false;
        break;

      default:
        break;
    }
    setError({ ...error, [name]: isError });
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    if (brand) {
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
            onClick={() => navigate("/layout/brand")}
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
              label="Label"
              variant="outlined"
              name="label"
              value={inputvalue.label}
              onChange={handelTextinput}
              error={error.label}
              helperText={error.label ? "Enter a valid name" : ""}
            />
          </FormControl>
        </Grid>
        {/* <Grid item xs={6}>
          <FormControl className={classes.formControl}>
            <TextField
              id="value"
              label="Value"
              variant="outlined"
              name="value"
              value={inputvalue.value}
              onChange={handelTextinput}
              error={error.value}
              helperText={error.value ? "Enter a valid value" : ""}
            />
          </FormControl>
        </Grid> */}
      </Grid>

      <Grid container spacing={2}>
        {/* <Grid item xs={6}>
          <FormControl className={classes.formControl}>
            <TextField
              id="description"
              label="Description"
              variant="outlined"
              name="description"
              value={inputvalue.description}
              onChange={handelTextinput}
              error={error.description}
              helperText={error.description ? "Enter a valid description" : ""}
            />
          </FormControl>
        </Grid> */}
        <Grid item xs={6} s>
          <FormControl className={classes.formControl} fullWidth>
            <InputLabel
              id="demo-mutiple-checkbox-label"
              style={{ left: 35, top: 15, cursor: "pointer" }}
            >
              Select Account Manager{" "}
            </InputLabel>
            <Select
              labelId="demo-mutiple-checkbox-label"
              id="demo-mutiple-checkbox"
              variant="outlined"
              multiple
              label="Select Account Manager"
              name="userId"
              value={inputvalue.userId ? inputvalue.userId : []}
              onChange={handelTextinput}
              inputProps={{
                name: "userId",
                id: "outlined-age-native-simple",
              }}
              // renderValue={
              //   inputvalue.userId.length > 0
              //     ? deleterows.filter((row)=>inputvalue.userId.includes(row._id)).map(row=>row.firstName).join(",")
              //     : () => <em>Please Select the Account Manager</em>
              // }
              // (selected) => {
              //   selected.length
              //     ?
              // : () => <em>Please Select the Account Manager</em>;
              renderValue={(selected) =>
                deleterows
                  .filter((row) => selected.includes(row._id))
                  .map((row) => row.firstName)
                  .join(",")
              }
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 48 * 4.5 + 8,
                    width: 250,
                  },
                },
              }}
            >
              {deleterows
                .filter((dat) => dat.role.includes("ACCOUNT_MANAGER"))
                .map((name) => (
                  <MenuItem key={name._id} value={name._id}>
                    <Checkbox
                      checked={inputvalue.userId.indexOf(name._id) > -1}
                    />
                    <ListItemText primary={name.firstName} />
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <div className={classes.button}>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          onClick={handelSubmit}
          disabled={
            Object.values(error).includes(true) ||
            !inputvalue.label ||
            inputvalue.userId.length < 1
          }
        >
          {brand ? "Update" : "Submit"}
        </Button>
      </div>
    </Container>
  );
}

export default Create;
