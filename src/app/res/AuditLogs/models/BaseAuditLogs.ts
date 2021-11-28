import { CollectionModel, Model } from '@mars-man/models';

import { makeObservable, observable } from 'mobx';

const take = 10;

interface auditLogOptions_i {
  action?: string;
  resource?: string;
}

type AuditLogClassT = new (...args: any[]) => BaseAuditLog;

export class BaseAuditLogs {
  state: 'unloaded' | 'loading' | 'reloading' | 'loaded' | 'error' = 'unloaded';
  pages: AuditPage[];
  // key is json serialized string of the selected options
  cache: { [key: string]: AuditPage[] } = {};
  constructor(public AuditLogClass: AuditLogClassT) {
    // this.repos = {
    //     main: OnDemandRepo(new APIRepo({
    //         path: this.api
    //     }))
    // }
    this.cache['undefined'] = [new AuditPage(this, AuditLogClass, 0, take)];
  }

  get = (
    start: number,
    end: number,
    options?: auditLogOptions_i,
  ): AuditLogQuery => {
    const out: AuditPage[] = [];
    const take = end - start;
    let newStart = start;
    let newTake = end - start;

    const key = JSON.stringify(options);
    let pages = this.cache[key] || [];
    // console.log(this.pages)
    for (const page of pages) {
      if (newStart >= page.start) {
        if (newTake <= page.take) {
          // full match
          newStart = 0;
          newTake = 0;
          out.push(page);
          break;
          // return {pages: out, complete: true}
        } else {
          // partial match
          out.push(page);
          newStart = page.start + page.take;
          newTake = take - newStart;
        }
      }
    }
    if (newTake > 0) {
      // create new page with newStart and newTake
      console.log('CREATE MISSING PAGE');
      const tmp = new AuditPage(
        this,
        this.AuditLogClass,
        newStart,
        newTake,
        options,
      );
      pages.push(tmp);
      out.push(tmp);
    }

    this.cache[key] = pages;

    return new AuditLogQuery(start, end, out, options);
  };

  load = async (start: number) => {
    this.state = this.state == 'loading' ? 'reloading' : 'loading';
    // this.hasPage(start, take)
  };

  get api() {
    return '/api/audit';
  }
}

export class AuditLogQuery {
  @observable
  pages: AuditPage[];
  constructor(
    public start: number,
    public end: number,
    pages: AuditPage[],
    public options?: auditLogOptions_i,
  ) {
    this.pages = pages;
    makeObservable(this);
  }
  get logs() {
    let out: BaseAuditLog[] = [];
    for (const page of this.pages) {
      if (page.state === 'loaded') {
        out = [...out, ...page.logs];
      }
    }
    return out;
  }
  get state() {
    let state = 'loaded';
    for (const page of this.pages) {
      if (page.state !== 'loaded') return page.state;
    }
    return state;
  }
}

export class AuditPage {
  @observable
  state: 'unloaded' | 'loading' | 'reloading' | 'loaded' | 'error' = 'unloaded';
  // start: number
  // take: number
  @observable
  logs: BaseAuditLog[];
  constructor(
    public auditLogs: BaseAuditLogs,
    public AudtiLogClass: AuditLogClassT,
    public start: number,
    public take: number,
    public options?: auditLogOptions_i,
  ) {
    makeObservable(this);
    this.load();
  }

  get qs() {
    const options = {
      ...(this.options || {}),
      take: this.take,
      start: this.start,
    };
    var queryString = Object.keys(options)
      .map((key) => key + '=' + options[key])
      .join('&');

    return queryString;
  }
  get api() {
    return `${this.auditLogs.api}?${this.qs}`;
  }

  load = async () => {
    this.state = this.state == 'loading' ? 'reloading' : 'loading';
    try {
      const response = await fetch(this.api);
      const logs = (await response.json()) as log_i[];
      const tmp: any[] = [];
      for (const log of logs) {
        tmp.push(new this.AudtiLogClass(log));
      }
      this.logs = tmp;
      this.state = 'loaded';
    } catch (e) {
      console.warn('error loading page', this.start, this.take, e);
      this.state = 'error';
    }
  };
}
interface log_i {
  id: string;
  action: string;
  resource: string;
  date: string;
  userAgent: string;
  ip: string;
  user: {
    id: string;
    fullName: string;
    email: string;
  };
  workspace: {
    id: string;
  };
}
export class BaseAuditLog {
  constructor(public data: log_i) {}
  get id() {
    return this.data.id;
  }
  get date() {
    return this.data.date;
  }
  get action() {
    return this.data.action;
  }
  get fullName() {
    return this.data.user.fullName;
  }
  get resource() {
    return this.data.resource;
  }
}
