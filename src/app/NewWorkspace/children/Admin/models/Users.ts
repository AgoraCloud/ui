import { APIRepo, CollectionModel, Model } from '@mars-man/models';
import { WorkspaceModel } from 'app/NewWorkspace/models';
import { WorkspaceAdminModel } from '.';
import { InviteWorkspaceUserFormModel } from '../forms';

export class WorkspaceUsersModel extends CollectionModel {
  /**
   * Collection of workspace users
   */
  repos = {
    main: new APIRepo({ path: this.api }),
  };
  forms = {
    invite: new InviteWorkspaceUserFormModel(),
  };
  constructor(
    public workspace: WorkspaceModel,
    public workspaceAdmin: WorkspaceAdminModel,
  ) {
    super({
      collections: WorkspaceUserModel,
    });
  }

  get api() {
    return `${this.workspace.api}/users`;
  }
}
export class WorkspaceUserModel extends Model {
  /**
   * A single workspace users
   */

  repos = {
    remove: new APIRepo({ path: this.api }),
  };
  constructor(data, public workspaceUsersModel: WorkspaceUsersModel) {
    super({ data });
  }

  get id() {
    return this.data.id;
  }
  get api() {
    return `${this.workspaceUsersModel.api}/${this.id}`;
  }
}
