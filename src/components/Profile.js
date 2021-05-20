import React from 'react';
import { TextField, Paper, Grid, Button } from '@material-ui/core';

const onSubmit = async values => {
  alert("Ok");
};
const validate = values => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = 'Required';
  }
  if (!values.lastName) {
    errors.lastName = 'Required';
  }
  if (!values.email) {
    errors.email = 'Required';
  }
  return errors;
};

export default function Profile() {
  return (
    <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
      <form onSubmit={onSubmit} noValidate>
        <Paper style={{ padding: 16 }}>

          <Grid container alignItems="flex-start" spacing={2}>

            <Grid item xs={12}>
              <TextField fullWidth required name="name" type="text" label="Nome do usuário" />
            </Grid>
            
            <Grid item xs={12}>
              <TextField fullWidth required name="email" type="text" label="Email do usuário" />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth required name="password" type="text" label="Senha do usuário" />
            </Grid>

            <Grid item style={{ marginTop: 16 }}>
              <Button type="button" variant="contained">Cancelar</Button>
            </Grid>
            <Grid item style={{ marginTop: 16 }}>
              <Button variant="contained" color="primary" type="submit">Atualizar</Button>
            </Grid>
          </Grid>

        </Paper>
      </form>
    </div>
  );
}
