import {
  CreateTaskFormModel,
  EditTaskFormModel,
  LaneModel,
} from 'app/res/Projects';
import { APIRepo, CollectionModel, Model } from '@mars-man/models';
import { types } from 'app/constants';
import { add, remove } from 'app/constants/helpers';

export class TasksModel extends CollectionModel {
  createTaskForm: CreateTaskFormModel;

  constructor(public lane: LaneModel) {
    super({
      collections: TaskModel,
    });
    this.repos = {
      main: new APIRepo({ path: this.api }),
    };
    this.createTaskForm = new CreateTaskFormModel(this);
    add(this, this.createTaskForm.submit);
  }
  get api() {
    return `${this.lane.api}/tasks`;
  }

  get tasks() {
    return (this.collection.models || []) as TaskModel[];
  }
  // getById = (id?: string): Task | undefined => {
  //   return this.tasks.filter((t: Task) => t.id === id)[0];
  // };
}

interface taskData_i {
  title: string;
  description: string;
  project: {
    name: string;
    description: string;
    user: {
      fullName: string;
      email: string;
      id: string;
    };
    id: string;
  };
  lane: {
    name: string;
    id: string;
  };
  id: string;
}
export class TaskModel extends Model {
  tasks: TasksModel;
  editTaskForm: EditTaskFormModel;
  delete: APIRepo;
  /**
   * A single project
   */
  constructor(config) {
    super(config);
    this.tasks = this.parent as TasksModel;
    this.editTaskForm = new EditTaskFormModel(this);
    this.delete = new APIRepo({
      path: this.api,
      method: 'DELETE',
      events: types.LANE_TASKS_CRUD,
    });

    remove(this, this.delete);
  }

  get id() {
    return this.data.id;
  }

  get api() {
    return `${this.tasks.api}/${this.id}`;
  }

  get title() {
    return this.data.title;
  }

  get description() {
    return this.data.description;
  }
  changeLane = (laneId: string) => {};
  onDelete = async () => {
    await this.delete.call();
  };
  // delete = async () => {
  //   try {
  //     const wid = this.tasks.project.projects.workspace.id;
  //     const pid = this.tasks.project.id;
  //     const lid = this.tasks.lane.id;
  //     const tid = this.id;
  //     const res = await fetch(
  //       `api/workspaces/${wid}/projects/${pid}/lanes/${lid}/tasks/${tid}`,
  //       { method: 'DELETE' },
  //     );
  //     res && events.emit(eventTypes.LANE_TASKS_CRUD, 'deleted');
  //   } catch (e) {
  //     console.warn(e);
  //     events.emit(eventTypes.LANE_TASKS_ERR, 'failed to delete');
  //   }
  // };

  // changeLane = async (ptitle: string, pdescription: string, toLane: string) => {
  //   try {
  //     const wid = this.tasks.project.projects.workspace.id;
  //     const pid = this.tasks.project.id;
  //     const lid = this.tasks.lane.id;
  //     const tid = this.id;
  //     const res = await fetch(
  //       `/api/workspaces/${wid}/projects/${pid}/lanes/${lid}/tasks/${tid}`,
  //       {
  //         method: 'PUT',
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify({
  //           title: ptitle,
  //           description: pdescription,
  //           lane: { id: toLane },
  //         }),
  //       },
  //     );
  //     res && events.emit(eventTypes.LANE_TASK_MOVED);
  //   } catch (e) {
  //     console.warn(e);
  //   }
  // };
}
