import React from 'react';
import api from '../api';
import { TextField, Paper, Grid, Button, CircularProgress, Select, MenuItem, InputLabel } from '@material-ui/core';
import jwt from 'jsonwebtoken';

export default function FormAdd() {

  const [hospId, setHospId] = React.useState("");
  const [name, setName] = React.useState("");
  const [city, setCity] = React.useState("");
  const [uf, setUf] = React.useState(["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"]);
  const [selectedUf, setSelectedUf] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [num_waiting, setNumWaiting] = React.useState("");
  const [time_waiting, setTimeWaiting] = React.useState("");
  const [person_name, setPersonName] = React.useState("");
  const [person_contact, setPersonContact] = React.useState("");
  const [load, setLoad] = React.useState(false);
  const [hasHospital, setHasHospital] = React.useState(false);

  React.useEffect(async () => {
    setLoad(true);
    api.get("/hospitals", { headers: { "x-access-token": localStorage.getItem("contraleito-token") } })
      .then(res => {
        if (res.data.length > 0) {
          let data = res.data[0];
          setHospId(data._id);
          setName(data.name);
          setCity(data.city);
          setSelectedUf(data.uf);
          setAddress(data.address);
          setNumWaiting(data.num_waiting);
          setTimeWaiting(data.time_waiting);
          setPersonName(data.person_name);
          setPersonContact(data.person_contact);
          setHasHospital(true);
        }
        else {
          setHasHospital(false);
        }

      });
    setLoad(false);
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoad(true);
    let tkn = localStorage.getItem("centraleito-token");
    let tknDecoded = jwt.decode(tkn);
    await api.post("/hospital", { ownerId: tknDecoded._id, name, city, uf: selectedUf, address, person_name, person_contact, num_waiting, time_waiting }, { headers: { "x-access-token": localStorage.getItem("contraleito-token") } });
    setHasHospital(true);
    setLoad(false);
    alert("Submitted.")
  };

  const handleField = async (e, field) => {
    let value = e.target.value;
    switch (field) {
      case "name":
        setName(value);
        break;
      case "city":
        setCity(value);
        break;
      case "uf":
        setSelectedUf(value);
        break;
      case "address":
        setAddress(value);
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

  const handleUpdate = async () => {
    setLoad(true);
    let payload = { id: hospId, name, city, uf: selectedUf, address, person_name, person_contact, num_waiting, time_waiting };
    await api.put("/hospital", payload, { headers: { "x-access-token": localStorage.getItem("contraleito-token") } })
    setLoad(false);
    alert("Updated.")
  };

  const handleRemove = async () => {
    await api.delete("/hospital", { data: { id: hospId } }, { headers: { "x-access-token": localStorage.getItem("contraleito-token") } })
      .then(res => {
        setHospId("");
        setName("");
        setCity("");
        setSelectedUf("");
        setAddress("");
        setNumWaiting("");
        setTimeWaiting("");
        setPersonName("");
        setPersonContact("");
        setHasHospital(false);
        alert("Removed.");
      })
  };

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
                  <TextField fullWidth required name="city" type="text" label="Cidade" onChange={e => handleField(e, "city")} value={city} />
                </Grid>

                <Grid item xs={12}>
                  <TextField fullWidth required name="address" type="text" label="Endereço" onChange={e => handleField(e, "address")} value={address} />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth required name="num_waiting" type="number" label="Pacientes na fila" onChange={e => handleField(e, "num_waiting")} value={num_waiting} />
                </Grid>
                <Grid item xs={6}>
                  <TextField fullWidth required name="time_waiting" type="number" label="Tempo de espera (dias)" onChange={e => handleField(e, "time_waiting")} value={time_waiting} />
                </Grid>

                <Grid item xs={12}>
                  <TextField fullWidth required name="person_name" type="text" label="Nome do responsável" onChange={e => handleField(e, "person_name")} value={person_name} />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth required name="person_contact" type="text" label="Contato do responsável" onChange={e => handleField(e, "person_contact")} value={person_contact} />
                </Grid>

                <Grid item style={{ marginTop: 16 }}>
                  {
                    hasHospital
                      ?
                      <div style={{display: "flex", justifyContent: "space-between"}}>
                        <div><Button variant="contained" color="primary" type="button" onClick={() => handleUpdate()}>Atualizar</Button></div>
                        <div><Button variant="contained" color="secondary" type="button" onClick={handleRemove} style={{marginLeft: "16px"}}>Remover</Button></div>
                      </div>
                      :
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
