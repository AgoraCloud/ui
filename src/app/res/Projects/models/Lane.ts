import {
  ProjectModel,
  TasksModel,
  CreateLaneFormModel,
} from 'app/res/Projects';
import { EditLaneFormModel } from 'app/res/Projects';
import { events, types } from 'app/constants';
import { APIRepo, CollectionModel, Model } from '@mars-man/models';
import { add, update } from 'app/constants/helpers';

export class LanesModel extends CollectionModel {
  createLaneForm: CreateLaneFormModel;

  constructor(public project: ProjectModel) {
    super({
      collections: LaneModel,
    });
    events.on(types.PROJECT_LANE_CRUD.onLoad.type, () => {
      this.load();
    });
    events.on(types.LANE_TASKS_CRUD.onLoad.type, () => {
      this.load();
    });
    events.on(types.LANE_TASK_MOVED.onLoad.type, () => {
      this.load();
    });

    this.createLaneForm = new CreateLaneFormModel(this);
    this.repos = {
      main: new APIRepo({ path: this.api }),
    };
    add(this, this.createLaneForm.submit);
  }

  get api() {
    return `${this.project.api}/lanes`;
  }
  get link() {
    return `${this.project.link}/lanes`;
  }

  get lanes() {
    return (this.collection.models || []) as LaneModel[];
  }
}

interface laneData_i {
  name: string;
  project: {
    name: string;
    description: string;
    user: {
      fullName: string;
      email: string;
      id: string;
    };
  };
  id: string;
}
export class LaneModel extends Model {
  lanes: LanesModel;
  tasks: TasksModel;
  editLaneForm: EditLaneFormModel;
  delete: APIRepo;
  /**
   * A single project
   */

  constructor(config) {
    super(config);
    this.lanes = this.parent as LanesModel;
    this.tasks = new TasksModel(this);
    this.editLaneForm = new EditLaneFormModel(this);
    this.delete = new APIRepo({
      path: this.api,
      method: 'DELETE',
      events: types.PROJECT_LANE_CRUD,
    });
    this.dependents = [this.tasks];
    update(this, this.editLaneForm.submit);
  }

  get id() {
    return this.data.id;
  }

  get name() {
    return this.data.name;
  }

  get link() {
    return `${this.lanes.link}/l/${this.id}`;
  }

  get api() {
    return `${this.lanes.api}/${this.id}`;
  }

  load = async () => {
    if (this.tasks.state != 'loaded') await this.tasks.load();
  };

  // delete = async () => {
  //   try {
  //     const wid = this.lanes.workspace.id;
  //     const pid = this.lanes.project.id;
  //     const lid = this.id;
  //     const res = await fetch(
  //       `api/workspaces/${wid}/projects/${pid}/lanes/${lid}`,
  //       { method: 'DELETE' },
  //     );
  //     res && events.emit(eventTypes.PROJECT_LANE_CRUD, 'deleted');
  //   } catch (e) {
  //     console.warn(e);
  //     events.emit(eventTypes.PROJECT_LANE_ERR, 'failed to delete');
  //   }
  // };
}
