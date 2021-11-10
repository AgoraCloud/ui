import React from 'react';

import { Typography, Chip, Grid } from '@material-ui/core';

import MemoryIcon from '@material-ui/icons/Memory';
import MoneyIcon from '@material-ui/icons/Money';
import StorageIcon from '@material-ui/icons/Storage';
import { DeploymentModel } from 'app/res/Deployments';

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
