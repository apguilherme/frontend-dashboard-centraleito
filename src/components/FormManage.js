import React from 'react';
import api from '../api';
import { TextField, Paper, Grid, Button, CircularProgress, Select, MenuItem, InputLabel } from '@material-ui/core';
import jwt from 'jsonwebtoken';

export default function FormAdd({ selectedHospital = null }) {

  const [name, setName] = React.useState("");
  const [city, setCity] = React.useState([]);
  const [selectedCity, setSelectedCity] = React.useState("");
  const [uf, setUf] = React.useState([]);
  const [selectedUf, setSelectedUf] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [num_beds, setNumBeds] = React.useState("");
  const [num_beds_occupied, setNumBedsOccupied] = React.useState("");
  const [num_waiting, setNumWaiting] = React.useState("");
  const [time_waiting, setTimeWaiting] = React.useState("");
  const [person_name, setPersonName] = React.useState("");
  const [person_contact, setPersonContact] = React.useState("");
  const [load, setLoad] = React.useState(false);

  const handleField = async (e, field) => {
    let value = e.target.value;
    switch (field) {
      case "name":
        setName(value);
        break;
      case "city":
        setSelectedCity(value);
        break;
      case "uf":
        setSelectedUf(value);
        await api.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`).then(res => {
          setCity(res.data);
        });
        break;
      case "address":
        setAddress(value);
        break;
      case "num_beds":
        setNumBeds(value);
        break;
      case "num_beds_occupied":
        setNumBedsOccupied(value);
        break;
      case "num_waiting":
        setNumWaiting(value);
        break;
      case "time_waiting":
        setTimeWaiting(value);
        break;
      case "person_name":
        setPersonName(value);
        break;
      case "person_contact":
        setPersonContact(value);
        break;
      default:
        break;
    }
  };

  React.useEffect(async () => {
    setLoad(true);
    await api.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados`).then(res => {
      let ufs = []
      res.data.map(item => { ufs.push(item.sigla) })
      setUf(ufs);
    });
    setLoad(false);
    if (selectedHospital !== null) {
      setName(selectedHospital.name);
      setSelectedCity(selectedHospital.city);
      setSelectedUf(selectedHospital.uf);
      setAddress(selectedHospital.address);
      setNumBeds(selectedHospital.num_beds);
      setNumBedsOccupied(selectedHospital.num_beds_occupied);
      setNumWaiting(selectedHospital.num_waiting);
      setTimeWaiting(selectedHospital.time_waiting);
      setPersonName(selectedHospital.person_name);
      setPersonContact(selectedHospital.person_contact);
    }
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoad(true);
    let tkn = localStorage.getItem("centraleito-token");
    let tknDecoded = jwt.decode(tkn);
    await api.post("/hospital", { ownerId: tknDecoded._id, name, city: selectedCity, uf: selectedUf, address, num_beds, num_beds_occupied, person_name, person_contact, num_waiting, time_waiting }, { headers: { "x-access-token": localStorage.getItem("contraleito-token") } })
    setLoad(false);
    alert("Submitted.")
  };

  const handleUpdate = async () => {
    setLoad(true);
    await api.put("/hospital", { id: selectedHospital._id, name, city: selectedCity, uf: selectedUf, address, num_beds, num_beds_occupied, person_name, person_contact, num_waiting, time_waiting }, { headers: { "x-access-token": localStorage.getItem("contraleito-token") } })
    setLoad(false);
    alert("Updated.")
  }

  return (
    <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>

      {
        load ? <CircularProgress color="secondary" /> :
          <form onSubmit={onSubmit} noValidate>
            <Paper style={{ padding: 16 }}>

              <Grid container alignItems="flex-start" spacing={2}>

                <Grid item xs={12}>
                  <TextField fullWidth required name="name" type="text" label="Nome da unidade" onChange={e => handleField(e, "name")} value={name} />
                </Grid>

                <Grid item xs={6}>
                  <InputLabel id="select-uf">UF</InputLabel>
                  <Select fullWidth required labelId="select-uf" name="uf" type="text" value={selectedUf} onChange={e => handleField(e, "uf")}>
                    {
                      uf?.map(item => {
                        return (<MenuItem key={item} value={item}>{item}</MenuItem>)
                      })
                    }
                  </Select>
                </Grid>
                <Grid item xs={6}>
                  <InputLabel id="select-city">Cidade</InputLabel>
                  <Select disabled={selectedUf.length === 0 || city.length === 0} fullWidth required labelId="select-city" name="city" type="text" value={selectedCity} onChange={e => handleField(e, "city")}>
                    {
                      city?.map(item => {
                        return (<MenuItem key={item.id} value={item.nome}>{item.nome}</MenuItem>)
                      })
                    }
                  </Select>
                </Grid>

                <Grid item xs={12}>
                  <TextField fullWidth required name="address" type="text" label="Endereço" onChange={e => handleField(e, "address")} value={address} />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth required name="num_beds" type="number" label="Quantidade de leitos" onChange={e => handleField(e, "num_beds")} value={num_beds} />
                </Grid>
                <Grid item xs={6}>
                  <TextField fullWidth required name="num_beds_occupied" type="number" label="Quantidade ocupada" onChange={e => handleField(e, "num_beds_occupied")} value={num_beds_occupied} />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth required name="num_waiting" type="number" label="Pacientes na fila" onChange={e => handleField(e, "num_waiting")} value={num_waiting} />
                </Grid>
                <Grid item xs={6}>
                  <TextField fullWidth required name="time_waiting" type="number" label="Tempo de espera" onChange={e => handleField(e, "time_waiting")} value={time_waiting} />
                </Grid>

                <Grid item xs={12}>
                  <TextField fullWidth required name="person_name" type="text" label="Nome do responsável" onChange={e => handleField(e, "person_name")} value={person_name} />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth required name="person_contact" type="text" label="Contato do responsável" onChange={e => handleField(e, "person_contact")} value={person_contact} />
                </Grid>

                <Grid item style={{ marginTop: 16 }}>
                  {
                    selectedHospital ?
                      <Button variant="contained" color="primary" type="button" onClick={() => handleUpdate()}>Atualizar</Button> :
                      <Button variant="contained" color="primary" type="submit">Adicionar</Button>
                  }
                </Grid>
              </Grid>

            </Paper>
          </form>
      }

    </div>
  );
}
