import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useFormik } from "formik";
import { enqueueSnackbar } from "notistack";
import * as Yup from "yup";
import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";

import {
  Box,
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
  Switch,
  Grid,
  InputLabel,
  Select,
  MenuItem,
  Paper,
} from "@material-ui/core";

import {
  createProject,
  initialStateCreateProject,
  initialStateUpdatedProject,
  updatedProject,
} from "../../../service/project/action";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

const useStyles = makeStyles((theme) => ({
  // container: {
  //   margin: 30,
  // },
  card: {
    minHeight: 360,
    paddingTop: 15,
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    width: "100%",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  textField: {
    // maxWidth: '200px', // Limiting the maximum width to 100px
    "& .MuiInputBase-input": {
      height: "5px", // Setting the height of the input field
      textAlign: "left", // Center aligning the text inside the input field
    },
    "& .MuiInputLabel-root": {
      fontSize: "14px", // Setting the font size of the input label
      top: "-5px", // Adjusting the top position of the input label
      textAlign: "left", // Center aligning the input label
    },
    '& input[type="file"]': {
      height: "25px", // Adjust height as needed
    },
  },
  backdrop: {
    zIndex: theme.zIndex.modal + 1,
    color: "#fff",
  },
  PadLeft: {
    paddingLeft: "25px",
  },
  TitleSpace: {
    padding: "10px 25px",
    fontWeight: "bold",
  },
  BtnminWidth: {
    minWidth: "120px !important",
  },
  InputMinWidth: {
    minWidth: "200",
  },

  FormLabelDiv: {
    paddingLeft: "35px !important",
    justifyContent: "left",
    display: "flex",
    alignContent: "center",
    alignItems: "center",
  },
  StatusDivLeft: {
    justifyContent: "left",

    paddingLeft: 15,

    display: "flex",

    alignContent: "left",

    alignItems: "left",

    margin: "20px !important",
  },
  borderedGridItem: {
    borderRight: "1px solid #ccc",
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
  FieldTitle: {
    display: "flex",
    alignItems: "center",
    alignContent: "center",
    paddingLeft: " 20px",
    marginTop: "15px",
  },

  legendTitle: {
    fontSize: "11px",
    color: "#000",
    fontWeight: "600",
    borderBottom: "2px solid #b7b7b7",
    paddingBottom: 5,
    marginBottom: 30,
    width: "100%",
  },
  legendTitleVisible: {
    fontSize: "11px",
    color: "#000",
    fontWeight: "600",
    borderBottom: "2px solid #b7b7b7",
    paddingBottom: 5,
    marginBottom: 30,
    width: "100%",
  },
}));

export default function Create() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const auth = useSelector((state) => state.auth);
  const project = useSelector((state) => state.project);
  const internal = useSelector((state) => state.internal);
  const [projectItem, setProjectItem] = useState({});

  const [requirementSheet, setRequirementSheet] = useState();
  const [requirementSheetPreview, setRequirementSheetPreview] = useState();
  const requirementSheetFile = useRef(null);
  const [baseSheet, setBaseSheet] = useState();
  const [baseSheetPreview, setBaseSheetPreview] = useState();
  const baseSheetFile = useRef(null);
  const [sku, setSku] = useState();
  const [skuPreview, setSkuPreview] = useState();
  const skuFile = useRef(null);
  const [reviewedSku, setReviewedSku] = useState();
  const [reviewedSkuPreview, setReviewedSkuPreview] = useState();
  const reviewedSkuFile = useRef(null);
  const [discount, setDiscount] = useState();
  const [discountPreview, setDiscountPreview] = useState();
  const discountFile = useRef(null);
  const [upload, setUpload] = useState();
  const [uploadPreview, setUploadPreview] = useState();
  const uploadFile = useRef(null);
  const [syn, setSyn] = useState();
  const [synPreview, setSynPreview] = useState();
  const synFile = useRef(null);
  const [finalValues, setFinalValues] = useState({});
  const [openBackdrop, setOpenBackdrop] = React.useState(false);

  let type = location?.state?.type;

  useEffect(() => {
    if (location?.state?.data) {
      setProjectItem(location.state.data);
    }
  }, [location.state.data]);

  useEffect(() => {
    if (project.isLoadingCreate) {
      setOpenBackdrop(true);
    }
    if (project.isLoadingUpdate) {
      setOpenBackdrop(true);
    }
  }, [project.isLoadingCreate, project.isLoadingUpdate]);

  useEffect(() => {
    dispatch(initialStateCreateProject());
    dispatch(initialStateUpdatedProject());
  }, []);

  useEffect(() => {
    if (project.isSuccessCreate) {
      setOpenBackdrop(false);
      enqueueSnackbar("Successfully Created", { variant: "success" });
      // setProjectItem({
      //   ...projectItem,
      //   imagePath: '',
      // });
      // formik.setFieldValue('image', '', true);
      // setImageShow(false);
      // navigate('/layout/project');
    }
    if (project.isSuccessUpdate) {
    }
  }, [project.isSuccessCreate, project.isSuccessUpdate]);

  useEffect(() => {
    if (project.isErrorCreate) {
      setOpenBackdrop(false);
      enqueueSnackbar("Duplicate Record.Please check the name", {
        variant: "error",
      });
      dispatch(initialStateCreateProject());
    }
    if (project.isErrorUpdate) {
      enqueueSnackbar("Something went Wrong.Try again.", {
        variant: "error",
      });
      dispatch(initialStateUpdatedProject());
    }
  }, [project.isErrorCreate, project.isErrorUpdate]);

  const onSelectFile = (e,funPre) => {
    console.log("cateeee", e.target);
    // if (!e?.target?.files || e?.target?.files?.length === 0) {
    //   setSelectedFile(undefined);
    //   return;
    // }
    // const file = e?.target?.files[0];
    // if (file.size > 1048576*5) {
    //   // 1MB = 1048576 bytes
    //   enqueueSnackbar("File size should be less than 5MB", {
    //     variant: "error",
    //   });
    //   return;
    // }
    // fun(file);

    const objectUrl = URL.createObjectURL(e?.target?.files[0]);
    funPre(objectUrl);
  };

  const finalValue = (key, values) => {
    switch (key) {
      case "CREATED":
        return {
          assignee: values.assignee,
          currentAssignee: values.currentAssignee,
          status: "ASSIGNED_FOR_CURATION",
        };
      case "ASSIGNED_FOR_CURATION":
        return {
          baseSheet: values.baseSheet,
          assignee: values.assignee,
          currentAssignee: values.currentAssignee,
          status: "ASSIGNED_FOR_ALLOCATION",
        };
      case "ASSIGNED_FOR_ALLOCATION":
        return {
          assignee: values.assignee,
          currentAssignee: values.currentAssignee,
          status: "ASSIGNED_FOR_SUBMISSION",
        };
      case "ASSIGNED_FOR_SUBMISSION":
        return {
          submission: values.submission,
          assignee: values.assignee,
          currentAssignee: values.currentAssignee,
          status: "LISTING_SUBMITTED",
        };
      case "LISTING_SUBMITTED":
        return {
          sku: values.sku,
          assignee: values.assignee,
          currentAssignee: values.currentAssignee,
          status: "SKU_SUBMITTED",
        };
      case "SKU_SUBMITTED":
        if (auth.role == "ANALYSIS_EXECUTIVES") {
          return {
            discount: values.discount,
            assignee: values.assignee,
            currentAssignee: values.currentAssignee,
            status: "DISCOUNT_SUBMITTED",
          };
        }
        if (auth.role == "CATALOG_REVIEWER") {
          return {
            reviewedSku: values.reviewedSku,
            assignee: values.assignee,
            currentAssignee: values.currentAssignee,
            status: "REVIEWED_SKU_SUBMITTED",
          };
        }
      case "DISCOUNT_SUBMITTED":
        return {
          syn: values.syn,
          assignee: values.assignee,
          currentAssignee: values.currentAssignee,
          status: "SYN_SUBMITTED",
        };
      case "SYN_SUBMITTED":
        // if (!reviewedSku) {
        //   return {
        //     approvedNeeded: true,
        //     currentAssignee: values.currentAssignee,
        //   };
        // }
        // if (approvedNeededAccepted) {
        //   return {
        //     status: "APPROVED_WITHOUT_REVIEWED",
        //     currentAssignee: values.currentAssignee,
        //   };
        // }
        return {
          upload: values.upload,
          assignee: values.assignee,
          currentAssignee: values.currentAssignee,
          status: "UPLOAD_SUBMITTED",
        };
      case "APPROVED_WITHOUT_REVIEWED":
        return {
          upload: values.upload,
          assignee: values.assignee,
          currentAssignee: values.currentAssignee,
          status: "UPLOAD_SUBMITTED",
        };
      case "UPLOAD_SUBMITTED":
        return {
          assignee: values.assignee,
          currentAssignee: values.currentAssignee,
          status: "LIVE",
        };

      default:
        break;
    }
  };

  let initialValues =
    type == "ADD"
      ? {
          mailSubject: "",
          marketPlace: "",
          gender: "",
          brand: "",
          articleType: "",
          listingType: "",
          informationType: "",
          proirity: "",
          requirementSheet: "",
          baseSheet: "",
          submission: "",
          sku: "",
          reviewedSku: "",
          discount: "",
          Upload: "",
          syn: "",
          assignee: "",
          currentAssignee: "",
        }
      : {
          mailSubject: projectItem.mailSubject ? projectItem.mailSubject : "",
          marketPlace: projectItem.marketPlace ? projectItem.marketPlace : "",
          gender: projectItem.gender ? projectItem.gender : "",
          brand: projectItem.brand ? projectItem.brand : "",
          articleType: projectItem.articleType ? projectItem.articleType : "",
          listingType: projectItem.listingType ? projectItem.listingType : "",
          informationType: projectItem.informationType
            ? projectItem.informationType
            : "",
          proirity: projectItem.proirity ? projectItem.proirity : "",
          requirementSheet: projectItem.requirementSheet
            ? projectItem.requirementSheet
            : "",
          baseSheet: projectItem.baseSheet ? projectItem.baseSheet : "",
          submission: projectItem.submission ? projectItem.submission : "",
          sku: projectItem.sku ? projectItem.sku : "",
          reviewedSku: projectItem.reviewedSku ? projectItem.reviewedSku : "",
          discount: projectItem.discount ? projectItem.discount : "",
          upload: projectItem.upload ? projectItem.upload : "",
          syn: projectItem.syn ? projectItem.syn : "",
          assignee: "",
          currentAssignee: "",
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
      requirementSheet: Yup.string("Please Enter only string").notRequired(),
      baseSheet: Yup.string("Please Enter only string").notRequired(),
      sku: Yup.string("Please Enter only string").notRequired(),
      reviewedSku: Yup.string("Please Enter only string").notRequired(),
      discount: Yup.string("Please Enter only string").notRequired(),
      Upload: Yup.string("Please Enter only string").notRequired(),
      syn: Yup.string("Please Enter only string").notRequired(),
      assignee: Yup.string("Please Enter only string").notRequired(),
      currentAssignee: Yup.string("Please Enter only string").notRequired(),
    }),
    onSubmit: (values) => {
      if (type == "ADD") {
        const uploadData = new FormData();       
        
        uploadData.append("mailSubject", values.mailSubject);
        uploadData.append("marketPlace", values.marketPlace);
        uploadData.append("gender", values.gender);
        uploadData.append("brand", values.brand);
        uploadData.append("articleType", values.articleType);
        uploadData.append("listingType", values.listingType);
        uploadData.append("informationType", values.informationType);
        uploadData.append("proirity", values.proirity);
        uploadData.append("requirementSheet", values.requirementSheet); 

       console.log("uploadData",uploadData)
        dispatch(createProject(uploadData));
      }
      if (type == "EDIT") {
        let finalValues = finalValue(projectItem.status, values);
        dispatch(
          updatedProject({
            ...finalValues,
            id: projectItem._id,
          })
        );
      }
    },
  });

  const handleCancelButton = () => {
    navigate("/layout/dashboard");
  };

  return (
    <Container disableGutters>
      <Grid container spacing={2}>
        <Grid item xs={12} className={classes.TitleCard}>
          <Typography variant="h5" className={classes.TitleText}>
            {type === "ADD" ? "ADD PROJECT" : "EDIT PROJECT"}
          </Typography>
          <NavLink to={"/layout/dashboard"}>
            <Button variant="contained" color="primary" type="submit">
              Go Back
            </Button>
          </NavLink>
        </Grid>
      </Grid>
      <Grid container fullWidth spacing={2}>
        <Card className={classes.card}>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            <Grid
              item
              xs={5}
              spacing={2}
              style={{ margin: "10px auto 20px auto" }}
            >
              <FormControl style={{ marginTop: 5 }} fullWidth>
                <TextField
                  className={classes.textField}
                  id="mailSubject"
                  label="Mail Subject"
                  variant="outlined"
                  InputLabelProps={{
                    style: {
                      fontSize: "14px",
                      top: "-5px",
                      textAlign: "left",
                    },
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
                />
              </FormControl>
            </Grid>
            <Grid
              item
              xs={5}
              spacing={2}
              style={{ margin: "10px auto 20px auto" }}
            >
              <FormControl style={{ marginTop: 5 }} fullWidth>
                <InputLabel
                  id="marketPlace-label"
                  style={{ left: 12, top: -10 }}
                >
                  Market Place
                </InputLabel>
                <Select
                  id="marketPlace"
                  labelId="marketPlace-label"
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
                    formik.errors.marketPlace && formik.touched.marketPlace
                  )}
                  {...formik.getFieldProps("marketPlace")}
                >
                  <MenuItem value="AMAZON">Amazon</MenuItem>
                  <MenuItem value="FLIPKART">Flipkart</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid
              item
              xs={5}
              spacing={2}
              style={{ margin: "10px auto 20px auto" }}
            >
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
            <Grid
              item
              xs={5}
              spacing={2}
              style={{ margin: "10px auto 20px auto" }}
            >
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
            <Grid
              item
              xs={5}
              spacing={2}
              style={{ margin: "10px auto 20px auto" }}
            >
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
            <Grid
              item
              xs={5}
              spacing={2}
              style={{ margin: "10px auto 20px auto" }}
            >
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
            <Grid
              item
              xs={5}
              spacing={2}
              style={{ margin: "10px auto 20px auto" }}
            >
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
            <Grid
              item
              xs={5}
              spacing={2}
              style={{ margin: "10px auto 20px auto" }}
            >
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
          </div>

          <div style={{ width: "90%", margin: "10px auto 20px auto" }}>
            <Typography variant="h5">Requirement Sheet</Typography>
            <Paper
              variant="outlined"
              style={{
                padding: 10,
                margin: "10px 0",
                padding: "20px",
                textAlign: "center",
                cursor: "pointer",
                border: formik.values.requirementSheet
                  ? "1px dashed #ccc"
                  : "1px dashed #3f51b5",
                backgroundColor: formik.values.requirementSheet
                  ? "#f0f0f0"
                  : "#ffffff",
              }}
            >
              {!formik.values.requirementSheet && (
                <Box
                  onClick={() => {
                    requirementSheetFile.current.click();
                  }}
                >
                  <CloudUploadIcon style={{ fontSize: 56, color: "#3f51b5" }} />
                  <Typography variant="body1" style={{ marginTop: "10px" }}>
                    Drag & Drop an image here or click to select one
                  </Typography>
                  <Typography variant="body2" style={{ marginTop: "10px" }}>
                    Image Size: 512 X 512 <br />
                    Supported Files: JPG, PNG, GIF, SVG only
                  </Typography>
                </Box>
              )}

              <input
                ref={requirementSheetFile}
                // className={classes.textField}
                id="requirementSheet"
                label="requirementSheet"
                variant="outlined"
                type="file"
                helperText={
                  formik.errors.requirementSheet &&
                  formik.touched.requirementSheet &&
                  String(formik.errors.requirementSheet)
                }
                error={Boolean(
                  formik.errors.requirementSheet &&
                    formik.touched.requirementSheet
                )}
                onChange={(event) => {
                  onSelectFile(event, setRequirementSheetPreview);
                  formik.setFieldValue(
                    "requirementSheet",
                    event?.target?.files[0],
                    true
                  );
                }}
                onFocus={() =>
                  formik.setFieldTouched("requirementSheet", true, true)
                }
                style={{ display: "none" }}
              />

              {requirementSheetPreview && (
                <img
                  src={requirementSheetPreview}
                  style={{ maxHeight: "200px", maxWidth: "200px" }}
                />
              )}
            </Paper>
            <Grid
              item
              xs={5}
              spacing={2}
              style={{ margin: "10px auto 20px auto" }}
            >
              <FormControl style={{ marginTop: 5 }} fullWidth>
                <InputLabel id="assignee-label" style={{ left: 12, top: -10 }}>
                  Select Assignee
                </InputLabel>
                <Select
                  id="assignee"
                  labelId="assignee-label"
                  variant="outlined"
                  label="Select Assignee"
                  inputProps={{
                    classes: {
                      root: classes.selectInput,
                    },
                  }}
                  value={formik.values.assignee}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={Boolean(
                    formik.errors.assignee && formik.touched.assignee
                  )}
                  {...formik.getFieldProps("assignee")}
                >
                  <MenuItem value="66ec09b2c8f2eda25bf0a811">
                    Catalog Curator
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Button
        type="submit"
        variant="contained"
        color="primary"
        // disabled={imageShow || !formik.dirty || !formik.isValid}
        onClick={formik.handleSubmit}
        style={{ marginTop: '20px' }}
      >
        Upload
      </Button>
          </div>
        </Card>
      </Grid>

      <Backdrop className={classes.backdrop} open={openBackdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
}
