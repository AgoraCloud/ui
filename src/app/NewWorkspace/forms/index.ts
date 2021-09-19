import { FormModel } from "@mars-man/models";
import { CreateDeploymentDto } from "@agoracloud/common";
import { WorkspaceModel } from "../models";


export class CreateDeploymentFormModel extends FormModel{
    constructor(public workspace: WorkspaceModel){
        super({
            keys: [
                ['cpuCount', 'properties.resources.cpuCount'],
                ['memoryCount',  'properties.resources.memoryCount'],
                ['storageCount', 'properties.resources.storageCount'],
                ['isFavorite', 'properties.isFavorite'],
                ['type', 'properties.image.type'],
                ['version', 'properties.image.version'],
            ],
            validator: CreateDeploymentDto
        })
    }
}

export class CreateProjectFormModel extends FormModel{
    constructor(public workspace: WorkspaceModel){
        super({})
    }
}

export class UpdateWorkspaceFormModel extends FormModel{
    constructor(public workspace: WorkspaceModel){
        super({})
    }
}