import * as React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { CustomCard } from './card';

// Define types for board item element properties
type BoardItemProps = {
  index: number;
  item: any;
  laneId: string;
};

// Define types for board item element style properties
// This is necessary for TypeScript to accept the 'isDragging' prop.
type BoardItemStylesProps = {
  isDragging: boolean;
};

// Create style for board item element
const BoardItemEl = styled.div<BoardItemStylesProps>`
  padding: 8px;
  background-color: ${(props) => (props.isDragging ? '#d3e4ee' : 'none')};
  border-radius: 4px;
  transition: background-color 0.25s ease-out;

  &:hover {
    background-color: #2196f3;
  }

  & + & {
    margin-top: 4px;
  }
`;

// Create and export the BoardItem component
export const BoardItem = (props: BoardItemProps) => {
  return (
    <Draggable draggableId={props.item.id} index={props.index}>
      {(provided, snapshot) => (
        <BoardItemEl
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          {/* The content of the BoardItem */}
          {/* {"Title: " + props.item.title}
        <Divider style={{marginTop: "10px", marginBottom: "10px"}} />
        {"Description: " + props.item.description} */}
          <CustomCard
            id={props.item.id}
            title={props.item.title}
            description={props.item.description}
            laneId={props.laneId}
          />
        </BoardItemEl>
      )}
    </Draggable>
  );
};
