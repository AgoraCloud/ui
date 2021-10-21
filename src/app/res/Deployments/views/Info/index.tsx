import * as React from 'react';
import style from './style.module.scss';
import { WorkspaceWrapper } from 'app/components/Wrapper';
import { Typography, Grid, Chip } from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import { WORKSPACES_STORE } from 'app/constants';
import { DeploymentModel } from 'app/res/Deployments/models';
import { GaugeChart } from 'app/components';
import Alert from '@material-ui/lab/Alert';
import { useStores } from 'app/stores';


const chips = {
  FAILED: <Chip style={{ backgroundColor: 'red' }} label="Error" />,
  SUCCESS: <Chip style={{ backgroundColor: 'red' }} label="Error" />,
  STARTING: <Chip style={{ backgroundColor: 'red' }} label="Error" />,
  PENDING: <Chip color="secondary" label="PENDING" />,
  CREATING: <Chip color="secondary" label="CREATING" />,
  RUNNING: <Chip color="primary" label="RUNNING" />,
  UPDATING: <Chip color="secondary" label="UPDATING" />,
  DELETING: <Chip style={{ backgroundColor: 'red' }} label="DELETING" />,
  UNKNOWN: <Chip style={{ backgroundColor: 'purple' }} label="UNKNOWN" />,
};

export const DeploymentChip = (props: { deployment: DeploymentModel }) => {
  const { deployment } = props;
  return (
    <div style={{ paddingTop: '15px' }}>{chips[deployment.status] || null}</div>
  );
};

export const DeploymentLogs = observer((props: { deployment?: DeploymentModel }) => {
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
  )
};
export const DeploymentMetrics = observer((props: { deployment?: DeploymentModel }) => {
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
});

export const DeploymentAlert = (props: { deployment: DeploymentModel }) => {
  const { deployment } = props;
  const failureReason = deployment.data['failureReason'];
  if (deployment.status === 'FAILED')
    return <Alert severity="error">{failureReason}</Alert>;
  return null;
};

export const DeploymentInfoPage = observer((props) => {
  const { workspacesstore } = useStores()
  const deployment = workspacesstore.selectedDeployment;
  if (!deployment) return null;
  return (
    <WorkspaceWrapper>
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
    </WorkspaceWrapper>
  );
})
