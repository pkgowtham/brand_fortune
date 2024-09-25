import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Card,
  CardMedia,
  Container,
  TextField,
  Typography,
  makeStyles,
  Backdrop,
  IconButton,
  InputAdornment,
  CircularProgress,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../service/auth/action';
import { NavLink, useNavigate } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import loginLogo from '../../asserts/loginLogo.png';
import loginBg from '../../asserts/loginBg.jpg';

const useStyles = makeStyles((theme) => ({
  container: {
    margin: 30,
  },
  card: {
    padding: '30px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto',
    maxWidth: '310px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  textField: {
    minWidth: 300,
    margin: '20px',
  },
  MuiContainerBox: {
    backgroundImage:
      `url(${loginBg})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    width: '100%',
    margin: 0,
    maxWidth: 'none',
    padding: '46.4px',
    height: ' 100vh',
    display: 'flex',
  },
  MuiInputLabelOutlined: {
    zIndex: 1,
    transform: 'translate(14px, 15px) scale(1)',
    pointerEvents: 'none',
  },
  makeStylesTextField4: {
    margin: '12px',
    minWidth: '300px',
  },
  LogoImage: {
    maxWidth: '277px',
    padding: '10px 0',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const [openBackdrop, setOpenBackdrop] = React.useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    if (auth.payloadLogin?.payload?.data?.accessToken && auth.isSuccessLogin) {
      setOpenBackdrop(false);
      localStorage.setItem('accessToken', auth.payloadLogin?.payload?.data?.accessToken);
      navigate('/layout/dashboard');
    }
  }, [auth.payloadLogin?.payload?.data?.accessToken, auth.isSuccessLogin]);

  useEffect(() => {
    if (auth.isLoadingLogin) {
      setOpenBackdrop(true);
    }
  }, [auth.isLoadingLogin]);

  useEffect(() => {
    if (auth.isErrorLogin) {
      setOpenBackdrop(false);
      // enqueueSnackbar("", {
      //   variant: "error",
      // });
    }
  }, [auth.isErrorLogin]);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: (values) => {
      let finalValues ={
        email:values.username,
        password:values.password,
      }
      // alert(JSON.stringify(values, null, 2));
      dispatch(loginUser(finalValues));
    },
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Container fixed className={classes.MuiContainerBox}>
      <Card className={classes.card}>       
        <img src={loginLogo} alt="Logo" className={classes.LogoImage} />

        <Typography variant="p">Please Login to your account</Typography>
        <form className={classes.form} onSubmit={formik.handleSubmit}>
          <TextField
            className={(classes.textField, classes.makeStylesTextField4)}
            id="username"
            label="Username"
            variant="outlined"
            helperText={
              formik.errors.username &&
              formik.touched.username &&
              String(formik.errors.username)
            }
            error={Boolean(formik.errors.username && formik.touched.username)}
            {...formik.getFieldProps('username')}
          />
          <TextField
            className={(classes.textField, classes.makeStylesTextField4)}
            id="password"
            label="Password"
            variant="outlined"
            type={showPassword ? 'text' : 'password'}
            helperText={formik.touched.password ? formik.errors.password : ''}
            error={Boolean(formik.errors.password && formik.touched.password)}
            {...formik.getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {auth.isErrorLogin ? (
            <Typography
              variant="h6"
              style={{ fontSize: 13, color: 'red', textAlign: 'center' }}
            >
              Please check the username and password!
            </Typography>
          ) : null}

          <Button
            className={classes.textField}
            variant="contained"
            color="primary"
            disabled={formik.isValid ? false : true}
            type="submit"
          >
            Login
          </Button>
        </form>
        <footer className={classes.footer}>
          <Container maxWidth="sm">
            <Typography
              variant="body1"
              align="center"
              style={{ fontSize: '12px' }}
            >
              © {new Date().getFullYear()} Brand Fortunes. All Rights Reserved.
            </Typography>
          </Container>
        </footer>
      </Card>

      <Backdrop className={classes.backdrop} open={openBackdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
}
