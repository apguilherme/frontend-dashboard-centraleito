import * as React from 'react';
import api from '../api';
import { Grid, CircularProgress } from '@material-ui/core';

import BarChart from './plots/BarChart';
import LineChart from './plots/LineChart';
import GroupedBarChart from './plots/GroupedBarChart'
import BarHorizontalChart from './plots/BarHorizontalChart'

export default function Dashboard() {

    const [data, setData] = React.useState([]);
    const [load, setLoad] = React.useState(false);

    function colorGen() {
        var r = Math.floor(Math.random() * 255) + 1;
        var g = Math.floor(Math.random() * 255) + 1;
        var b = Math.floor(Math.random() * 255) + 1;
        return { r, g, b };
    }

    React.useEffect(() => {
        setLoad(true);
        api.get("/hospitals", { headers: { "x-access-token": localStorage.getItem("contraleito-token") } })
            .then(res => {
                if (res.data.length > 0) {
                    let emptyBeds = 0;
                    for (let bed of res.data[0]?.beds) {
                        if (bed.name === "") {
                            emptyBeds += 1;
                        }
                    };
                    let labels = ["Total leitos", "Leitos ocupados", "Leitos livres"];
                    let color = colorGen();
                    let datasets = [
                        {
                            label: res.data[0]?.name,
                            data: [res.data[0]?.beds.length, res.data[0]?.beds.length - emptyBeds, emptyBeds],
                            backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})`
                        }
                    ];
                    setData({ labels, datasets });
                }
                setLoad(false);
            });
    }, []);

    return (
        <Grid container alignItems="flex-start" spacing={8}>
            {
                load ? <CircularProgress color="secondary" /> :
                    <>
                        <Grid item xs={6}>
                            <GroupedBarChart data={data} />
                        </Grid>

                        <Grid item xs={6}>
                            <BarHorizontalChart />
                        </Grid>

                        <Grid item xs={6}>
                            <BarChart />
                        </Grid>

                        <Grid item xs={6}>
                            <LineChart />
                        </Grid>
                    </>
            }
        </Grid>
    );
}
