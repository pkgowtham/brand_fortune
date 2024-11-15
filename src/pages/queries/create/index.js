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
  const [articleTypeList, setArticleTypeList] = React.useState([]);
  const [refinedArticleList, setRefinedArticleList] = React.useState([]);

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

  const marketPlaces = [
    { label: "AJIO", value: "AJIO" },
    { label: "NYKAA", value: "NYKAA" },
    { label: "NYKAA FASHION", value: "NYKAA_FASHION" },
    { label: "MEESHO", value: "MEESHO" },
    { label: "TATA CLIQ", value: "TATA_CLIQ" },
    { label: "AMAZON", value: "AMAZON" },
    { label: "FLIPKART", value: "FLIPKART" },
    { label: "MYNTRA", value: "MYNTHRA" },
    { label: "JIO MART", value: "JIO_MART" },
    { label: "FYND", value: "FYND" }
  ];
  

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

  // get articleType
  const getArticleTypedata = async () => {
    console.log("initialTableData", user);

    const token = localStorage.getItem("accessToken");

    await axio
      .get("/articletype/getlist", {
        headers: {
          Authorization: token ? `Bearer ${token}` : null,
        },
      })
      .then((tableresponse) => {
        console.log("tableresponse", tableresponse);
        setArticleTypeList(tableresponse.data.payload.data);
      })
      .catch((err) => {
        console.log("tableERR", err);
      });
  };
  useEffect(() => {
    getArticleTypedata();
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
        return "https://hexaproject.s3.ap-south-1.amazonaws.com/public/img.svg";
      case "jpeg":
        return "https://hexaproject.s3.ap-south-1.amazonaws.com/public/img.svg";
      case "image/jpg":
        return "https://hexaproject.s3.ap-south-1.amazonaws.com/public/img.svg";
      case "jpg":
        return "https://hexaproject.s3.ap-south-1.amazonaws.com/public/img.svg";
      case "image/png":
        return "https://hexaproject.s3.ap-south-1.amazonaws.com/public/img.svg";
      case "png":
        return "https://hexaproject.s3.ap-south-1.amazonaws.com/public/img.svg";
      case "application/pdf":
        return "https://hexaproject.s3.ap-south-1.amazonaws.com/public/pdf.svg";
      case "pdf":
        return "https://hexaproject.s3.ap-south-1.amazonaws.com/public/pdf.svg";
      case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
        return "https://hexaproject.s3.ap-south-1.amazonaws.com/public/excel.svg";
      case "xls":
        return "https://hexaproject.s3.ap-south-1.amazonaws.com/public/excel.svg";
      case "xlsx":
        return "https://hexaproject.s3.ap-south-1.amazonaws.com/public/excel.svg";
      case "docx":
        return "https://hexaproject.s3.ap-south-1.amazonaws.com/public/doc.svg";
      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        return "https://hexaproject.s3.ap-south-1.amazonaws.com/public/doc.svg";

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
  useEffect(() => {
    if (articleTypeList.length) {
      setRefinedArticleList(
        articleTypeList?.filter((articleType) =>
          articleType.brand
            .map((bran) => bran._id)
            .includes(formik.values.brand)
        )
      );
    }
  }, [formik.values.brand]);

  return (
    <Container disableGutters>
      <Grid container spacing={2}>
        <Grid item xs={12} className={classes.TitleCard}>
          <Typography variant="h5" className={classes.TitleText}>
            {type === "ADD" ? "RAISE NEW QUERY" : "EDIT QUERY"}
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
                  label="From"
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
    

            <Grid
              item
              xs={5}
              spacing={2}
              style={{ margin: "10px auto 20px auto" }}
            >
              <FormControl style={{ marginTop: 5 }} fullWidth>
                <InputLabel id="gender-label" style={{ left: 12, top: -10 }}>
                Assign to
                </InputLabel>
                <Select
                  id="gender"
                  labelId="gender-label"
                  variant="outlined"
                  label="Assign to"
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
                  <MenuItem value="">Select</MenuItem>
                  <MenuItem value="AM 1">AM 1</MenuItem>
                  <MenuItem value="AM 2">AM 2</MenuItem>
                  <MenuItem value="AM 3">AM 3</MenuItem>
                 
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
                Relavant to
                </InputLabel>
                <Select
                  id="gender"
                  labelId="gender-label"
                  variant="outlined"
                  label="Relavant to"
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
                  <MenuItem value="">Select</MenuItem>
                  <MenuItem value="Query 1">Query 1</MenuItem>
                  <MenuItem value="Query 2">Query 2</MenuItem>
                  <MenuItem value="Query 3">Query 3</MenuItem>
                 
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
                <TextField
                  className={classes.textField}
                  id="mailSubject"
                  label="Title of Query *"
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
            
            <Grid item xs={11} spacing={2} style={{ margin: "10px auto 20px auto" }}>
  <FormControl style={{ marginTop: 5 }} fullWidth>
    <TextField
      className={classes.textField}
      id="queryDescription"
      label="Description of Query *"
      variant="outlined"
      multiline // Make this a multi-line text area
      rows={4}   // Adjust the number of visible rows
      InputLabelProps={{
        style: {
          fontSize: "14px",
          top: "-5px",
          textAlign: "left",
        },
      }}
      disabled={type === "EDIT"} // Keep it disabled if in edit mode
      helperText={
        formik.errors.mailSubject && formik.touched.mailSubject
          ? String(formik.errors.mailSubject)
          : ""
      }
      error={Boolean(formik.errors.mailSubject && formik.touched.mailSubject)}
      {...formik.getFieldProps("mailSubject")}
      inputProps={{
        style: { height: "auto", padding: "10px" }, // Allow the height to adjust
        readOnly: type === "EDIT", // Keep it read-only in edit mode
      }}
    />
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
            
              <Button
                variant="contained"
                color="primary"
                // disabled={imageShow || !formik.dirty || !formik.isValid}
                onClick={formik.handleSubmit}
                style={{ marginTop: "20px" }}
              >
                SUBMIT
              </Button>
            </div>
          ) : null}
          
        </Card>
      </Grid>

      <Backdrop className={classes.backdrop} open={openBackdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>

      

    
        
    </Container>
  );
}
