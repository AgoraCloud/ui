import * as React from 'react';
import { WORKSPACES_STORE } from 'app/constants';
import { observer, inject } from 'mobx-react';
import { WorkspacesStore } from 'app/stores';
import { HomeWrapper } from 'app/containers/Home';
import { Board } from 'app/components/Kanban/board';

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

export const Lanes = inject(WORKSPACES_STORE)(
  observer((props) => {
    const store = props[WORKSPACES_STORE] as WorkspacesStore;
    const project = store.selectedProject;
    const lanes = project?.lanes;
    const tasks: { [taskId: string]: ITask } = {};

    if (!project || !lanes) return null;

    const handleLaneChange = async (
      from: string,
      to: string,
      taskId: string,
    ) => {
      // console.log("THIS IS THE DATA RECEVIED: ", from, to, taskId)
      const lane = lanes.getById(from);
      const task = lane?.tasks.getById(taskId);
      // console.log("This is what I found: ", lane, task)
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

    // console.log("LOOK AT THIS")
    // console.log(tasks)
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
      <HomeWrapper>
        <Board data={boardData} changeLane={handleLaneChange} />
      </HomeWrapper>
    );
  }),
);
