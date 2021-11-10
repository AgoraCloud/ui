import { APIRepo, FormModel } from '@mars-man/models';
import { CreateDeploymentDto, UpdateDeploymentDto } from '@agoracloud/common';
import { DeploymentModel, DeploymentsModel } from 'app/res/Deployments';

import * as _ from 'lodash';

export class CreateDeploymentFormModel extends FormModel {
  constructor(public deployments: DeploymentsModel) {
    super({
      data: {
        properties: {
          image: {
            type: 'VSCODE',
          },
          scalingMethod: 'ALWAYS_ON',
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
        ['scalingMethod', 'properties.scalingMethod'],
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
        // ['scalingMethod', 'properties.scalingMethod'], // cannot update scalingMethod
      ],
      validator: UpdateDeploymentDto,
      submit: new APIRepo({ path: deployment.api, method: 'PUT' }),
    });
  }

  get payload() {
    const payload = super.payload;

    const keys = [
      'properties.resources.cpuCount',
      'properties.resources.storageCount',
      'properties.sudoPassword',
      'properties.isFavorite',
      'properties.image.version',
      'name',
    ];
    let out = {};
    for (const key of keys) {
      const oldValue = _.get(this.deployment.data, key);
      const newValue = _.get(payload, key);
      // console.log(oldValue, newValue, out)
      if (oldValue !== newValue) _.set(out, key, newValue);
    }
    console.log(out);
    return out;
  }
}
