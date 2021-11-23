import { WorkspaceWrapper } from 'app/components/Wrapper';
import { useStores } from 'app/stores';
import React from 'react';
import { Board, LaneModel, TaskModel } from 'app/res/Projects';
import { observer } from 'mobx-react';

interface ILane {
  id: string;
  title: string;
  itemsIds: string[];
}

interface ITask {
  id: string;
  title: string;
  description: string;
}

export const KanbanPage = observer((props) => {
  const { workspacesstore } = useStores();
  const project = workspacesstore.selectedProject;
  const lanes = project?.lanes;

  if (!project || !lanes) return null;

  return (
    <WorkspaceWrapper>
      <Board lanes={lanes} />
      {/*  changeLane={handleLaneChange} */}
    </WorkspaceWrapper>
  );
});
