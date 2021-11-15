import * as React from 'react';
import { Typography, Grid } from '@material-ui/core';
import { observer } from 'mobx-react';
import { WorkspaceMetricsModel } from 'app/res/Workspaces';
import Alert from '@material-ui/lab/Alert';
import { WorkspaceWrapper } from 'app/components/Wrapper';
import { useStores } from 'app/stores';
import { GaugeChart } from 'app/components';

export const WorkspaceAlert = (props: { metrics: WorkspaceMetricsModel }) => {
  const { metrics } = props;
  if (metrics.state === 'error')
    return (
      <Alert severity="error">
        This workspace has no configured resource limitations!
      </Alert>
    );
  return null;
};

export const WorkspaceMetricsPage = observer((props) => {
  const { workspacesstore } = useStores();
  const workspace = workspacesstore.selectedWorkspace;
  if (!workspace) return null;
  const metrics = workspace?.metrics;

  // if(metrics?.state != 'loaded') return null
  if (metrics.state === 'error') {
    return (
      <WorkspaceWrapper>
        <Typography variant="h4">{workspace.name} Metrics</Typography>
        <br />
        <WorkspaceAlert metrics={metrics} />
      </WorkspaceWrapper>
    );
  }
  return (
    <WorkspaceWrapper>
      <Typography variant="h4">{workspace.name} Metrics</Typography>
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
    </WorkspaceWrapper>
  );
});
