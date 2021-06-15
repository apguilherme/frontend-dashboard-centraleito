import * as React from 'react';
import api from '../api';
import { Grid, CircularProgress } from '@material-ui/core';

import BarChart from './plots/BarChart';
import GroupedBarChart from './plots/GroupedBarChart'
import BarHorizontalChart from './plots/BarHorizontalChart'

export default function Dashboard() {

    const [response, setResponse] = React.useState([]);
    const [load, setLoad] = React.useState(false);

    React.useEffect(() => {
        setLoad(true);
        api.get("/hospitals", { headers: { "x-access-token": localStorage.getItem("contraleito-token") } })
            .then(res => {
                setResponse(res);
                setLoad(false);
            });
    }, []);

    return (
        <Grid container alignItems="flex-start" spacing={8}>
            {
                load && response.length === 0 ? <CircularProgress color="secondary" /> :
                    <>
                        <Grid item xs={6}>
                            <GroupedBarChart response={response} />
                        </Grid>

                        <Grid item xs={6}>
                            <BarChart response={response} />
                        </Grid>

                        <Grid item xs={6}>
                            <BarHorizontalChart />
                        </Grid>

                    </>
            }
        </Grid>
    );
}
