import { BaseFormModel } from 'app/forms/Base';
import { CreateWorkspaceDto } from 'app/forms/validators';

interface create_workspace_i {
    name: string,
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
                    cpuCount: 1,
                    memoryCount: 2,
                    storageCount: 8
                }
            }
        }
    }

    toDB = () => {
        let {name, properties} = this.data
        const numCpuCount = Number(properties.resources.cpuCount)
        const numMemoryCount = Number(properties.resources.memoryCount)
        const numStorageCount = Number(properties.resources.storageCount)
        properties = {resources: {
            cpuCount: numCpuCount,
            memoryCount: numMemoryCount,
            storageCount: numStorageCount,
        }}
        return {
            name,
            properties
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