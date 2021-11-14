import { DeploymentLabelingUtil } from '@agoracloud/common';
import { Model, APIRepo } from '@mars-man/models';
import { WorkspaceModel } from 'app/res/Workspaces/models';

interface label_i {
  label: string;
  value: string;
}
interface images_i {
  type: string;
  version: string;
}

export class DeploymentImagesModel extends Model<images_i[]> {
  types: string[];
  versions: { [type: string]: string[] } = {};
  constructor(public workspace: WorkspaceModel) {
    super({});

    // autoload
    this.repos = {
      main: new APIRepo({ path: this.api }),
    };
    this.load();
  }

  postLoad = async () => {
    this.types = [...new Set(this.data.map((d) => d.type))];
    for (const type of this.types) {
      this.versions[type] = [];
    }
    this.data.map((d) => {
      this.versions[d.type].push(d.version);
    });
  };

  getTypes(): label_i[] {
    return this.types.map((d) => ({
      label: DeploymentLabelingUtil.generateImageTypeLabel(d as any),
      value: d,
    }));
  }
  getVersions(type?: string): label_i[] {
    if (type != undefined && !this.versions[type]) return [];
    return this.versions[type as string].map((d) => ({
      label: DeploymentLabelingUtil.generateImageVersionLabel(d as any),
      value: d,
    }));
  }


  getLatest(type: string){
    console.log()
    return this.versions[type][0]
  }

  get api() {
    return `${this.workspace.api}/deployments/images/`;
  }
}
