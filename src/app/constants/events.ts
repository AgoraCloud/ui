import { APIRepo, BaseRepo, events, MockRepo } from '@mars-man/models';

export { events };

// TODO add boolean flag for whether snackbar should show with event
interface eventType_i {
  [key: string]: {
    onLoad: {
      type: string;
      data: {
        message: string;
        variant: 'success' | 'error';
      };
    };
    onError: {
      type: string;
      data: {
        message: string;
        variant: 'success' | 'error';
      };
    };
  };
}

export const types = {
  USERLOAD: {
    onLoad: {
      type: 'USERLOAD',
      data: {
        message: 'Successfully Loaded User!',
        variant: 'success',
      },
    },
    onError: {
      type: 'USERLOAD_ERR',
      data: {
        message: 'Failed to Load User: ',
        variant: 'error',
      },
    },
  },
  SIGNIN: {
    onLoad: {
      type: 'SIGNIN',
      data: {
        message: 'Successfully Logged In!',
        variant: 'success',
      },
    },
    onError: {
      type: 'SIGNIN_ERR',
      data: {
        message: 'Failed to Login: ',
        variant: 'error',
      },
    },
  },
  SIGNOUT: {
    onLoad: {
      type: 'SIGNOUT',
      data: {
        message: 'Signed out',
        variant: 'success',
      },
    },
    onError: {
      type: 'SIGNOUT_ERR',
      data: {
        message: 'Failed to Signout: ',
        variant: 'error',
      },
    },
  },
  SIGNUP: {
    onLoad: {
      type: 'SIGNUP',
      data: {
        message: 'Registered! Please check your email to verify your account.',
        variant: 'success',
      },
    },
    onError: {
      type: 'SIGNUP_ERR',
      data: {
        message: 'Failed to Signup: ',
        variant: 'error',
      },
    },
  },

  VERIFY: {
    onLoad: {
      type: 'VERIFY',
      data: {
        message: 'Successfully Verified',
        variant: 'success',
      },
    },
    onError: {
      type: 'VERIFY_ERR',
      data: {
        message: 'Failed to Verify: ',
        variant: 'error',
      },
    },
  },

  PASSWORD_RESET: {
    onLoad: {
      type: 'PASSWORD_RESET',
      data: {
        message: 'Success: Please check your email to reset your password!',
        variant: 'success',
      },
    },
    onError: {
      type: 'PASSWORD_RESET_ERR',
      data: {
        message: 'Failure: ',
        variant: 'error',
      },
    },
  },

  CHANGE_PASSWORD: {
    onLoad: {
      type: 'CHANGE_PASSWORD',
      data: {
        message: 'Successfully Changed Password',
        variant: 'success',
      },
    },
    onError: {
      type: 'CHANGE_PASSWORD_ERR',
      data: {
        message: 'Change Password Failed: ',
        variant: 'error',
      },
    },
  },

  WORKSPACE_CRUD: {
    onLoad: {
      type: 'WORKSPACE_ERR',
      data: {
        message: 'Workspace Failure: ',
        variant: 'error',
      },
    },
    onError: {
      type: 'WORKSPACE_CRUD',
      data: {
        message: 'Workspace Successfully: ',
        variant: 'success',
      },
    },
  },

  DEPLOYMENT_CRUD: {
    onLoad: {
      type: 'DEPLOYMENT_CRUD',
      data: {
        message: 'Deployment Successfully: ',
        variant: 'success',
      },
    },
    onError: {
      type: 'DEPLOYMENT_ERR',
      data: {
        message: 'Deployment Failure: ',
        variant: 'error',
      },
    },
  },

  USER_CRUD: {
    onLoad: {
      type: 'USER_CRUD',
      data: {
        message: 'User Successfully: ',
        variant: 'success',
      },
    },
    onError: {
      type: 'USER_ERR',
      data: {
        message: 'User Failure: ',
        variant: 'error',
      },
    },
  },

  PROJECT_CRUD: {
    onLoad: {
      type: 'PROJECT_CRUD',
      data: {
        message: 'Project Successfully: ',
        variant: 'success',
      },
    },
    onError: {
      type: 'PROJECT_ERR',
      data: {
        message: 'Project Failure: ',
        variant: 'error',
      },
    },
  },

  PROJECT_LANE_CRUD: {
    onLoad: {
      type: 'PROJECT_LANE_CRUD',
      data: {
        message: 'Project Lane Successfully: ',
        variant: 'success',
      },
    },
    onError: {
      type: 'PROJECT_LANE_ERR',
      data: {
        message: 'Project Lane Failure: ',
        variant: 'error',
      },
    },
  },

  LANE_TASKS_CRUD: {
    onLoad: {
      type: 'LANE_TASKS_CRUD',
      data: {
        message: 'Project Task Successfully: ',
        variant: 'success',
      },
    },
    onError: {
      type: 'LANE_TASKS_ERR',
      data: {
        message: 'Project Task Failure: ',
        variant: 'error',
      },
    },
  },
  LANE_TASK_MOVED: {
    onLoad: {
      type: 'LANE_TASKS_MOVED',
      data: {
        message: 'Task Moved Successfully',
        variant: 'success',
      },
    },
    onError: {
      type: 'LANE_TASKS_MOVED_ERR',
      data: {
        message: 'Task Move Failure',
        variant: 'error',
      },
    },
  },
  WORKSPACE_USER_CRUD: {
    onLoad: {
      type: 'WORKSPACE_USERS_CRUD',
      data: {
        message: 'Workspace User Successfully: ',
        variant: 'success',
      },
    },
    onError: {
      type: 'WORKSPACE_USERS_ERR',
      data: {
        message: 'Workspace User Failure: ',
        variant: 'error',
      },
    },
  },
  LANE_TASK_CRUD: {
    onLoad: {
      type: 'LANE_TASKS_CRUD',
      data: {
        message: 'Project Task Successfully: ',
        variant: 'success',
      },
    },
    onError: {
      type: 'LANE_TASKS_ERR',
      data: {
        message: 'Project Task Failure: ',
        variant: 'error',
      },
    },
  },

  WIKISECTIONS: {
    onLoad: {
      type: 'WIKISECTIONS_LOAD',
      data: {
        message: 'Wiki Section Successfully: ',
        variant: 'success',
      },
    },
    onError: {
      type: 'WIKISECTION_ERR',
      data: {
        message: 'Wiki Section Failure: ',
        variant: 'error',
      },
    },
  },
  WIKIPAGES: {
    onLoad: {
      type: 'WIKIPAGES_LOAD',
      data: {
        message: 'Wiki Page Successfully: ',
        variant: 'success',
      },
    },
    onError: {
      type: 'WIKIPAGES_ERR',
      data: {
        message: 'Wiki Page Failure: ',
        variant: 'error',
      },
    },
  },
};
