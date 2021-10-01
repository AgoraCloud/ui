import { events } from '@mars-man/models';

export { events };

export const eventTypes = {
  WORKSPACE_CRUD: {
    type: 'WORKSPACE_CRUD',
    data: {
      message: 'Workspace Successfully: ',
      variant: 'success',
    },
  },
  WORKSPACE_ERR: {
    type: 'WORKSPACE_ERR',
    data: {
      message: 'Workspace Failure: ',
      variant: 'error',
    },
  },
  DEPLOYMENT_CRUD: {
    type: 'DEPLOYMENT_CRUD',
    data: {
      message: 'Deployment Successfully: ',
      variant: 'success',
    },
  },
  DEPLOYMENT_ERR: {
    type: 'DEPLOYMENT_ERR',
    data: {
      message: 'Deployment Failure: ',
      variant: 'error',
    },
  },
  WIKI_CRUD: {
    type: 'WIKI_CRUD',
    data: {
      message: 'Wiki Successfully: ',
      variant: 'success',
    },
  },
  WIKI_ERR: {
    type: 'WIKI_ERR',
    data: {
      message: 'Wiki Failure: ',
      variant: 'error',
    },
  },
  USER_CRUD: {
    type: 'USER_CRUD',
    data: {
      message: 'User Successfully: ',
      variant: 'success',
    },
  },
  USER_ERR: {
    type: 'USER_ERR',
    data: {
      message: 'User Failure: ',
      variant: 'error',
    },
  },
  PROJECT_CRUD: {
    type: 'PROJECT_CRUD',
    data: {
      message: 'Project Successfully: ',
      variant: 'success',
    },
  },
  PROJECT_ERR: {
    type: 'PROJECT_ERR',
    data: {
      message: 'Project Failure: ',
      variant: 'error',
    },
  },
  PROJECT_LANE_CRUD: {
    type: 'PROJECT_LANE_CRUD',
    data: {
      message: 'Project Lane Successfully: ',
      variant: 'success',
    },
  },
  PROJECT_LANE_ERR: {
    type: 'PROJECT_LANE_ERR',
    data: {
      message: 'Project Lane Failure: ',
      variant: 'error',
    },
  },
  WORKSPACE_USER_CRUD: {
    type: 'WORKSPACE_USERS_CRUD',
    data: {
      message: 'Workspace User Successfully: ',
      variant: 'success',
    },
  },
  WORKSPACE_USER_ERR: {
    type: 'WORKSPACE_USERS_ERR',
    data: {
      message: 'Workspace User Failure: ',
      variant: 'error',
    },
  },
  LANE_TASKS_CRUD: {
    type: 'LANE_TASKS_CRUD',
    data: {
      message: 'Project Task Successfully: ',
      variant: 'success',
    },
  },
  LANE_TASKS_ERR: {
    type: 'LANE_TASKS_ERR',
    data: {
      message: 'Project Task Failure: ',
      variant: 'error',
    },
  },
};
