import { CreateProjectTaskDto } from "@agoracloud/common";
import { APIRepo, FormModel } from "@mars-man/models";
import { types } from "app/constants";
import { TasksModel } from "app/res/Projects";

interface createTaskForm_i {
  title: string;
  description?: string;
}

export class CreateTaskFormModel extends FormModel<
  createTaskForm_i
> {
  constructor(public tasks: TasksModel) {
    super({
      validator: CreateProjectTaskDto,
      data: {
        title: '',
        description: undefined,
      },
      submit: new APIRepo({
        path: tasks.api,
        method: 'POST',
        events: types.LANE_TASKS_CRUD
      })
    });
  }

  reset = () => {
    this.data.title = '';
    this.data.description = '';
  };
}

