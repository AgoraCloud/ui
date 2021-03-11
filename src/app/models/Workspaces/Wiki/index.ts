import { observable } from "mobx";
import { Workspace } from "..";
import { BaseModelItem, BaseModelCollection } from "app/models/Base";

export class WikiSections extends BaseModelCollection<WikiSection> {
  /**
   * Collection of Wiki Sections
   */

  @observable state: "loaded" | "error" | "loading" | "unloaded";

  @observable _wikiSections: WikiSection[] = [];
  constructor(public workspace: Workspace) {
    super(WikiSection);
    this.load(`/api/workspaces/${this.workspace.id}/sections`);
  }

  get sections() {
    return this.collection || [];
  }
}

interface wikiSectionData_i {
  name: string;
  id: string;
}
export class WikiSection extends BaseModelItem<wikiSectionData_i> {
  /**
   * A single wiki section
   */
  public _wikiPages: WikiPages;
  constructor(public wikiSections: WikiSections, public data: wikiSectionData_i) {
    super(wikiSections, data);
    this._wikiPages = new WikiPages(this);
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
}

export class WikiPages extends BaseModelCollection<WikiPage> {
  /**
   * A collection of wiki pages
   */

  @observable state: "loaded" | "error" | "loading" | "unloaded";

  constructor(public wikiSection: WikiSection) {
    super(WikiPage);
    const wid = this.wikiSection.wikiSections.workspace.id;
    this.load(`/api/workspaces/${wid}/sections/${this.wikiSection.id}/pages`);
  }

  get pages() {
    return this.collection || [];
  }
}

interface wikiPageData_i {
  id: string;
  title: string;
  body: string;
}

export class WikiPage extends BaseModelItem<wikiPageData_i> {
  /**
   * A single wiki page
   */

  constructor(public wikiPages: WikiPages, public data: wikiPageData_i) {
    super(wikiPages, data);
  }

  get body() {
    return this.data.body;
  }

  get title() {
    return this.data.title;
  }

  get id() {
    return this.data.id;
  }
  get link() {
    return `${this.wikiPages.wikiSection.link}pages/${this.id}/`;
  }
}
