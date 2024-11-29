import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { enqueueSnackbar } from "notistack";

import AssignmentLateIcon from "@material-ui/icons/AssignmentLate";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import VisibilityIcon from "@material-ui/icons/Visibility";
import AddCommentIcon from "@material-ui/icons/AddComment";
import { axio } from "../../../axios";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import {
  Paper,
  Button,
  IconButton,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Backdrop,
  CircularProgress,
  Collapse,
  Box,
} from "@material-ui/core";

import {
  deleteProject,
  getListProject,
  initialStateDeleteProject,
  initialStateGetListProject,
} from "../../../service/project/action";
import { INTERNAL } from "../../../constant/internal";
import { filterDataProject } from "../../../service/internal/action";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  tableCell: {
    fontWeight: "bold",
    backgroundColor: "#ededed",
    padding: "8px 10px",
    textTransform: "uppercase",
    cursor: "pointer", // Add cursor pointer for clickable headers
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
  countBadge: {
    position: "absolute",
    top: 0, // Adjust to align the badge properly
    right: 4, // Adjust to align the badge properly
    padding: "2px 6px", // Padding inside the badge
    fontSize: "12px", // Font size of the count number
    backgroundColor: "#808080", // Gray background color
    color: "white", // White text color
    borderRadius: "12px", // Circular badge
    fontWeight: "bold", // Make the count bold
    minWidth: "16px", // Ensure the badge has a minimum width
    textAlign: "center", // Center the text
    lineHeight: "16px", // Center the text vertically
  },
  redDot: {
    color: "red",
  },
  greenDot: {
    color: "green",
  },
}));

const initialOrderBy = "id";
const initialOrder = "asc";

export default function List() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth);
  const project = useSelector((store) => store.project);
  const internal = useSelector((store) => store.internal);

  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [open, setOpen] = useState(false);
  const [orderBy, setOrderBy] = useState("createdAt");
  const [order, setOrder] = useState("dec");
  const [selectedRow, setSelectedRow] = useState(null);
  const [deleterows, setDeleterows] = React.useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const getProjectDispatchFunc = (
    offset = INTERNAL.DEFAULT_INITIAL_PAGE_AFTER_SIDE_EFFECTS,
    pageSize = INTERNAL.DEFAULT_ITEMS_PER_PAGE_TABLE_VIEW
  ) => {
    dispatch(
      getListProject({
        role: auth?.payloadLogin?.payload?.data?.user?.role[0],
        currentPage: offset,
        itemsPerPage: pageSize,
        ...internal.filterDataProject,
      })
    );
  };

  useEffect(() => {
    dispatch(filterDataProject({}));
  }, []);

  useEffect(() => {
    getProjectDispatchFunc();
  }, [internal.filterDataProject, orderBy, order]);

  useEffect(() => {
    if (project.isLoadingGet) {
      setOpenBackdrop(true);
    } else {
      setOpenBackdrop(false);
    }
  }, [project.isLoadingGet]);

  useEffect(() => {
    if (project.isSuccessGet) {
      setOpenBackdrop(false);
    }
  }, [project.isSuccessGet]);

  useEffect(() => {
    if (project.isErrorGet) {
      setOpenBackdrop(false);
      enqueueSnackbar("Something went wrong. Please reload again.", {
        variant: "error",
      });
      dispatch(initialStateGetListProject());
    }
  }, [project.isErrorGet]);

  const emptyRows =
    rowsPerPage -
    Math.min(
      rowsPerPage,
      project?.payloadGetList?.payload?.data?.length - page * rowsPerPage
    );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    getProjectDispatchFunc(newPage, Number(rowsPerPage));
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    getProjectDispatchFunc(
      INTERNAL.DEFAULT_INITIAL_PAGE_AFTER_SIDE_EFFECTS,
      parseInt(event.target.value, 10)
    );
  };

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortData = (a, b) => {
    if (order === "asc") {
      return a[orderBy] > b[orderBy] ? 1 : -1;
    } else {
      return a[orderBy] < b[orderBy] ? 1 : -1;
    }
  };

  const initialTableData = async () => {
    console.log("initialTableData", deleterows);
    const token = localStorage.getItem("accessToken");

    await axio
      .get("/user/getlist", {
        headers: {
          Authorization: token ? `Bearer ${token}` : null,
        },
      })
      .then((tableresponse) => {
        console.log("tableresponse", tableresponse.data.payload.data);
        setDeleterows(tableresponse.data.payload.data);
      })
      .catch((err) => {
        console.log("tableERR", err);
      });
  };

  useEffect(() => {
    console.log("tableruning");
    initialTableData();
  }, []);

  const getStatusLabel = (status) => {
    switch (status) {
      case 'LEAD_ONE':
        return 'Task created';
      case 'CURATOR':
        return 'Assigned for Curation';
      case 'LEAD_TWO':
        return 'Assigned for submission';
      case 'EXECUTIVE_LISTING':
        return 'Submission executive Listing Submitted';
      case 'EXECUTIVE_SKU':
        return 'Submission executive SKU created';
      case 'ANALYSIS_DISCOUNT_DEPRESSION':
        return 'Assigned for Inventory Discount-depression';
      case 'ANALYSIS_SYN_DEPRESSION':
        return 'Assigned for Inventory Sync-depression';
      case 'ANALYSIS_UPLOAD_DEPRESSION':
        return 'Assigned for Inventory upload-depression';
      case 'LIVE_CHECK_DEPRESSION':
        return 'Assigned for Live check-depression';
      case 'ANALYSIS_DISCOUNT':
        return 'Assigned for Inventory Discount';
      case 'ANALYSIS_SYN':
        return 'Assigned for Inventory Sync';
      case 'ANALYSIS_UPLOAD':
        return 'Assigned for Inventory upload';
      case 'APPROVAL_WAITING':
        return 'Waiting for approval';
      case 'LIVE_CHECK':
        return 'Assigned for Live check';
      case 'COMPLETED':
        return 'Completed';
      default:
        return 'Unknown';
    }
  };


  const marketplaceData = [
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
  
  // Helper function to get label by value
  const getLabelByValue = (value) => {
    const marketplace = marketplaceData.find(item => item.value === value);
    return marketplace ? marketplace.label : value; // If no match, return the value as a fallback
  };
  

  return (
    <Paper className={classes.paper}>
      {project?.payloadGetList?.payload?.data?.length > 0 ? (
        <div>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell
                    className={classes.tableCell}
                    align="center"
                    style={{ minWidth: "43px" }}
                    onClick={() => handleSort("mailSubject")}
                  >
                    Task Id{" "}
                    {orderBy === "mailSubject" && (
                      <span>{order === "asc" ? "▲" : "▼"}</span>
                    )}
                  </TableCell>
                  <TableCell
                    className={classes.tableCell}
                    align="center"
                    style={{ minWidth: "43px" }}
                    onClick={() => handleSort("mailSubject")}
                  >
                    Subtask Id{" "}
                    {orderBy === "mailSubject" && (
                      <span>{order === "asc" ? "▲" : "▼"}</span>
                    )}
                  </TableCell>
                  <TableCell
                    className={classes.tableCell}
                    align="center"
                    style={{ minWidth: "43px" }}
                    onClick={() => handleSort("mailSubject")}
                  >
                    Market Place{" "}
                    {orderBy === "mailSubject" && (
                      <span>{order === "asc" ? "▲" : "▼"}</span>
                    )}
                  </TableCell>
                  <TableCell
                    align="left"
                    className={classes.tableCell}
                    style={{ minWidth: "95px" }}
                    onClick={() => handleSort("brand")}
                  >
                    Gender{" "}
                    {orderBy === "brand" && (
                      <span>{order === "asc" ? "▲" : "▼"}</span>
                    )}
                  </TableCell>
                  <TableCell
                    align="left"
                    className={classes.tableCell}
                    onClick={() => handleSort("articleType")}
                  >
                    Brand{" "}
                    {orderBy === "articleType" && (
                      <span>{order === "asc" ? "▲" : "▼"}</span>
                    )}
                  </TableCell>
                  <TableCell
                    align="left"
                    className={classes.tableCell}
                    onClick={() => handleSort("listingType")}
                  >
                    Article Type{" "}
                    {orderBy === "listingType" && (
                      <span>{order === "asc" ? "▲" : "▼"}</span>
                    )}
                  </TableCell>
                  <TableCell
                    align="left"
                    className={classes.tableCell}
                    onClick={() => handleSort("informationType")}
                  >
                    Listing Type{" "}
                    {orderBy === "informationType" && (
                      <span>{order === "asc" ? "▲" : "▼"}</span>
                    )}
                  </TableCell>
                  <TableCell
                    align="left"
                    className={classes.tableCell}
                    onClick={() => handleSort("proirity")}
                  >
                    Information Type{" "}
                    {orderBy === "proirity" && (
                      <span>{order === "asc" ? "▲" : "▼"}</span>
                    )}
                  </TableCell>
                  <TableCell
                    align="left"
                    className={classes.tableCell}
                    onClick={() => handleSort("status")}
                  >
                    Proirity{" "}
                    {orderBy === "status" && (
                      <span>{order === "asc" ? "▲" : "▼"}</span>
                    )}
                  </TableCell>
                  <TableCell
                    align="left"
                    className={classes.tableCell}
                    onClick={() => handleSort("currentAssignee")}
                  >
                    Status{" "}
                    {orderBy === "currentAssignee" && (
                      <span>{order === "asc" ? "▲" : "▼"}</span>
                    )}
                  </TableCell>
                  <TableCell align="center" className={classes.tableCell}>
                    Queries
                  </TableCell>
                  <TableCell align="center" className={classes.tableCell}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {project?.payloadGetList?.payload?.data
                  .sort(sortData)
                  .map((row, index) => (
                    <>
                      <TableRow
                        key={row._id}
                        className={
                          index % 2 === 0 ? classes.evenRow : classes.oddRow
                        }
                      >
                        <TableCell
                          align="center"
                          className={classes.TablethZero}
                        >
                          {row.taskId}
                        </TableCell>
                        <TableCell
                          align="center"
                          className={classes.TablethZero}
                        >
                          {row.subtaskId ? row.subtaskId : "-"}
                        </TableCell>
                        {/* {row.marketPlaceSingle ? (
                          <TableCell
                            align="center"
                            className={classes.TablethZero}
                          >
                            {row.marketPlaceSingle}
                          </TableCell>
                        ) : (
                          <TableCell
                            align="center"
                            className={classes.TablethZero}
                          >
                            {row?.marketPlace?.join()}
                          </TableCell>
                        )} */}
                        <TableCell align="center" className={classes.TablethZero}>
  {row.marketPlaceSingle ? (
    <>{getLabelByValue(row.marketPlaceSingle)}</>
  ) : (
    <>
      {row?.marketPlace?.map(value => getLabelByValue(value)).join(', ')}
    </>
  )}
</TableCell>

                        <TableCell
                          component="th"
                          scope="row"
                          className={classes.TablethZero}
                        >
                          {row.gender}
                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          className={classes.TablethZero}
                        >
                          {row.brand?.label}
                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          className={classes.TablethZero}
                        >
                          {row.articleType?.label}
                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          className={classes.TablethZero}
                        >
                          {row.listingType}
                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          className={classes.TablethZero}
                        >
                          {row.informationType}
                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          className={classes.TablethZero}
                        >
                          {row.proirity}
                        </TableCell>
                        <TableCell
                          align="left"
                          className={classes.TablethZero}
                        >
                        {getStatusLabel(row.status)}
                        </TableCell>
                        <TableCell
                          align="center"
                          className={classes.TablethZero}
                        >
                          <IconButton>
                            {/* Conditional rendering */}
                            {row.query ? (
                              <FiberManualRecordIcon
                                className={classes.redDot}
                              />
                            ) : (
                              <FiberManualRecordIcon
                                className={classes.greenDot}
                              />
                            )}
                          </IconButton>

                          {/* Add Comment Button */}
                          <NavLink
                            to="/layout/QueriesCreate"
                            state={{ _id: row._id }}
                          >
                            <IconButton>
                              <AddCommentIcon />
                            </IconButton>
                          </NavLink>

                          {/* View Details Button */}
                          <NavLink
                            to="/layout/queries"
                            state={{ _id: row._id }}
                          >
                            <IconButton style={{ position: "relative" }}>
                              <VisibilityIcon />
                              {/* Count Badge */}
                            </IconButton>
                          </NavLink>

                          {/* Row Status */}
                          <Typography
                            style={{ fontSize: "12px", marginBottom: 10 }}
                          >
                            Hold with{" "}
                            {
                              deleterows?.find(
                                (user) =>
                                  user._id ==
                                  (row.accountManager?.dep?.userName ||
                                    row.leadOne?.dep?.userName ||
                                    row.curator?.dep?.userName ||
                                    row.leadTwo?.dep?.userName ||
                                    row.submissionExecutiveListing?.dep
                                      ?.userName ||
                                    row.submissionExecutiveSku?.dep?.userName ||
                                    row.submissionExecutiveReview?.dep
                                      ?.userName ||
                                    row.analysisExecutiveDiscount?.dep
                                      ?.userName ||
                                    row.analysisExecutiveSyn?.dep?.userName ||
                                    row.analysisExecutiveUpload?.dep
                                      ?.userName ||
                                    row.analysisExecutiveLiveCheck?.dep
                                      ?.userName)
                              )?.firstName
                            }
                          </Typography>
                        </TableCell>

                        <TableCell
                          align="center"
                          className={classes.TablethZero}
                        >
                          <NavLink
                            to="/layout/create"
                            state={{ type: "EDIT", data: { ...row } }}
                          >
                            <IconButton>
                              <EditIcon />
                            </IconButton>
                          </NavLink>
                          {
                            <NavLink
                              to="/layout/comment"
                              state={{ _id: row._id }}
                            >
                              <IconButton>
                                <QueryBuilderIcon />
                              </IconButton>
                            </NavLink>
                          }
                        </TableCell>
                      </TableRow>
                    </>
                  ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 1 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[1, 5, 10, 25]}
            colSpan={3}
            component="div"
            count={project?.payloadGetList?.payload?.meta?.totalCount}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
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
      <Backdrop className={classes.backdrop} open={openBackdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Paper>
  );
}


