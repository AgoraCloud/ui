import * as React from 'react';
import {
  DeploymentModel,
  DeploymentChip,
  DeploymentResources,
} from 'app/res/Deployments';
import Card from '@material-ui/core/Card';
import { Typography } from '@material-ui/core';

import { LinkButton, MoreMenu } from 'app/components/inputs';
import { observer } from 'mobx-react';
import { useStores } from 'app/stores';

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
