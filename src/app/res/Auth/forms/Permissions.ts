import { UpdateWorkspaceUserPermissionsDto } from '@agoracloud/common';
import { APIRepo, FormModel } from '@mars-man/models';
import {
  BaseAdminPermissionsModel,
  AdminUserPermissionsModel,
  WorkspaceAdminPermissionsModel,
} from 'app/res/Auth';
import { WorkspaceModel } from 'app/res/Workspaces';

import * as _ from 'lodash';

interface permissions_i {
  permissions: string[];
  roles: string[];
}

export class BaseAdminPermissionsFormModel extends FormModel<permissions_i> {
  constructor(public permissions: BaseAdminPermissionsModel) {
    super({
      repo: permissions.repo,
    });
  }
  onSelectPermission(permission: string) {
    return () => {
      let change;
      if (this.hasPermission(permission))
        change = _.without(this.data.permissions, permission);
      else change = [...this.data.permissions, permission];
      this.onChange('permissions')(change);
    };
  }
  hasPermission(permission: string) {
    return this.data.permissions.includes(permission);
  }
  onSelectRole(role: string) {
    return () => {
      const change = [role];
      this.onChange('roles')(change);
    };
  }
  hasRole(role: string) {
    // console.log(JSON.stringify(this.data))
    return this.data.roles.includes(role);
  }
}

export class WorkspacePermissionsFormModel extends BaseAdminPermissionsFormModel {
  constructor(
    public permissions: WorkspaceAdminPermissionsModel,
    public workspace: WorkspaceModel,
  ) {
    super(permissions);
    this.submit = new APIRepo({
      path: this.permissions.api,
      method: 'PUT',
    });
  }
}

export class AdminPermissionsFormModel extends BaseAdminPermissionsFormModel {
  constructor(public permissions: AdminUserPermissionsModel) {
    super(permissions);
    this.submit = new APIRepo({
      path: this.permissions.api,
      method: 'PUT',
    });
  }
}
