import { APIRepo, FormModel } from '@mars-man/models';
import { CreateWorkspaceDto } from '@agoracloud/common';
import { WorkspaceModel } from 'app/res/Workspaces/models';
import { NumberCast } from 'app/constants/helpers';

export class CreateProjectFormModel extends FormModel {
  constructor(public workspace: WorkspaceModel) {
    super({});
  }
}

export class UpdateWorkspaceFormModel extends FormModel {
  constructor(public workspace: WorkspaceModel) {
    super({
      data: workspace.data,
      keys: [
        ['cpuCount', { key: 'properties.resources.cpuCount', cast: Number }],
        [
          'memoryCount',
          { key: 'properties.resources.memoryCount', cast: Number },
        ],
        [
          'storageCount',
          { key: 'properties.resources.storageCount', cast: Number },
        ],
      ],
      submit: new APIRepo({ path: workspace.api, method: 'PUT' }),
    });
  }
}

// interface create_workspace_i {
//   name: string;
//   cpuCount?: number;
//   memoryCount?: number;
//   storageCount?: number;
// }
type create_workspace_i = any;
export class CreateWorkspaceFormModel extends FormModel<create_workspace_i> {
  constructor() {
    super({
      validator: CreateWorkspaceDto,
      data: {
        name: '',
        properties: {
          resources: {
            cpuCount: undefined,
            memoryCount: undefined,
            storageCount: undefined,
          },
        },
      },
      keys: [
        [
          'cpuCount',
          { key: 'properties.resources.cpuCount', cast: NumberCast },
        ],
        [
          'memoryCount',
          { key: 'properties.resources.memoryCount', cast: NumberCast },
        ],
        [
          'storageCount',
          { key: 'properties.resources.storageCount', cast: NumberCast },
        ],
      ],
      submit: new APIRepo({ path: '/api/workspaces', method: 'POST' }),
    });
  }
}
