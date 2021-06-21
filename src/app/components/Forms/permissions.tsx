import * as React from 'react';
import { PermissionsFormModel } from 'app/workspace/user/forms/permissions';
import { Checkbox } from '@material-ui/core';
import { Role, WorkspaceActions, WorkspaceRole } from 'app/constants';
import { PaginatedTable } from 'app/components/table';
import { observer } from 'mobx-react';
import { Label } from 'app/components/inputs';

const columns = [
  {
    id: 'checkbox',
    label: '',
  },
  {
    id: 'permission',
    label: 'Permission',
  },
];

export const PermissionsForm = observer(
  (props: { form: PermissionsFormModel; permissions: string[] }) => {
    const { form, permissions } = props;
    const rows: any[] = [];
    for (const value of permissions) {
      rows.push({
        checkbox: (
          <Checkbox
            onClick={form.onSelectPermission(value)}
            checked={form.hasPermission(value)}
          />
        ),
        permission: value,
      });
    }
    return (
      <div>
        <Label>Permission Form</Label>
        <PaginatedTable columns={columns} rows={rows} />
      </div>
    );
  },
);

export const RolesForm = observer(
  (props: { form: PermissionsFormModel; roles: string[] }) => {
    const { form, roles } = props;

    const rows: any[] = [];
    for (const value of roles) {
      rows.push({
        checkbox: (
          <Checkbox
            onClick={form.onSelectRole(value)}
            checked={form.hasRole(value)}
          />
        ),
        permission: value,
      });
    }
    return (
      <div>
        <Label>Role Form</Label>
        <PaginatedTable columns={columns} rows={rows} />
      </div>
    );
  },
);
