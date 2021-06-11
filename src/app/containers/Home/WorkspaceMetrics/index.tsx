import * as React from 'react';
import { HomeWrapper } from '../index';
import { Typography, Grid } from '@material-ui/core';
import { GaugeChart } from 'app/components/Charts';
import { WORKSPACES_STORE } from 'app/constants';
import { inject, observer } from 'mobx-react';
import { WorkspacesStore } from 'app/stores';
import { WorkspaceMetrics } from 'app/models';
import Alert from '@material-ui/lab/Alert';

export const WorkspaceAlert = (props: { metrics: WorkspaceMetrics }) => {
  const { metrics } = props;
  if (metrics.status === 400)
    return (
      <Alert severity="error">
        This workspace has no configured resource limitations!
      </Alert>
    );
  return null;
};

export const WorkspaceMetricsPage = inject(WORKSPACES_STORE)(
  observer((props) => {
    const store = props[WORKSPACES_STORE] as WorkspacesStore;

    const workspace = store.selectedWorkspace;
    const metrics = workspace?.metrics;

    // if(metrics?.state != 'loaded') return null
    return (
      <HomeWrapper>
        <Typography variant="h4">{workspace.name} Metrics</Typography>
        <br />
        <WorkspaceAlert metrics={metrics} />
        <br />
        <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <GaugeChart {...metrics.cpuChart} />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <GaugeChart {...metrics.memoryChart} />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <GaugeChart {...metrics.storageChart} />
          </Grid>
        </Grid>
      </HomeWrapper>
    );
  }),
);
