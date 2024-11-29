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
  const articleType = location?.state;

  console.log("articleTypes", articleType);

  const [inputvalue, setInputvalue] = useState({
    label: "",
    brand: [],
  });
  const [deleterows, setDeleterows] = useState([]);

  console.log(inputvalue);
  const [error, setError] = useState({
    label: false,
    brand: false,
  });

  useEffect(() => {
    if (articleType?.brand) {
      let temp = [];
      articleType.brand.map((branding) => {
        temp.push(branding._id);
      });
      setInputvalue({ label: articleType.label, brand: temp });
    }
  }, []);
  // const regex = {
  //   label: /^[A-Za-z\s]+$/,
  // };
  const regex = {
    label: /^[A-Za-z\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/,
  };
  const initialTableData = async () => {
    console.log("initialTableData", deleterows);

    const token = localStorage.getItem("accessToken");

    await axio
      .get("/brand/getlist", {
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
        "/articletype/create",
        {
          label: `${inputvalue.label}`,

          brand: `${inputvalue.brand}`,
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
        navigate("/layout/articletype");
        setInputvalue({
          label: "",
          brand: [],
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
        `/articletype/update`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : null,
          },
        },
        {
          _id: articleType._id,
          label: `${inputvalue.label}`,
          brand: `${inputvalue.brand}`,
        }
       
      )
      .then((updateresponse) => {
        console.log("formupdate", updateresponse);
        setInputvalue({
          label: "",
          brand: [],
        });
        enqueueSnackbar("Successfully Updated", { variant: "success" });
        navigate("/layout/articletype");
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
    if (articleType) {
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
            onClick={() => navigate("/layout/articletype")}
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
              Select Brand{" "}
            </InputLabel>
            <Select
              labelId="demo-mutiple-checkbox-label"
              id="demo-mutiple-checkbox"
              variant="outlined"
              multiple
              label="Select Brand"
              name="brand"
              value={inputvalue.brand ? inputvalue.brand : []}
              onChange={handelTextinput}
              inputProps={{
                name: "brand",
                id: "outlined-age-native-simple",
              }}
             
              renderValue={(selected) =>
                deleterows
                  .filter((row) => selected.includes(row._id))
                  .map((row) => row.label)
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
              {deleterows.map((name) => (
                <MenuItem key={name._id} value={name._id}>
                  <Checkbox
                    checked={inputvalue.brand.indexOf(name._id) > -1}
                  />
                  <ListItemText primary={name.label} />
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
          disabled={Object.values(error).includes(true)}
        >
          {articleType ? "Update" : "Submit"}
        </Button>
      </div>
    </Container>
  );
}

export default Create;
