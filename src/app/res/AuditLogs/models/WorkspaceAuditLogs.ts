import { BaseAuditLogs, BaseAuditLog } from 'app/res/AuditLogs';
import { WorkspaceModel } from 'app/res/Workspaces';

export class WorkspaceAuditLogs extends BaseAuditLogs {
    constructor(public workspace: WorkspaceModel) {
        super(WorkspaceAuditLog)
    }
    get api() {
        return `${this.workspace.api}/audit`
    }
}

export class WorkspaceAuditLog extends BaseAuditLog { }
