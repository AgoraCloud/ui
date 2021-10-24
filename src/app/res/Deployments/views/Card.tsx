import * as React from 'react';
import { DeploymentModel } from 'app/res/Deployments/models';
import Card from '@material-ui/core/Card';
import { Typography, Chip, Grid } from '@material-ui/core';

import MemoryIcon from '@material-ui/icons/Memory';
import MoneyIcon from '@material-ui/icons/Money';
import StorageIcon from '@material-ui/icons/Storage';
import { LinkButton, MoreMenu } from 'app/components/inputs';
import { observer } from 'mobx-react';
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

export const DeploymentLaunch = (props: { deployment: DeploymentModel }) => {
  const { deployment } = props;
  return (
    <LinkButton
      variant="contained"
      color="primary"
      style={{ bottom: 3, right: 3, position: 'absolute' }}
      to={deployment.link}
      disabled={deployment.status !== 'RUNNING'}
    >
      Launch 🚀
    </LinkButton>
  );
};

export const ResourceChip = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactElement;
  label: string;
  value?: number;
}) => {
  if (value === undefined) return null;
  return (
    <Grid item xs={4}>
      <Chip icon={icon} label={label + value} />
    </Grid>
  );
};

export const DeploymentResources = (props: { deployment: DeploymentModel }) => {
  const { deployment } = props;
  const { cpuCount, memoryCount, storageCount } = deployment;
  return (
    <Grid container style={{ paddingTop: '20px' }}>
      <ResourceChip icon={<MemoryIcon />} label={'CPU: '} value={cpuCount} />
      <ResourceChip icon={<MoneyIcon />} label={'RAM: '} value={memoryCount} />
      <ResourceChip
        icon={<StorageIcon />}
        label={'Storage: '}
        value={storageCount}
      />
    </Grid>
  );
};

export const DeploymentMenu = observer(
  (props: { deployment: DeploymentModel }) => {
    const { deployment } = props;
    const { routerstore, uistore } = useStores();
    return (
      <div
        style={{
          position: 'absolute',
          top: '2%',
          right: '2%',
        }}
      >
        <MoreMenu
          options={[
            {
              name: 'Edit',
              onClick: () => {
                routerstore.push(deployment.link + '/edit');
              },
            },
            {
              name: 'Info',
              onClick: () => {
                routerstore.push(deployment.link + '/info');
              },
            },
            {
              name: 'Delete',
              onClick: () => {
                uistore.setDeleteTarget(
                  deployment.name,
                  deployment.delete.call,
                );
              },
            },
          ]}
        />
      </div>
    );
  },
);

export const DeploymentCard = (props: { deployment: DeploymentModel }) => {
  const { deployment } = props;
  return (
    <Card
      style={{
        width: '400px',
        minWidth: '400px',
        // maxWidth: "333px",
        height: '256px',
        padding: '20px',
        position: 'relative',
      }}
    >
      <Typography variant="h4" color="primary" noWrap>
        {deployment.name}
      </Typography>
      <DeploymentMenu deployment={deployment} />
      <DeploymentChip deployment={deployment} />
      <DeploymentResources deployment={deployment} />
      <DeploymentLaunch deployment={deployment} />
      {/* {JSON.stringify(deployment.data, null, 2)} */}
    </Card>
  );
};
