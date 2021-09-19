import {Model, APIRepo} from '@mars-man/models'
import { WorkspaceModel } from 'app/NewWorkspace/models';


export class DeploymentImages extends Model{
    constructor(public workspace: WorkspaceModel){
        super({
            repos: new APIRepo({path: workspace.api})
        })

        // autoload
        this.load()
    }


    get api(){
        return `${this.workspace.api}/deployments/images/`
    }
}
