import { WorkspaceWrapper } from 'app/components/Wrapper';
import { useStores } from 'app/stores';
import { observer } from 'mobx-react';
import React from 'react';

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

export const LanePages = observer((props) => {
  const { workspacesstore } = useStores();
  const project = workspacesstore.selectedProject;
  const lanes = project?.lanes;
  const tasks: { [taskId: string]: ITask } = {};

  if (!project || !lanes) return null;

  const handleLaneChange = async (from: string, to: string, taskId: string) => {
    const lane = lanes.getById(from);
    const task = lane?.tasks.getById(taskId);
    await task?.changeLane(task.title, task.description, to);
  };

  lanes.lanes.forEach((lane) => {
    lane.tasks.tasks.forEach((task) => {
      tasks[task.id] = {
        id: task.id,
        title: task.title,
        description: task.description,
      };
    });
  });

  const data: { [laneName: string]: ILane } = {};
  const lanesOrder: string[] = [];

  lanes.lanes.forEach((lane) => {
    const collectedTasks: string[] = [];
    lane.tasks.tasks.forEach((task) => {
      collectedTasks.push(task.id);
    });
    data[lane.id] = {
      id: lane.id,
      title: lane.name,
      itemsIds: collectedTasks,
    };
    lanesOrder.push(lane.id);
  });

  const boardData = {
    items: tasks,
    columns: data,
    columnsOrder: lanesOrder,
  };

  return (
    <WorkspaceWrapper>
      <Board data={boardData} changeLane={handleLaneChange} />
    </WorkspaceWrapper>
  );
});
