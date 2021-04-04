import { observable, computed } from "mobx"
import { Lane } from ".."
import { Project } from "../.."
import { EditTaskFormModel } from "app/forms/Workspace/Projects/Lanes/Tasks/CreateTask"
import { BaseModelCollection, BaseModelItem } from "app/models/Base"
import { events, eventTypes } from "app/constants"

export class Tasks extends BaseModelCollection<Task>{

    constructor(public lane: Lane, public project: Project) {
        super(Task)

        this.load()

        events.on(eventTypes.LANE_TASKS_CRUD, () => {
            this.load()
        })
    }

    public async load() {
      const wid = this.project.projects.workspace.id
      const pid = this.project.id
      const lid = this.lane.id
      await super.load(`/api/workspaces/${wid}/projects/${pid}/lanes/${lid}/tasks`)
  }

    @computed
    get tasks() {
        return this.collection || []
    }

    @computed
    get taskIds() {
      const ids: string[] = []
      this.tasks.forEach(task => {
        ids.push(task.id)
      })

      return ids
    }
}


interface taskData_i {
    title: string
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
    lane: {
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
        ],
        id: string
      },
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
    id: string
  }
export class Task extends BaseModelItem<taskData_i>{
    /**
     * A single project
     */
    @observable form: EditTaskFormModel
    constructor(public tasks: Tasks, public data: taskData_i) {
        super(tasks, data)
        this.form = new EditTaskFormModel(this.tasks.lane, this)
        this.form.fromDB(data as any)
    }

    get id() {
        return this.data.id
    }

    get title() {
        return this.data.title
    }

    get description() {
      return this.data.description
  }


    delete = async () => {
        try {
            const wid = this.tasks.project.projects.workspace.id
            const pid = this.tasks.project.id
            const lid = this.tasks.lane.id
            const tid = this.id
            const res = await fetch(`api/workspaces/${wid}/projects/${pid}/lanes/${lid}/tasks/${tid}`, {method: 'DELETE'})
            res && events.emit(eventTypes.LANE_TASKS_CRUD, 'deleted')
        } catch (e) {
            console.warn(e)
            events.emit(eventTypes.LANE_TASKS_ERR, 'failed to delete')
        }
    }

}