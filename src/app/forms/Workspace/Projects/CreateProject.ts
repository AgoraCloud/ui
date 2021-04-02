import { BaseFormModel } from 'app/forms/Base';
import { CreateProjectDto, UpdateProjectDto } from 'app/forms/validators';
import { Workspace, Project } from 'app/models';
import { events, eventTypes } from "app/constants"

interface createProjectForm_i {
    name: string
    description?: string
}

export class CreateProjectFormModel extends BaseFormModel<createProjectForm_i, createProjectForm_i>{
    constructor(public workspace: Workspace) {
        super(CreateProjectDto)

        this.data = {
            name: "",
            description: undefined,
        }

    }

    public async submit() {
        const wid = this.workspace.id
        const res = await super.call(`/api/workspaces/${wid}/projects`)
        res && events.emit(eventTypes.PROJECT_CRUD, 'created') 
        return res
    }

    reset = () => {
        this.data.name = ""
        this.data.description = ""
    }
}

interface updateProjectForm_i {
    name?: string
    description?: string
}

export class EditProjectFormModel extends BaseFormModel<updateProjectForm_i, updateProjectForm_i>{
    constructor(public project: Project) {
        super(UpdateProjectDto)

        this.data = {
            name: undefined,
            description: undefined,
        }

    }

    submit = async () => {
        const wid = this.project.projects.workspace.id
        const pid = this.project.id
        const res = await super.call(`/api/workspaces/${wid}/projects/${pid}`, { method: 'PUT' })
        res && events.emit(eventTypes.PROJECT_CRUD, 'updated') 
        return res
    }

    reset = () => {
        this.data.name = ""
        this.data.description = ""
    }
}
