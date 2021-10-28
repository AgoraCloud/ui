import { AddWorkspaceUserDto } from '@agoracloud/common';
import { APIRepo, FormModel } from '@mars-man/models';
import { WorkspaceModel } from 'app/res/Workspaces';

export class InviteUserFormModel extends FormModel {
  constructor(workspace: WorkspaceModel) {
    super({
      data: {
        email: '',
      },
      validator: AddWorkspaceUserDto,
      submit: new APIRepo({ path: `${workspace.api}/users`, method: 'PUT' }),
    });
  }
}
