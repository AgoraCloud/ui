import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { inject, observer } from 'mobx-react';
import { WORKSPACES_STORE, UI_STORE } from 'app/constants';
import { WorkspacesStore, UIStore, useStores } from 'app/stores';
import { MoreMenu } from 'app/components/inputs';
import { EditTaskDialog } from '.';
import { Grid } from '@material-ui/core';
import { LaneModel, TaskModel } from 'app/res/Projects';

export const CardOptions = observer((props) => {
  const { workspacesstore, uistore } = useStores();
  const project = workspacesstore.selectedProject;
  const [open, setOpen] = React.useState(false);

  if (!project) return null;

  const lane = project.lanes.getBy('id', props.laneId)[0] as LaneModel;

  if (!lane) return null;

  const task = lane.tasks.getBy('id', props.id)[0] as TaskModel;

  if (!task) return null;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <MoreMenu
        id="moreMenuTask"
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
              uistore.setDeleteTarget(task.title, task.onDelete);
            },
          },
        ]}
      />
      <EditTaskDialog isOpen={open} close={handleClose} task={task} />
    </>
  );
});

export const CustomCardHeader = observer(
  (props: { title: string; id: string; laneId: string }) => {
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
  },
);

export const CustomCard = observer(
  (props: {
    title: string;
    id: string;
    laneId: string;
    description: string;
  }) => {
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
  },
);
