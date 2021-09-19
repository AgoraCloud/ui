import { APIRepo, CollectionModel, Model } from '@mars-man/models';
import { WorkspaceModel } from 'app/NewWorkspace/models';

export class WikiSectionsModel extends CollectionModel {
  /**
   * Collection of Wiki Sections
   */
  repos = {
    main: new APIRepo({ path: this.api }),
  };
  constructor(public workspace: WorkspaceModel) {
    super({
      collections: WikiSectionModel,
    });
  }

  get api() {
    return `${this.workspace.api}/sections`;
  }
}
export class WikiSectionModel extends Model {
  /**
   * A single Wiki Section
   */
  constructor(data, public wikiSectionsModel: WikiSectionsModel) {
    super({ data });
  }

  get api() {
    return `${this.wikiSectionsModel.api}/sections/${this.data.id}`;
  }
}

export class WikiPagesModel extends CollectionModel {
  /**
   * Collection of Wiki Pages
   */
  repos = {
    main: new APIRepo({ path: this.api }),
  };
  constructor(public wikiSection: WikiSectionModel) {
    super({
      collections: WikiPageModel,
    });
  }

  get api() {
    return `${this.wikiSection.api}/pages`;
  }
}
export class WikiPageModel extends Model {
  /**
   * A single Wiki Page
   */

  constructor(data, public wikiPages: WikiPagesModel) {
    super({ data });
  }

  get id() {
    return this.data.id;
  }

  get api() {
    return `${this.wikiPages.api}/${this.id}`;
  }
}
