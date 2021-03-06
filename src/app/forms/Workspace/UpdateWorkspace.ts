import { BaseFormModel } from 'app/forms/Base';
import { UpdateWorkspaceDto, UpdateWorkspaceResourcesDto } from 'app/forms/validators';
import { Workspace } from 'app/models';

interface update_workspace_i {
    name: string,
    properties: {
        resources: {
            cpuCount?: number,
            memoryCount?: number,
            storageCount?: number 
        }
    }

}
export class UpdateWorkspaceFormModel extends BaseFormModel<update_workspace_i, update_workspace_i>{
    constructor(public workspace: Workspace) {
        super(UpdateWorkspaceDto)
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
        const resources: UpdateWorkspaceResourcesDto = properties?.resources;
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
        return await super.submit('/api/workspaces')    
    }

    reset = () => {
        this.data.name = ""
        this.data.properties.resources.cpuCount = undefined
        this.data.properties.resources.memoryCount = undefined
        this.data.properties.resources.storageCount = undefined
    }
}