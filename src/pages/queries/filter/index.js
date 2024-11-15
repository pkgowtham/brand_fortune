import React, { useState,useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useFormik } from "formik";

import * as Yup from "yup";

import {
  Button,
  Card,
  Container,
  TextField,
  Typography,
  makeStyles,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  CircularProgress,
  Backdrop,
  Grid,
  Select,
  InputLabel,
  MenuItem,
  Tooltip,
} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import FilterListIcon from "@material-ui/icons/FilterList";
import IconButton from "@material-ui/core/IconButton";
import ClearIcon from "@material-ui/icons/Clear";

import ControlPointIcon from "@material-ui/icons/ControlPoint";
import { filterDataProject } from "../../../service/internal/action";
import { axio } from "../../../axios";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: "10px",
    padding: "0 !important",
  },

  card: {
    // minWidth: 500,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
  },
  form: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },

  textField: {
    maxWidth: "200px", // Limiting the maximum width to 100px
    "& .MuiInputBase-input": {
      height: "5px", // Setting the height of the input field
      textAlign: "left", // Center aligning the text inside the input field
    },
    "& .MuiInputLabel-root": {
      fontSize: "14px", // Setting the font size of the input label
      top: "-5px", // Adjusting the top position of the input label
      textAlign: "left", // Center aligning the input label
    },
  },
  backdrop: {
    zIndex: theme.zIndex.modal + 1,
    color: "#fff",
  },
  maxContainer: {
    margin: " 10px 0",
  },

  padding10: {
    padding: "10px 20px",
  },
  PadLeft: {
    paddingLeft: "60px",
    marginTop: 5,
  },

  BtnminWidth: {
    minWidth: "120px",
  },

  // inactiveSwitch: {
  //   opacity: 0.5, // Example for reduced opacity
  //   pointerEvents: 'none', // Example to disable interactions
  //   // Add more styles as needed
  // },
  button: {
    marginLeft: theme.spacing(1), // Adjust spacing as needed
    marginLeft: 0,
    backgroundColor: "#1976d21c",
    borderRadius: " 5px",
    height: "40px",
    width: "35px",
    // marginTop: '15px',
    padding: 10,
  },
  smallIcon: {
    "& .MuiSvgIcon-root": {
      width: "15px", // Adjust width as needed
      height: "15px", // Adjust height as needed
    },
  },
  tooltip: {
    fontSize: 14,
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
  selectInput: {
    fontSize: 13, // Adjust the font size as needed
    height: 15, // Adjust the height as needed
    paddingTop: 17,
    paddingBottom: 10,
  },
  LabelSize: {
    fontSize: "12px",
  },
}));

export default function Filter() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const auth = useSelector((store) => store.auth);
  const project = useSelector((state) => state.project);
  const internal = useSelector((state) => state.internal);
  const [brandList, setBrandList] = React.useState([]);


  const [openBackdrop, setOpenBackdrop] = React.useState(false);

  let initialValues = {
    taskId: "",
    brand: "",
    reqDate: null,
    createdDate: null,   
    proirity: "",
    status: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    // validationSchema: Yup.object({
    //   taskId: Yup.string("Please Enter only string").notRequired(),      
    //   brand: Yup.string("Please Enter only string").notRequired(),
    //   reqDate: Yup.string("Please Enter only string").notRequired(),
    //   createdDate: Yup.string("Please Enter only string").notRequired(),     
    //   proirity: Yup.string("Please Enter only string").notRequired(),
    //   status: Yup.string("Please Enter only string").notRequired(),
    // }),
    onSubmit: async (values) => {
      Object.keys(values).forEach(
        (q) =>
          (values[q] == null || values[q] == "" || values[q] == undefined) &&
          delete values[q]
      );

      dispatch(
        filterDataProject({
          ...values,
        })
      );
    },
  });

  const handleClearButton = () => {
    formik.setValues(initialValues);
    dispatch(filterDataProject({}));
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      formik.handleSubmit();
    }
  };
   // getbrandlist
   const getBrandList = async () => {    
    const token = localStorage.getItem("accessToken");

    await axio
      .get(
        `brand/getlist?_id=${auth?.payloadLogin?.payload?.data?.user?._id}`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : null,
          },
        }
      )
      .then((brandResponse) => {
        console.log("brandResponse", brandResponse);
        setBrandList(brandResponse.data.payload.data);
      })
      .catch((err) => {
        console.log("brandError", err);
      });
  };
  useEffect(() => {
    getBrandList();
  }, []);

  return (
    <Container
      disableGutters
      style={{ marginBottom: "20px", boxShadow: "none", maxWidth: "none" }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} className={classes.TitleCard}>
          <Typography variant="h5" className={classes.TitleText}>
          Queries
          </Typography>
         
          {(auth?.payloadLogin?.payload?.data?.user?.role.includes(
            "ACCOUNT_MANAGER"
          ) ||
            auth?.payloadLogin?.payload?.data?.user?.role.includes(
              "MANAGEMENT"
            )) && (
            <NavLink to="/layout/createquery" state={{ type: "ADD" }}>
              <Button variant="contained" color="primary" type="submit">
                <ControlPointIcon style={{ maxWidth: 20, paddingRight: 3 }} />
                Add
              </Button>
            </NavLink>
          )}
        </Grid>
      </Grid>
      <Card className={"${classes.card} "}>
        <div>
          <Grid
            container
            spacing={3}
            style={{
              padding: "10px 10px",
              marginBottom: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Grid item xs={3}>
              <FormControl style={{ marginTop: 5 }} fullWidth>
                <TextField
                  className={classes.textField}
                  id="taskId"
                  label="Task Id"
                  variant="outlined"
                  InputLabelProps={{
                    style: { fontSize: "14px", top: "-5px", textAlign: "left" },
                  }}
                  helperText={
                    formik.errors.taskId &&
                    formik.touched.taskId &&
                    String(formik.errors.taskId)
                  }
                  error={Boolean(
                    formik.errors.taskId && formik.touched.taskId
                  )}
                  {...formik.getFieldProps("taskId")}
                  inputProps={{ style: { height: "5px" } }}
                  onKeyDown={handleKeyDown}
                />
              </FormControl>
            </Grid>  
            <Grid
              item
              xs={3}              
              style={{ margin: "10px auto 10px auto" }}
            >
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar                 
                  format="dd/MM/yyyy"
                  variant="outlined"
                  margin="normal"
                  id="reqDate"
                  label="Request Date"
                  value={formik.values.reqDate}                  
                  onChange={(e) => formik.setFieldValue("reqDate", e)}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                 
                />
              </MuiPickersUtilsProvider>
            </Grid>  
            <Grid
              item
              xs={3}              
              style={{ margin: "10px auto 10px auto" }}
            >
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar                 
                  format="dd/MM/yyyy"
                  variant="outlined"
                  margin="normal"
                  id="createdDate"
                  label="Created Date"
                  value={formik.values.createdDate}                  
                  onChange={(e) => formik.setFieldValue("createdDate", e)}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                  
                />
              </MuiPickersUtilsProvider>
            </Grid> 
           
            <Grid item xs={3}>
              <FormControl style={{ marginTop: 5 }} fullWidth>
                <InputLabel id="brand-label" style={{ left: 12, top: -10 }}>
                  Select Brand
                </InputLabel>
                <Select
                  id="brand"
                  labelId="brand-label"
                  variant="outlined"
                  label="Select Brand"
                  inputProps={{
                    classes: {
                      root: classes.selectInput,
                    },
                  }}
                  value={formik.values.brand}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={Boolean(formik.errors.brand && formik.touched.brand)}
                  {...formik.getFieldProps("brand")}
                >
                  {brandList?.map((brand) => {
                    return <MenuItem value={brand._id}>{brand.label}</MenuItem>;
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <FormControl style={{ marginTop: 5 }} fullWidth>
                <InputLabel id="proirity-label" style={{ left: 12, top: -10 }}>
                  Select Proirity
                </InputLabel>
                <Select
                  id="proirity"
                  labelId="proirity-label"
                  variant="outlined"
                  label="Select Proirity"
                  inputProps={{
                    classes: {
                      root: classes.selectInput,
                    },
                  }}
                  value={formik.values.proirity}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={Boolean(
                    formik.errors.proirity && formik.touched.proirity
                  )}
                  {...formik.getFieldProps("proirity")}
                >
                  <MenuItem value="CRITICAL">Critical</MenuItem>
                  <MenuItem value="HIGH">High</MenuItem>
                  <MenuItem value="MEDIUM">Medium</MenuItem>
                  <MenuItem value="LOW">Low</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <FormControl style={{ marginTop: 5 }} fullWidth>
                <InputLabel id="status-label" style={{ left: 12, top: -10 }}>
                  Select Status
                </InputLabel>
                <Select
                  id="status"
                  labelId="status-label"
                  variant="outlined"
                  label="Select Status"
                  inputProps={{
                    classes: {
                      root: classes.selectInput,
                    },
                  }}
                  value={formik.values.status}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={Boolean(formik.errors.status && formik.touched.status)}
                  {...formik.getFieldProps("status")}
                >
                  <MenuItem value="LEAD_ONE">CREATED</MenuItem>
                  <MenuItem value="ASSIGNED_FOR_CURATION">
                    ASSIGNED_FOR_CURATION
                  </MenuItem>
                  <MenuItem value="ASSIGNED_FOR_ALLOCATION">
                    ASSIGNED_FOR_ALLOCATION
                  </MenuItem>
                  <MenuItem value="ASSIGNED_FOR_SUBMISSION">
                    ASSIGNED_FOR_SUBMISSION
                  </MenuItem>
                  <MenuItem value="LISTING_SUBMITTED">
                    LISTING_SUBMITTED
                  </MenuItem>
                  <MenuItem value="SKU_SUBMITTED">SKU_SUBMITTED</MenuItem>
                  <MenuItem value="REVIEWED_SKU_SUBMITTED">
                    REVIEWED_SKU_SUBMITTED
                  </MenuItem>
                  <MenuItem value="DISCOUNT_SUBMITTED">
                    DISCOUNT_SUBMITTED
                  </MenuItem>
                  <MenuItem value="SYN_SUBMITTED">SYN_SUBMITTED</MenuItem>
                  <MenuItem value="APPROVED_WITHOUT_REVIEWED">
                    APPROVED_WITHOUT_REVIEWED
                  </MenuItem>
                  <MenuItem value="APPROVED_WITH_REVIEWED">
                    APPROVED_WITH_REVIEWED
                  </MenuItem>
                  <MenuItem value="UPLOAD_SUBMITTED">UPLOAD_SUBMITTED</MenuItem>
                  <MenuItem value="LIVE_WITHOUT_REVIEWED">
                    LIVE_WITHOUT_REVIEWED
                  </MenuItem>
                  <MenuItem value="LIVE_WITH_REVIEWED">
                    LIVE_WITH_REVIEWED
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid
              item
              xs={1}
              style={{
                display: "flex",
                paddingLeft: 5,
                justifyContent: "space-around",
              }}
            >
              <IconButton
                className={classes.button}
                color="primary"
                disabled={formik.isValid ? false : true}
                type="submit"
                onClick={formik.handleSubmit}
              >
                <FilterListIcon />
              </IconButton>

              <IconButton
                className={classes.button}
                color="primary"
                onClick={() => handleClearButton()}
              >
                <ClearIcon />
              </IconButton>
            </Grid>
          </Grid>
        </div>
      </Card>
      <Backdrop className={classes.backdrop} open={openBackdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
}
