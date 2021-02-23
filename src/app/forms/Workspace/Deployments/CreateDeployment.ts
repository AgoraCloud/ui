import { BaseFormModel } from 'app/forms/Base';
import { CreateDeploymentDto } from 'app/forms/validators';
import { Workspace } from 'app/models';

interface changePassword_i {
    name: string
    sudoPassword: string
    cpuCount: number
    memoryCount: number
    storageCount: number
    image?: {
        name: string
        tag: string
    }
}
interface changePasswordDB_i {
    name: string
    properties: {
        sudoPassword: string
        resources: {
            cpuCount: number
            memoryCount: number
            storageCount: number        
        }
        image: {
            name: string
            tag: string
        }
    }
}

export class CreateDeploymentFormModel extends BaseFormModel<changePassword_i, changePasswordDB_i>{
    constructor(public workspace: Workspace) {
        super(CreateDeploymentDto)
        /**
         * TODO
         * 
         * fix the form validation for the different ui / server data models
         * 
         * or just adopt the same data model in the frontend (less ideal)
         */
        this.data = {
            sudoPassword: "",
            name: "",
            cpuCount: 1,
            memoryCount: 2,
            storageCount: 8,
        }
    }
    toDB = (): any => {
        const { sudoPassword, name, cpuCount, memoryCount, storageCount, image } = this.data
        return {
            name,
            properties: {
                sudoPassword,
                image,
                resources: {
                    cpuCount:     Number(cpuCount),
                    memoryCount:  Number(memoryCount),
                    storageCount: Number(storageCount),
                }
            }
        }
    }

    submit = async () => {
        const wid = this.workspace.id
        return await super.submit(`/api/workspaces/${wid}/deployments`)
    }
}
