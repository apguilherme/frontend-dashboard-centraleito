import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Button, Dialog, AppBar, Toolbar, IconButton, Typography, Slide} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import FormManage from '../components/FormManage';
import api from '../api';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({showModal, setShowModal, selectedHospital}) {
  const classes = useStyles();

  const handleClickOpen = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleRemove = async () => {
    await api.delete("/hospital", { data: {id: selectedHospital._id} }, { headers: { "x-access-token": localStorage.getItem("contraleito-token") } })
    .then(res => {
        alert("Removed.");
    })
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open full-screen dialog
      </Button>
      <Dialog fullScreen open={showModal} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Atualização de dados
            </Typography>
            <Button autoFocus color="inherit" onClick={handleRemove}>
              Remover
            </Button>
          </Toolbar>
        </AppBar>
        <FormManage selectedHospital={selectedHospital} />
      </Dialog>
    </div>
  );
}
