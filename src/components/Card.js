import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

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

export default function SimplePaper({ cardsData }) {
    const classes = useStyles();

    return (
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
                        <h2>{cardsData.num_beds_free}</h2>
                        <p>Leitos livres</p>
                    </div>
                </Paper>
            </div>
        </>
    );
}
