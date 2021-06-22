import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

export default function CenteredTabs({tab, setTab}) {
  const classes = useStyles();

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <Paper className={classes.root}>
      <Tabs
        value={tab}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Login" />
        <Tab label="Cadastro" />
        <Tab label="Hospitais" />
      </Tabs>
    </Paper>
  );
}
