import { BaseFormModel } from 'app/forms/base';
import {
  UpdateWorkspaceDto,
  UpdateWorkspaceResourcesDto,
} from 'app/forms/validators';

interface update_workspace_i {
  name?: string;
  properties: {
    resources: {
      cpuCount?: number;
      memoryCount?: number;
      storageCount?: number;
    };
  };
}
export class UpdateWorkspaceFormModel extends BaseFormModel<
  update_workspace_i,
  update_workspace_i
> {
  constructor() {
    super(UpdateWorkspaceDto);
    this.data = {
      name: undefined,
      properties: {
        resources: {
          cpuCount: undefined,
          memoryCount: undefined,
          storageCount: undefined,
        },
      },
    };
  }

  toDB = () => {
    let { name, properties } = this.data;
    name = name ? this.data.name : undefined;
    const resources: UpdateWorkspaceResourcesDto = properties?.resources;
    const newProperties = {
      resources: {
        cpuCount: resources?.cpuCount ? Number(resources.cpuCount) : undefined,
        memoryCount: resources?.memoryCount
          ? Number(resources.memoryCount)
          : undefined,
        storageCount: resources?.storageCount
          ? Number(resources.storageCount)
          : undefined,
      },
    };
    return {
      name,
      properties: newProperties,
    };
  };

  submit = async (wid: string) => {
    return await super.call(`/api/workspaces/${wid}`, { method: 'PUT' });
  };

  delete = async (wid: string) => {
    return await super.call(`/api/workspaces/${wid}`, { method: 'DELETE' });
  };
}
