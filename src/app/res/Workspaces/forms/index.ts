import { APIRepo, FormModel } from '@mars-man/models';
import { CreateDeploymentDto, CreateWorkspaceDto } from '@agoracloud/common';
import { WorkspaceModel } from 'app/res/Workspaces/models';

export class CreateDeploymentFormModel extends FormModel {
  constructor(public workspace: WorkspaceModel) {
    super({
      data: {
        properties: {
          image: {
            type: 'VSCODE',
          },
        },
      },
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
        ['isFavorite', 'properties.isFavorite'],
        ['sudoPassword', 'properties.sudoPassword'],
        ['type', 'properties.image.type'],
        ['version', 'properties.image.version'],
      ],
      validator: CreateDeploymentDto,
      submit: workspace.repos.createDeployment,
    });
  }
}

export class CreateProjectFormModel extends FormModel {
  constructor(public workspace: WorkspaceModel) {
    super({});
  }
}

export class UpdateWorkspaceFormModel extends FormModel {
  constructor(public workspace: WorkspaceModel) {
    super({});
  }
}

interface create_workspace_i {
  name: string;
  cpuCount?: number;
  memoryCount?: number;
  storageCount?: number;
}
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
      submit: new APIRepo({ path: '/api/workspaces', method: 'POST' }),
    });
  }
}
