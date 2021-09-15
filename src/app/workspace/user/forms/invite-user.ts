import { BaseFormModel } from 'app/forms/base';
import { Workspace } from 'app/workspace';
import { events, eventTypes } from 'app/constants';

export class InviteUserFormModel extends BaseFormModel<any, any> {
  constructor(public workspace: Workspace) {
    super(undefined);
    this.data = {
      id: '',
    };
  }

  submit = async () => {
    const res = await this.call(`${this.workspace.api}users`, {
      method: 'PUT',
    });
    if (res) events.emit(eventTypes.WORKSPACE_USER_CRUD, 'added');
    else events.emit(eventTypes.WORKSPACE_USER_ERR, 'error adding user');
    return res;
  };
}
