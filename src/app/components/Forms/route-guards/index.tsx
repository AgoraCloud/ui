import * as React from 'react';
import { USER_STORE } from 'app/constants';
import { observer, inject } from 'mobx-react';
import { UserStore } from 'app/stores';
import { PermissionsBase } from 'app/workspace/user/models';

export const RenderIf = (props: {
  if: boolean;
  children: React.ReactElement;
}) => {
  if (!props.if) return null;
  return props.children;
};

export const RenderIfHas = (props: {
  array: string[];
  permissions: PermissionsBase;
  children: React.ReactElement;
}) => {
  const { array, permissions } = props;
  let allow = false;
  for (const perm of array) {
    if (permissions.has(perm)) {
      allow = true;
      break;
    }
  }

  if (allow) return props.children;
  return null;
};

export const RenderIfRole = inject(USER_STORE)(
  observer(
    (props: {
      roles: string[];
      children: React.ReactElement;
      wid?: string;
    }) => {
      const store = props[USER_STORE] as UserStore;
      const { roles, wid } = props;
      let perms: PermissionsBase = store.user.permissions.roles;
      if (wid) {
        perms =
          store.user.permissions.getWorkspacePermission(wid)?.roles || perms;
      }

      return (
        <RenderIfHas array={roles} permissions={perms}>
          {props.children}
        </RenderIfHas>
      );
    },
  ),
);

export const RenderIfPermission = inject(USER_STORE)(
  observer(
    (props: {
      permissions: string[];
      children: React.ReactElement;
      wid?: string;
    }) => {
      const store = props[USER_STORE] as UserStore;
      const { permissions, wid } = props;
      let perms: PermissionsBase = store.user.permissions.permissions;
      if (wid) {
        perms =
          store.user.permissions.getWorkspacePermission(wid)?.permissions ||
          perms;
      }

      return (
        <RenderIfHas array={permissions} permissions={perms}>
          {props.children}
        </RenderIfHas>
      );
    },
  ),
);
