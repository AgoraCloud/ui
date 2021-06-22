import { observable } from 'mobx';
import { ConfirmDelete } from 'app/workspace/user/forms';
import { RootStore } from './root-store';

export class UIStore {
  @observable confirmDelete?: ConfirmDelete;
  @observable open: boolean;
  constructor(public rootStore: RootStore) {
    this.open = false;
  }

  setDeleteTarget = (name, callBack) => {
    this.confirmDelete = new ConfirmDelete(name, callBack);
    this.open = true;
    this.confirmDelete.dialog.onOpen();
  };
}
