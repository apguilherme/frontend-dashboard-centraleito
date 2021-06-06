import React from 'react';
import api from '../api';
import { TextField, Paper, Grid, Button, CircularProgress, Select, MenuItem, InputLabel } from '@material-ui/core';

export default function FormAdd({ selectedBed = null, setShowModal }) {

    const [hospitalId, setHospitalId] = React.useState("");
    const [id, setId] = React.useState("");
    const [name, setName] = React.useState("");
    const [city, setCity] = React.useState("");
    const [uf, setUf] = React.useState(["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"]);
    const [selectedUf, setSelectedUf] = React.useState("");
    const [age, setAge] = React.useState("");
    const [document, setDocument] = React.useState("");
    const [time_waiting, setTimeWaiting] = React.useState("");
    const [contact, setContact] = React.useState("");
    const [severity, setSeverity] = React.useState("");
    const [load, setLoad] = React.useState(false);
    const [isClean, setIsClean] = React.useState(false);

    React.useEffect(() => {
        if (selectedBed) {
            setHospitalId(selectedBed.hospitalId);
            setId(selectedBed._id);
            setName(selectedBed.name);
            setCity(selectedBed.city);
            setSelectedUf(selectedBed.uf);
            setAge(selectedBed.age);
            setDocument(selectedBed.document);
            setTimeWaiting(selectedBed.time_waiting);
            setContact(selectedBed.contact);
            setSeverity(selectedBed.severity);
            setIsClean(false);
        }
        else{
            setIsClean(true);
        }
    }, []);

    const onSubmit = async (event) => {
        event.preventDefault();
        setLoad(true);
        await api.post("/bed", { name, city, uf: selectedUf, age, document, time_waiting, contact, severity }, { headers: { "x-access-token": localStorage.getItem("contraleito-token") } });
        setLoad(false);
        setShowModal(false);
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
            case "age":
                setAge(value);
                break;
            case "document":
                setDocument(value);
                break;
            case "time_waiting":
                setTimeWaiting(value);
                break;
            case "contact":
                setContact(value);
                break;
            case "severity":
                setSeverity(value);
                break;
            default:
                break;
        }
    };

    const handleUpdate = async () => {
        setLoad(true);
        await api.put("/bed", { hospitalId, id, name, city, uf: selectedUf, age, document, time_waiting, contact, severity }, { headers: { "x-access-token": localStorage.getItem("contraleito-token") } })
        setLoad(false);
        setShowModal(false);
    };

    const handleRemove = async () => {
        await api.delete("/bed", { data: {id: selectedBed._id, hospitalId: selectedBed.hospitalId} }, { headers: { "x-access-token": localStorage.getItem("contraleito-token") } })
            .then(res => {
                setHospitalId("");
                setId("");
                setName("");
                setCity("");
                setSelectedUf("");
                setAge("");
                setDocument("");
                setTimeWaiting("");
                setContact("");
                setSeverity("");
                setIsClean(true);
                setShowModal(false);
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
                                    <TextField fullWidth required name="name" type="text" label="Paciente" onChange={e => handleField(e, "name")} value={name} />
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
                                    <TextField fullWidth required name="age" type="text" label="Idade" onChange={e => handleField(e, "age")} value={age} />
                                </Grid>

                                <Grid item xs={6}>
                                    <TextField fullWidth required name="document" type="text" label="Documento" onChange={e => handleField(e, "document")} value={document} />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField fullWidth required name="time_waiting" type="number" label="Tempo internado (dias)" onChange={e => handleField(e, "time_waiting")} value={time_waiting} />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField fullWidth required name="contact" type="text" label="Contato do responsável" onChange={e => handleField(e, "contact")} value={contact} />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField fullWidth required name="severity" type="text" label="Severidade" onChange={e => handleField(e, "severity")} value={severity} />
                                </Grid>

                                <Grid item style={{ marginTop: 16 }}>
                                    {
                                        selectedBed && !isClean
                                            ?
                                            <div>
                                                <Button variant="contained" color="primary" type="button" onClick={() => handleUpdate()}>Atualizar</Button>
                                                <Button variant="contained" color="secondary" type="button" onClick={() => handleRemove()} style={{marginLeft: "16px"}}>Remover</Button>
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
