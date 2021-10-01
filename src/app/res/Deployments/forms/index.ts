import { FormModel } from '@mars-man/models';
import { CreateDeploymentDto } from '@agoracloud/common';
import { WorkspaceModel } from 'app/res/Workspaces/models';

export class EditDeploymentFormModel extends FormModel {
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
    });
  }
}
