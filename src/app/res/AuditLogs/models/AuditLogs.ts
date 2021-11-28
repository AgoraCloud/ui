import { makeObservable, observable } from 'mobx';
import { BaseAuditLogs } from '.';

const take = 10;

interface auditLogOptions_i {
  action?: string;
  resource?: string;
}

export class AuditLogs extends BaseAuditLogs {
  constructor() {
    super(AuditLog);
  }
  get api() {
    return '/api/audit';
  }
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
