import React, { useState } from "react";
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
import FilterListIcon from "@material-ui/icons/FilterList";
import IconButton from "@material-ui/core/IconButton";
import ClearIcon from "@material-ui/icons/Clear";

import ControlPointIcon from "@material-ui/icons/ControlPoint";
import { filterDataProject } from "../../../service/internal/action";

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

  const project = useSelector((state) => state.project);
  const internal = useSelector((state) => state.internal);

  const [openBackdrop, setOpenBackdrop] = React.useState(false);

  let initialValues = {
    mailSubject: "",
    marketPlace: "",
    gender: "",
    brand: "",
    articleType: "",
    listingType: "",
    informationType: "",
    proirity: "",
    status: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      mailSubject: Yup.string("Please Enter only string").notRequired(),
      marketPlace: Yup.string("Please Enter only string").notRequired(),
      gender: Yup.string("Please Enter only string").notRequired(),
      brand: Yup.string("Please Enter only string").notRequired(),
      articleType: Yup.string("Please Enter only string").notRequired(),
      listingType: Yup.string("Please Enter only string").notRequired(),
      informationType: Yup.string("Please Enter only string").notRequired(),
      proirity: Yup.string("Please Enter only string").notRequired(),
      status: Yup.string("Please Enter only string").notRequired(),
    }),
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

  return (
    <Container
      disableGutters
      style={{ marginBottom: "20px", boxShadow: "none", maxWidth: "none" }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} className={classes.TitleCard}>
          <Typography variant="h5" className={classes.TitleText}>
            Information Sheet List
          </Typography>

          <NavLink to="/layout/create" state={{ type: "ADD"}}>
            <Button variant="contained" color="primary" type="submit">
              <ControlPointIcon style={{ maxWidth: 20, paddingRight: 3 }} />
              Add
            </Button>
          </NavLink>
        </Grid>
      </Grid>
      <Card className={"${classes.card} "}>
        <div>
          <Grid
            container
            spacing={2}
            style={{
              padding: "10px 10px",
              marginBottom: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Grid item xs={2}>
              <FormControl style={{ marginTop: 5 }} fullWidth>
                <TextField
                  className={classes.textField}
                  id="mailSubject"
                  label="Mail Subject"
                  variant="outlined"
                  InputLabelProps={{
                    style: { fontSize: "14px", top: "-5px", textAlign: "left" },
                  }}
                  helperText={
                    formik.errors.mailSubject &&
                    formik.touched.mailSubject &&
                    String(formik.errors.mailSubject)
                  }
                  error={Boolean(
                    formik.errors.mailSubject && formik.touched.mailSubject
                  )}
                  {...formik.getFieldProps("mailSubject")}
                  inputProps={{ style: { height: "5px" } }}
                  onKeyDown={handleKeyDown}
                />
              </FormControl>
            </Grid>
            <Grid item xs={2}>
              <FormControl style={{ marginTop: 5 }} fullWidth>
                <InputLabel
                  id="marketplace-label"
                  style={{ left: 12, top: -10 }}
                >
                  Market Place
                </InputLabel>
                <Select
                  id="marketplace"
                  labelId="marketplace-label"
                  variant="outlined"
                  label="Market Place"
                  inputProps={{
                    classes: {
                      root: classes.selectInput,
                    },
                  }}
                  value={formik.values.marketPlace}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={Boolean(
                    formik.errors.marketplace && formik.touched.marketplace
                  )}
                  {...formik.getFieldProps("marketplace")}
                >
                  <MenuItem value="AMAZON">Amazon</MenuItem>
                  <MenuItem value="FLIPKART">Flipkart</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={2}>
              <FormControl style={{ marginTop: 5 }} fullWidth>
                <InputLabel id="gender-label" style={{ left: 12, top: -10 }}>
                  Select Gender
                </InputLabel>
                <Select
                  id="gender"
                  labelId="gender-label"
                  variant="outlined"
                  label="Select Gender"
                  inputProps={{
                    classes: {
                      root: classes.selectInput,
                    },
                  }}
                  value={formik.values.gender}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={Boolean(formik.errors.gender && formik.touched.gender)}
                  {...formik.getFieldProps("gender")}
                  // renderValue={(selected) => !selected && 'Select Status'}
                >
                  <MenuItem value="">Select Gender</MenuItem>
                  <MenuItem value="MALE">Male</MenuItem>
                  <MenuItem value="FEMALE">Female</MenuItem>
                  <MenuItem value="BOYS">Boys</MenuItem>
                  <MenuItem value="GIRLS">Girls</MenuItem>
                  <MenuItem value="KIDS">Kids</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={2}>
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
                  <MenuItem value="OTTO">Otto</MenuItem>
                  <MenuItem value="MOTTO">Motto</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={2}>
              <FormControl style={{ marginTop: 5 }} fullWidth>
                <InputLabel
                  id="articleType-label"
                  style={{ left: 12, top: -10 }}
                >
                  Select Article Type
                </InputLabel>
                <Select
                  id="articleType"
                  labelId="articleType-label"
                  variant="outlined"
                  label="Select Article Type"
                  inputProps={{
                    classes: {
                      root: classes.selectInput,
                    },
                  }}
                  value={formik.values.articleType}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={Boolean(
                    formik.errors.articleType && formik.touched.articleType
                  )}
                  {...formik.getFieldProps("articleType")}
                >
                  <MenuItem value="ARTICLE1">Article Type - 1 </MenuItem>
                  <MenuItem value="ARTICLE2">Article Type - 2</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={2}>
              <FormControl style={{ marginTop: 5 }} fullWidth>
                <InputLabel
                  id="listingType-label"
                  style={{ left: 12, top: -10 }}
                >
                  Select Listing Type
                </InputLabel>
                <Select
                  id="listingType"
                  labelId="listingType-label"
                  variant="outlined"
                  label="Select Listing Type"
                  inputProps={{
                    classes: {
                      root: classes.selectInput,
                    },
                  }}
                  value={formik.values.listingType}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={Boolean(
                    formik.errors.listingType && formik.touched.listingType
                  )}
                  {...formik.getFieldProps("listingType")}
                >
                  <MenuItem value="LISTING">Listing</MenuItem>
                  <MenuItem value="RELISTING">Relisting</MenuItem>
                  <MenuItem value="CORRECTION">Correction request</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={2}>
              <FormControl style={{ marginTop: 5 }} fullWidth>
                <InputLabel
                  id="informationType-label"
                  style={{ left: 12, top: -10 }}
                >
                  Select Information Type
                </InputLabel>
                <Select
                  id="informationType"
                  labelId="informationType-label"
                  variant="outlined"
                  label="Select Information Type"
                  inputProps={{
                    classes: {
                      root: classes.selectInput,
                    },
                  }}
                  value={formik.values.informationType}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={Boolean(
                    formik.errors.informationType &&
                      formik.touched.informationType
                  )}
                  {...formik.getFieldProps("informationType")}
                >
                  <MenuItem value="L1">
                    Level 1 – Information sheet and images available{" "}
                  </MenuItem>
                  <MenuItem value="L2">
                    Level 2 - Already listed style only relisting code available
                  </MenuItem>
                  <MenuItem value="L3">
                    Level 3 – Only image is available
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={2}>
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
            <Grid item xs={2}>
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
                  <MenuItem value="CREATED">CREATED</MenuItem>
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
