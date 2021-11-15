import { APIRepo, CollectionModel, Model } from '@mars-man/models';
import { add, remove } from 'app/constants/helpers';
import { CreateProjectFormModel, EditProjectFormModel } from 'app/res/Projects';
import { WorkspaceModel } from 'app/res/Workspaces';
import { LanesModel } from '..';

export class ProjectsModel extends CollectionModel {
  createProjectForm: CreateProjectFormModel;
  /**
   * Collection of workspace objects
   */

  constructor(public workspace: WorkspaceModel) {
    super({
      collections: ProjectModel,
    });
    this.repos = {
      main: new APIRepo({ path: this.api }),
      // create: new APIRepo({ path: this.api, method: 'POST' }),
    };

    this.createProjectForm = new CreateProjectFormModel(this);
    add(this, this.createProjectForm.submit);
  }
  postLoad = async () => {
    // console.log("projectsmodel loaded", this)
  };
  get api() {
    return `${this.workspace.api}/projects`;
  }

  get link() {
    return `${this.workspace.link}/p`;
  }

  get projects() {
    return this.collection.models as ProjectModel[];
  }
}
export class ProjectModel extends Model {
  projects: ProjectsModel;
  lanes: LanesModel;
  delete: APIRepo;
  editProjectForm: EditProjectFormModel;

  constructor(config) {
    super(config);
    this.projects = this.parent as ProjectsModel;
    this.lanes = new LanesModel(this);
    this.editProjectForm = new EditProjectFormModel(this);
    this.delete = new APIRepo({
      path: this.api,
      method: 'DELETE',
    });
    this.dependents = [this.lanes];
    remove(this, this.delete);
  }

  get id() {
    return this.data.id;
  }
  get api() {
    return `${this.projects.api}/${this.id}`;
  }
  get link() {
    return `${this.projects.link}/${this.id}`;
  }
  get name() {
    return this.data.name;
  }

  get description() {
    return this.data.description;
  }

  onDelete = () => {
    this.delete.call();
  };
}
