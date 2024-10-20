import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useFormik } from "formik";
import { enqueueSnackbar } from "notistack";
import * as Yup from "yup";
import dayjs from "dayjs";
import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";
import docImage from "../../../asserts/doc.svg";
import pdfImage from "../../../asserts/pdf.svg";
import excelImage from "../../../asserts/excel.svg";
import imgImage from "../../../asserts/img.svg";
import DateFnsUtils from "@date-io/date-fns";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import MenuItem from "@material-ui/core/MenuItem";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import EditIcon from "@material-ui/icons/Edit";

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

import axios from "axios";
import { axio } from "../../../axios";
import utc from "dayjs/plugin/utc.js";
dayjs.extend(utc);
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
  tablebody: {
    minHeight: "500px",
  },
  tableheight: {
    // minHeight: "400px",
    border: "1px solid rgba(224, 224, 224, 1);",
  },
  tablecelldata: {
    textAlign: "center",
    padding: "20px",
    colSpan: 4,
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
  const [curatoropen, setCuratoropen] = React.useState(false);
  const [submissionopen, setSubmissionopen] = React.useState(false);
  const [analystopen, setAnalystopen] = React.useState(false);
  const [editDialogOpen, setEditDialogOpen] = React.useState(false);
  const [person, setPerson] = React.useState({});
  const [curatorData, setCuratorData] = React.useState([]);
  const [submissionData, setSubmissionData] = React.useState([]);
  const [analystData, setAnalystData] = React.useState([]);
  const [moduleData, setModuleData] = React.useState([]);
  const [brandList, setBrandList] = React.useState([]);

  const [depressed, setDepressed] = useState(
    location?.state?.type == "EDIT"
      ? location?.state?.data?.status == "ANALYSIS_DISCOUNT_DEPRESSION" ||
        location?.state?.data?.status == "ANALYSIS_SYN_DEPRESSION" ||
        location?.state?.data?.status == "ANALYSIS_UPLOAD_DEPRESSION" ||
        location?.state?.data?.status == "LIVE_CHECK_DEPRESSION"
        ? "true"
        : "false"
      : null
  );

  useEffect(() => {
    if (
      (location?.state?.data?.status == "ANALYSIS_DISCOUNT_DEPRESSION" ||
        location?.state?.data?.status == "ANALYSIS_SYN_DEPRESSION" ||
        location?.state?.data?.status == "ANALYSIS_UPLOAD_DEPRESSION" ||
        location?.state?.data?.status == "LIVE_CHECK_DEPRESSION") &&
      depressed == "false"
    ) {
      formik.handleSubmit();
    }
    if (
      !(
        location?.state?.data?.status == "ANALYSIS_DISCOUNT_DEPRESSION" ||
        location?.state?.data?.status == "ANALYSIS_SYN_DEPRESSION" ||
        location?.state?.data?.status == "ANALYSIS_UPLOAD_DEPRESSION" ||
        location?.state?.data?.status == "LIVE_CHECK_DEPRESSION"
      ) &&
      depressed == "true"
    ) {
      formik.handleSubmit();
    }
  }, [depressed]);

  // getbrandlist
  const getBrandList = async () => {
    console.log("analystData", moduleData);

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

  // getanalyst
  const getAnalystdata = async () => {
    console.log("analystData", moduleData);

    const token = localStorage.getItem("accessToken");

    await axio
      .get("/project/getlistcountanalyst", {
        headers: {
          Authorization: token ? `Bearer ${token}` : null,
        },
      })
      .then((analystresponse) => {
        console.log("analystresponse", analystresponse);
        setModuleData(analystresponse.data.payload.data);
      })
      .catch((err) => {
        console.log("analystERR", err);
      });
  };
  useEffect(() => {
    getAnalystdata();
  }, []);

  // getsubmission
  const getSubmissiondata = async () => {
    console.log("submissionData", submissionData);

    const token = localStorage.getItem("accessToken");

    await axio
      .get("/project/getlistcountsubmission", {
        headers: {
          Authorization: token ? `Bearer ${token}` : null,
        },
      })
      .then((submissionresponse) => {
        console.log("submissionresponse", submissionresponse);
        setSubmissionData(submissionresponse.data.payload.data);
      })
      .catch((err) => {
        console.log("submissionERR", err);
      });
  };
  useEffect(() => {
    getSubmissiondata();
  }, []);

  // getcuratordata
  const getCuratordata = async () => {
    console.log("curatorData", curatorData);

    const token = localStorage.getItem("accessToken");

    await axio
      .get("/project/getlistcountcurator", {
        headers: {
          Authorization: token ? `Bearer ${token}` : null,
        },
      })
      .then((curatorresponse) => {
        console.log("curatorresponse", curatorresponse);
        setCuratorData(curatorresponse.data.payload.data);
      })
      .catch((err) => {
        console.log("curatorERR", err);
      });
  };
  useEffect(() => {
    getCuratordata();
  }, []);

  // get user
  const getUserdata = async () => {
    console.log("initialTableData", user);

    const token = localStorage.getItem("accessToken");

    await axio
      .get("/user/getlist", {
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
    getUserdata();
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
      case "ANALYSIS_DISCOUNT": {
        let updateData = new FormData();
        if (depressed == "true") {
          updateData.append("depressed", "true");
          return updateData;
        }
        if (
          projectItem?.submissionExecutiveReview.userName ==
          auth?.payloadLogin?.payload?.data?.user?._id
        ) {
          updateData.append("reviewedSku", values.reviewedSku);
          return updateData;
        }
        if (
          projectItem?.analysisExecutiveDiscount.userName ==
          auth?.payloadLogin?.payload?.data?.user?._id
        ) {
          updateData.append("assignee", values.assignee);
          updateData.append("discount", values.discount);
          return updateData;
        }
      }
      case "ANALYSIS_SYN": {
        let updateData = new FormData();
        if (depressed == "true") {
          updateData.append("depressed", "true");
          return updateData;
        }
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
        if (depressed == "true") {
          updateData.append("depressed", "true");
          return updateData;
        }
        updateData.append("upload", values.upload);
        updateData.append("assignee", values.assignee);
        return updateData;
      }
      case "LIVE_CHECK": {
        let updateData = new FormData();
        if (depressed) {
          updateData.append("depressed", true);
          return updateData;
        }
        updateData.append("assignee", values.assignee);
        return updateData;
      }
      case "ANALYSIS_DISCOUNT_DEPRESSION": {
        let updateData = new FormData();
        updateData.append("sku", values.sku);
        return updateData;
      }
      case "ANALYSIS_SYN_DEPRESSION": {
        let updateData = new FormData();
        updateData.append("sku", values.sku);
        return updateData;
      }
      case "ANALYSIS_UPLOAD_DEPRESSION": {
        let updateData = new FormData();
        updateData.append("sku", values.sku);
        return updateData;
      }
      case "LIVE_CHECK_DEPRESSION": {
        let updateData = new FormData();
        updateData.append("sku", values.sku);
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
          sku: projectItem.sku && !depressed ? projectItem.sku : "",
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

  // curator
  const opencurator = () => {
    setCuratoropen(true);
  };
  const closecurator = () => {
    setCuratoropen(false);
  };
  // submission
  const opensubmission = () => {
    setSubmissionopen(true);
  };
  const closesubmission = () => {
    setSubmissionopen(false);
  };
  // analyst
  const openanalyst = () => {
    setEditDialogOpen(true);
  };
  const closeanalyst = () => {
    setAnalystopen(false);
  };
  // handleChange
  const handleChange = (index) => (event) => {
    setPerson((prev) => ({
      ...prev,
      [index]: event.target.value,
    }));
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
                  {brandList?.map((brand) => {
                    return <MenuItem value={brand._id}>{brand.label}</MenuItem>;
                  })}
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
              <Button
                variant="contained"
                color="primary"
                // disabled={imageShow || !formik.dirty || !formik.isValid}
                onClick={formik.handleSubmit}
                style={{ marginTop: "20px" }}
              >
                CREATE
              </Button>
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
              {/* curator Guide button */}
              {projectItem?.leadOne.userName ==
                auth?.payloadLogin?.payload?.data?.user?._id && (
                <div>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => opencurator()}
                  >
                    Curator Pending Count
                  </Button>
                </div>
              )}
              {projectItem?.leadOne.userName ==
                auth?.payloadLogin?.payload?.data?.user?._id && (
                <div>
                  <Button
                    variant="contained"
                    color="primary"
                    // disabled={imageShow || !formik.dirty || !formik.isValid}
                    onClick={formik.handleSubmit}
                    style={{ marginTop: "20px" }}
                  >
                    Assign Curator
                  </Button>
                </div>
              )}
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
                assign("Select Assignee", "assignee", "CATALOG_LEAD")}
              {/* Submit button */}
              {projectItem?.curator.userName ==
                auth?.payloadLogin?.payload?.data?.user?._id && (
                <div>
                  <Button
                    variant="contained"
                    color="primary"
                    // disabled={imageShow || !formik.dirty || !formik.isValid}
                    onClick={formik.handleSubmit}
                    style={{ marginTop: "20px" }}
                  >
                    Assign Catalog Lead
                  </Button>
                </div>
              )}
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
              {/* submission */}
              {projectItem?.leadTwo.userName ==
                auth?.payloadLogin?.payload?.data?.user?._id && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => opensubmission()}
                >
                  Allocation
                </Button>
              )}
              {/* Submit button */}
              {projectItem?.leadTwo.userName ==
                auth?.payloadLogin?.payload?.data?.user?._id && (
                <div>
                  <Button
                    variant="contained"
                    color="primary"
                    // disabled={imageShow || !formik.dirty || !formik.isValid}
                    onClick={formik.handleSubmit}
                    style={{ marginTop: "20px" }}
                  >
                    Assign For Submission
                  </Button>
                </div>
              )}
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
                assign("Select Assignee", "assignee", "CATALOG_EXCECUTIVE")}
              {/* Submit button */}
              {projectItem?.submissionExecutiveListing.userName ==
                auth?.payloadLogin?.payload?.data?.user?._id && (
                <div>
                  <Button
                    variant="contained"
                    color="primary"
                    // disabled={imageShow || !formik.dirty || !formik.isValid}
                    onClick={formik.handleSubmit}
                    style={{ marginTop: "20px" }}
                  >
                    Assign For SKU
                  </Button>
                </div>
              )}
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
                assign("Select Assignee", "assignee", "ANALYSIS_EXECUTIVES")}
              {/* for reviewer assignment */}
              {projectItem?.submissionExecutiveSku.userName ==
                auth?.payloadLogin?.payload?.data?.user?._id &&
                assign("Select Assignee", "reviewer", "CATALOG_REVIEWER")}
              {/* analyst count Button */}
              {projectItem?.submissionExecutiveSku.userName ==
                auth?.payloadLogin?.payload?.data?.user?._id && (
                <div>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setEditDialogOpen(true)}
                  >
                    Analyst Pending Count
                  </Button>
                </div>
              )}
              {/* Submit Button */}
              {projectItem?.submissionExecutiveSku.userName ==
                auth?.payloadLogin?.payload?.data?.user?._id && (
                <div>
                  <Button
                    variant="contained"
                    color="primary"
                    // disabled={imageShow || !formik.dirty || !formik.isValid}
                    onClick={formik.handleSubmit}
                    style={{ marginTop: "20px" }}
                  >
                    Assign
                  </Button>
                </div>
              )}
            </div>
          ) : null}
          {location?.state?.data?.status == "ANALYSIS_DISCOUNT_DEPRESSION" ||
          location?.state?.data?.status == "ANALYSIS_SYN_DEPRESSION" ||
          location?.state?.data?.status == "ANALYSIS_UPLOAD_DEPRESSION" ||
          location?.state?.data?.status == "LIVE_CHECK_DEPRESSION" ? (
            <div style={{ width: "90%", margin: "10px auto 20px auto" }}>
              {/* req. download */}
              {download(
                "Requirement Sheet",
                location?.state?.data?.requirementSheet
              )}
              {/* base sheet download */}
              {download("Base Sheet", location?.state?.data?.baseSheet)}
              {/* submission sheet download */}
              {download("Submission Sheet", location?.state?.data?.submission)}
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

              {/* Submit Button */}
              {projectItem?.submissionExecutiveSku.userName ==
                auth?.payloadLogin?.payload?.data?.user?._id && (
                <div>
                  <Button
                    variant="contained"
                    color="primary"
                    // disabled={imageShow || !formik.dirty || !formik.isValid}
                    onClick={formik.handleSubmit}
                    style={{ marginTop: "20px" }}
                  >
                    De-depressed
                  </Button>
                </div>
              )}
            </div>
          ) : null}
          {projectItem?.status == "ANALYSIS_DISCOUNT" ? (
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
              {/* Discount Upload */}
              {projectItem?.analysisExecutiveDiscount.userName ==
                auth?.payloadLogin?.payload?.data?.user?._id &&
                fileUpload(
                  "Discount Sheet",
                  "Discount Sheet",
                  "discount",
                  formik.values.discount,
                  discountFile,
                  discountPreview,
                  setDiscountPreview
                )}
              {/* for syn assignment */}
              {projectItem?.analysisExecutiveDiscount.userName ==
                auth?.payloadLogin?.payload?.data?.user?._id &&
                assign("Select Assignee", "assignee", "ANALYSIS_EXECUTIVES")}
              {/* pmr Button */}
              {projectItem?.analysisExecutiveDiscount.userName ==
                auth?.payloadLogin?.payload?.data?.user?._id && (
                <div>
                  <Button
                    variant="contained"
                    color="primary"
                    // disabled={imageShow || !formik.dirty || !formik.isValid}
                    onClick={() => setDepressed("true")}
                    style={{ marginTop: "20px" }}
                  >
                    PMR
                  </Button>
                </div>
              )}
              {/* {depressed == "true"?"true":"false"} */}
              {/* Submit Button */}
              {projectItem?.analysisExecutiveDiscount.userName ==
                auth?.payloadLogin?.payload?.data?.user?._id && (
                <div>
                  <Button
                    variant="contained"
                    color="primary"
                    // disabled={imageShow || !formik.dirty || !formik.isValid}
                    onClick={formik.handleSubmit}
                    style={{ marginTop: "20px" }}
                  >
                    Assign
                  </Button>
                </div>
              )}
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
                !location?.state?.data?.reviewedSku &&
                fileUpload(
                  "Review Sheet",
                  "Review Sheet",
                  "reviewedSku",
                  formik.values.reviewedSku,
                  reviewedSkuFile,
                  reviewedSkuPreview,
                  setReviewedSkuPreview
                )}
              {location.state.data.discount &&
                download("Discount Sheet", location.state.data.discount)}
              {location.state.data.reviewedSku &&
                download("Review Sheet", location.state.data.sku)}
              {/* syn Upload */}
              {projectItem?.analysisExecutiveSyn.userName ==
                auth?.payloadLogin?.payload?.data?.user?._id &&
                !(depressed == "true") &&
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
                !(depressed == "true") &&
                assign("Select Assignee", "assignee", "ANALYSIS_EXECUTIVE")}
              {/* for Approval assignment */}
              {projectItem?.analysisExecutiveSyn.userName ==
                auth?.payloadLogin?.payload?.data?.user?._id &&
                !projectItem.reviewedSku &&
                !(depressed == "true") &&
                assign("Select Assignee", "assignee", "ACCOUNT_MANAGER")}
              {/* Depression Button */}
              {projectItem?.analysisExecutiveSyn.userName ==
                auth?.payloadLogin?.payload?.data?.user?._id && (
                <div>
                  <Button
                    variant="contained"
                    color="primary"
                    // disabled={imageShow || !formik.dirty || !formik.isValid}
                    onClick={() => setDepressed("true")}
                    style={{ marginTop: "20px" }}
                  >
                    PMR
                  </Button>
                </div>
              )}
              {/* {depressed == "true"?"true":"false"} */}
              {/* Submit Button */}
              {projectItem?.analysisExecutiveSyn.userName ==
                auth?.payloadLogin?.payload?.data?.user?._id && (
                <div>
                  <Button
                    variant="contained"
                    color="primary"
                    // disabled={imageShow || !formik.dirty || !formik.isValid}
                    onClick={formik.handleSubmit}
                    style={{ marginTop: "20px" }}
                  >
                    Assign
                  </Button>
                </div>
              )}
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
                assign(
                  "Approve by select Assignee",
                  "assignee",
                  "ANALYSIS_EXECUTIVES"
                )}
              {/* Submit Button */}
              {projectItem?.accountManagerApproval.userName ==
                auth?.payloadLogin?.payload?.data?.user?._id && (
                <div>
                  <Button
                    variant="contained"
                    color="primary"
                    // disabled={imageShow || !formik.dirty || !formik.isValid}
                    onClick={formik.handleSubmit}
                    style={{ marginTop: "20px" }}
                  >
                    Assign
                  </Button>
                </div>
              )}
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
                assign("select Assignee", "assignee", "ANALYSIS_EXECUTIVES")}
              {/* Depression Button */}
              {projectItem?.analysisExecutiveUpload.userName ==
                auth?.payloadLogin?.payload?.data?.user?._id && (
                <div>
                  <Button
                    variant="contained"
                    color="primary"
                    // disabled={imageShow || !formik.dirty || !formik.isValid}
                    onClick={() => setDepressed("true")}
                    style={{ marginTop: "20px" }}
                  >
                    PMR
                  </Button>
                </div>
              )}
              {/* Submit Button */}
              {projectItem?.analysisExecutiveUpload.userName ==
                auth?.payloadLogin?.payload?.data?.user?._id && (
                <div>
                  <Button
                    variant="contained"
                    color="primary"
                    // disabled={imageShow || !formik.dirty || !formik.isValid}
                    onClick={formik.handleSubmit}
                    style={{ marginTop: "20px" }}
                  >
                    Assign
                  </Button>
                </div>
              )}
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
              {/* Discount sheet download */}
              {download("Discount Sheet", location.state.data.discount)}
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
              <Typography variant="h4" style={{ margin: "30px" }}>
                {" "}
                Please wait till{" "}
                {dayjs
                  .utc(projectItem?.updatedAt)
                  .add(3, "day")
                  .format("dddd, MMMM D, YYYY h:mm A")}{" "}
                to complete the project.
              </Typography>

              {projectItem?.analysisExecutiveLiveCheck.userName ==
                auth?.payloadLogin?.payload?.data?.user?._id &&
                !projectItem.reviewedSku &&
                dayjs().isAfter(
                  dayjs.utc(projectItem?.updatedAt).add(3, "day")
                ) &&
                assign(
                  "Assign to Account Manager to Complete",
                  "assignee",
                  "ACCOUNT_MANAGER"
                )}
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
              {/* Discount sheet download */}
              {download("Discount Sheet", location.state.data.discount)}
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
              <Typography variant="h4" style={{ margin: "30px" }}>
                Completed
              </Typography>
            </div>
          ) : null}
        </Card>
      </Grid>

      <Backdrop className={classes.backdrop} open={openBackdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>

      {/* curator executive */}
      <div className={classes.curator}>
        <Dialog
          open={curatoropen}
          onClose={closecurator}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          PaperProps={{
            style: { width: "100%", maxWidth: "900px" },
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <DialogTitle id="alert-dialog-title">
              {"Curator Executive"}
            </DialogTitle>
            <IconButton onClick={closecurator} color="primary">
              <CloseIcon />
            </IconButton>
          </div>
          <DialogContent style={{ minHeight: "400px" }}>
            <TableContainer className={classes.mainContainer}>
              <Table className={classes.tableheight}>
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.Cellhead}>
                      Serial No
                    </TableCell>
                    <TableCell className={classes.Cellhead}>
                      Curator Name
                    </TableCell>
                    <TableCell className={classes.Cellhead}>
                      Count Of Parent Task
                    </TableCell>
                    <TableCell className={classes.Cellhead}>
                      Uncurator Style Count
                    </TableCell>
                  </TableRow>
                </TableHead>
                {curatorData.length < 1 ? (
                  <TableCell className={classes.tablecelldata}>
                    NO DATA FOUND
                  </TableCell>
                ) : (
                  <TableBody className={classes.tablebody}>
                    {curatorData.map((curator, index) => (
                      <TableRow key={index}>
                        <TableCell className={classes.Cell}>
                          {index + 1}
                        </TableCell>
                        <TableCell className={classes.Cell}>
                          {curator._id.firstName}
                        </TableCell>
                        <TableCell className={classes.Cell}>
                          {curator.countProject}
                        </TableCell>
                        <TableCell className={classes.Cell}>
                          {curator.count}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </DialogContent>
        </Dialog>
      </div>
      {/* curator executive end */}

      {/* submission executive */}
      <div className={classes.submission}>
        <Dialog
          open={submissionopen}
          onClose={closesubmission}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          PaperProps={{
            style: { width: "100%", maxWidth: "900px" },
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <DialogTitle id="alert-dialog-title">
              {"Submission Executive"}
            </DialogTitle>
            <IconButton onClick={closesubmission} color="primary">
              <CloseIcon />
            </IconButton>
          </div>
          <DialogContent style={{ minHeight: "500px" }}>
            <TableContainer className={classes.mainContainer}>
              <Table className={classes.tableheight}>
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.Cellhead}>
                      Serial No
                    </TableCell>
                    <TableCell className={classes.Cellhead}>
                      Executive Name
                    </TableCell>
                    {/* <TableCell className={classes.Cellhead}>
                      Count Of Parent Task
                    </TableCell> */}
                    <TableCell className={classes.Cellhead}>
                      Count Of Child Task
                    </TableCell>
                    <TableCell className={classes.Cellhead}>
                      Unsubmitted Style Count
                    </TableCell>
                  </TableRow>
                </TableHead>
                {submissionData.length < 1 ? (
                  <TableCell className={classes.tablecelldata}>
                    NO DATA FOUND
                  </TableCell>
                ) : (
                  <TableBody>
                    {submissionData.map((submission, index) => (
                      <TableRow key={index}>
                        <TableCell className={classes.Cell}>
                          {index + 1}
                        </TableCell>
                        <TableCell className={classes.Cell}>
                          {submission._id.firstName}
                        </TableCell>
                        {/* <TableCell className={classes.Cell}>
                          {submission["Count Of Parent Task"]}
                        </TableCell> */}
                        <TableCell className={classes.Cell}>
                          {submission.countProject}
                        </TableCell>
                        <TableCell className={classes.Cell}>
                          {submission.count}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </DialogContent>
        </Dialog>
      </div>
      {/* submission executive end */}

      {/* analyst */}
      {/* <div className={classes.analyst}>
        <Dialog
          open={analystopen}
          onClose={closeanalyst}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          PaperProps={{
            style: { width: "100%", maxWidth: "1000px" },
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <DialogTitle id="alert-dialog-title">
              {"Analyst Executive"}
            </DialogTitle>
            <IconButton onClick={closeanalyst} color="primary">
              <CloseIcon />
            </IconButton>
          </div>
          <DialogContent>
            <TableContainer className={classes.mainContainer}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.Cellhead}>
                      Serial No
                    </TableCell>
                    <TableCell className={classes.Cellhead}>
                      Child Project Name
                    </TableCell>
                    <TableCell className={classes.Cellhead}>
                      Current status
                    </TableCell>
                    <TableCell className={classes.Cellhead}>
                      Current Assignee
                    </TableCell>
                    <TableCell className={classes.Cellhead}>Actions</TableCell>
                    <TableCell className={classes.Cellhead}>
                      Reassign Option
                    </TableCell>
                  </TableRow>
                </TableHead>
                {analystData.length < 1 ? (
                  <div>NO DATA FOUND</div>
                ) : (
                  <TableBody>
                    {analystData.map((analyst, index) => (
                      <TableRow key={index}>
                        <TableCell className={classes.Cell}>
                          {index + 1}
                        </TableCell>
                        <TableCell className={classes.Cell}>
                          {analyst["Child Project Name"]}
                        </TableCell>
                        <TableCell className={classes.Cell}>
                          {analyst["Current status"]}
                        </TableCell>
                        <TableCell className={classes.Cell}>
                          {analyst["Current Assignee"]}
                        </TableCell>
                        <TableCell className={classes.Cell}>
                          <EditIcon onClick={() => setEditDialogOpen(true)} />
                        </TableCell>
                        <TableCell className={classes.Cell}>
                          <FormControl className={classes.formControl}>
                            <InputLabel
                              id={`demo-simple-select-label-${index}`}
                            >
                              Person {index + 1}
                            </InputLabel>
                            <Select
                              labelId={`demo-simple-select-label-${index}`}
                              id={`demo-simple-select-label-${index}`}
                              value={person[index]}
                              onChange={handleChange(index)}
                            >
                              <MenuItem value={10}>Ten</MenuItem>
                              <MenuItem value={20}>Twenty</MenuItem>
                              <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                          </FormControl>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </DialogContent>
        </Dialog>
      </div> */}
      {/* analyst end */}

      {/* module screen */}
      <div className={classes.module}>
        <Dialog
          open={editDialogOpen}
          onClose={() => setEditDialogOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          PaperProps={{
            style: { width: "100%", maxWidth: "800px" },
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <DialogTitle id="alert-dialog-title">{"Module Screen"}</DialogTitle>
            <IconButton
              onClick={() => setEditDialogOpen(false)}
              color="primary"
            >
              <CloseIcon />
            </IconButton>
          </div>
          <DialogContent style={{ minHeight: "500px" }}>
            <TableContainer className={classes.mainContainer}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.Cellhead}>
                      Serial No
                    </TableCell>
                    <TableCell className={classes.Cellhead}>
                      Executive Name
                    </TableCell>
                    <TableCell className={classes.Cellhead}>
                      Task Type
                    </TableCell>
                    <TableCell className={classes.Cellhead}>
                      Pending Style Count
                    </TableCell>
                  </TableRow>
                </TableHead>
                {moduleData.length < 1 ? (
                  <div>No DATA FOUND</div>
                ) : (
                  <TableBody>
                    {moduleData.map((module, index) => (
                      <TableRow key={index}>
                        <TableCell className={classes.Cell}>
                          {index + 1}
                        </TableCell>
                        <TableCell className={classes.Cell}>
                          {module?.userNam?.firstName}
                        </TableCell>
                        <TableCell className={classes.Cell}>
                          {module?._id}
                        </TableCell>
                        <TableCell className={classes.Cell}>
                          {module?.styleCount}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </DialogContent>
        </Dialog>
      </div>
      {/* module screen  end */}
    </Container>
  );
}
