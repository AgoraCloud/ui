import * as React from 'react';
import * as style from './style.scss';
import { HomeWrapper } from 'app/containers/workspace';
import { Typography, Grid } from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import { WORKSPACES_STORE } from 'app/constants';
import { WorkspacesStore } from 'app/stores';
import { Deployment } from 'app/workspace/deployment/models';
import { GaugeChart } from 'app/components/gauge-chart';
import { DeploymentChip } from 'app/components/deployment-card';
import Alert from '@material-ui/lab/Alert';

export const DeploymentLogs = observer((props: { deployment?: Deployment }) => {
  // const deployment = store.selectedDeployment
  const { deployment } = props;
  if (!deployment) return null;
  const logs = deployment.logs;

  const logText = logs.logs;
  return (
    <>
      <Typography variant="h4">Logs</Typography>
      <textarea className={style.textarea} disabled value={logText}></textarea>
    </>
  );
});
export const ChartWrapper = (props) => {
  return (
    <Grid item style={{ width: '100%', height: '37vh' }}>
      {props.children}
    </Grid>
  );
};
export const DeploymentMetrics = observer(
  (props: { deployment?: Deployment }) => {
    // const deployment = store.selectedDeployment
    const { deployment } = props;
    if (!deployment) return null;
    const metrics = deployment?.metrics;

    return (
      <>
        <Typography variant="h4">Metrics</Typography>
        <Grid container item direction="column">
          <ChartWrapper>
            <GaugeChart {...metrics.cpuChart} />
          </ChartWrapper>
          <ChartWrapper>
            <GaugeChart {...metrics.memoryChart} />
          </ChartWrapper>
        </Grid>
      </>
    );
  },
);

export const DeploymentAlert = (props: { deployment: Deployment }) => {
  const { deployment } = props;
  const failureReason = deployment.data['failureReason'];
  if (deployment.status === 'FAILED')
    return <Alert severity="error">{failureReason}</Alert>;
  return null;
};

export const DeploymentInfoPage = inject(WORKSPACES_STORE)(
  observer((props) => {
    const store = props[WORKSPACES_STORE] as WorkspacesStore;
    const deployment = store.selectedDeployment;
    if (!deployment) return null;
    return (
      <HomeWrapper>
        <Typography variant="h3">Deployment: {deployment.name}</Typography>
        <Typography variant="h6">
          <DeploymentChip deployment={deployment} />
          <br />

          <DeploymentAlert deployment={deployment} />
          <br />
        </Typography>
        <div style={{ height: '60vh', display: 'block' }}>
          <Grid container direction={'row'}>
            <Grid item xs={12} sm={6} md={6} lg={3} xl={3}>
              <DeploymentMetrics deployment={deployment} />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={9} xl={9}>
              <DeploymentLogs deployment={deployment} />
            </Grid>
          </Grid>
        </div>
      </HomeWrapper>
    );
  }),
);
