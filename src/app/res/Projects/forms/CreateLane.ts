import { LanesModel } from 'app/res/Projects';
import { types } from 'app/constants';
import { CreateProjectLaneDto } from '@agoracloud/common';
import { APIRepo, FormModel } from '@mars-man/models';

interface createLaneForm_i {
  name: string;
}

export class CreateLaneFormModel extends FormModel<createLaneForm_i> {
  constructor(public lanes: LanesModel) {
    super({
      validator: CreateProjectLaneDto,
      data: {
        name: '',
      },
      submit: new APIRepo({
        path: lanes.api,
        method: 'POST',
        events: types.PROJECT_LANE_CRUD,
      }),
    });
  }

  reset = () => {
    this.data.name = '';
  };
}
