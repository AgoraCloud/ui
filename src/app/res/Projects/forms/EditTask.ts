import { CreateProjectTaskDto } from '@agoracloud/common';
import { APIRepo, FormModel } from '@mars-man/models';
import { types } from 'app/constants';
import { TaskModel } from '..';

interface updateLaneForm_i {
  title: string;
  description?: string;
  // lane?: UpdateProjectTaskLaneDto;
}

export class EditTaskFormModel extends FormModel<updateLaneForm_i> {
  constructor(public task: TaskModel) {
    super({
      validator: CreateProjectTaskDto,
      data: {
        title: task.title,
        description: task.description,
      },
      submit: new APIRepo({
        path: task.api,
        method: 'PUT',
        events: types.LANE_TASKS_CRUD,
      }),
    });
  }
}
