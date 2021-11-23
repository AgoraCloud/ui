import * as React from 'react';
import {
  DeploymentModel,
  DeploymentChip,
  DeploymentResources,
} from 'app/res/Deployments';
import Card from '@material-ui/core/Card';
import {
  Button,
  CircularProgress,
  Typography,
  LinearProgress,
} from '@material-ui/core';

import { LinkButton, MoreMenu } from 'app/components/inputs';
import { observer } from 'mobx-react';
import { useStores } from 'app/stores';

export const DeploymentLaunch = observer(
  (props: { deployment: DeploymentModel }) => {
    const { deployment } = props;
    if (deployment.status === 'STOPPED') {
      return (
        <Button
          variant="contained"
          color="primary"
          style={{ bottom: 3, right: 3, position: 'absolute' }}
          onClick={() => deployment.start.call()}
        >
          START
        </Button>
      );
    }
    if (deployment.status === 'PENDING') {
      return (
        <LinearProgress
          color="secondary"
          style={{ bottom: 0, left: 0, width: '100%', position: 'absolute' }}
        />
      );
    }
    if (deployment.status === 'CREATING') {
      return (
        <LinearProgress
          color="secondary"
          style={{ bottom: 0, left: 0, width: '100%', position: 'absolute' }}
        />
      );
    }
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
  },
);

export const DeploymentMenu = observer(
  (props: { deployment: DeploymentModel }) => {
    const { deployment } = props;
    const { routerstore, uistore } = useStores();

    const baseOptions = [
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
          uistore.setDeleteTarget(deployment.name, deployment.delete.call);
        },
      },
      deployment.isFavorite
        ? {
            name: 'Unfavorite',
            onClick: () => {
              deployment.unfavorite.call();
            },
          }
        : {
            name: 'Favorite',
            onClick: () => {
              deployment.favorite.call();
            },
          },
    ];

    let options: { name: string; onClick: () => void }[] = [];
    switch (deployment.scalingMethod) {
      case 'ALWAYS_ON': {
        options = [...baseOptions];
        break;
      }
      case 'ON_DEMAND': {
        options = [...baseOptions];
        if (deployment.status === 'STOPPED') {
          options.push({
            name: 'Start',
            onClick: () => {
              deployment.start.call();
            },
          });
        }
        if (deployment.status === 'RUNNING') {
          options.push({
            name: 'Stop',
            onClick: () => {
              deployment.stop.call();
            },
          });
        }

        break;
      }
    }

    return (
      <div
        style={{
          position: 'absolute',
          top: '2%',
          right: '2%',
        }}
      >
        <MoreMenu options={options} />
      </div>
    );
  },
);

export const DeploymentCard = observer(
  (props: { deployment: DeploymentModel }) => {
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
  },
);
