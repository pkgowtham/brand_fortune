import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import {
  makeStyles,
  TablePagination,
  Typography,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  
} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import EditIcon from "@material-ui/icons/Edit";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { enqueueSnackbar } from "notistack";
import CloseIcon from '@material-ui/icons/Close';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';

import { axio } from "../../../axios";

const useStyles = makeStyles({
  table: {
    minwidth: 650,
  },
  Tablecell: {
    textAlign: "center",
    padding: "20px",
    fontWeight: "bolder",
  },
  Tablebody: {
    textAlign: "center",
    padding: "20px",
  },
  tablecontainer: {
    marginTop: "20px",
  },
  buttonContainer: {
    marginTop: "20px",
    float: "right",
    marginBottom: "20px",
  },
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    padding: "20px",
    backgroundColor: "white",
    boxShadow:
      "0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)",
  },
  Cell:{
    textAlign:'center',
  },
  Cellhead:{
    textAlign: "center",
    padding: "20px",
    fontWeight: "bolder",
  },
  formControl: {
    minWidth: '150px',
  },
});




function Index() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [deleterows, setDeleterows] = React.useState([]);
  const [passwordVisible, setPasswordVisible] = useState({});
  const [open, setOpen] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState(false);
  


// delete confirmation
const handeleOpen = (id) => {
    setDeleteId(id);
    setOpen(true);
};
const handeleClose = () => {
    setOpen(false);
};




  const initialTableData = async () => {
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
        setDeleterows(tableresponse.data.payload);
      })
      .catch((err) => {
        console.log("tableERR", err);
      });
  };

  useEffect(() => {
    console.log("tableruning");
    initialTableData();
  }, []);

  const handeleDelete = async () => {
    console.log("handeleDelete", deleterows);

    const token = localStorage.getItem("accessToken");

    await axio
      .delete(`/filecategory/destroy`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : null,
        },
        params: {
          _id: `${deleteId}`,
        },
      })
      .then((deleteresponse) => {
        console.log("deleteresponse", deleteresponse);
        enqueueSnackbar("Successfully Deleted", { variant: "success" });
        initialTableData();
        setOpen(false);
      })
      .catch((err) => {
        console.log("deleteERR", err);
        setOpen(false);
      });
  };

  const togglePasswordVisibility = (index) => {
    setPasswordVisible((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className={classes.tablebutton}>
      <div className={classes.buttonContainer}>
      
        {/* add new button */}
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/layout/filecategorycreate")}
        >
          Add New
        </Button>
      </div>
      <TableContainer className={classes.tablecontainer} component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.Tablecell}>Name</TableCell>
                
              <TableCell className={classes.Tablecell}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {deleterows?.data?.map((row, index) => (
              <TableRow key={row._id}>
                <TableCell className={classes.Tablebody}>
                  {row.label}
                </TableCell>
                
            
               
                <TableCell className={classes.Tablebody}>
                <Tooltip title="Edit" placement="bottom-start">
                  <EditIcon
                    variant="contained"
                    color="rgba(0, 0, 0, 0.54);"
                    cursor='pointer'
                    onClick={() =>
                      navigate("/layout/filecategorycreate", { state: { ...row } })
                    }
                  >
                    Edit
                  </EditIcon>
                 </Tooltip>
                 <Tooltip title="Delete" placement="bottom">
                  <DeleteOutlineIcon
                    variant="contained"
                    color="rgba(0, 0, 0, 0.54);"
                    cursor='pointer'
                    onClick={() => handeleOpen(row._id)}
                  >
                    Delete
                  </DeleteOutlineIcon>
               </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination rowsPerPage={[5, 10, 25]} component="div" />
      </TableContainer>
      {/* delete confirmation */}
      <div>
        <Dialog
          open={open}
          onClose={handeleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Delete Confirmation"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this item? This action cannot be
              undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handeleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handeleDelete} color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      {/* delete confirmation end */}

    </div>
  );
}

export default Index;
