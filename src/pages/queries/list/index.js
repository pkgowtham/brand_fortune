import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Typography
} from "@material-ui/core";

import EditIcon from "@material-ui/icons/Edit";
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import AssignmentLateIcon from "@material-ui/icons/AssignmentLate";
import VisibilityIcon from '@material-ui/icons/Visibility';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  tableCell: {
    fontWeight: "bold",
    backgroundColor: "#ededed",
    padding: "8px 10px",
    textTransform: "uppercase",
    cursor: "pointer",
  },
  evenRow: {
    backgroundColor: "#ffffff",
    padding: "5px 10px",
  },
  oddRow: {
    backgroundColor: "#f0f7ff",
  },
  TablethZero: {
    padding: "0 10px",
    border: "None",
  },
}));

const List = () => {
  const classes = useStyles();

  // Dummy data for the table
  const projectData = [
    { taskId: 'T123', subtaskId: 'S001', status: 'In Progress' },
    { taskId: 'T124', subtaskId: 'S002', status: 'Completed' },
    { taskId: 'T125', subtaskId: 'S003', status: 'Pending' },
  ];

  return (
    <Paper className={classes.paper}>
      {projectData.length > 0 ? (
        <div>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell
                    className={classes.tableCell}
                    align="center"
                  >
                    Title of Query
                  </TableCell>
                  <TableCell
                    className={classes.tableCell}
                    align="center"
                  >
                    Subtask Id
                  </TableCell>
                  <TableCell
                    align="left"
                    className={classes.tableCell}
                  >
                    Status
                  </TableCell>
                  <TableCell align="center" className={classes.tableCell}>
                    Queries
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {projectData.map((row, index) => (
                  <TableRow
                    key={row.taskId}
                    className={index % 2 === 0 ? classes.evenRow : classes.oddRow}
                  >
                    <TableCell align="center" className={classes.TablethZero}>
                      {row.taskId}
                    </TableCell>
                    <TableCell align="center" className={classes.TablethZero}>
                      {row.subtaskId || '-'}
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      className={classes.TablethZero}
                    >
                      {row.status}
                    </TableCell>
                    <TableCell align="center" className={classes.TablethZero}>
                    <NavLink
                            to="/layout/QueryDetails"
                            
                          >
                      <IconButton>
                        <VisibilityIcon />
                      </IconButton>
                      </NavLink>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            count={projectData.length}
            rowsPerPage={5}
            page={0}
            onPageChange={() => {}}
            onRowsPerPageChange={() => {}}
          />
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: "15px" }}>
          <AssignmentLateIcon style={{ fontSize: "80px", color: "#c4e2ff" }} />
          <Typography
            variant="h4"
            style={{ fontSize: "14px", color: "#c4e2ff" }}
          >
            No Data to display
          </Typography>
        </div>
      )}
    </Paper>
  );
};

export default List;
