import { makeObservable, observable } from 'mobx';

const take = 10;

export class AuditLogs {
  state: 'unloaded' | 'loading' | 'reloading' | 'loaded' | 'error' = 'unloaded';
  pages: AuditPage[];
  constructor() {
    // this.repos = {
    //     main: OnDemandRepo(new APIRepo({
    //         path: this.api
    //     }))
    // }
    this.pages = [new AuditPage(0, take)];
  }

  get = (start: number, end: number): AuditLogQuery => {
    const out: AuditPage[] = [];
    const take = end - start;
    let newStart = start;
    let newTake = end - start;
    // console.log(this.pages)
    for (const page of this.pages) {
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
          // there are additional to take
          // newStart = page.take
          //
          out.push(page);
          newStart = page.start + page.take;
          newTake = take - newStart;
          // missing = []
          // const newTake = take - page.take
          // // const pages = await this.get(page.take, newTake)
          // const tmp = new AuditPage(page.take, newTake)
          // this.pages.push(
          //     tmp
          // )
        }
      }
    }
    if (newTake > 0) {
      // create new page with newStart and newTake
      console.log('CREATE MISSING PAGE');
      const tmp = new AuditPage(newStart, newTake);
      this.pages.push(tmp);
      out.push(tmp);
    }

    return new AuditLogQuery(start, end, out);
  };

  load = async (start: number) => {
    this.state = this.state == 'loading' ? 'reloading' : 'loading';
    // this.hasPage(start, take)
  };
}

export class AuditLogQuery {
  @observable
  pages: AuditPage[];
  constructor(public start: number, public end: number, pages: AuditPage[]) {
    this.pages = pages;
    makeObservable(this);
  }
  get logs() {
    let out: AuditLog[] = [];
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
  logs: AuditLog[];
  constructor(public start: number, public take: number) {
    makeObservable(this);
    this.load();
  }
  get api() {
    return `/api/audit?take=${this.take}&start=${this.start}`;
  }

  load = async () => {
    this.state = this.state == 'loading' ? 'reloading' : 'loading';
    try {
      const response = await fetch(this.api);
      const logs = (await response.json()) as log_i[];
      const tmp: AuditLog[] = [];
      for (const log of logs) {
        tmp.push(new AuditLog(log));
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
export class AuditLog {
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
