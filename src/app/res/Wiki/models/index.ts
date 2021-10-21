import { APIRepo, CollectionModel, FormModel, Model } from '@mars-man/models';
import { types } from 'app/constants';
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
  postLoad = async () => {
    console.log('WIKI SECTIONS', this.data);
  };

  get link() {
    return `${this.workspace.link}/wiki`;
  }

  get api() {
    return `${this.workspace.api}/sections`;
  }

  onAddSection = () => {};
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
  @observable selected: boolean = false;
  sectionForm: FormModel;
  constructor({ data, parent }) {
    super({ data });
    this.sections = parent;

    this.sectionForm = new FormModel({
      data: {
        name: data.title,
      },
    });

    this.wikiPages = new WikiPagesModel(this);
    this.dependents = [this.wikiPages];
    makeObservable(this);
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

  onSubmitNameChange = () => {};
  onAddPage = () => {};
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
  @observable selected: boolean = false;
  constructor({ data, parent }) {
    super({ data });
    this.pageForm = new FormModel({
      data: {
        title: data.title,
        body: data.body,
      },
    });
    this.pages = parent;
    makeObservable(this);
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

  onSave = async () => {};
  delete = async () => {};
}
