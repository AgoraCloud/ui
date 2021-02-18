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
                    cpuCount: undefined,
                    memoryCount: undefined,
                    storageCount: undefined
                }
            }
        }
    }

    toDB = () => {
        let {name, properties} = this.data
        let newProperties = {resources:{}}

        if(typeof properties.resources.cpuCount != "undefined"){
            newProperties.resources["cpuCount"] = Number(properties.resources.cpuCount)    
        } 
        
        if(typeof properties.resources.memoryCount != "undefined"){
            newProperties.resources["memoryCount"] = Number(properties.resources.memoryCount)
        }

        if(typeof properties.resources.storageCount != "undefined"){
            newProperties.resources["storageCount"] = Number(properties.resources.storageCount)
        }

        properties = newProperties

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