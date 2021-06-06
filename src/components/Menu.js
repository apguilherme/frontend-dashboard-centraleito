import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Poll from '@material-ui/icons/Poll';
import Person from '@material-ui/icons/Person';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import ExitToApp from '@material-ui/icons/ExitToApp';
import HotelIcon from '@material-ui/icons/Hotel';

import DataTable from './DataTable';
import Dashboard from './Dashboard';
import Profile from './Profile';
import ManageHospital from './ManageHospital';

import api from '../api';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function MiniDrawer({ setIsAuth }) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [page, setPage] = React.useState('Dashboard');

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const validateTkn = async () => {
    const tkn = localStorage.getItem("centraleito-token");
    let response = null;
    await api.get("/verifyToken", { headers: { "x-access-token": tkn } })
    .then(res => { response = res; })
    .catch(e => { console.log(e); })
    return response;
  }

  const handleChangePage = async (value) => {
    if (value === "Sair") {
      await localStorage.removeItem("centraleito-token");
      let tkn = localStorage.getItem("centraleito-token");
      setIsAuth(tkn);
      console.log("Logout, token:", tkn);
    }
    else {
      const isValid = await validateTkn();
      if(isValid && isValid.data.valid){
        setPage(value);
      }
      else{
        alert(isValid.data.message);
      }
    };

  }

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
          <Typography variant="h6" noWrap>CentraLeito</Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>

        <Divider />

        <List>
          <ListItem button key="a" onClick={() => handleChangePage("Dashboard")}>
            <ListItemIcon><Poll /></ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>

          <ListItem button key="b" onClick={() => handleChangePage("Meus Leitos")}>
            <ListItemIcon><HotelIcon /></ListItemIcon>
            <ListItemText primary="Meus Leitos" />
          </ListItem>

          <ListItem button key="d" onClick={() => handleChangePage("Meu Hospital")}>
            <ListItemIcon><LocalHospitalIcon /></ListItemIcon>
            <ListItemText primary="Meu Hospital" />
          </ListItem>

          <ListItem button key="e" onClick={() => handleChangePage("Perfil")}>
            <ListItemIcon><Person /></ListItemIcon>
            <ListItemText primary="Perfil" />
          </ListItem>

          <Divider />
          <ListItem button key="f" onClick={() => handleChangePage("Sair")}>
            <ListItemIcon><ExitToApp /></ListItemIcon>
            <ListItemText primary="Sair" />
          </ListItem>

        </List>

      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />

        <h1>{page}</h1>

        {page === 'Meus Leitos' && <DataTable />}
        {page === 'Dashboard' && <Dashboard />}
        {page === 'Meu Hospital' && <ManageHospital />}
        {page === 'Perfil' && <Profile />}

      </main>
    </div>
  );
}
