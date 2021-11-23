import { UpdateProjectDto } from '@agoracloud/common';
import { APIRepo, FormModel } from '@mars-man/models';
import { types } from 'app/constants';
import { ProjectModel } from 'app/res/Projects';

interface updateProjectForm_i {
  name?: string;
  description?: string;
}

export class EditProjectFormModel extends FormModel<updateProjectForm_i> {
  constructor(public project: ProjectModel) {
    super({
      validator: UpdateProjectDto,
      data: {
        name: project.name,
        description: project.description,
      },
      submit: new APIRepo({
        path: project.api,
        method: 'PUT',
        events: types.PROJECT_CRUD,
      }),
    });
  }

  reset = () => {
    this.data.name = '';
    this.data.description = '';
  };
}
