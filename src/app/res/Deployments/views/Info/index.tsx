import * as React from 'react';
import style from './style.module.scss';
import { WorkspaceWrapper } from 'app/components/Wrapper';
import { Typography, Grid, Button } from '@material-ui/core';
import { observer } from 'mobx-react';
import { GaugeChart } from 'app/components';
import Alert from '@material-ui/lab/Alert';
import { useStores } from 'app/stores';
import { DeploymentChip, DeploymentModel } from 'app/res/Deployments';

export const DeploymentLogs = observer(
  (props: { deployment?: DeploymentModel }) => {
    // const deployment = store.selectedDeployment
    const { deployment } = props;
    if (!deployment) return null;

    const logs = deployment.logs;
    if (logs.state === 'error')
      return <Alert severity="error">Error fetching deployment logs</Alert>;

    const logText = logs.logs;
    return (
      <>
        <Typography variant="h4">Logs</Typography>
        <textarea
          className={style.textarea}
          disabled
          value={logText}
        ></textarea>
      </>
    );
  },
);
export const ChartWrapper = (props) => {
  return (
    <Grid item style={{ width: '100%', height: '37vh' }}>
      {props.children}
    </Grid>
  );
};
export const DeploymentMetrics = observer(
  (props: { deployment?: DeploymentModel }) => {
    const { deployment } = props;
    if (!deployment) return null;
    const metrics = deployment?.metrics;
    console.log('metrics state', metrics.state);
    if (metrics.state === 'error')
      return <Alert severity="error">Error fetching metric data</Alert>;
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

export const DeploymentUpgradeButton = observer(
  ({ deployment }: { deployment: DeploymentModel }) => {
    if (!deployment.isUpgradeable) return null;
    return (
      <Button
        color="primary"
        onClick={() => {
          deployment.upgrade.call();
        }}
      >
        Upgrade
      </Button>
    );
  },
);

export const DeploymentAlert = (props: { deployment: DeploymentModel }) => {
  const { deployment } = props;
  const failureReason = deployment.data['failureReason'];
  if (deployment.status === 'FAILED')
    return <Alert severity="error">{failureReason}</Alert>;
  return null;
};

export const DeploymentInfoPage = observer((props) => {
  const { workspacesstore } = useStores();
  const deployment = workspacesstore.selectedDeployment;
  if (!deployment) return null;
  if (deployment?.status === 'STOPPED') {
    return (
      <WorkspaceWrapper>
        <Typography variant="h3">Deployment: {deployment.name}</Typography>
        <Typography variant="h6">Currently off</Typography>
        <DeploymentChip deployment={deployment} />
      </WorkspaceWrapper>
    );
  }
  return (
    <WorkspaceWrapper>
      <Typography variant="h3">Deployment: {deployment.name}</Typography>
      <DeploymentUpgradeButton deployment={deployment} />
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
    </WorkspaceWrapper>
  );
});
