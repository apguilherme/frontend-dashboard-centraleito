import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, CircularProgress } from '@material-ui/core';
import api from '../api';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(1),
            width: theme.spacing(32),
            height: theme.spacing(16),
        },
    },
    card: {
        padding: '14px',
        textAlign: 'center'
    }
}));

export default function SimplePaper() {
    const classes = useStyles();

    const [cardsData, setCardsData] = React.useState({});
    const [load, setLoad] = React.useState(false);

    React.useEffect(() => {
        setLoad(true);
        api.get("/hospitals", { headers: { "x-access-token": localStorage.getItem("contraleito-token") } })
            .then(res => {
                let emptyBeds = 0;
                if (res.data.length > 0) {
                    let beds = res.data[0].beds;
                    for (let bed of beds) {
                        if (bed?.name === "") {
                            emptyBeds += 1;
                        }
                    }
                    setCardsData({
                        name: res.data[0]?.name,
                        rate_occupied: emptyBeds > 0 ? `${(100 * (res.data[0]?.beds.length - emptyBeds) / res.data[0]?.beds.length).toFixed(1)} %` : "100 %",
                        num_beds: res.data[0]?.beds.length > 0 ? res.data[0]?.beds.length : "0",
                        num_beds_free: emptyBeds,
                        occup: res.data[0]?.beds.length > 0 ? res.data[0]?.beds.length - emptyBeds : "0",
                    });
                }
                setLoad(false);
            });
    }, [])

    return (
        <>
            {
                load ? <CircularProgress color="secondary" /> :
                    <>
                        <h2>{cardsData.name}</h2>
                        <div className={classes.root}>
                            <Paper elevation={3}>
                                <div className={classes.card}>
                                    <h2>{cardsData.rate_occupied}</h2>
                                    <p>Taxa de ocupação</p>
                                </div>
                            </Paper>
                            <Paper elevation={3}>
                                <div className={classes.card}>
                                    <h2>{cardsData.num_beds}</h2>
                                    <p>Total de leitos</p>
                                </div>
                            </Paper>
                            <Paper elevation={3}>
                                <div className={classes.card}>
                                    <h2>{cardsData.occup}</h2>
                                    <p>Leitos ocupados</p>
                                </div>
                            </Paper>
                            <Paper elevation={3}>
                                <div className={classes.card}>
                                    <h2>{cardsData.num_beds_free}</h2>
                                    <p>Leitos livres</p>
                                </div>
                            </Paper>
                        </div>
                    </>
            }
        </>
    );
}
