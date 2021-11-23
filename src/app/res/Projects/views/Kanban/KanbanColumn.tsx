import * as React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
// Import BoardItem component
import { Typography, Grid } from '@material-ui/core';
import { observer } from 'mobx-react';
import { WORKSPACES_STORE, UI_STORE } from 'app/constants';
import { WorkspacesStore, UIStore, useStores } from 'app/stores';
import { AddTaskFAB, MoreMenu } from 'app/components/inputs';
import { CreateTaskDialog, EditLaneDialog, BoardItem } from '.';
import { LaneModel, TaskModel } from 'app/res/Projects';

// Define types for board column content style properties
// This is necessary for TypeScript to accept the 'isDraggingOver' prop.
type BoardColumnContentStylesProps = {
  isDraggingOver: boolean;
};

// Create styles for BoardColumnWrapper element
const BoardColumnWrapper = styled.div`
  flex: 1;
  padding: 8px;
  background-color: #e5eff5;
  border-radius: 4px;

  & + & {
    margin-left: 12px;
  }
`;

export const BoardColumnOptions = observer((props) => {
  const [open, setOpen] = React.useState(false);
  const { workspacesstore, uistore } = useStores();
  const project = workspacesstore.selectedProject!;
  const lane = project.lanes.getBy('id', props.columnId)[0] as LaneModel;

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
              // store.push(deployment.link + 'edit/')
              handleClickOpen();
            },
          },
          {
            name: 'Delete',
            onClick: () => {
              uistore.setDeleteTarget(lane.name, lane.onDelete);
            },
          },
        ]}
      />
      <EditLaneDialog
        isOpen={open}
        close={handleClose}
        columnId={props.columnId}
      />
    </>
  );
});

export const BoardColumnHeader = observer(
  (props: { title: string; id: string }) => {
    return (
      <div style={{ margin: '12px' }}>
        <Grid justify="space-between" container spacing={3}>
          <Grid item>
            <Typography variant="h5" color="inherit">
              {props.title}
            </Typography>
          </Grid>
          <Grid item>
            <div style={{ marginRight: '-16px', marginTop: '-9px' }}>
              <BoardColumnOptions columnId={props.id} />
            </div>
          </Grid>
        </Grid>
      </div>
    );
  },
);

// Create styles for BoardColumnContent element
const BoardColumnContent = styled.div<BoardColumnContentStylesProps>`
  min-height: 10px;
  background-color: ${(props) => (props.isDraggingOver ? '#aecde0' : null)};
  border-radius: 4px;
`;

export const Column = observer(
  ({
    provided,
    snapshot,
    tasks,
  }: {
    provided: any;
    snapshot: any;
    tasks: TaskModel[];
  }) => {
    return (
      <BoardColumnContent
        {...provided.droppableProps}
        ref={provided.innerRef}
        isDraggingOver={snapshot.isDraggingOver}
      >
        {/* All board items belong into specific column. */}
        {tasks.map((task: TaskModel, index: number) => (
          <BoardItem key={task.id} task={task} index={index} />
        ))}
        {provided.placeholder}
        <div
          style={{ float: 'right', marginTop: '10px', marginBottom: '6px' }}
        ></div>
      </BoardColumnContent>
    );
  },
);

// Create and export the BoardColumn component
export const BoardColumn = observer((props: { lane: LaneModel }) => {
  const [open, setOpen] = React.useState(false);
  const { lane } = props;
  const tasks = lane.tasks.tasks;
  // console.log("board column rerender", tasks.tasks.length)
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <BoardColumnWrapper>
      <BoardColumnHeader title={lane.name} id={lane.id} />
      <Droppable droppableId={lane.id}>
        {(provided, snapshot) => (
          <Column provided={provided} snapshot={snapshot} tasks={tasks} />
        )}
      </Droppable>
      <AddTaskFAB onClick={handleClickOpen} />

      <CreateTaskDialog isOpen={open} close={handleClose} lane={lane} />
    </BoardColumnWrapper>
  );
});
