import React from 'react';

import { Chip } from '@material-ui/core';
import { DeploymentModel } from 'app/res/Deployments';
import { observer } from 'mobx-react';
import { DeploymentLabelingUtil } from '@agoracloud/common';

const chips = {
  FAILED: <Chip style={{ backgroundColor: 'red' }} label="Error" />,
  SUCCESS: <Chip style={{ backgroundColor: 'red' }} label="Error" />,
  STARTING: <Chip style={{ backgroundColor: 'red' }} label="Error" />,
  STOPPED: <Chip style={{ backgroundColor: 'red' }} label="Stopped" />,
  PENDING: <Chip color="secondary" label="Pending" />,
  CREATING: <Chip color="secondary" label="Creating" />,
  RUNNING: <Chip color="primary" label="Running" />,
  UPDATING: <Chip color="secondary" label="Updating" />,
  DELETING: <Chip style={{ backgroundColor: 'red' }} label="Deleting" />,
  UNKNOWN: <Chip style={{ backgroundColor: 'purple' }} label="Unknown" />,
};

export const DeploymentChip = observer(
  ({ deployment }: { deployment: DeploymentModel }) => {
    return (
      <>
        <div style={{ paddingTop: '15px', display: 'flex' }}>
          {chips[deployment.status] || null}
          <div style={{ marginLeft: '20px' }}>
            <Chip color="primary" label={deployment.scalingMethodLabel} />
          </div>
        </div>
      </>
    );
  },
);
