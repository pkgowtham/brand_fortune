import React, { useState, useEffect, useRef } from "react";
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
  Paper,
  Box,
} from "@material-ui/core";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { axio } from "../../../axios";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

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

 
  const [inputvalue, setInputvalue] = useState({
    label: "",
    category: "",
    userId: "",
    fileUrl: "",
  });
  const [deleterows, setDeleterows] = useState([]);
  const [category, setCategory] = useState([]);
  const [user, setUser] = useState([]);
  const [fileDoc, setFileDoc] = useState(null);
  const [fileEvent, setFileEvent] = useState(null);
  const [fileDocPreview, setFileDocPreview] = useState();
  const fileDocFile = useRef(null);

  console.log(inputvalue);
  const [error, setError] = useState({
    label: false,
  });
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
  useEffect(() => {
    if (location?.state) {
      setFileDoc(location?.state);
    }
  }, [])
  

  useEffect(() => {
    
    if (fileDoc?.userId) {
      let temp = [];
      fileDoc.userId.map((userId) => {
        temp.push(userId._id);
      });
      setInputvalue({
        label: fileDoc.label,
        category: fileDoc.category._id,
        userId: temp,
        fileUrl: fileDoc.fileUrl,
      });
    }
  }, [fileDoc]);
  const regex = {
    label: /^[A-Za-z\s]+$/,
  };
  const initialCategoryData = async () => {
    console.log("initialTableData", deleterows);

    const token = localStorage.getItem("accessToken");

    await axio
      .get("/filecategory/getlist", {
        headers: {
          Authorization: token ? `Bearer ${token}` : null,
        },
      })
      .then((tableresponse) => {
        console.log("tableresponse", tableresponse);
        setCategory(tableresponse.data.payload.data);
      })
      .catch((err) => {
        console.log("tableERR", err);
      });
  };
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
  const initialTableData = async () => {
    console.log("initialTableData", deleterows);

    const token = localStorage.getItem("accessToken");

    await axio
      .get("/filedoc/getlist", {
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
    initialCategoryData();
    getUserdata();
  }, []);

  const formCreate = async () => {
    console.log("Formmessage", inputvalue);
    const token = localStorage.getItem("accessToken");
    const uploadData = new FormData();
    uploadData.append("label", inputvalue.label);
    uploadData.append("category", inputvalue.category);
    uploadData.append("userId", inputvalue.userId);
    uploadData.append("fileUrl", inputvalue.fileUrl);
    console.log("upload",uploadData)

    await axio
      .post("/filedoc/create", uploadData, {
        headers: {
          Authorization: token ? `Bearer ${token}` : null,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("formmessage", response);
        enqueueSnackbar("Successfully Created", { variant: "success" });
        navigate("/layout/filedoc");
        setInputvalue({
          label: "",
          category: "",
          userId: "",
          fileUrl: "",
        });
      })
      .catch((err) => {
        enqueueSnackbar("Error", {
          variant: "error",
        });
        console.log("formErrr message", err);
      });
  };

  const formUpdate = async () => {
    console.log("Formupdate", inputvalue);
    const token = localStorage.getItem("accessToken");
    const uploadData = new FormData();
    uploadData.append("label", inputvalue.label);
    uploadData.append("category", inputvalue.category);
    uploadData.append("userId", inputvalue.userId);
    uploadData.append("fileUrl", inputvalue.fileUrl);
    await axio
      .put(`/filedoc/update`, uploadData, {
        headers: {
          Authorization: token ? `Bearer ${token}` : null,
          "Content-Type": "multipart/form-data",
        },
        params: {
          _id: fileDoc._id,
        },
      })
      .then((updateresponse) => {
        console.log("formupdate", updateresponse);
        setInputvalue({
          label: "",
          category: "",
          userId: "",
          fileUrl: "",
        });
        enqueueSnackbar("Successfully Updated", { variant: "success" });
        navigate("/layout/filedoc");
      })
      .catch((err) => {
        enqueueSnackbar("Error Occured", {
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

      default:
        break;
    }
    setError({ ...error, [name]: isError });
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    if (fileDoc) {
      console.log("im here1");
      formUpdate();
    } else {
      formCreate();
    }
    console.log("Form submitted:", inputvalue);
  };
  const onSelectFile = (e) => {
    let file = e?.target?.files[0];
    let extension = e?.target?.files[0].type;
    if (file.size > 1048576 * 2) {
      // 1MB = 1048576 bytes
      enqueueSnackbar("File size should be less than 2 MB", {
        variant: "error",
      });
      return;
    }
   setInputvalue({...inputvalue,fileUrl:e?.target?.files[0]});

    setFileDocPreview(objectUrl(extension));
  };

  const fileUpload = () => {
    return (
      <div>
        <Typography variant="h5">File Upload</Typography>
        <Paper
          variant="outlined"
          className={classes.uploadArea}
          style={{
            border: inputvalue.fileUrl
              ? "1px dashed #ccc"
              : "1px dashed #3f51b5",
            backgroundColor: inputvalue.fileUrl ? "#f0f0f0" : "#ffffff",
          }}
        >
          {(inputvalue.fileUrl == "") && (
            <Box
              onClick={() => {
                fileDocFile.current.click();
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
            ref={fileDocFile}
            // id={fileUrl}
            label="File Upload"
            variant="outlined"
            type="file"
            accept=".jpeg, .jpg, .png, .pdf, .xls, .xlsx, .docx"
            onChange={(event) => {
              onSelectFile(event);
            }}
            style={{ display: "none" }}
          />
          {fileDocPreview && (
            <img
              src={fileDocPreview}
              style={{ maxHeight: "200px", maxWidth: "200px" }}
            />
          )}
        </Paper>
      </div>
    );
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
            onClick={() => navigate("/layout/filedoc")}
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
              label="File Name"
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
        <Grid item xs={6}>
          <FormControl className={classes.formControl} fullWidth>
            <InputLabel
              id="demo-mutiple-checkbox-label"
              style={{ left: 35, top: 15, cursor: "pointer" }}
            >
              Select Employee to view{" "}
            </InputLabel>
            <Select
              labelId="demo-mutiple-checkbox-label"
              id="demo-mutiple-checkbox"
              variant="outlined"
              multiple
              label="Select Employees"
              name="userId"
              value={inputvalue.userId ? inputvalue.userId : []}
              onChange={handelTextinput}
              inputProps={{
                name: "userId",
                id: "outlined-age-native-simple",
              }}
              renderValue={(selected) =>
                user
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
              {user.map((name) => (
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
      <Grid container spacing={2}>
        <Grid item xs={6}>
       { fileUpload( )}
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={6}  >
          <FormControl style={{ marginTop: 5 }} fullWidth>
            <InputLabel id="brand-label" style={{ left: 12, top: -10 }}>
              Select Category
            </InputLabel>
            <Select
              id="category"
              labelId="category-label"
              variant="outlined"
              label="Select Brand"
              inputProps={{
                classes: {
                  root: classes.selectInput,
                },
              }}
              value={inputvalue.category}
              onChange={(e) =>
                {
                  console.log("eee",e.target)
                  setInputvalue({ ...inputvalue, category: e.target.value })

                }
              }
            >
              {category?.map((category) => {
                return (
                  <MenuItem value={category._id}>{category.label}</MenuItem>
                );
              })}
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
          {fileDoc ? "Update" : "Submit"}
        </Button>
      </div>
    </Container>
  );
}

export default Create;
