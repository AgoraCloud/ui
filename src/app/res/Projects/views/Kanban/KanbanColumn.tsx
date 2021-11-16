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
import { LaneModel } from 'app/res/Projects';

// Define types for board column element properties
type BoardColumnProps = {
  key: string;
  column: any;
  items: any;
};

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
              uistore.setDeleteTarget(lane.name, lane.delete);
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

// Create and export the BoardColumn component
export const BoardColumn: React.FC<BoardColumnProps> = observer((props) => {
  const [open, setOpen] = React.useState(false);
  const { items } = props;
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <BoardColumnWrapper>
      <BoardColumnHeader title={props.column.title} id={props.column.id} />
      <Droppable droppableId={props.column.id}>
        {(provided, snapshot) => (
          <BoardColumnContent
            {...provided.droppableProps}
            ref={provided.innerRef}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {/* All board items belong into specific column. */}
            {items.map((item: any, index: number) => (
              <BoardItem
                key={item.id}
                laneId={props.column.id}
                item={item}
                index={index}
              />
            ))}
            {provided.placeholder}
            <div
              style={{ float: 'right', marginTop: '10px', marginBottom: '6px' }}
            >
              <AddTaskFAB onClick={handleClickOpen} />
            </div>
            <CreateTaskDialog
              isOpen={open}
              close={handleClose}
              columnId={props.column.id}
            />
          </BoardColumnContent>
        )}
      </Droppable>
    </BoardColumnWrapper>
  );
});
