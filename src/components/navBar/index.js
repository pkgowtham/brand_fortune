import React, { useEffect } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { NavLink, useNavigate } from "react-router-dom";
import CardMedia from "@material-ui/core/CardMedia";
import DashboardIcon from "@material-ui/icons/Dashboard";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DeviceHubIcon from "@material-ui/icons/DeviceHub";
import RegionIcon from "@material-ui/icons/Public";
import TagIcon from "@material-ui/icons/LocalOffer";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import ProductIcon from "@material-ui/icons/ShoppingCart";
import CustomerIcon from "@material-ui/icons/People";
import OffersIcon from "@material-ui/icons/LocalOffer";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
// import AnjaliNavLogo from '../../Admin-Side-Nav-Logo180x60.png';
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useDispatch, useSelector } from "react-redux";
import { initialStateLogin } from "../../service/auth/action";
import EcoIcon from "@material-ui/icons/Eco";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import { Badge, Menu, MenuItem, Avatar } from "@material-ui/core";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ImageIcon from "@material-ui/icons/Image";
import WorkIcon from "@material-ui/icons/Work";
import PersonIcon from "@material-ui/icons/Person";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";
import { filterDataProject } from "../../service/internal/action";
// import {axio} from "../../axios/index.js"
import axios from "axios";
import dayjs from "dayjs";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,

    flexShrink: 0,
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between", // Adjust to space-between to move items to edges
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  logo: {
    maxWidth: "100%",
    height: "auto",
    marginBottom: theme.spacing(2),
  },
  listItem: {
    "&:hover": {
      backgroundColor: "#dfefff",
      color: "#000",
    },
  },
  anyLink: {
    color: "#000",
    cursor: "pointer",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "none",
    },
  },
  logoImage: {
    cursor: "pointer",
  },
  sideNav: {
    backgroundColor: "#f9c02829",
  },
  logoutButton: {
    marginLeft: "auto",
  },
  drawerPaper: {
    backgroundColor: "#f4f9fd", // Set the background color to red
  },
  badge: {
    right: 20,
    top: 2,
    padding: "0 3px",
  },
  notification: {
    width: "100%",
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
  },
}));

export default function NavBar() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [roleMenu, setRoleMenu] = React.useState(null);
  const [initialData, setInitialData] = React.useState(null);

  const auth = useSelector((state) => state.auth);

  const res = async () => {
    const token = localStorage.getItem("accessToken");
    await axios
      .get("http://3.108.100.249/api/v1/notification/getlist", {
        headers: {
          Authorization: token ? `Bearer ${token}` : null,
        },
      })
      .then((data) => {
        console.log("data", data);
        setInitialData(data.data.payload);
      })
      .catch((err) => {
        console.log("ERR", err);
      });
  };

  useEffect(() => {
    console.log("im running");
    res();
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleLogout = () => {
    dispatch(initialStateLogin());
    navigate("/login");
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCloseRoleMenu = () => {
    setRoleMenu(null);
  };
  const roleMenuOpen = (event) => {
    event.stopPropagation();
    setRoleMenu(event.currentTarget);
  };
  const changeRole = (e, role) => {
    e.stopPropagation();
    dispatch(filterDataProject({ role: role }));
    setRoleMenu(null);
  };

  const navLinks = auth?.payloadLogin?.payload?.data?.user?.role.includes(
    "MANAGEMENT"
  )
    ? [
        { label: "Dashboard", route: "Dashboard", icon: <DashboardIcon /> },
        {
          label: "Information Sheet",
          route: "infosheet",
          icon: <AccountTreeIcon />,
        },
        {
          label: "Employee",
          route: "employee",
          icon: <PersonIcon />,
        },
        // { text: "Category", icon: <AccountTreeIcon /> },
        // { text: "Subcategory", icon: <DeviceHubIcon /> },
        // { text: "Region", icon: <RegionIcon /> },
        // { text: "Tag", icon: <TagIcon /> },
        // { text: "Product", icon: <ProductIcon /> },
        // { text: "Brand", icon: <EcoIcon /> },
        // { text: "Customer", icon: <CustomerIcon /> },
        // { text: "Orders", icon: <ShoppingBasketIcon /> },
        // { text: "Offers", icon: <CardGiftcardIcon /> },
      ]
    : [
        { label: "Dashboard", route: "Dashboard", icon: <DashboardIcon /> },
        {
          label: "Information Sheet",
          route: "infosheet",
          icon: <AccountTreeIcon />,
        },
      ];

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <NavLink
            to={"/layout/dashboard"}
            className={classes.anyLink}
            style={{ color: "#fff" }}
          >
            <Typography variant="h6" noWrap>
              Brand Fortunes
            </Typography>
          </NavLink>
          <div className={classes.logoutButton}>
            <Badge
              badgeContent={initialData?.data.length}
              color="secondary"
              className={classes.badge}
            >
              <IconButton
                style={{ color: "white", padding: "5px " }}
                aria-controls="simple-menu"
                onClick={handleClick}
              >
                <NotificationsActiveIcon />
              </IconButton>
            </Badge>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              style={{ top: "40px" }}
            >
              <div style={{ width: "300px" }} onClick={handleClick}>
                <Typography
                  variant="h6"
                  style={{ margin: "6px 0 0 20px" }}
                  noWrap
                >
                  Notification
                </Typography>
                <List
                  className={classes.notification}
                  style={{ margin: "0px 0 0 0px" }}
                >
                  {initialData?.data.map((data) => {
                    return (
                      <NavLink to={"/"} style={{ textDecoration: "none" }}>
                        <div>
                          <ListItem>
                            <ListItemAvatar>
                              <Avatar>
                                N{/* <img src={data.avatar} /> */}
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              style={{ padding: "6px" }}
                              primary={data.message}
                              secondary={dayjs(data.createdAt).format(
                                "MMMM D, YYYY h:mm A"
                              )}
                            />
                          </ListItem>
                          <Divider variant="inset" component="li" />
                        </div>
                      </NavLink>
                    );
                  })}
                </List>
              </div>
            </Menu>
            <IconButton onClick={roleMenuOpen} color="inherit">
              <AssignmentIndIcon />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={roleMenu}
              keepMounted
              open={Boolean(roleMenu)}
              onClose={handleCloseRoleMenu}
              style={{ top: "40px" }}
            >
              <div style={{ width: "300px" }}>
                <Typography
                  variant="h6"
                  style={{ margin: "6px 0 0 20px" }}
                  noWrap
                >
                  Roles
                </Typography>
                <List
                  className={classes.notification}
                  style={{ margin: "0px 0 0 0px" }}
                >
                  {auth?.payloadLogin?.payload?.data?.user?.role.map((data) => {
                    return (
                      <div
                        style={{ cursor: "pointer" }}
                        onClick={(e) => changeRole(e, data)}
                      >
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar>R</Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            style={{ padding: "6px" }}
                            primary={data}
                            // secondary={data}
                          />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                      </div>
                    );
                  })}
                </List>
              </div>
            </Menu>
            <IconButton
              onClick={handleLogout}
              aria-label="logout"
              color="inherit"
            >
              <ExitToAppIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx(classes.drawerPaper, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <NavLink to={"/layout/dashboard"}>
            {/* <CardMedia
            component="img"
            alt="Anjali Olis"
            image="https://anjalishopping.com/img/prestashop-logo-1630916990.jpg"
            className={classes.logo}
          /> */}
            {/* <img src={AnjaliNavLogo} alt="Logo" className={classes.logo} /> */}
          </NavLink>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {navLinks.map((link) => (
            <NavLink
              to={`/layout/${link.route.toLowerCase()}`}
              className={classes.anyLink}
              key={link.label}
            >
              <ListItem button className={classes.listItem}>
                <ListItemIcon>{link.icon}</ListItemIcon>
                <ListItemText primary={link.label} />
              </ListItem>
            </NavLink>
          ))}
        </List>
      </Drawer>
    </div>
  );
}
