import { BaseFormModel } from 'app/forms/Base';
import { CreateWorkspaceDto } from 'app/forms/validators';

interface create_workspace_i {
    name: string
    properties: {
        resources: {
            cpuCount?: number,
            memoryCount?: number,
            storageCount?: number 
        }
    }
}
export class CreateWorkspaceFormModel extends BaseFormModel<create_workspace_i, create_workspace_i>{
    constructor() {
        super(CreateWorkspaceDto)
        this.data = {
            name: "",
            properties: {
                resources: {
                    cpuCount: undefined,
                    memoryCount: undefined,
                    storageCount: undefined
                }
            }
        }
    }

    submit = async () => {
        return await super.submit('/api/workspaces')
    }

    reset = () => {
        this.data.name = ""
        this.data.properties.resources.cpuCount = undefined
        this.data.properties.resources.memoryCount = undefined
        this.data.properties.resources.storageCount = undefined
    }
}