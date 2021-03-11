import { BaseFormModel } from "app/forms/Base";
import { CreateDeploymentDto, UpdateDeploymentDto } from "app/forms/validators";
import { Workspace, Deployment } from "app/models";

interface deploymentForm_i {
  name: string;
  cpuCount: number;
  memoryCount: number;
}
interface createDeploymentForm_i extends deploymentForm_i {
  name: string;
  sudoPassword: string;
  cpuCount: number;
  memoryCount: number;
  storageCount: number;
  image?: {
    name: string;
    tag: string;
  };
}
interface deploymentFormDB_i {
  name: string;
  properties: {
    sudoPassword: string;
    resources: {
      cpuCount: number;
      memoryCount: number;
    };
  };
}

interface createDeploymentFormDB_i extends deploymentForm_i {
  name: string;
  sudoPassword: string;
  cpuCount: number;
  memoryCount: number;
  storageCount: number;
  image?: {
    name: string;
    tag: string;
  };
}
export class CreateDeploymentFormModel extends BaseFormModel<
  createDeploymentFormDB_i,
  createDeploymentFormDB_i
> {
  constructor(public workspace: Workspace) {
    super(CreateDeploymentDto);

    this.data = {
      sudoPassword: "",
      name: "",
      cpuCount: 1,
      memoryCount: 2,
      storageCount: 8,
    };

    this.meta = {
      conversions: [
        { from: "name", to: "name" },
        { from: "sudoPassword", to: "properties.sudoPassword" },
        { from: "image", to: "properties.image" },
        { from: "cpuCount", to: { key: "properties.resources.cpuCount", cast: Number } },
        { from: "memoryCount", to: { key: "properties.resources.memoryCount", cast: Number } },
        { from: "storageCount", to: { key: "properties.resources.storageCount", cast: Number } },
      ],
    };
  }

  public async submit() {
    const wid = this.workspace.id;
    return await super.call(`/api/workspaces/${wid}/deployments`);
  }
}

export class EditDeploymentFormModel extends BaseFormModel<deploymentForm_i, deploymentFormDB_i> {
  workspace: Workspace;
  constructor(public deployment: Deployment) {
    super(UpdateDeploymentDto);
    this.workspace = this.deployment.deployments.workspace;

    this.data = {
      name: "",
      cpuCount: 1,
      memoryCount: 2,
    };

    this.meta = {
      conversions: [
        { from: "name", to: "name" },
        { from: "cpuCount", to: { key: "properties.resources.cpuCount", cast: Number } },
        { from: "memoryCount", to: { key: "properties.resources.memoryCount", cast: Number } },
      ],
    };
  }

  submit = async () => {
    const wid = this.workspace.id;
    const did = this.deployment.id;
    return await super.call(`/api/workspaces/${wid}/deployments/${did}`, { method: "PUT" });
  };
}
