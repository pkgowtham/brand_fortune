import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useFormik } from "formik";
import { enqueueSnackbar } from "notistack";
import * as Yup from "yup";
import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";
import docImage from "../../../asserts/doc.svg";
import pdfImage from "../../../asserts/pdf.svg";
import excelImage from "../../../asserts/excel.svg";
import imgImage from "../../../asserts/img.svg";
import DateFnsUtils from "@date-io/date-fns";
import utc from "dayjs/plugin/utc.js";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

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
  Input,
  Checkbox,
  ListItemText,
} from "@material-ui/core";

import {
  createProject,
  initialStateCreateProject,
  initialStateUpdatedProject,
  updatedProject,
} from "../../../service/project/action";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import dayjs from "dayjs";
import axios from "axios";

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
  uploadArea: {
    padding: 10,
    margin: "10px 0",
    padding: "20px",
    textAlign: "center",
    cursor: "pointer",
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
  const [projectItem, setProjectItem] = useState(location?.state?.data);
  const [requirementSheetPreview, setRequirementSheetPreview] = useState();
  const requirementSheetFile = useRef(null);
  const [baseSheetPreview, setBaseSheetPreview] = useState();
  const baseSheetFile = useRef(null);
  const [submissionPreview, setSubmissionPreview] = useState();
  const submissionFile = useRef(null);
  const [skuPreview, setSkuPreview] = useState();
  const skuFile = useRef(null);
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
  const [user, setUser] = React.useState([]);

  const getUser = async () => {
    console.log("initialTableData", user);

    const token = localStorage.getItem("accessToken");

    await axios
      .get("http://3.108.100.249/api/v1/user/getlist", {
        headers: {
          Authorization: token ? `Bearer ${token}` : null,
        },
      })
      .then((tableresponse) => {
        console.log("tableresponse", tableresponse);
        setUser(tableresponse.data.payload.data);
      })
      .catch((err) => {
        console.log("tableERR", err);
      });
  };
  useEffect(() => {
    getUser();
  }, []);



  let type = location?.state?.type;
  useEffect(() => {}, []);

  useEffect(() => {
    if (location?.state?.data) {
      setProjectItem(location?.state?.data);
    }
  }, []);

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
      navigate("/layout/dashboard");
    }
    if (project.isSuccessUpdate) {
      setOpenBackdrop(false);
      enqueueSnackbar("Successfully Created", { variant: "success" });
      navigate("/layout/dashboard");
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
      setOpenBackdrop(false);
      enqueueSnackbar("Something went Wrong.Try again.", {
        variant: "error",
      });
      dispatch(initialStateUpdatedProject());
    }
  }, [project.isErrorCreate, project.isErrorUpdate]);

  const objectUrl = (extension) => {
    switch (extension) {
      case "image/jpeg":
        return imgImage;
      case "jpeg":
        return imgImage;
      case "image/jpg":
        return imgImage;
      case "jpg":
        return imgImage;
      case "image/png":
        return imgImage;
      case "png":
        return imgImage;
      case "application/pdf":
        return pdfImage;
      case "pdf":
        return pdfImage;
      case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
        return excelImage;
      case "xls":
        return excelImage;
      case "xlsx":
        return excelImage;
      case "docx":
        return docImage;
      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        return docImage;

      default:
        break;
    }
  };
  const onSelectFile = (e, formikString, funPre) => {
    let file = e?.target?.files[0];
    let extension = e?.target?.files[0].type;
    if (file.size > 1048576 * 2) {
      // 1MB = 1048576 bytes
      enqueueSnackbar("File size should be less than 2 MB", {
        variant: "error",
      });
      return;
    }
    formik.setFieldValue(formikString, e?.target?.files[0], true);

    funPre(objectUrl(extension));
  };

  const finalValue = (key, values) => {
    switch (key) {
      case "LEAD_ONE": {
        let updateData = new FormData();
        updateData.append("assignee", values.assignee);
        return updateData;
      }
      case "CURATOR": {
        let updateData = new FormData();
        updateData.append("baseSheet", values.baseSheet);
        updateData.append("assignee", values.assignee);
        return updateData;
      }
      case "LEAD_TWO": {
        let updateData = new FormData();
        updateData.append("assignee", values.assignee);
        return updateData;
      }
      case "EXECUTIVE_LISTING": {
        let updateData = new FormData();
        updateData.append("submission", values.submission);
        updateData.append("assignee", values.assignee);
        return updateData;
      }
      case "EXECUTIVE_SKU": {
        let updateData = new FormData();
        updateData.append("sku", values.sku);
        updateData.append("assignee", values.assignee);
        updateData.append("reviewer", values.reviewer);
        return updateData;
      }
      case "ANALYSIS_SYN": {
        let updateData = new FormData();
        if (
          projectItem?.submissionExecutiveReview.userName ==
          auth?.payloadLogin?.payload?.data?.user?._id
        ) {
          updateData.append("reviewedSku", values.reviewedSku);
          return updateData;
        }
        if (
          projectItem?.analysisExecutiveSyn.userName ==
          auth?.payloadLogin?.payload?.data?.user?._id
        ) {
          updateData.append("assignee", values.assignee);
          updateData.append("syn", values.syn);
          return updateData;
        }
      }
      case "APPROVAL_WAITING": {
        let updateData = new FormData();
        updateData.append("assignee", values.assignee);
        return updateData;
      }
      case "ANALYSIS_UPLOAD": {
        let updateData = new FormData();
        updateData.append("upload", values.upload);
        updateData.append("assignee", values.assignee);
        return updateData;
      }
      case "LIVE_CHECK": {
        let updateData = new FormData();
        updateData.append("assignee", values.assignee);
        return updateData;
      }

      default:
        break;
    }
  };

  let initialValues =
    type == "ADD"
      ? {
          mailDate: null,
          mailSubject: "",
          styles: "",
          marketPlace: [],
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
          reviewer: "",
        }
      : {
          mailDate: projectItem.mailDate ? projectItem.mailDate : "",
          mailSubject: projectItem.mailSubject ? projectItem.mailSubject : "",
          styles: projectItem.styles ? projectItem.styles : "",
          marketPlace: projectItem.marketPlace ? projectItem.marketPlace : [],
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
          syn: projectItem.syn ? projectItem.syn : "",
          upload: projectItem.upload ? projectItem.upload : "",
          assignee: "",
          reviewer: "",
        };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      if (type == "ADD") {
        const uploadData = new FormData();
        uploadData.append(
          "mailDate",
          dayjs(values.mailDate).format("DD/MM/YYYY")
        );
        uploadData.append("mailSubject", values.mailSubject);
        uploadData.append("styles", values.styles);
        uploadData.append("marketPlace", values.marketPlace);
        uploadData.append("gender", values.gender);
        uploadData.append("brand", values.brand);
        uploadData.append("articleType", values.articleType);
        uploadData.append("listingType", values.listingType);
        uploadData.append("informationType", values.informationType);
        uploadData.append("proirity", values.proirity);
        uploadData.append("requirementSheet", values.requirementSheet);
        uploadData.append("assignee", values.assignee);
        dispatch(createProject(uploadData));
      }
      if (type == "EDIT") {
        let finalValues = finalValue(projectItem.status, values);
        dispatch(
          updatedProject({
            data: finalValues,
            id: projectItem._id,
          })
        );
      }
    },
  });

  const handleCancelButton = () => {
    navigate("/layout/dashboard");
  };

  const fileUpload = (
    title,
    label,
    formikString,
    formikValue,
    refValue,
    preview,
    setPreview
  ) => {
    return (
      <div>
        <Typography variant="h5">{title}</Typography>
        <Paper
          variant="outlined"
          className={classes.uploadArea}
          style={{
            border: formikValue ? "1px dashed #ccc" : "1px dashed #3f51b5",
            backgroundColor: formikValue ? "#f0f0f0" : "#ffffff",
          }}
        >
          {!formikValue && (
            <Box
              onClick={() => {
                refValue.current.click();
              }}
            >
              <CloudUploadIcon style={{ fontSize: 56, color: "#3f51b5" }} />
              <Typography variant="body1" style={{ marginTop: "10px" }}>
                Drag & Drop the files here or click to select one
              </Typography>
              <Typography variant="body2" style={{ marginTop: "10px" }}>
                Max. File Size: 2 Mb <br />
                Supported Files: JPG, PNG, PDF,XCL,DOC ONLY.
              </Typography>
            </Box>
          )}
          <input
            ref={refValue}
            id={label}
            label={label}
            variant="outlined"
            type="file"
            accept=".jpeg, .jpg, .png, .pdf, .xls, .xlsx, .docx"
            onChange={(event) => {
              onSelectFile(event, formikString, setPreview);
            }}
            onFocus={() => formik.setFieldTouched(formikString, true, true)}
            style={{ display: "none" }}
          />
          {preview && (
            <img
              src={preview}
              style={{ maxHeight: "200px", maxWidth: "200px" }}
            />
          )}
        </Paper>
      </div>
    );
  };

  const assign = (label, formikString, roleString) => {
    let options = user.filter((dat) => {
      return dat.role.includes(roleString);
    });

    return (
      <Grid item xs={5} spacing={2} style={{ margin: "10px auto 20px auto" }}>
        <FormControl style={{ marginTop: 5 }} fullWidth>
          <InputLabel id="assignee-label" style={{ left: 12, top: -10 }}>
            {label}
          </InputLabel>
          <Select
            id={label}
            variant="outlined"
            label={label}
            inputProps={{
              classes: {
                root: classes.selectInput,
              },
            }}
            // value={formik.values.assignee}
            // onChange={formik.handleChange}
            // onBlur={formik.handleBlur}
            // error={Boolean(formik.errors.assignee && formik.touched.assignee)}
            {...formik.getFieldProps(formikString)}
          >
            {options.map((option) => {
              return (
                <MenuItem value={option._id}>
                  {option.firstName} {option.lastName}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Grid>
    );
  };

  const download = (label, url) => {
    let extension = url.split("/")[4].split(".")[1];
    return (
      <div>
        <Typography variant="h5">{label}</Typography>
        <div
          className="Mainrequirementsheet"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "30px",
            marginTop: "25px",
          }}
        >
          <div
            className="Image"
            style={{
              borderRadius: "5%",
              overflow: "hidden",
              height: "65px",
              width: "65px",
            }}
          >
            <img
              src={objectUrl(extension)}
              alt=""
              style={{
                height: "100%",
                width: "100%",
                objectFit: "cover",
              }}
            />
          </div>
          <div
            className="text"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography>
              {label}.{extension}
            </Typography>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginTop: "20px" }}
            >
              <a href={url}>Download</a>
            </Button>
          </div>
        </div>
      </div>
    );
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
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  format="dd/MM/yyyy"
                  variant="outlined"
                  margin="normal"
                  id="mailDate"
                  label="Mail Date"
                  value={
                    type == "EDIT"
                      ? Date(formik.values.mailDate)
                      : formik.values.mailDate
                  }
                  onChange={(e) => formik.setFieldValue("mailDate", e)}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                  disabled={type == "EDIT" ? true : false}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid
              item
              xs={5}
              spacing={2}
              style={{ margin: "10px auto 20px auto" }}
            >
              <FormControl style={{ marginTop: 5 }} fullWidth>
                <TextField
                  className={classes.textField}
                  id="styles"
                  label="No of Styles"
                  variant="outlined"
                  numeric
                  InputLabelProps={{
                    style: {
                      fontSize: "14px",
                      top: "-5px",
                      textAlign: "left",
                    },
                  }}
                  disabled={type == "EDIT" ? true : false}
                  helperText={
                    formik.errors.styles &&
                    formik.touched.styles &&
                    String(formik.errors.styles)
                  }
                  error={Boolean(formik.errors.styles && formik.touched.styles)}
                  {...formik.getFieldProps("styles")}
                  inputProps={{
                    style: { height: "5px" },
                    type: "number",
                    min: 0,
                  }}
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
                  disabled={type == "EDIT" ? true : false}
                  helperText={
                    formik.errors.mailSubject &&
                    formik.touched.mailSubject &&
                    String(formik.errors.mailSubject)
                  }
                  error={Boolean(
                    formik.errors.mailSubject && formik.touched.mailSubject
                  )}
                  {...formik.getFieldProps("mailSubject")}
                  inputProps={{
                    style: { height: "5px" },
                    readOnly: type == "EDIT" ? true : false,
                  }}
                />
              </FormControl>
            </Grid>
            {projectItem?.marketPlaceSingle ? (
              <Grid
                item
                xs={5}
                spacing={2}
                style={{ margin: "10px auto 20px auto" }}
              >
                <FormControl className={classes.formControl} fullWidth>
                  <InputLabel id="demo-mutiple-checkbox-label">
                    {" "}
                    Market Place
                  </InputLabel>
                  <Select
                    labelId="demo-mutiple-checkbox-label"
                    id="demo-mutiple-checkbox"
                    variant="outlined"
                    multiple
                    value={[projectItem.marketPlaceSingle]}
                    onChange={(e) =>
                      formik.setFieldValue("marketPlace", e.target.value)
                    }
                    disabled={type == "EDIT" ? true : false}
                    input={<Input variant="outlined" />}
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
                    {["AMAZON", "FLIPKART", "MYNTHRA"].map((name) => (
                      <MenuItem key={name} value={name}>
                        <Checkbox
                          checked={formik.values.marketPlace.indexOf(name) > -1}
                        />
                        <ListItemText primary={name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            ) : (
              <Grid
                item
                xs={5}
                spacing={2}
                style={{ margin: "10px auto 20px auto" }}
              >
                <FormControl className={classes.formControl} fullWidth>
                  <InputLabel id="demo-mutiple-checkbox-label">
                    {" "}
                    Market Place
                  </InputLabel>
                  <Select
                    labelId="demo-mutiple-checkbox-label"
                    id="demo-mutiple-checkbox"
                    variant="outlined"
                    multiple
                    value={formik.values.marketPlace}
                    onChange={(e) =>
                      formik.setFieldValue("marketPlace", e.target.value)
                    }
                    disabled={type == "EDIT" ? true : false}
                    input={<Input variant="outlined" />}
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
                    {["AMAZON", "FLIPKART", "MYNTHRA"].map((name) => (
                      <MenuItem key={name} value={name}>
                        <Checkbox
                          checked={formik.values.marketPlace.indexOf(name) > -1}
                        />
                        <ListItemText primary={name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            )}
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
                  disabled={type == "EDIT" ? true : false}
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
                  disabled={type == "EDIT" ? true : false}
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
                  disabled={type == "EDIT" ? true : false}
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
                  disabled={type == "EDIT" ? true : false}
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
                  disabled={type == "EDIT" ? true : false}
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
                  disabled={type == "EDIT" ? true : false}
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
          {type == "ADD" ? (
            <div style={{ width: "90%", margin: "10px auto 20px auto" }}>
              {fileUpload(
                "Requirement Sheet",
                "Requirement Sheet",
                "requirementSheet",
                formik.values.requirementSheet,
                requirementSheetFile,
                requirementSheetPreview,
                setRequirementSheetPreview
              )}
              {assign("Select Assignee", "assignee", "CATALOG_LEAD")}
            </div>
          ) : null}
          {projectItem?.status == "LEAD_ONE" ? (
            <div style={{ width: "90%", margin: "10px auto 20px auto" }}>
              {download(
                "Requirement Sheet",
                location.state.data.requirementSheet
              )}
              {projectItem?.leadOne.userName ==
                auth?.payloadLogin?.payload?.data?.user?._id &&
                assign("Select Assignee", "assignee", "CATALOG_CURATOR")}
            </div>
          ) : null}
          {projectItem?.status == "CURATOR" ? (
            // lead have to assign for curator
            <div>
              {/* REQ. SHEET DOWNLOAD */}
              {download(
                "Requirement Sheet",
                location.state.data.requirementSheet
              )}

              {/* base sheet upload */}
              {projectItem?.curator.userName ==
                auth?.payloadLogin?.payload?.data?.user?._id &&
                fileUpload(
                  "Base Sheet",
                  "Base Sheet",
                  "baseSheet",
                  formik.values.baseSheet,
                  baseSheetFile,
                  baseSheetPreview,
                  setBaseSheetPreview
                )}

              {/* again lead assignment */}
              {projectItem?.curator.userName ==
                auth?.payloadLogin?.payload?.data?.user?._id &&
                assign("Select Assignee", "assignee", "CATALOG_LEAD" )}
            </div>
          ) : null}
          {projectItem?.status == "LEAD_TWO" ? (
            <div style={{ width: "90%", margin: "10px auto 20px auto" }}>
              {/* req. download */}
              {download(
                "Requirement Sheet",
                location.state.data.requirementSheet
              )}
              {/* base sheet download */}
              {download("Base Sheet", location.state.data.baseSheet)}
              {/* for executive assignment */}
              {projectItem?.leadTwo.userName ==
                auth?.payloadLogin?.payload?.data?.user?._id &&
                assign("Select Assignee", "assignee", "CATALOG_EXCECUTIVE")}
            </div>
          ) : null}
          {projectItem?.status == "EXECUTIVE_LISTING" ? (
            <div style={{ width: "90%", margin: "10px auto 20px auto" }}>
              {/* req. download */}
              {download(
                "Requirement Sheet",
                location.state.data.requirementSheet
              )}
              {/* base sheet download */}
              {download("Base Sheet", location.state.data.baseSheet)}
              {/* Listing Upload */}
              {projectItem?.submissionExecutiveListing.userName ==
                auth?.payloadLogin?.payload?.data?.user?._id &&
                fileUpload(
                  "submission Sheet",
                  "submission Sheet",
                  "submission",
                  formik.values.submission,
                  submissionFile,
                  submissionPreview,
                  setSubmissionPreview
                )}
              {/* for executive assignment */}
              {projectItem?.submissionExecutiveListing.userName ==
                auth?.payloadLogin?.payload?.data?.user?._id &&
                assign("Select Assignee", "assignee", "CATALOG_EXECUTIVE")}
            </div>
          ) : null}
          {projectItem?.status == "EXECUTIVE_SKU" ? (
            <div style={{ width: "90%", margin: "10px auto 20px auto" }}>
              {/* req. download */}
              {download(
                "Requirement Sheet",
                location.state.data.requirementSheet
              )}
              {/* base sheet download */}
              {download("Base Sheet", location.state.data.baseSheet)}
              {/* submission sheet download */}
              {download("Submission Sheet", location.state.data.submission)}
              {/* sku Upload */}
              {projectItem?.submissionExecutiveSku.userName ==
                auth?.payloadLogin?.payload?.data?.user?._id &&
                fileUpload(
                  "sku Sheet",
                  "sku Sheet",
                  "sku",
                  formik.values.sku,
                  skuFile,
                  skuPreview,
                  setSkuPreview
                )}
              {/* for executive assignment */}
              {projectItem?.submissionExecutiveSku.userName ==
                auth?.payloadLogin?.payload?.data?.user?._id &&
                assign("Select Assignee", "assignee", "ANALYSIS_EXECUTIVE")}
              {/* for reviewer assignment */}
              {projectItem?.submissionExecutiveSku.userName ==
                auth?.payloadLogin?.payload?.data?.user?._id &&
                assign("Select Assignee", "reviewer", "CATALOG_REVIEWER")}
            </div>
          ) : null}
          {projectItem?.status == "ANALYSIS_SYN" ? (
            <div style={{ width: "90%", margin: "10px auto 20px auto" }}>
              {/* req. download */}
              {download(
                "Requirement Sheet",
                location.state.data.requirementSheet
              )}
              {/* base sheet download */}
              {download("Base Sheet", location.state.data.baseSheet)}
              {/* submission sheet download */}
              {download("Submission Sheet", location.state.data.submission)}
              {/* sku sheet download */}
              {download("Sku Sheet", location.state.data.sku)}
              {/* reviwer Upload */}
              {projectItem?.submissionExecutiveReview.userName ==
                auth?.payloadLogin?.payload?.data?.user?._id &&
                fileUpload(
                  "Review Sheet",
                  "Review Sheet",
                  "reviewedSku",
                  formik.values.reviewedSku,
                  reviewedSkuFile,
                  reviewedSkuPreview,
                  setReviewedSkuPreview
                )}
              {/* syn Upload */}
              {projectItem?.analysisExecutiveSyn.userName ==
                auth?.payloadLogin?.payload?.data?.user?._id &&
                fileUpload(
                  "Syn Sheet",
                  "Syn Sheet",
                  "syn",
                  formik.values.syn,
                  synFile,
                  synPreview,
                  setSynPreview
                )}
              {/* for Upload assignment */}
              {projectItem?.analysisExecutiveSyn.userName ==
                auth?.payloadLogin?.payload?.data?.user?._id &&
                projectItem.reviewedSku &&
                assign("Select Assignee", "assignee", "ANALYSIS_EXECUTIVE")}
              {/* for Approval assignment */}
              {projectItem?.analysisExecutiveSyn.userName ==
                auth?.payloadLogin?.payload?.data?.user?._id &&
                !projectItem.reviewedSku &&
                assign("Select Assignee", "assignee", "ACCOUNT_MANAGER")}
            </div>
          ) : null}
          {projectItem?.status == "APPROVAL_WAITING" ? (
            <div style={{ width: "90%", margin: "10px auto 20px auto" }}>
              {/* req. download */}
              {download(
                "Requirement Sheet",
                location.state.data.requirementSheet
              )}
              {/* base sheet download */}
              {download("Base Sheet", location.state.data.baseSheet)}
              {/* submission sheet download */}
              {download("Submission Sheet", location.state.data.submission)}
              {/* sku sheet download */}
              {download("Sku Sheet", location.state.data.sku)}
              {/* review sheet download */}
              {location.state.data.reviewedSku &&
                download("Review Sheet", location.state.data.sku)}
              {/* account manager Approval*/}
              {projectItem?.accountManagerApproval.userName ==
                auth?.payloadLogin?.payload?.data?.user?._id &&
                !projectItem.reviewedSku &&
                assign("Approve by select Assignee", "assignee", "ANALYSIS_EXECUTIVE")}
            </div>
          ) : null}
          {projectItem?.status == "ANALYSIS_UPLOAD" ? (
            <div style={{ width: "90%", margin: "10px auto 20px auto" }}>
              {/* req. download */}
              {download(
                "Requirement Sheet",
                location.state.data.requirementSheet
              )}
              {/* base sheet download */}
              {download("Base Sheet", location.state.data.baseSheet)}
              {/* submission sheet download */}
              {download("Submission Sheet", location.state.data.submission)}
              {/* sku sheet download */}
              {download("Sku Sheet", location.state.data.sku)}
              {/* review sheet download */}
              {location.state.data.reviewedSku &&
                download("Review Sheet", location.state.data.sku)}
              {/* syn sheet download */}
              {location.state.data.syn &&
                download("Syn Sheet", location.state.data.syn)}
              {/* upload Upload */}
              {projectItem?.analysisExecutiveUpload.userName ==
                auth?.payloadLogin?.payload?.data?.user?._id &&
                fileUpload(
                  "upload Sheet",
                  "upload Sheet",
                  "upload",
                  formik.values.upload,
                  uploadFile,
                  uploadPreview,
                  setUploadPreview
                )}
              {/* assign for live check*/}
              {projectItem?.analysisExecutiveUpload.userName ==
                auth?.payloadLogin?.payload?.data?.user?._id &&
                assign("select Assignee", "assignee", "ANALYSIS_EXECUTIVE")}
            </div>
          ) : null}
          {projectItem?.status == "LIVE_CHECK" ? (
            <div style={{ width: "90%", margin: "10px auto 20px auto" }}>
              {/* req. download */}
              {download(
                "Requirement Sheet",
                location.state.data.requirementSheet
              )}
              {/* base sheet download */}
              {download("Base Sheet", location.state.data.baseSheet)}
              {/* submission sheet download */}
              {download("Submission Sheet", location.state.data.submission)}
              {/* sku sheet download */}
              {download("Sku Sheet", location.state.data.sku)}
              {/* review sheet download */}
              {location.state.data.reviewedSku &&
                download("Review Sheet", location.state.data.sku)}
              {/* syn sheet download */}
              {location.state.data.syn &&
                download("Syn Sheet", location.state.data.syn)}
              {/* upload Upload */}
              {location.state.data.upload &&
                download("Upload Sheet", location.state.data.upload)}
              {/* completion status change*/}
              {projectItem?.analysisExecutiveLiveCheck.userName ==
                auth?.payloadLogin?.payload?.data?.user?._id &&
                !projectItem.reviewedSku &&
                assign("Update Status", "assignee", [
                  {
                    label: "Completed",
                    value: "66ec0aabc8f2eda25bf0a821",
                  },
                ])}
            </div>
          ) : null}
          {projectItem?.status == "COMPLETED" ? (
            <div style={{ width: "90%", margin: "10px auto 20px auto" }}>
              {/* req. download */}
              {download(
                "Requirement Sheet",
                location.state.data.requirementSheet
              )}
              {/* base sheet download */}
              {download("Base Sheet", location.state.data.baseSheet)}
              {/* submission sheet download */}
              {download("Submission Sheet", location.state.data.submission)}
              {/* sku sheet download */}
              {download("Sku Sheet", location.state.data.sku)}
              {/* review sheet download */}
              {location.state.data.reviewedSku &&
                download("Review Sheet", location.state.data.sku)}
              {/* syn sheet download */}
              {location.state.data.syn &&
                download("Syn Sheet", location.state.data.syn)}
              {/* upload Upload */}
              {location.state.data.upload &&
                download("Upload Sheet", location.state.data.upload)}
              {"status indicator"}
              <Typography variant="h4">Completed</Typography>
            </div>
          ) : null}
        </Card>
      </Grid>
      <div>
        {!projectItem?.status == "COMPLETED" && (
          <Button
            type="submit"
            variant="contained"
            color="primary"
            // disabled={imageShow || !formik.dirty || !formik.isValid}
            onClick={formik.handleSubmit}
            style={{ marginTop: "20px" }}
          >
            {type == "EDIT" ? "UPDATE" : "CREATE"}
          </Button>
        )}
      </div>

      <Backdrop className={classes.backdrop} open={openBackdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
}
