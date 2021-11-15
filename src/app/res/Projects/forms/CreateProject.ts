import { CreateProjectDto, UpdateProjectDto } from "@agoracloud/common";
import { APIRepo, FormModel } from "@mars-man/models";
import { types } from "app/constants";
import { ProjectsModel } from "app/res/Projects";

interface createProjectForm_i {
    name: string;
    description?: string;
}

export class CreateProjectFormModel extends FormModel<
    createProjectForm_i
> {
    constructor(public projects: ProjectsModel) {
        super({
            validator: CreateProjectDto,
            data: {
                name: '',
                description: undefined,
            },
            submit: new APIRepo({
                path: projects.api,
                method: 'POST',
                events: types.PROJECT_CRUD
            })
        });
    }

    reset = () => {
        this.data.name = '';
        this.data.description = undefined;
    };
}

