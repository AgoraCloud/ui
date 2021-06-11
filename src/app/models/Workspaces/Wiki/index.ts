import { observable } from 'mobx';
import { Workspace } from '..';
import { BaseModelItem, BaseModelCollection } from 'app/models/Base';

export class WikiSectionsModel extends BaseModelCollection<WikiSectionModel> {
  /**
   * Collection of Wiki Sections
   */

  @observable _wikiSections: WikiSectionModel[] = [];
  constructor(public workspace: Workspace) {
    super(WikiSectionModel);
    this.load();
  }

  selectPage = (selected: WikiPageModel) => {
    for (const sec of this.sections) {
      sec.deselect();
      for (const page of sec.wikiPages.pages) {
        if (page === selected) {
          page.select();
          sec.select();
        } else page.deselect();
      }
    }
  };

  get sections() {
    return this.collection || [];
  }

  public async load() {
    await super.load(`/api/workspaces/${this.workspace.id}/sections`);
  }

  get api() {
    /**
     * /api/workspaces/{wid}/sections/
     */
    return `${this.workspace.api}sections/`;
  }

  onAddSection = async () => {
    console.log('workspace', this.workspace);
    const wid = this.workspace.id;
    const body = {
      name: 'New Section',
    };
    try {
      await fetch(`/api/workspaces/${wid}/sections`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      await this.load();
    } catch (e) {
      console.error(e);
    }
  };
}

interface wikiSectionData_i {
  name: string;
  id: string;
}
export class WikiSectionModel extends BaseModelItem<wikiSectionData_i> {
  /**
   * A single wiki section
   */
  public _wikiPages: WikiPagesModel;
  @observable selected: boolean;
  @observable public editableName: string;
  constructor(
    public wikiSections: WikiSectionsModel,
    public data: wikiSectionData_i,
  ) {
    super(wikiSections, data);
    this._wikiPages = new WikiPagesModel(this);
    this.editableName = this.data.name;
    this.selected = false;
  }

  get wikiPages() {
    return this._wikiPages;
  }

  get name() {
    return this.data.name;
  }

  get id() {
    return this.data.id;
  }

  get link() {
    return `${this.wikiSections.workspace.link}wiki/${this.id}/`;
  }

  get api() {
    /**
     * /api/workspaces/{wid}/sections/{sid}/
     */
    return `${this.wikiSections.api}${this.id}/`;
  }

  select = () => {
    this.selected = true;
  };
  deselect = () => {
    this.selected = false;
  };

  onNameChange = (e) => {
    this.editableName = e.target.value;
  };

  onSubmitNameChange = async () => {
    if (this.editableName.length > 1) {
      const body = {
        name: this.editableName,
      };
      try {
        await fetch(this.api, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        });

        // await this.load()
      } catch (e) {
        console.error(e);
      }
    }
  };

  onAddPage = async () => {
    const wid = this.wikiSections.workspace.id;
    const body = {
      title: 'New Page',
      body: '# New Page!',
    };
    try {
      await fetch(this.wikiPages.api, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      await this.wikiPages.load();
    } catch (e) {
      console.error(e);
    }
  };
}

export class WikiPagesModel extends BaseModelCollection<WikiPageModel> {
  /**
   * A collection of wiki pages
   */

  constructor(public wikiSection: WikiSectionModel) {
    super(WikiPageModel);
    this.load();
  }

  get pages() {
    return this.collection || [];
  }

  get api() {
    /**
     * /api/workspaces/{wid}/sections/{sid}/pages
     */
    return `${this.wikiSection.api}pages/`;
  }

  public async load() {
    const wid = this.wikiSection.wikiSections.workspace.id;
    await super.load(
      `/api/workspaces/${wid}/sections/${this.wikiSection.id}/pages`,
    );
  }
}

interface wikiPageData_i {
  id: string;
  title: string;
  body: string;
}

export class WikiPageModel extends BaseModelItem<wikiPageData_i> {
  /**
   * A single wiki page
   */
  @observable selected: boolean;
  @observable editableText;
  @observable editableTitle;
  constructor(public wikiPages: WikiPagesModel, public data: wikiPageData_i) {
    super(wikiPages, data);
    this.editableText = data.body;
    this.editableTitle = data.title;
    this.selected = false;
  }

  get body() {
    return this.data.body;
  }

  get title() {
    return this.editableTitle;
  }

  get id() {
    return this.data.id;
  }
  get link() {
    return `${this.wikiPages.wikiSection.link}pages/${this.id}/`;
  }

  get api() {
    /**
     * /api/workspaces/{wid}/sections/{sid}/pages/{pid}
     */
    return `${this.wikiPages.api}${this.id}`;
  }
  select = () => {
    this.selected = true;
  };
  deselect = () => {
    this.selected = false;
  };
  onSave = async () => {
    const body = {
      title: this.editableTitle,
      body: this.editableText,
    };
    try {
      await fetch(this.api, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      await this.wikiPages.load();
    } catch (e) {
      console.error(e);
    }
  };

  delete = async () => {
    try {
      await fetch(this.api, {
        method: 'DELETE',
      });
      await this.wikiPages.load();
    } catch (e) {
      console.error(e);
    }
  };
}
