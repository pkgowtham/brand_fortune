import * as React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  Card,
  Container,
  TextField,
  Typography,
  makeStyles,
  FormControl,
  InputLabel,
 Select,
 } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { loginUser } from "../../service/auth/action";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: theme.spacing(1),
  },
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: 'center',    
    alignItems: "flex-start",
    // margin: "auto",
  },
  form: {
    display: "flex",
    flexDirection: "row",
    justifyContent: 'flex-start',
    alignItems: "center",
    flexWrap:'wrap'
  },
  textField: {
    minWidth: 200,
    margin: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  Typography:{
    margin:theme.spacing(1)
  },
  add:{
    marginLeft:'auto',
    marginRight:theme.spacing(1)
  }
}));

export default function Filter({props}) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const formik = useFormik({
    initialValues: {
      name: "",
      status: "",
      display:"",
    },
     onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      dispatch(loginUser(values));
    },
  });
  return (
    <Container fixed className={classes.container}>
      <Card className={classes.card}>
        <Typography className={classes.Typography} variant="h5">Search</Typography>
        <form className={classes.form} onSubmit={formik.handleSubmit}>
          <TextField
            className={classes.textField}
            id="name"
            label="name"
            variant="outlined"
            helperText={
              formik.errors.name &&
              formik.touched.name &&
              String(formik.errors.name)
            }
            error={Boolean(formik.errors.name && formik.touched.name)}
            {...formik.getFieldProps("name")}
          />

          <FormControl  variant="outlined" className={classes.formControl}>
            <InputLabel  htmlFor="age-native-simple">Status</InputLabel>
            <Select
              id="status"
              native
              {...formik.getFieldProps("status")}
            >
              <option aria-label="All" value="" />
              <option value={1}>Active</option>
              <option value={0}>Inactive</option>              
            </Select>
          </FormControl>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel htmlFor="age-native-simple">Display</InputLabel>
            <Select
              id="display"
              native
              {...formik.getFieldProps("display")}
            >
              <option aria-label="All" value="" />
              <option value={1}>Active</option>
              <option value={0}>Inactive</option>              
            </Select>
          </FormControl>
          
            <Button
              className={classes.textField}
              variant="contained"
              color="primary"
              type="submit"
            >
              submit
            </Button>
         
          <NavLink to={'/layout/dialog?type=ADD'}>
          <Button
              className={classes.add}
              variant="contained"
              color="primary"
              type="submit"
              
            >
              Add
            </Button>
            </NavLink>
        </form>
      </Card>
    </Container>
  );
}
