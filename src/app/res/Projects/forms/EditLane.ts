import { UpdateProjectLaneDto } from '@agoracloud/common';
import { APIRepo, FormModel } from '@mars-man/models';
import { types } from 'app/constants';
import { LaneModel } from 'app/res/Projects';

interface updateLaneForm_i {
  name: string;
}

export class EditLaneFormModel extends FormModel<updateLaneForm_i> {
  constructor(public lane: LaneModel) {
    super({
      validator: UpdateProjectLaneDto,
      data: { name: lane.name },
      submit: new APIRepo({
        path: lane.api,
        method: 'PUT',
        events: types.PROJECT_LANE_CRUD,
      }),
    });
    this.data = {
      name: '',
    };
  }
}
