import { APIRepo, FormModel } from '@mars-man/models';
import { CreateDeploymentDto, UpdateDeploymentDto } from '@agoracloud/common';
import { DeploymentModel, DeploymentsModel } from 'app/res/Deployments';

export class CreateDeploymentFormModel extends FormModel {
  constructor(public deployments: DeploymentsModel) {
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
      submit: new APIRepo({ path: deployments.api, method: 'POST' }),
    });
  }
}

export class EditDeploymentFormModel extends FormModel {
  constructor(public deployment: DeploymentModel) {
    super({
      data: {
        name: deployment.data.name,
        properties: {
          isFavorite: false,
          image: deployment.data.properties.image,
          resources: {
            cpuCount: deployment.data.properties.resources.cpuCount,
            memoryCount: deployment.data.properties.resources.memoryCount,
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
      validator: UpdateDeploymentDto,
      submit: new APIRepo({ path: deployment.api, method: 'PUT' }),
    });
  }
}