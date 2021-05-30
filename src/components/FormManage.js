import React from 'react';
import api from '../api';
import { TextField, Paper, Grid, Button, CircularProgress } from '@material-ui/core';

export default function FormAdd() {

  const [name, setName] = React.useState("");
  const [city, setCity] = React.useState("");
  const [uf, setUf] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [num_beds, setNumBeds] = React.useState("");
  const [num_beds_occupied, setNumBedsOccupied] = React.useState("");
  const [person_name, setPersonName] = React.useState("");
  const [person_contact, setPersonContact] = React.useState("");
  const [load, setLoad] = React.useState(false);

  const handleField = (e, field) => {
    let value = e.target.value;
    switch (field) {
      case "name":
        setName(value);
        break;
      case "city":
        setCity(value);
        break;
      case "uf":
        setUf(value);
        break;
      case "address":
        setAddress(value)
        break;
      case "num_beds":
        setNumBeds(value)
        break;
      case "num_beds_occupied":
        setNumBedsOccupied(value)
        break;
      case "person_name":
        setPersonName(value)
        break;
      case "person_contact":
        setPersonContact(value)
        break;
      default:
        break;
    }
  };

  React.useEffect(() => {
    setLoad(true);
    api.get("http://localhost:3333/hospital/60a5e00b77f2684b98bd3692", {headers: {"x-access-token": localStorage.getItem("contraleito-token")}})
      .then(res => {
        setName(res.data?.name);
        setCity(res.data?.city);
        setUf(res.data?.uf);
        setAddress(res.data?.address);
        setNumBeds(res.data?.num_beds);
        setNumBedsOccupied(res.data?.num_beds_occupied);
        setPersonName(res.data?.person_name);
        setPersonContact(res.data?.person_contact);
        setLoad(false);
      });
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoad(true);
    api.post("/hospital", { name, city, uf, address, num_beds, num_beds_occupied, person_name, person_contact }, {headers: {"x-access-token": localStorage.getItem("contraleito-token")}})
      .then(res => {
        setLoad(false);
      });
  };

  return (
    <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>

      {
        load ? <CircularProgress color="secondary" /> :
          <form onSubmit={onSubmit} noValidate>
            <Paper style={{ padding: 16 }}>

              <Grid container alignItems="flex-start" spacing={2}>

                <Grid item xs={12}>
                  <TextField fullWidth required name="name" type="text" label="Nome da unidade" onChange={e => handleField(e, "name")} />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth required name="city" type="text" label="Cidade" onChange={e => handleField(e, "city")} />
                </Grid>
                <Grid item xs={6}>
                  <TextField fullWidth required name="uf" type="text" label="UF" onChange={e => handleField(e, "uf")} />
                </Grid>

                <Grid item xs={12}>
                  <TextField fullWidth required name="address" type="text" label="Endereço" onChange={e => handleField(e, "address")} />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth required name="num_beds" type="text" label="Quantidade de leitos" onChange={e => handleField(e, "num_beds")} />
                </Grid>
                <Grid item xs={6}>
                  <TextField fullWidth required name="num_beds_occupied" type="text" label="Quantidade ocupada" onChange={e => handleField(e, "num_beds_occupied")} />
                </Grid>

                <Grid item xs={12}>
                  <TextField fullWidth required name="person_name" type="text" label="Nome do responsável" onChange={e => handleField(e, "person_name")} />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth required name="person_contact" type="text" label="Contato do responsável" onChange={e => handleField(e, "person_contact")} />
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
      }

    </div>
  );
}
