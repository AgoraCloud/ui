import { APIRepo, CollectionModel, FormModel, Model } from '@mars-man/models';
import { types } from 'app/constants';
import { update } from 'app/constants/helpers';
import { WorkspaceModel } from 'app/res/Workspaces/models';
import { makeObservable, observable } from 'mobx';

export class WikiSectionsModel extends CollectionModel {
  /**
   * Collection of Wiki Sections
   */

  addSection: APIRepo;
  constructor(public workspace: WorkspaceModel) {
    super({
      collections: WikiSectionModel,
    });

    this.addSection = new APIRepo({
      path: this.api,
      method: 'POST',
      body: { name: 'New Section' },
      events: types.WIKISECTIONS,
    });
    this.addSection.onLoad.subscribe(() => {
      this.load();
    });
    this.repos = {
      main: new APIRepo({ path: this.api }),
      addSection: this.addSection,
    };
  }

  get link() {
    return `${this.workspace.link}/wiki`;
  }

  get api() {
    return `${this.workspace.api}/sections`;
  }

  onAddSection = () => {
    this.addSection.call();
  };
}

interface wikiSectionData_i {
  name: string;
  id: string;
}
export class WikiSectionModel extends Model<wikiSectionData_i> {
  /**
   * A single Wiki Section
   */
  sections: WikiSectionsModel;
  wikiPages: WikiPagesModel;
  sectionForm: FormModel;
  delete: APIRepo;
  constructor(config) {
    super(config);
    this.sections = this.parent as WikiSectionsModel;

    this.sectionForm = new FormModel({
      data: {
        name: this.data.name,
      },
      submit: new APIRepo({ path: this.api, method: 'PUT' }),
    });
    this.delete = new APIRepo({ path: this.api, method: 'DELETE' });
    this.wikiPages = new WikiPagesModel(this);
    this.delete.onLoad.subscribe(() => {
      this.sections.load();
    });
    this.dependents = [this.wikiPages];
    update(this, this.sectionForm.submit);
  }

  get id() {
    return this.data.id;
  }

  get link() {
    return `${this.sections.link}/${this.id}`;
  }

  get api() {
    return `${this.sections.api}/${this.id}`;
  }

  onSubmitNameChange = async () => {
    await this.sectionForm.call();
  };
  onDelete = async () => {
    await this.delete.call();
  };
}

export class WikiPagesModel extends CollectionModel {
  /**
   * Collection of Wiki Pages
   */

  addPage: APIRepo;
  constructor(public wikiSection: WikiSectionModel) {
    super({
      collections: WikiPageModel,
    });
    this.addPage = new APIRepo({
      path: this.api,
      method: 'POST',
      body: {
        title: 'New Page',
        body: '# New Page!',
      },
      events: types.WIKIPAGES,
    });
    this.addPage.onLoad.subscribe(() => {
      this.load();
    });
    this.repos = {
      main: new APIRepo({ path: this.api }),
    };
  }

  get link() {
    return `${this.wikiSection.link}/pages`;
  }
  get api() {
    return `${this.wikiSection.api}/pages`;
  }

  onAddPage = () => {
    this.addPage.call();
  };
}

interface wikiPageData_i {
  id: string;
  title: string;
  body: string;
}
export class WikiPageModel extends Model<wikiPageData_i> {
  /**
   * A single Wiki Page
   */

  public pages: WikiPagesModel;
  pageForm: FormModel;
  delete: APIRepo;
  constructor(config) {
    super(config);
    this.pages = this.parent as WikiPagesModel;
    this.pageForm = new FormModel({
      data: {
        title: this.data.title,
        body: this.data.body,
      },
      submit: new APIRepo({ path: this.api, method: 'PUT' }),
    });
    this.delete = new APIRepo({ path: this.api, method: 'DELETE' });
    update(this, [this.pageForm.submit]);
    // remove
  }

  get id() {
    return this.data.id;
  }

  // get body() {
  //   return this.form?.data.body;
  // }
  // get title() {
  //   return this.form?.data.title;
  // }

  get api() {
    return `${this.pages.api}/${this.id}`;
  }

  get link() {
    return `${this.pages.link}/${this.id}`;
  }

  onSave = async () => {
    await this.pageForm.call();
    // if(this.pageForm.submit.state == 'loaded'){
    // }
  };
  onDelete = async () => {
    await this.delete.call();
    if (this.delete.state == 'loaded') {
      this.pages.load();
    }
  };
}
