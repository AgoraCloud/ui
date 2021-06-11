import { RootStore } from 'app/stores/RootStore';
import { observable } from 'mobx';
import { User } from 'app/models';
import { UpdateUserFormModel } from 'app/forms/User';
import { events, eventTypes } from 'app/constants';

export class UserStore {
  @observable user: User;
  @observable updateUserForm: UpdateUserFormModel;

  constructor(private rootStore: RootStore) {
    this.user = new User();
    this.updateUserForm = new UpdateUserFormModel();
    // this.updateUserForm = new UpdateUserFormModel(this.user)
    //this.load()
    events.on(eventTypes.USER_CRUD, () => {
      this.load();
    });
  }

  get state() {
    return this.user.state;
  }

  load = async () => {
    await this.user.load();
  };

  updateUser = async () => {
    const form = this.updateUserForm;
    const successful = await form.submit();
    if (successful) {
      events.emit(eventTypes.USER_CRUD, 'updated');
    } else {
      events.emit(eventTypes.USER_ERR, form.message);
    }
    return successful;
  };
}
