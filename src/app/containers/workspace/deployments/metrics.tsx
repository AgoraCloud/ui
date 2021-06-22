import * as React from 'react';
import { HomeWrapper } from '..';
import { Typography, Grid } from '@material-ui/core';
import { GaugeChart } from 'app/components';
import { WORKSPACES_STORE } from 'app/constants';
import { inject, observer } from 'mobx-react';
import { WorkspacesStore } from 'app/stores';

export const DeploymentMetricsPage = inject(WORKSPACES_STORE)(
  observer((props) => {
    const store = props[WORKSPACES_STORE] as WorkspacesStore;

    const deployment = store.selectedDeployment;
    const metrics = deployment?.metrics;

    // if(metrics?.state != 'loaded') return null
    return (
      <HomeWrapper>
        <Typography variant="h4">Metrics</Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <GaugeChart {...metrics.cpuChart} />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <GaugeChart {...metrics.memoryChart} />
          </Grid>
        </Grid>
      </HomeWrapper>
    );
  }),
);
