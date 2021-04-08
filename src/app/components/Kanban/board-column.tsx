import * as React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import { MoreMenu } from 'app/components/Inputs'
// Import BoardItem component
import { BoardItem } from './board-item'
import { Typography, Grid, Button } from '@material-ui/core';
import { EditLaneDialog } from "app/components/Inputs/Modal"
import { inject, observer } from 'mobx-react'
import { WORKSPACES_STORE, UI_STORE } from 'app/constants'
import { WorkspacesStore, UIStore } from 'app/stores'
import { AddTaskFAB } from "app/components/Inputs/Buttons"
import { CreateTaskDialog } from "app/components/Inputs/Modal"
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';

// Define types for board column element properties
type BoardColumnProps = {
  key: string,
  column: any,
  items: any,
}

// Define types for board column content style properties
// This is necessary for TypeScript to accept the 'isDraggingOver' prop.
type BoardColumnContentStylesProps = {
  isDraggingOver: boolean
}

// Create styles for BoardColumnWrapper element
const BoardColumnWrapper = styled.div`
  flex: 1;
  padding: 8px;
  background-color: #e5eff5;
  border-radius: 4px;

  & + & {
    margin-left: 12px;
  }
`


export const BoardColumnOptions = inject(WORKSPACES_STORE, UI_STORE)(observer((props) => {
  const store = props[WORKSPACES_STORE] as WorkspacesStore
  const uistore = props[UI_STORE] as UIStore
  const project = store.selectedProject!
  const lane = project.lanes.getById(props.columnId)!

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  return <>
    <MoreMenu options={[
        {
            name: "Edit",
            onClick: () => {
                // store.push(deployment.link + 'edit/')
                handleClickOpen()
            }
        },
        {
            name: "Delete",
            onClick: () => {
                uistore.setDeleteTarget(lane.name, lane.delete)
            }
        }
    ]} />
    <EditLaneDialog isOpen={open} close={handleClose} columnId={props.columnId} />
    </>
}))

export const BoardColumnHeader = (props) => {
  return <div style={{ margin: '12px'}}>
      <Grid justify="space-between" container spacing={3}>
        <Grid item >
          <Typography variant="h5" color="inherit">
            {props.title}
          </Typography>
        </Grid>
        <Grid item >
          <div style={{marginRight:'-16px', marginTop:'-9px'}}>
            <BoardColumnOptions columnId={props.id} />
          </div>
        </Grid>
      </Grid>
      
    </div>
}


// Create styles for BoardColumnContent element
const BoardColumnContent = styled.div<BoardColumnContentStylesProps>`
  min-height: 10px;
  background-color: ${props => props.isDraggingOver ? '#aecde0' : null};
  border-radius: 4px;
`

// Create and export the BoardColumn component
export const BoardColumn: React.FC<BoardColumnProps> = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return(
    <BoardColumnWrapper>
      <BoardColumnHeader title = {props.column.title} id={props.column.id} />
      <Droppable droppableId={props.column.id}>
        {(provided, snapshot) => (
          <BoardColumnContent
            {...provided.droppableProps}
            ref={provided.innerRef}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {/* All board items belong into specific column. */}
            {props.items.map((item: any, index: number) => <BoardItem key={item.id} laneId={props.column.id} item={item} index={index} />)}
            {provided.placeholder}
            <div style={{float:"right", marginTop:"10px", marginBottom: "6px"}}>
              <AddTaskFAB onClick={handleClickOpen} />
            </div>
            <CreateTaskDialog isOpen={open} close={handleClose} columnId={props.column.id} /> 
          </BoardColumnContent>
        )}
      </Droppable>
    </BoardColumnWrapper>
  )
}