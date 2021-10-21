import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { PermissionsBase } from 'app/res/Auth';
import { useStores } from 'app/stores';

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

export const RenderIfRole = observer(
  (props: { roles: string[]; children: React.ReactElement; wid?: string }) => {
    const { authstore } = useStores();
    const { roles, wid } = props;
    let perms: PermissionsBase = authstore.user.permissions.roles;
    if (wid) {
      perms =
        authstore.user.permissions.getWorkspacePermission(wid)?.roles || perms;
    }

    return (
      <RenderIfHas array={roles} permissions={perms}>
        {props.children}
      </RenderIfHas>
    );
  },
);

export const RenderIfPermission = observer(
  (props: {
    permissions: string[];
    children: React.ReactElement;
    wid?: string;
  }) => {
    const { authstore } = useStores();
    const { permissions, wid } = props;
    let perms: PermissionsBase = authstore.user.permissions.permissions;
    if (wid) {
      perms =
        authstore.user.permissions.getWorkspacePermission(wid)?.permissions ||
        perms;
    }

    return (
      <RenderIfHas array={permissions} permissions={perms}>
        {props.children}
      </RenderIfHas>
    );
  },
);
