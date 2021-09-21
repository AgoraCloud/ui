import { APIRepo, CollectionModel, Model } from '@mars-man/models';
import { WorkspaceModel } from 'app/NewWorkspace/models';

export class ShortcutsModel extends CollectionModel {
  /**
   * Collection of workspace objects
   */
  repos = {
    main: new APIRepo({ path: this.api }),
    create: new APIRepo({ path: this.api, method: 'POST' }),
  };
  constructor(public workspace: WorkspaceModel) {
    super({
      collections: ShortcutModel,
    });
  }



  get api() {
    return `${this.workspace.api}/shortcuts`;
  }
}
export class ShortcutModel extends Model {
  /**
   * A single deployment
   */
  repos = {
    update: new APIRepo({ path: this.api, method: 'PUT' }),
    delete: new APIRepo({ path: this.api, method: 'DELETE' }),
  };
  constructor(data, public shortcuts: ShortcutsModel) {
    super({ data });
  }

  get id() {
    return this.data.id;
  }

  get api() {
    return `${this.shortcuts.api}/${this.id}`;
  }
}
