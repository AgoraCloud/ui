import { BaseFormModel } from 'app/forms/Base';
import { CreateWorkspaceDto, CreateWorkspaceResourcesDto } from 'app/forms/validators';

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
                    cpuCount: undefined,
                    memoryCount: undefined,
                    storageCount: undefined
                }
            }
        }
    }

    toDB = () => {
        let {name, properties} = this.data
        const resources: CreateWorkspaceResourcesDto = properties?.resources;
        let newProperties = {
            resources: {
                cpuCount: resources?.cpuCount ? Number(resources.cpuCount) : undefined,
                memoryCount: resources?.memoryCount ? Number(resources.memoryCount) : undefined,
                storageCount: resources?.storageCount ? Number(resources.storageCount) : undefined,
            },
        };
        return {
            name,
            properties: newProperties
        }
    }

    submit = async () => {
        return await super.call('/api/workspaces')    
    }

    reset = () => {
        this.data.name = ""
        this.data.properties.resources.cpuCount = undefined
        this.data.properties.resources.memoryCount = undefined
        this.data.properties.resources.storageCount = undefined
    }
}