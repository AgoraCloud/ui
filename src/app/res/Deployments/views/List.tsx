import * as React from 'react';
import { WorkspaceModel } from 'app/res/Workspaces/models';
import { DeploymentModel, DeploymentsModel } from 'app/res/Deployments/models';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Typography,
} from '@material-ui/core';
import { DeploymentCard } from 'app/res/Deployments/views/Card';
import { observer } from 'mobx-react';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export const DeploymentsAccordion = observer(
  ({
    deployments,
    summary,
  }: {
    deployments: DeploymentModel[];
    summary: string;
  }) => {
    const [expanded, setExapanded] = React.useState(true);
    if (deployments.length == 0) return null;
    return (
      <Accordion
        expanded={expanded}
        onChange={() => setExapanded(!expanded)}
        elevation={0}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          style={{
            backgroundColor: expanded ? '#EBEBEB' : '#f7f7f7',
          }}
        >
          <Typography>{summary}</Typography>
        </AccordionSummary>
        <AccordionDetails
        // sx={{backgroundColor: 'transparent'}}
        >
          <Grid
            container
            direction={'row'}
            spacing={5}
            alignItems="flex-start"
            justifyContent="flex-start"
          >
            {deployments.map((deployment) => (
              <Grid item key={deployment.id}>
                {/* xs={12} sm={12} md={6} lg={2} xl={4}  */}
                <DeploymentCard deployment={deployment} />
              </Grid>
            ))}
          </Grid>
        </AccordionDetails>
      </Accordion>
    );
  },
);

export const DeploymentsList = observer(
  ({ workspace }: { workspace: WorkspaceModel }) => {
    // console.log(workspace.deployments);

    const deployments = workspace.deployments.deployments;
    const favorited = deployments.filter((deployment) => deployment.isFavorite);
    const notfavorited = deployments.filter(
      (deployment) => !deployment.isFavorite,
    );
    console.log(favorited, notfavorited);
    return (
      <>
        <DeploymentsAccordion
          summary="Favorited Deployments"
          deployments={favorited}
        />
        <DeploymentsAccordion
          summary="Deployments"
          deployments={notfavorited}
        />
      </>
    );
  },
);

// export const DeploymentCard = ({ deployment }: { deployment: DeploymentModel }) => {
//   return
// }
