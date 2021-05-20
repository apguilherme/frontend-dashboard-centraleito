import * as React from 'react';
import { Grid } from '@material-ui/core';

import BarChart from './BarChart';
import LineChart from './LineChart';
import GroupedBarChart from './GroupedBarChart'
import BarHorizontalChart from './BarHorizontalChart'

export default function Dashboard() {
  return (
    <Grid container alignItems="flex-start" spacing={8}>

        <Grid item xs={6}>
            <GroupedBarChart />
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
    </Grid>
  );
}
