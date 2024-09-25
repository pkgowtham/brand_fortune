import React from 'react';
import { Typography, Container } from  "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import GitHubIcon from '@material-ui/icons/GitHub';
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  footer: {
    padding: theme.spacing(2),
    marginTop: '10px',
    backgroundColor: theme.palette.background.paper,
    position: "fixed",
    bottom: '0px',
    textAlign: "center",
    width: '100%',
  },
  footerBt: {
    position: "fixed",
    bottom: '0px',
    textAlign: "center",
    width: '100%',
  },
  githubIcon: {
    marginLeft: theme.spacing(1),
  },
}));

function Footer() {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Container maxWidth="sm">
        <Typography variant="body1" align="center" style={{fontSize:'12px'}}>
          © {new Date().getFullYear()} Anjalishopping. All Rights Reserved.
        </Typography>
        
      </Container>
    </footer>
  );
}

export default Footer;
