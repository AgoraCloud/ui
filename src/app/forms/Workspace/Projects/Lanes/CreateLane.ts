import { BaseFormModel } from 'app/forms/Base';
import { CreateProjectLaneDto, UpdateProjectLaneDto } from 'app/forms/validators';
import { Workspace, Project, Lane } from 'app/models';

interface createLaneForm_i {
    name: string
}

export class CreateLaneFormModel extends BaseFormModel<createLaneForm_i, createLaneForm_i>{
    constructor(public workspace: Workspace, public project: Project) {
        super(CreateProjectLaneDto)

        this.data = {
            name: "",
        }

    }

    public async submit() {
        const wid = this.workspace.id
        const pid = this.project.id
        return await super.call(`/api/workspaces/${wid}/projects/${pid}/lanes`)
    }

    reset = () => {
        this.data.name = ""
    }
}

interface updateLaneForm_i {
    name: string
}

export class EditLaneFormModel extends BaseFormModel<updateLaneForm_i, updateLaneForm_i>{
    constructor(public project: Project, public lane: Lane) {
        super(UpdateProjectLaneDto)

        this.data = {
            name: "",
        }

    }

    submit = async () => {
        const wid = this.project.projects.workspace.id
        const pid = this.project.id
        const lid = this.lane.id
        return await super.call(`/api/workspaces/${wid}/projects/${pid}/lanes/${lid}`, { method: 'PUT' })
    }

    reset = () => {
        this.data.name = ""
    }
}
