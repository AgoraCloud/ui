import { Model } from '@mars-man/models';
import { WorkspaceModel } from '.';

export class WorkspacesMetricsModel extends Model {
    constructor(public workspace: WorkspaceModel){
        super({})
    }
}


