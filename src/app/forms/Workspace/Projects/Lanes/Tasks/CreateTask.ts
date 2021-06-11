import { BaseFormModel } from 'app/forms/Base';
import {
  CreateProjectTaskDto,
  UpdateProjectTaskDto,
  UpdateProjectTaskLaneDto,
} from 'app/forms/validators';
import { Project, Lane, Task } from 'app/models';
import { events, eventTypes } from 'app/constants';

interface createTaskForm_i {
  title: string;
  description?: string;
}

export class CreateTaskFormModel extends BaseFormModel<
  createTaskForm_i,
  createTaskForm_i
> {
  constructor(public project: Project, public lane: Lane) {
    super(CreateProjectTaskDto);

    this.data = {
      title: '',
      description: undefined,
    };
  }

  toDB = () => {
    let { title, description } = this.data;

    return {
      title,
      description: description || undefined,
    };
  };

  public async submit() {
    const wid = this.project.projects.workspace.id;
    const pid = this.project.id;
    const lid = this.lane.id;
    const res = await super.call(
      `/api/workspaces/${wid}/projects/${pid}/lanes/${lid}/tasks`,
    );
    res && events.emit(eventTypes.LANE_TASKS_CRUD, 'created');
    return res;
  }

  reset = () => {
    this.data.title = '';
    this.data.description = '';
  };
}

interface updateLaneForm_i {
  title: string;
  description?: string;
  lane?: UpdateProjectTaskLaneDto;
}

export class EditTaskFormModel extends BaseFormModel<
  updateLaneForm_i,
  updateLaneForm_i
> {
  constructor(public lane: Lane, public task: Task) {
    super(UpdateProjectTaskDto);

    this.data = {
      title: '',
      description: undefined,
    };
  }

  toDB = () => {
    let { title, description } = this.data;

    return {
      title,
      description: description || undefined,
    };
  };

  submit = async () => {
    const wid = this.lane.lanes.project.projects.workspace.id;
    const pid = this.lane.lanes.project.id;
    const lid = this.lane.id;
    const tid = this.task.id;
    const res = await super.call(
      `/api/workspaces/${wid}/projects/${pid}/lanes/${lid}/tasks/${tid}`,
      { method: 'PUT' },
    );
    res && events.emit(eventTypes.LANE_TASKS_CRUD, 'updated');
    return res;
  };
}
