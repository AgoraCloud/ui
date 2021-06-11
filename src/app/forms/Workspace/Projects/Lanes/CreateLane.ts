import { BaseFormModel } from 'app/forms/Base';
import {
  CreateProjectLaneDto,
  UpdateProjectLaneDto,
} from 'app/forms/validators';
import { Workspace, Project, Lane } from 'app/models';
import { events, eventTypes } from 'app/constants';

interface createLaneForm_i {
  name: string;
}

export class CreateLaneFormModel extends BaseFormModel<
  createLaneForm_i,
  createLaneForm_i
> {
  constructor(public workspace: Workspace, public project: Project) {
    super(CreateProjectLaneDto);

    this.data = {
      name: '',
    };
  }

  public async submit() {
    const wid = this.workspace.id;
    const pid = this.project.id;
    const res = await super.call(
      `/api/workspaces/${wid}/projects/${pid}/lanes`,
    );
    res && events.emit(eventTypes.PROJECT_LANE_CRUD, 'created');
    return res;
  }

  reset = () => {
    this.data.name = '';
  };
}

interface updateLaneForm_i {
  name: string;
}

export class EditLaneFormModel extends BaseFormModel<
  updateLaneForm_i,
  updateLaneForm_i
> {
  constructor(public project: Project, public lane: Lane) {
    super(UpdateProjectLaneDto);

    this.data = {
      name: '',
    };
  }

  submit = async () => {
    const wid = this.project.projects.workspace.id;
    const pid = this.project.id;
    const lid = this.lane.id;
    const res = await super.call(
      `/api/workspaces/${wid}/projects/${pid}/lanes/${lid}`,
      { method: 'PUT' },
    );
    res && events.emit(eventTypes.PROJECT_LANE_CRUD, 'updated');
    return res;
  };
}
