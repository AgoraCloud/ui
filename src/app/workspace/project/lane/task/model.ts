import { observable, computed } from 'mobx';
import { Lane } from '../model';
import { Project } from '../../model';
import { EditTaskFormModel } from './create-task-form';
import { BaseModelCollection, BaseModelItem } from 'app/base-model';
import { events, eventTypes } from 'app/constants';

export class Tasks {
  @observable state: 'loaded' | 'error' | 'loading' | 'unloaded';

  @observable _tasks: Task[] = [];

  constructor(public lane: Lane, public project: Project) {
    this.state = 'unloaded';

    // events.on(eventTypes.LANE_TASKS_CRUD, () => {
    //     this.load()
    // })
  }

  load = async () => {
    this.state = 'loading';
    const wid = this.project.projects.workspace.id;
    const pid = this.project.id;
    const lid = this.lane.id;
    const response = await fetch(
      `/api/workspaces/${wid}/projects/${pid}/lanes/${lid}/tasks`,
      {},
    );

    const data = await response.json();
    this._tasks = data.map((data) => new Task(this, data));

    this.state = 'loaded';
  };

  get tasks() {
    return this._tasks || [];
  }

  getById = (id?: string): Task | undefined => {
    return this.tasks.filter((t: Task) => t.id === id)[0];
  };
}

interface taskData_i {
  title: string;
  description: string;
  user: {
    fullName: string;
    email: string;
    id: string;
  };
  workspace: {
    name: string;
    properties: {
      resources: {
        cpuCount: number;
        memoryCount: number;
        storageCount: number;
      };
    };
    users: [
      {
        fullName: string;
        email: string;
        id: string;
      },
    ];
    id: string;
  };
  project: {
    name: string;
    description: string;
    user: {
      fullName: string;
      email: string;
      id: string;
    };
    workspace: {
      name: string;
      properties: {
        resources: {
          cpuCount: number;
          memoryCount: number;
          storageCount: number;
        };
      };
      users: [
        {
          fullName: string;
          email: string;
          id: string;
        },
      ];
      id: string;
    };
    id: string;
  };
  lane: {
    name: string;
    user: {
      fullName: string;
      email: string;
      id: string;
    };
    workspace: {
      name: string;
      properties: {
        resources: {
          cpuCount: number;
          memoryCount: number;
          storageCount: number;
        };
      };
      users: [
        {
          fullName: string;
          email: string;
          id: string;
        },
      ];
      id: string;
    };
    project: {
      name: string;
      description: string;
      user: {
        fullName: string;
        email: string;
        id: string;
      };
      workspace: {
        name: string;
        properties: {
          resources: {
            cpuCount: number;
            memoryCount: number;
            storageCount: number;
          };
        };
        users: [
          {
            fullName: string;
            email: string;
            id: string;
          },
        ];
        id: string;
      };
      id: string;
    };
    id: string;
  };
  id: string;
}
export class Task {
  /**
   * A single project
   */
  @observable form: EditTaskFormModel;
  constructor(public tasks: Tasks, public data: taskData_i) {
    this.form = new EditTaskFormModel(this.tasks.lane, this);
    this.form.fromDB(data as any);
  }

  get id() {
    return this.data.id;
  }

  get title() {
    return this.data.title;
  }

  get description() {
    return this.data.description;
  }

  delete = async () => {
    try {
      const wid = this.tasks.project.projects.workspace.id;
      const pid = this.tasks.project.id;
      const lid = this.tasks.lane.id;
      const tid = this.id;
      const res = await fetch(
        `api/workspaces/${wid}/projects/${pid}/lanes/${lid}/tasks/${tid}`,
        { method: 'DELETE' },
      );
      res && events.emit(eventTypes.LANE_TASKS_CRUD, 'deleted');
    } catch (e) {
      console.warn(e);
      events.emit(eventTypes.LANE_TASKS_ERR, 'failed to delete');
    }
  };

  changeLane = async (ptitle: string, pdescription: string, toLane: string) => {
    try {
      const wid = this.tasks.project.projects.workspace.id;
      const pid = this.tasks.project.id;
      const lid = this.tasks.lane.id;
      const tid = this.id;
      const res = await fetch(
        `/api/workspaces/${wid}/projects/${pid}/lanes/${lid}/tasks/${tid}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: ptitle,
            description: pdescription,
            lane: { id: toLane },
          }),
        },
      );
      res && events.emit(eventTypes.LANE_TASK_MOVED);
    } catch (e) {
      console.warn(e);
    }
  };
}
