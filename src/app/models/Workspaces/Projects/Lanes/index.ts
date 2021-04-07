import { observable, computed } from "mobx"
import { Workspace } from "../.."
import { Project } from ".."
import { Tasks } from "./Tasks"
import { CreateTaskFormModel } from "app/forms/Workspace/Projects/Lanes/Tasks/CreateTask"
import { EditLaneFormModel } from "app/forms/Workspace/Projects/Lanes/CreateLane"
import { BaseModelCollection, BaseModelItem } from "app/models/Base"
import { events, eventTypes } from "app/constants"

export class Lanes {

    @observable state: 'loaded'|'error'|'loading'|'unloaded'|'reloading'

    @observable _lanes: Lane[] = []
    constructor(public project: Project, public workspace: Workspace) {
        this.state = 'unloaded'
        this.load()

        events.on(eventTypes.PROJECT_LANE_CRUD, () => {
            this.load()
        })
    }
    load = async ( ) => {
      this.state = this.state === 'loaded' ? 'reloading' : 'loading'
      const wid = this.workspace.id
      const pid = this.project.id
      const response = await fetch(`/api/workspaces/${wid}/projects/${pid}/lanes`, {

      })

      const data = await response.json()
      console.log("lanes", response, data)
      this._lanes = data.map((data)=>new Lane(this, data))

      for (const lane of this._lanes) {
        await lane.load()
      }
      
      this.state = 'loaded'
    }

    get lanes() {
        return this._lanes || []
    }

    getById = (id?: string): Lane|undefined => {
      return this.lanes.filter((l: Lane)=>l.id === id)[0]
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
export class Lane {
    /**
     * A single project
     */

    @observable state: 'loaded'|'error'|'loading'|'unloaded'
    tasks: Tasks
    createTaskForm: CreateTaskFormModel
    @observable form: EditLaneFormModel
    constructor(public lanes: Lanes, public data: laneData_i) {
        this.state = 'unloaded'
        this.tasks = new Tasks(this, this.lanes.project)
        this.createTaskForm = new CreateTaskFormModel(this.lanes.project, this)
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

    load = async ( ) => {
      this.state = 'loading'
      if(this.tasks.state != 'loaded') await this.tasks.load()
      this.state = 'loaded'
    }

    delete = async () => {
        try {
            const wid = this.lanes.workspace.id
            const pid = this.lanes.project.id
            const lid = this.id
            const res = await fetch(`api/workspaces/${wid}/projects/${pid}/lanes/${lid}`, {method: 'DELETE'})
            res && events.emit(eventTypes.PROJECT_LANE_CRUD, 'deleted')
        } catch (e) {
            console.warn(e)
            events.emit(eventTypes.PROJECT_LANE_ERR, 'failed to delete')
        }
    }

}