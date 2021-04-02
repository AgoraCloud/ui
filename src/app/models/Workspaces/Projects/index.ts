import { observable, computed } from "mobx"
import { Workspace } from ".."
import { Lanes } from "./Lanes"
import { EditProjectFormModel } from "app/forms/Workspace/Projects/CreateProject"
import { CreateLaneFormModel } from "app/forms/Workspace/Projects/Lanes/CreateLane"
import { BaseModelCollection, BaseModelItem } from "app/models/Base"
import { events, eventTypes } from "app/constants"

export class Projects extends BaseModelCollection<Project>{

    constructor(public workspace: Workspace) {
        super(Project)
        this.load()

        events.on(eventTypes.PROJECT_CRUD, () => {
            this.load()
        })
    }

    public async load() {
        await super.load(`${this.workspace.api}projects`)
    }

    @computed
    get projects() {
        return this.collection || []
    }
}


interface projectData_i {
    name: string
    description: string
    user: {
        fullName: string
        email: string
        id: string
    }
    workspace: {
        name: string
        properties: {
            resources: {
                cpuCount: number
                memoryCount: number
                storageCount: number
            }
        }
        users: [
            {
                fullName: string
                email: string
                id: string
            }
        ]
        id: string
    }
    id: string
}
export class Project extends BaseModelItem<projectData_i>{
    /**
     * A single project
     */

    lanes: Lanes
    createLaneForm: CreateLaneFormModel
    @observable form: EditProjectFormModel
    constructor(public projects: Projects, public data: projectData_i) {
        super(projects, data)
        this.lanes = new Lanes(this, this.projects.workspace)
        this.createLaneForm = new CreateLaneFormModel(this.projects.workspace, this)
        this.form = new EditProjectFormModel(this)
        this.form.fromDB(data as any)
    }

    get id() {
        return this.data.id
    }

    get name() {
        return this.data.name
    }

    get description() {
        return this.data.description
    }

    get link() {
        return this.projects.workspace.link + `p/${this.id}/`
    }


    delete = async () => {
        try {
            const wid = this.projects.workspace.id
            const pid = this.id
            const res = await fetch(`api/workspaces/${wid}/projects/${pid}`, {method: 'DELETE'})
            res && events.emit(eventTypes.PROJECT_CRUD, 'deleted')           
        } catch (e) {
            console.warn(e)
            events.emit(eventTypes.PROJECT_ERR, 'failed to delete')
        }
    }

}