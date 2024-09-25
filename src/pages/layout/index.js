import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../../components/navBar'
import Footer from '../../components/footer'
import { alpha, makeStyles, useTheme } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      marginTop: '50px'
    },
  }));

function Layout() {
    const classes = useStyles();

    return (
        <div>
            <div className={classes.root}>
                <NavBar />
                <main className={classes.content}>
                    <Outlet />
                   
                </main>
                {/* <Footer /> */}
            </div>
        </div>
    )
}

export default Layout