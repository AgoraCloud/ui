import { observable, computed } from "mobx"
import { Workspace } from "../.."
import { Project } from ".."
import { EditLaneFormModel } from "app/forms/Workspace/Projects/Lanes/CreateLane"
import { BaseModelCollection, BaseModelItem } from "app/models/Base"

export class Lanes extends BaseModelCollection<Lane>{

    constructor(public project: Project, public workspace: Workspace) {
        super(Lane)

        const wid = this.workspace.id
        const pid = this.project.id
        this.load(`/api/workspaces/${wid}/projects/${pid}/lanes`)
    }

    @computed
    get lanes() {
        return this.collection || []
    }
}


interface laneData_i {
    name: string
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
    project: {
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
    id: string
}
export class Lane extends BaseModelItem<laneData_i>{
    /**
     * A single project
     */
    @observable form: EditLaneFormModel
    constructor(public lanes: Lanes, public data: laneData_i) {
        super(lanes, data)
        this.form = new EditLaneFormModel(this.lanes.project, this)
        this.form.fromDB(data as any)
    }

    get id() {
        return this.data.id
    }

    get name() {
        return this.data.name
    }

    get link() {
        return this.lanes.workspace.link + `p/${this.lanes.project.id}/l/${this.id}`
    }


    delete = async () => {
        try {
            const wid = this.lanes.workspace.id
            const pid = this.lanes.project.id
            const lid = this.id
            const res = await fetch(`api/workspaces/${wid}/projects/${pid}/lanes/${lid}`, {method: 'DELETE'})
        } catch (e) {
            console.warn(e)
        }
    }

}