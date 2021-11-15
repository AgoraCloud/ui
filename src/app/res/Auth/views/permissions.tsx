import * as React from 'react';
import { Checkbox } from '@material-ui/core';
import { PaginatedTable } from 'app/components';
import { observer } from 'mobx-react';
import { Label } from 'app/components/inputs';
import { BaseAdminPermissionsFormModel } from 'app/res/Auth';

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
  (props: { form: BaseAdminPermissionsFormModel; permissions: string[] }) => {
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
  (props: { form: BaseAdminPermissionsFormModel; roles: string[] }) => {
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
