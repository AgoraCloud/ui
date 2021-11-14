import React from 'react';

import { Chip } from '@material-ui/core';
import { DeploymentModel } from 'app/res/Deployments';
import { observer } from 'mobx-react';

const chips = {
  FAILED: <Chip style={{ backgroundColor: 'red' }} label="Error" />,
  SUCCESS: <Chip style={{ backgroundColor: 'red' }} label="Error" />,
  STARTING: <Chip style={{ backgroundColor: 'red' }} label="Error" />,
  STOPPED: <Chip style={{ backgroundColor: 'red' }} label="STOPPED" />,
  PENDING: <Chip color="secondary" label="PENDING" />,
  CREATING: <Chip color="secondary" label="CREATING" />,
  RUNNING: <Chip color="primary" label="RUNNING" />,
  UPDATING: <Chip color="secondary" label="UPDATING" />,
  DELETING: <Chip style={{ backgroundColor: 'red' }} label="DELETING" />,
  UNKNOWN: <Chip style={{ backgroundColor: 'purple' }} label="UNKNOWN" />,
};

export const DeploymentChip = observer((props: { deployment: DeploymentModel }) => {
  const { deployment } = props;
  return (
    <div style={{ paddingTop: '15px' }}>{chips[deployment.status] || null}</div>
  );
})
