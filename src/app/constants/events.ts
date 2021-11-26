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
      snackbar: true,
      type: 'USERLOAD',
      data: {
        message: 'Successfully Loaded User!',
        variant: 'success',
      },
    },
    onError: {
      snackbar: true,
      type: 'USERLOAD_ERR',
      data: {
        message: 'Failed to Load User: ',
        variant: 'error',
      },
    },
  },
  SIGNIN: {
    onLoad: {
      snackbar: true,
      type: 'SIGNIN',
      data: {
        message: 'Successfully Logged In!',
        variant: 'success',
      },
    },
    onError: {
      snackbar: true,
      type: 'SIGNIN_ERR',
      data: {
        message: 'Failed to Login: ',
        variant: 'error',
      },
    },
  },
  SIGNOUT: {
    onLoad: {
      snackbar: true,
      type: 'SIGNOUT',
      data: {
        message: 'Signed out',
        variant: 'success',
      },
    },
    onError: {
      snackbar: true,
      type: 'SIGNOUT_ERR',
      data: {
        message: 'Failed to Signout: ',
        variant: 'error',
      },
    },
  },
  SIGNUP: {
    onLoad: {
      snackbar: true,
      type: 'SIGNUP',
      data: {
        message: 'Registered! Please check your email to verify your account.',
        variant: 'success',
      },
    },
    onError: {
      snackbar: true,
      type: 'SIGNUP_ERR',
      data: {
        message: 'Failed to Signup: ',
        variant: 'error',
      },
    },
  },

  VERIFY: {
    onLoad: {
      snackbar: true,
      type: 'VERIFY',
      data: {
        message: 'Successfully Verified',
        variant: 'success',
      },
    },
    onError: {
      snackbar: true,
      type: 'VERIFY_ERR',
      data: {
        message: 'Failed to Verify: ',
        variant: 'error',
      },
    },
  },

  PASSWORD_RESET: {
    onLoad: {
      snackbar: true,
      type: 'PASSWORD_RESET',
      data: {
        message: 'Success: Please check your email to reset your password!',
        variant: 'success',
      },
    },
    onError: {
      snackbar: true,
      type: 'PASSWORD_RESET_ERR',
      data: {
        message: 'Failure: ',
        variant: 'error',
      },
    },
  },

  CHANGE_PASSWORD: {
    onLoad: {
      snackbar: true,
      type: 'CHANGE_PASSWORD',
      data: {
        message: 'Successfully Changed Password',
        variant: 'success',
      },
    },
    onError: {
      snackbar: true,
      type: 'CHANGE_PASSWORD_ERR',
      data: {
        message: 'Change Password Failed: ',
        variant: 'error',
      },
    },
  },

  WORKSPACE_CRUD: {
    onLoad: {
      snackbar: true,
      type: 'WORKSPACE_ERR',
      data: {
        message: 'Workspace Failure: ',
        variant: 'error',
      },
    },
    onError: {
      snackbar: true,
      type: 'WORKSPACE_CRUD',
      data: {
        message: 'Workspace Successfully: ',
        variant: 'success',
      },
    },
  },

  DEPLOYMENT_CRUD: {
    onLoad: {
      snackbar: true,
      type: 'DEPLOYMENT_CRUD',
      data: {
        message: 'Deployment Successfully: ',
        variant: 'success',
      },
    },
    onError: {
      snackbar: true,
      type: 'DEPLOYMENT_ERR',
      data: {
        message: 'Deployment Failure: ',
        variant: 'error',
      },
    },
  },

  USER_CRUD: {
    onLoad: {
      snackbar: true,
      type: 'USER_CRUD',
      data: {
        message: 'User Successfully: ',
        variant: 'success',
      },
    },
    onError: {
      snackbar: true,
      type: 'USER_ERR',
      data: {
        message: 'User Failure: ',
        variant: 'error',
      },
    },
  },

  PROJECT_CRUD: {
    onLoad: {
      snackbar: true,
      type: 'PROJECT_CRUD',
      data: {
        message: 'Project Successfully: ',
        variant: 'success',
      },
    },
    onError: {
      snackbar: true,
      type: 'PROJECT_ERR',
      data: {
        message: 'Project Failure: ',
        variant: 'error',
      },
    },
  },

  PROJECT_LANE_CRUD: {
    onLoad: {
      snackbar: false,
      type: 'PROJECT_LANE_CRUD',
      data: {
        message: 'Project Lane Successfully: ',
        variant: 'success',
      },
    },
    onError: {
      snackbar: false,
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
      snackbar: false,
      data: {
        message: 'Project Task Successfully: ',
        variant: 'success',
      },
    },
    onError: {
      type: 'LANE_TASKS_ERR',
      snackbar: false,
      data: {
        message: 'Project Task Failure: ',
        variant: 'error',
      },
    },
  },
  LANE_TASK_MOVED: {
    onLoad: {
      type: 'LANE_TASKS_MOVED',
      snackbar: false,
      data: {
        message: 'Task Moved Successfully',
        variant: 'success',
      },
    },
    onError: {
      type: 'LANE_TASKS_MOVED_ERR',
      snackbar: false,
      data: {
        message: 'Task Move Failure',
        variant: 'error',
      },
    },
  },
  WORKSPACE_USER_CRUD: {
    onLoad: {
      snackbar: true,
      type: 'WORKSPACE_USERS_CRUD',
      data: {
        message: 'Workspace User Successfully: ',
        variant: 'success',
      },
    },
    onError: {
      snackbar: true,
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
      snackbar: false,
      data: {
        message: 'Project Task Successfully: ',
        variant: 'success',
      },
    },
    onError: {
      type: 'LANE_TASKS_ERR',
      snackbar: false,
      data: {
        message: 'Project Task Failure: ',
        variant: 'error',
      },
    },
  },

  WIKISECTIONS: {
    onLoad: {
      snackbar: false,
      type: 'WIKISECTIONS_LOAD',
      data: {
        message: 'Wiki Section Successfully: ',
        variant: 'success',
      },
    },
    onError: {
      snackbar: false,
      type: 'WIKISECTION_ERR',
      data: {
        message: 'Wiki Section Failure: ',
        variant: 'error',
      },
    },
  },
  WIKIPAGES: {
    onLoad: {
      snackbar: false,
      type: 'WIKIPAGES_LOAD',
      data: {
        message: 'Wiki Page Successfully: ',
        variant: 'success',
      },
    },
    onError: {
      snackbar: false,
      type: 'WIKIPAGES_ERR',
      data: {
        message: 'Wiki Page Failure: ',
        variant: 'error',
      },
    },
  },
};
