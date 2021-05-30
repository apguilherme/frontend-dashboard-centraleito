import React from 'react';
import { TextField, Paper, Grid, Button, CircularProgress } from '@material-ui/core';
import jwt from 'jsonwebtoken';

import api from '../api';

export default function Profile() {

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [load, setLoad] = React.useState(false);

  const handleField = (e, field) => {
    let value = e.target.value;
    switch (field) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        break;
    }
  };

  React.useEffect(() => {
    setLoad(true);
    let tkn = localStorage.getItem("centraleito-token");
    let tknDecoded = jwt.decode(tkn);
    api.get(`/user/${tknDecoded._id}`, { headers: { "x-access-token": localStorage.getItem("contraleito-token") } })
      .then(res => {
        setName(res.data?.name);
        setEmail(res.data?.email);
        setPassword(res.data?.password);
      });
    setLoad(false);
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoad(true);
    let tkn = localStorage.getItem("centraleito-token");
    let tknDecoded = jwt.decode(tkn);
    api.put("http://localhost:3333/user", { id: tknDecoded._id, name, email, password }, { headers: { "x-access-token": localStorage.getItem("contraleito-token") } })
      .then(res => {
        setLoad(false);
      });
  };

  return (
    <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
      <form onSubmit={onSubmit} noValidate>
        <Paper style={{ padding: 16 }}>

          {
            load ? <CircularProgress color="secondary" /> :

              <Grid container alignItems="flex-start" spacing={2}>

                <Grid item xs={12}>
                  <TextField fullWidth required value={name} type="text" label="Nome do usuário" onChange={e => handleField(e, "name")} />
                </Grid>

                <Grid item xs={12}>
                  <TextField fullWidth required value={email} type="text" label="Email do usuário" onChange={e => handleField(e, "email")} />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth required value={password} type="text" label="Senha do usuário" onChange={e => handleField(e, "password")} />
                </Grid>

                <Grid item style={{ marginTop: 16 }}>
                  <Button variant="contained" color="primary" type="submit">Atualizar</Button>
                </Grid>
              </Grid>

          }

        </Paper>
      </form>
    </div>
  );
}
