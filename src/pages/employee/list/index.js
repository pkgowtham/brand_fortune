import React, { useState } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles, TablePagination, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { useNavigate } from 'react-router-dom';



const useStyles=makeStyles({
  table:{
    minwidth:650,
  },
  Tablecell:{
    textAlign:'center',
    padding:'20px',
    fontWeight:'bolder',
  },
  Tablebody:{
    textAlign:'center',
    padding:'20px',
  },
  tablecontainer:{
    marginTop:'20px'
  },
  buttonContainer:{
    marginTop:'20px',
    float:'right',
    marginBottom:'20px'
  }
  
})



function createData(firstname,lastname,mobile,email,password,role,Actions){
  return{firstname,lastname,mobile,email,password,role}
};

const initialRows=[
  createData("john","duo","1234567890","john@gmail.com","abcd",["ACCOUNT_MANAGER"]),
  createData("john","duo","1234567890","john@gmail.com","abcd",["ACCOUNT_MANAGER"]),
  createData("john","duo","1234567890","john@gmail.com","abcd",["ACCOUNT_MANAGER"]),
  createData("john","duo","1234567890","john@gmail.com","abcd",["ACCOUNT_MANAGER"]),
  createData("john","duo","1234567890","john@gmail.com","abcd",["ACCOUNT_MANAGER"]),
  createData("john","duo","1234567890","john@gmail.com","abcd",["ACCOUNT_MANAGER"])  
]

function Index() {
  const classes=useStyles();
  const navigate = useNavigate()
  const [deleterows,setDeleterows] =useState(initialRows)


  const handeleDelete=(rowTodelete)=>{  
    setDeleterows(deleterows.filter((row)=> row  !== rowTodelete));
  }

  return (
    <div className={classes.tablebutton}>
      <div className={classes.buttonContainer}>
        <Button variant="contained" color="primary" onClick={()=>navigate('/layout/user')}>
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
          {deleterows.map((row)=>(
            <TableRow>
            <TableCell className={classes.Tablebody}>{row.firstname}</TableCell>
            <TableCell className={classes.Tablebody}>{row.lastname}</TableCell>
            <TableCell className={classes.Tablebody}>{row.mobile}</TableCell>
            <TableCell className={classes.Tablebody}>{row.email}</TableCell>
            <TableCell className={classes.Tablebody}>{row.role}</TableCell>
            <TableCell className={classes.Tablebody}>{row.password}</TableCell>
            <TableCell className={classes.Tablebody}>
              <Button variant="contained" color="primary" onClick={()=>navigate('/layout/user',{state:{...row}})}>Edit</Button>
              <Button variant="contained" color="primary" onClick={()=>handeleDelete(row)}>Delete</Button>
            </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
      rowsPerPage={[5,10,25]}
      component="div"
      />
    </TableContainer>
    </div>
  )
}

export default Index