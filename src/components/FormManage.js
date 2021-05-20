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

export default function FormAdd() {
  return (
    <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
      <form onSubmit={onSubmit} noValidate>
        <Paper style={{ padding: 16 }}>

          <Grid container alignItems="flex-start" spacing={2}>

            <Grid item xs={12}>
              <TextField fullWidth required name="name" type="text" label="Nome da unidade" />
            </Grid>
            
            <Grid item xs={6}>
              <TextField fullWidth required name="city" type="text" label="Cidade" />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth required name="state" type="text" label="Estado" />
            </Grid>

            <Grid item xs={12}>
              <TextField fullWidth required name="address" type="text" label="Endereço" />
            </Grid>

            <Grid item xs={6}>
              <TextField fullWidth required name="quantity" type="text" label="Quantidade de leitos" />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth required name="occupied" type="text" label="Quantidade ocupada" />
            </Grid>

            <Grid item xs={12}>
              <TextField fullWidth required name="personName" type="text" label="Nome do responsável" />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth required name="personContact" type="text" label="Contato do responsável" />
            </Grid>

            <Grid item style={{ marginTop: 16 }}>
              <Button type="button" variant="contained">Cancelar</Button>
            </Grid>
            <Grid item style={{ marginTop: 16 }}>
              <Button variant="contained" color="primary" type="submit">Adicionar</Button>
            </Grid>
          </Grid>

        </Paper>
      </form>
    </div>
  );
}
