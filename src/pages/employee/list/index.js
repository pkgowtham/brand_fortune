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

function createData(
  firstName,
  lastName,
  mobile,
  email,
  password,
  role,
  Actions
) {
  return { firstName, lastName, mobile, email, password, role };
}


function Index() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [deleterows, setDeleterows] = React.useState([]);
  const [passwordVisible, setPasswordVisible] = useState({});
  const [open, setOpen] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState(false);
  const [curatoropen, setCuratoropen] = React.useState(false);
  const [submissionopen, setSubmissionopen] = React.useState(false);
  const [analystopen, setAnalystopen] = React.useState(false);
  const [editDialogOpen, setEditDialogOpen] = React.useState(false);
  const [person, setPerson] = React.useState({});


// delete confirmation
const handeleOpen = (id) => {
    setDeleteId(id);
    setOpen(true);
};
const handeleClose = () => {
    setOpen(false);
};
// curator
const opencurator =()=>{
  setCuratoropen(true)
};
const closecurator=()=>{
  setCuratoropen(false)
};
// submission
const opensubmission =()=>{
  setSubmissionopen(true)
};
const closesubmission=()=>{
  setSubmissionopen(false)
};
// analyst
const openanalyst =()=>{
  setAnalystopen(true)
};
const closeanalyst=()=>{
  setAnalystopen(false)
};
// handleChange
const handleChange=(index)=>(event)=>{
  setPerson((prev)=>({
    ...prev,
    [index]:event.target.value
  }));
}



// curator data
const curatorData=[{
  'curator Name' :'jhon',
  'Count Of Parent Task':'5',
  'Uncurator Style Count':'curator'
},
{
  "curator Name": 'Jane Smith',
  "Count Of Parent Task": '3',
  "Uncurator Style Count": 'Uncurate'
},
{
  "curator Name": 'Alice Johnson',
  "Count Of Parent Task": '7',
  "Uncurator Style Count": 'Uncurate'
},
{
  "curator Name": 'Bob Brown',
  "Count Of Parent Task": '2',
  "Uncurator Style Count": 'Uncurate'
},
{
  "curator Name": 'Emily Davis',
  "Count Of Parent Task": '4',
  "Uncurator Style Count": 'Uncurate'
},
];
// submission data
const submissionData=[{
  'Executive Name' :'jhon',
  'Count Of Parent Task':'5',
  'Count Of Child Task':'curator',
  'Unsubmitted Style Count':'1'
},
{
  "Executive Name": 'Jane Smith',
  "Count Of Parent Task": '3',
  'Count Of Child Task':'curator',
  'Unsubmitted Style Count':'2'
},
{
  "Executive Name": 'Alice Johnson',
  "Count Of Parent Task": '7',
  'Count Of Child Task':'curator',
  'Unsubmitted Style Count':'3'
},
{
  "Executive Name": 'Bob Brown',
  "Count Of Parent Task": '2',
  'Count Of Child Task':'curator',
  'Unsubmitted Style Count':'4'
},
{
  "Executive Name": 'Emily Davis',
  "Count Of Parent Task": '4',
  'Count Of Child Task':'curator',
  'Unsubmitted Style Count':'5'
},
];
// analyst data
const analystData=[{
  'Child Project Name' :'jhon',
  'Current status':'5',
  'Current Assignee':'curator',
},
{
  'Child Project Name' :'joe',
  'Current status':'6',
  'Current Assignee':'curator',
},
{
 'Child Project Name' :'jhondoe',
  'Current status':'7',
  'Current Assignee':'curator',
},
{
'Child Project Name' :'doe',
  'Current status':'8',
  'Current Assignee':'curator',},
{
  'Child Project Name' :'jhonnndoe',
  'Current status':'9',
  'Current Assignee':'curator',
},
];
// module data
const moduleData=[{
  'Executive Name' :'jhon',
  'Task Type':'5',
  'Pending Style Count':'curator',
},
{
  'Executive Name' :'jhondoo',
  'Task Type':'6',
  'Pending Style Count':'curator',
},
{
 'Executive Name' :'jhonjhom',
  'Task Type':'7',
  'Pending Style Count':'curator',
},
{
'Executive Name' :'jhoe',
  'Task Type':'8',
  'Pending Style Count':'curator',
},
{
  'Executive Name' :'jho',
  'Task Type':'9',
  'Pending Style Count':'curator',
},
];


  const table = useSelector((state) => state.table);

  const initialTableData = async () => {
    console.log("initialTableData", deleterows);

    const token = localStorage.getItem("accessToken");

    await axios
      .get("http://3.108.100.249/api/v1/user/getlist", {
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

    await axios
      .delete(`http://3.108.100.249/api/v1/user/delete`, {
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
        {/* curator button */}
      <Button
          variant="contained"
          color="primary"
          onClick={() => opencurator()}
        >
          Curator
        </Button>
        {/* submission */}
        <Button
          variant="contained"
          color="primary"
          onClick={() => opensubmission()}
        >
          submission
        </Button>
        {/* analyst */}
        <Button
          variant="contained"
          color="primary"
          onClick={() => openanalyst()}
        >
          Analyst
        </Button>
        {/* add new button */}
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/layout/user")}
        >
          Add New
        </Button>
      </div>
      <TableContainer className={classes.tablecontainer} component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.Tablecell}>Firstname</TableCell>
              <TableCell className={classes.Tablecell}>Lastname</TableCell>
              <TableCell className={classes.Tablecell}>Mobile</TableCell>
              <TableCell className={classes.Tablecell}>Email</TableCell>
              <TableCell className={classes.Tablecell}>Role</TableCell>
              <TableCell className={classes.Tablecell}>Password</TableCell>
              <TableCell className={classes.Tablecell}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {deleterows?.data?.map((row, index) => (
              <TableRow key={row._id}>
                <TableCell className={classes.Tablebody}>
                  {row.firstName}
                </TableCell>
                <TableCell className={classes.Tablebody}>
                  {row.lastName}
                </TableCell>
                <TableCell className={classes.Tablebody}>
                  {row.mobile}
                </TableCell>
                <TableCell className={classes.Tablebody}>{row.email}</TableCell>
                <TableCell className={classes.Tablebody}>{row.role.join(" , ")}</TableCell>
                <TableCell className={classes.Tablebody}>
                  {passwordVisible[index] ? row.password : ".........."}
                  <IconButton onClick={() => togglePasswordVisibility(index)}>
                    {passwordVisible[index] ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </TableCell>
                <TableCell className={classes.Tablebody}>
                  <EditIcon
                    variant="contained"
                    color="rgba(0, 0, 0, 0.54);"
                    cursor='pointer'
                    onClick={() =>
                      navigate("/layout/user", { state: { ...row } })
                    }
                  >
                    Edit
                  </EditIcon>
                  <DeleteOutlineIcon
                    variant="contained"
                    color="rgba(0, 0, 0, 0.54);"
                    cursor='pointer'
                    onClick={() => handeleOpen(row._id)}
                  >
                    Delete
                  </DeleteOutlineIcon>
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

    {/* curator executive */}
      <div className={classes.curator}>
      <Dialog
        open={curatoropen}
        onClose={closecurator}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
        style: { width: '100%', maxWidth: '900px' } 
    }}
      >
        <div style={{display:'flex',justifyContent:'space-between'}}>
        <DialogTitle id="alert-dialog-title">
          {"Curator Executive"}
        </DialogTitle>
          <IconButton onClick={closecurator} color="primary">
            <CloseIcon />
          </IconButton>
        </div>
        <DialogContent>
          <TableContainer className={classes.mainContainer}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.Cellhead}>Serial No</TableCell>
                  <TableCell className={classes.Cellhead}>Curator Name</TableCell>
                  <TableCell className={classes.Cellhead}>Count Of Parent Task</TableCell>
                  <TableCell className={classes.Cellhead}>Uncurator Style Count</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {curatorData.map((curator,index)=>(
                <TableRow key={index}>
                  <TableCell className={classes.Cell}>{index+1}</TableCell>
                  <TableCell className={classes.Cell}>{curator["curator Name"]}</TableCell>
                  <TableCell className={classes.Cell}>{curator["Count Of Parent Task"]}</TableCell>
                  <TableCell className={classes.Cell}>{curator["Uncurator Style Count"]}</TableCell>
                </TableRow>
                ))}
              </TableBody>
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
        style: { width: '100%', maxWidth: '900px' } 
    }}
      >
        <div style={{display:'flex',justifyContent:'space-between'}}>
        <DialogTitle id="alert-dialog-title">
          {"Submission Executive"}
        </DialogTitle>
          <IconButton onClick={closesubmission} color="primary">
            <CloseIcon />
          </IconButton>
        </div>
        <DialogContent>
          <TableContainer className={classes.mainContainer}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.Cellhead}>Serial No</TableCell>
                  <TableCell className={classes.Cellhead}>Executive Name</TableCell>
                  <TableCell className={classes.Cellhead}>Count Of Parent Task</TableCell>
                  <TableCell className={classes.Cellhead}>Count Of Child Task</TableCell>
                  <TableCell className={classes.Cellhead}>Unsubmitted Style Count</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {submissionData.map((submission,index)=>(
                <TableRow key={index}>
                  <TableCell className={classes.Cell}>{index+1}</TableCell>
                  <TableCell className={classes.Cell}>{submission["Executive Name"]}</TableCell>
                  <TableCell className={classes.Cell}>{submission["Count Of Parent Task"]}</TableCell>
                  <TableCell className={classes.Cell}>{submission["Count Of Child Task"]}</TableCell>
                  <TableCell className={classes.Cell}>{submission["Unsubmitted Style Count"]}</TableCell>
                </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
      </Dialog>
    </div>
    {/* submission executive end */}

    {/* analyst */}
    <div className={classes.analyst}>
      <Dialog
        open={analystopen}
        onClose={closeanalyst}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
        style: { width: '100%', maxWidth: '1000px' } 
    }}
      >
        <div style={{display:'flex',justifyContent:'space-between'}}>
        <DialogTitle id="alert-dialog-title">
          {"Analyst Executive"}
        </DialogTitle>
          <IconButton onClick={closeanalyst} color="primary">
            <CloseIcon />
          </IconButton>
        </div>
        <DialogContent >
          <TableContainer className={classes.mainContainer}>
            <Table >
              <TableHead>
                <TableRow>
                  <TableCell className={classes.Cellhead}>Serial No</TableCell>
                  <TableCell className={classes.Cellhead}>Child Project Name</TableCell>
                  <TableCell className={classes.Cellhead}>Current status</TableCell>
                  <TableCell className={classes.Cellhead}>Current Assignee</TableCell>
                  <TableCell className={classes.Cellhead}>Actions</TableCell>
                  <TableCell className={classes.Cellhead}>Reassign Option</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {analystData.map((analyst,index)=>(
                <TableRow key={index}>
                  <TableCell className={classes.Cell}>{index+1}</TableCell>
                  <TableCell className={classes.Cell}>{analyst["Child Project Name"]}</TableCell>
                  <TableCell className={classes.Cell}>{analyst["Current status"]}</TableCell>
                  <TableCell className={classes.Cell}>{analyst["Current Assignee"]}</TableCell>
                  <TableCell className={classes.Cell}><EditIcon onClick={() =>  setEditDialogOpen(true)}/></TableCell>
                  <TableCell className={classes.Cell}>
                  <FormControl className={classes.formControl}>
                  <InputLabel id={`demo-simple-select-label-${index}`}>Person {index+1}</InputLabel>
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
            </Table>
          </TableContainer>
        </DialogContent>
      </Dialog>
    </div>
    {/* analyst end */}

    {/* module screen */}
    <div className={classes.module}>
      <Dialog
        open={editDialogOpen}
        onClose={()=>setEditDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
        style: { width: '100%', maxWidth: '800px' } 
    }}
      >
        <div style={{display:'flex',justifyContent:'space-between'}}>
        <DialogTitle id="alert-dialog-title">
          {"Module Screen"}
        </DialogTitle>
          <IconButton onClick={()=>setEditDialogOpen(false)} color="primary">
            <CloseIcon />
          </IconButton>
        </div>
        <DialogContent >
          <TableContainer className={classes.mainContainer}>
            <Table >
              <TableHead>
                <TableRow>
                  <TableCell className={classes.Cellhead}>Serial No</TableCell>
                  <TableCell className={classes.Cellhead}>Executive Name</TableCell>
                  <TableCell className={classes.Cellhead}>Task Type</TableCell>
                  <TableCell className={classes.Cellhead}>Pending Style Count</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {moduleData.map((module,index)=>(
                <TableRow key={index}>
                  <TableCell className={classes.Cell}>{index+1}</TableCell>
                  <TableCell className={classes.Cell}>{module["Executive Name"]}</TableCell>
                  <TableCell className={classes.Cell}>{module["Task Type"]}</TableCell>
                  <TableCell className={classes.Cell}>{module["Pending Style Count"]}</TableCell>
                </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
      </Dialog>
    </div>
    {/* module screen  end */}
    </div>
  );
}

export default Index;
