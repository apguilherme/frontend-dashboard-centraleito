import React from 'react';
import { TextField, Paper, Grid, Button } from '@material-ui/core';

import api from "../api";

export default function Login({ setIsAuth }) {

    const [isLogin, setIsLogin] = React.useState(true);
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [load, setLoad] = React.useState(false);
    const [err, setErr] = React.useState("");

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

    const onSubmit = async (event) => {
        event.preventDefault();
        setLoad(true);
        await api.post("/login", { email, password })
            .then(async (res) => {
                if (res.data.message) {
                    setErr(res.data.message);
                }
                else if (res.data.token !== null || res.data.token !== undefined) {
                    await localStorage.setItem("centraleito-token", res.data.token);
                    setIsAuth(localStorage.getItem("centraleito-token"));
                    setErr("");
                    console.log("Login, token:", localStorage.getItem("centraleito-token"));
                }
            }).catch(e => {
                console.log(e);
            })
        setLoad(false);
    };

    const handleSignUp = async (event) => {
        event.preventDefault();
        await api.post("/user", { name, email, password })
            .then(async (res) => {
                setErr("");
                if (res.data.message) {
                    setErr(res.data.message);
                }
                else{
                    alert("Registred. You can sign in now.");
                }
            }).catch(e => {
                console.log(e);
            })
    };

    const toggle = () => {
        setErr("");
        setIsLogin(!isLogin);
    }

    return (
        <div style={{ padding: 64, margin: 'auto', maxWidth: "40%" }}>
            {
                isLogin ?
                    <form onSubmit={onSubmit}>
                        <Paper style={{ padding: 16 }}>
                            <Grid container alignItems="flex-start" spacing={2}>
                                <Grid item xs={12}>
                                    <TextField fullWidth required value={email} type="email" label="Email do usuário" onChange={e => handleField(e, "email")} />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField fullWidth required value={password} type="password" label="Senha do usuário" onChange={e => handleField(e, "password")} />
                                </Grid>
                                <Grid item style={{ marginTop: 16 }}>
                                    <Button variant="contained" color="primary" type="submit">Entrar</Button>
                                </Grid>
                                <Grid item style={{ marginTop: 16 }}>
                                    <Button variant="contained" color="info" type="button" onClick={() => toggle()} style={{marginLeft: "16px"}}>Cadastrar</Button>
                                </Grid>
                            </Grid>
                            <p style={{ color: "red" }}>{err}</p>
                        </Paper>
                    </form>
                    :
                    <form onSubmit={handleSignUp}>
                        <Paper style={{ padding: 16 }}>
                            <Grid container alignItems="flex-start" spacing={2}>
                                <Grid item xs={12}>
                                    <TextField fullWidth required value={name} type="text" label="Nome do usuário" onChange={e => handleField(e, "name")} />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField fullWidth required value={email} type="email" label="Email do usuário" onChange={e => handleField(e, "email")} />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField fullWidth required value={password} type="password" label="Senha do usuário" onChange={e => handleField(e, "password")} />
                                </Grid>
                                <Grid item style={{ marginTop: 16 }}>
                                    <Button variant="contained" color="primary" type="submit">Cadastrar</Button>
                                </Grid>
                                <Grid item style={{ marginTop: 16 }}>
                                    <Button variant="contained" color="info" type="button" onClick={() => toggle()}>Login</Button>
                                </Grid>
                            </Grid>
                            <p style={{ color: "red" }}>{err}</p>
                        </Paper>
                    </form>
            }
        </div>
    );
}
