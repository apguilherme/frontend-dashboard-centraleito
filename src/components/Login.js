import React from 'react';
import { TextField, Paper, Grid, Button, Select, MenuItem, InputLabel, CircularProgress } from '@material-ui/core';
import Dashboard from './Dashboard';
import TabPanel from './TabPanel';

import BarChart from './plots/BarChart';
import GroupedBarChart from './plots/GroupedBarChart'
import PieChart from './plots/PieChart'

import api from "../api";

export default function Login({ setIsAuth }) {

    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [load, setLoad] = React.useState(false);
    const [err, setErr] = React.useState("");
    const [hospitalNames, setHospitalNames] = React.useState([]);
    const [selectedHospital, setSelectedHospital] = React.useState("");
    const [selectedHospitalObj, setSelectedHosptalObj] = React.useState("");
    const [response, setResponse] = React.useState("");
    const [tab, setTab] = React.useState(0);

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
                else {
                    alert("Registred. You can sign in now.");
                }
            }).catch(e => {
                console.log(e);
            })
    };

    const changeHosp = (h) => {
        setSelectedHospital(h);
    }

    React.useEffect(() => {
        if (response !== "") {
            let r = { ...response };
            r.data = r.data.filter(hosp => hosp.name !== selectedHospital);
            setSelectedHosptalObj({ ...r });
        }
    }, [selectedHospital])

    React.useEffect(() => {
        setLoad(true);
        api.get("/all-hospitals")
            .then(res => {
                let r = { ...res };
                let names = r.data.map(h => h.name);
                r.data = r.data.filter(hosp => hosp.name === r.data[0].name);
                setResponse(res);
                setHospitalNames(names);
                setSelectedHospital(r.data[0].name);
                setLoad(false);
            });
    }, [])

    return (
        <>
            <TabPanel tab={tab} setTab={setTab} />
            {
                tab === 0 &&
                <div style={{ padding: 64, margin: 'auto', maxWidth: "40%" }}>
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
                            </Grid>
                            <p style={{ color: "red" }}>{err}</p>
                        </Paper>
                    </form>
                </div>
            }
            {
                tab === 1 &&
                <div style={{ padding: 64, margin: 'auto', maxWidth: "40%" }}>
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
                            </Grid>
                            <p style={{ color: "red" }}>{err}</p>
                        </Paper>
                    </form>
                </div>
            }
            {
                tab === 2 &&
                <div style={{ padding: 64, margin: 'auto', maxWidth: "80%" }}>
                    {
                        load ? <CircularProgress color="secondary" /> :
                            <>
                                <InputLabel id="select-uf">Selecione um hospital</InputLabel>
                                <Select fullWidth required labelId="select-hospital" name="hospital" type="text" value={selectedHospital} onChange={e => changeHosp(e.target.value)}>
                                    {
                                        hospitalNames?.map(item => {
                                            return (<MenuItem key={item} value={item}>{item}</MenuItem>)
                                        })
                                    }
                                </Select>
                                {
                                    selectedHospitalObj !== "" &&
                                    <Grid container alignItems="flex-start" spacing={8} key={selectedHospital}>
                                        <Grid item xs={6}>
                                            <GroupedBarChart response={selectedHospitalObj} />
                                        </Grid>

                                        <Grid item xs={6}>
                                            <BarChart response={selectedHospitalObj} />
                                        </Grid>

                                        <Grid item xs={6}>
                                            <PieChart response={selectedHospitalObj} />
                                        </Grid>
                                    </Grid>
                                }

                            </>
                    }
                </div>
            }
        </>
    );
}
