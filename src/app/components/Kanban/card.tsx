import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { inject, observer } from 'mobx-react';
import { WORKSPACES_STORE, UI_STORE } from 'app/constants';
import { WorkspacesStore, UIStore } from 'app/stores';
import { MoreMenu } from 'app/components/Inputs';
import { EditTaskDialog } from 'app/components/Inputs/Modal';
import { Grid } from '@material-ui/core';

export const CardOptions = inject(
  WORKSPACES_STORE,
  UI_STORE,
)(
  observer((props) => {
    const store = props[WORKSPACES_STORE] as WorkspacesStore;
    const uistore = props[UI_STORE] as UIStore;
    const project = store.selectedProject;

    if (!project) return null;

    const lane = project.lanes.getById(props.laneId);

    if (!lane) return null;

    const task = lane.tasks.getById(props.id);

    if (!task) return null;

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    return (
      <>
        <MoreMenu
          options={[
            {
              name: 'Edit',
              onClick: () => {
                handleClickOpen();
              },
            },
            {
              name: 'Delete',
              onClick: () => {
                uistore.setDeleteTarget(task.title, task.delete);
              },
            },
          ]}
        />
        <EditTaskDialog isOpen={open} close={handleClose} task={task} />
      </>
    );
  }),
);

export const CustomCardHeader = (props) => {
  return (
    <div>
      <Grid justify="space-between" container spacing={3}>
        <Grid item>
          <Typography gutterBottom variant="h6" component="h4">
            {props.title}
          </Typography>
        </Grid>
        <Grid item>
          <div style={{ marginRight: '-16px', marginTop: '-9px' }}>
            <CardOptions id={props.id} laneId={props.laneId} />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export const CustomCard = (props) => {
  return (
    <>
      <Card>
        <CardContent>
          <CustomCardHeader
            title={props.title}
            id={props.id}
            laneId={props.laneId}
          />
          <Typography variant="body2" color="textSecondary" component="p">
            {props.description}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};
