var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { F as FormModel, l as lib, A as APIRepo, a as lodash, m as makeStyles, o as observer, r as react, b as Autocomplete, T as TextField, S as Select, M as MenuItem, c as Typography, C as Checkbox, I as InputAdornment, d as default_1, e as default_1$1, f as default_1$2, g as Menu, i as inject, B as Button, h as Fab, j as default_1$3, k as IconButton, n as default_1$4, L as Link, D as DialogTitle, p as DialogContent, q as DialogContentText, s as DialogActions, t as IsString, u as IsNotEmpty, v as observable, w as makeObservable, x as Dialog, P as Paper, y as TableContainer, z as Table, E as TableHead, G as TableRow, H as TableCell, J as TableBody, K as TablePagination, N as alpha, O as AppBar, Q as clsx, R as Toolbar, U as default_1$5, V as default_1$6, W as Drawer, X as default_1$7, Y as Divider, Z as List, _ as ListSubheader, $ as ListItem, a0 as ListItemIcon, a1 as ListItemText, a2 as default_1$8, a3 as default_1$9, a4 as default_1$a, a5 as default_1$b, a6 as default_1$c, a7 as default_1$d, a8 as default_1$e, a9 as default_1$f, aa as Container, ab as CssBaseline, ac as Switch, ad as Route, ae as lib$1, af as useLocation, ag as CollectionModel, ah as Model, ai as CircularProgress, aj as React, ak as Plot, al as withSnackbar, am as SnackbarProvider, an as Avatar, ao as default_1$g, ap as Grid, aq as events, ar as mobxReactRouter, as as OnDemandRepo, at as createBrowserHistory, au as Redirect, av as Form, aw as Card, ax as Chip, ay as Alert, az as InputBase, aA as index, aB as default_1$h, aC as Markdown, aD as Tooltip, aE as default_1$i, aF as default_1$j, aG as Collapse, aH as MUIInput, aI as default_1$k, aJ as Router, aK as createTheme, aL as configure, aM as reactDom, aN as ThemeProvider, aO as Provider } from "./vendor.66687eb9.js";
const p = function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(script) {
    const fetchOpts = {};
    if (script.integrity)
      fetchOpts.integrity = script.integrity;
    if (script.referrerpolicy)
      fetchOpts.referrerPolicy = script.referrerpolicy;
    if (script.crossorigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (script.crossorigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
};
p();
const ROUTER_STORE = "routerstore";
const AUTH_STORE = "authstore";
const WORKSPACES_STORE = "workspacesstore";
const SNACKBAR_STORE = "snackbarstore";
const UI_STORE = "uistore";
const ADMIN_STORE = "adminstore";
const types = {
  USERLOAD: {
    onLoad: {
      type: "USERLOAD",
      data: {
        message: "Successfully Loaded User!",
        variant: "success"
      }
    },
    onError: {
      type: "USERLOAD_ERR",
      data: {
        message: "Failed to Load User: ",
        variant: "error"
      }
    }
  },
  SIGNIN: {
    onLoad: {
      type: "SIGNIN",
      data: {
        message: "Successfully Logged In!",
        variant: "success"
      }
    },
    onError: {
      type: "SIGNIN_ERR",
      data: {
        message: "Failed to Login: ",
        variant: "error"
      }
    }
  },
  SIGNUP: {
    onLoad: {
      type: "SIGNUP",
      data: {
        message: "Registered! Please check your email to verify your account.",
        variant: "success"
      }
    },
    onError: {
      type: "SIGNUP_ERR",
      data: {
        message: "Failed to Signup: ",
        variant: "error"
      }
    }
  },
  WIKISECTIONS: {
    onLoad: {
      type: "WIKISECTIONS_LOAD",
      data: {
        message: "Wiki Section Successfully: ",
        variant: "success"
      }
    },
    onError: {
      type: "WIKISECTION_ERR",
      data: {
        message: "Wiki Section Failure: ",
        variant: "error"
      }
    }
  },
  WIKIPAGES: {
    onLoad: {
      type: "WIKIPAGES_LOAD",
      data: {
        message: "Wiki Page Successfully: ",
        variant: "success"
      }
    },
    onError: {
      type: "WIKIPAGES_ERR",
      data: {
        message: "Wiki Page Failure: ",
        variant: "error"
      }
    }
  }
};
const eventTypes = {
  SIGNIN: {
    type: "SIGNIN",
    data: {
      message: "Successfully Logged In!",
      variant: "success"
    }
  },
  SIGNIN_ERR: {
    type: "SIGNIN",
    data: {
      message: "Failed to Login: ",
      variant: "error"
    }
  },
  SIGNUP: {
    type: "SIGNUP",
    data: {
      message: "Registered! Please check your email to verify your account.",
      variant: "success"
    }
  },
  SIGNUP_ERR: {
    type: "SIGNUP_ERR",
    data: {
      message: "Failed to Signup: ",
      variant: "error"
    }
  },
  VERIFY: {
    type: "VERIFY",
    data: {
      message: "Successfully Verified",
      variant: "success"
    }
  },
  VERIFY_ERR: {
    type: "VERIFY_ERR",
    data: {
      message: "Failed to Verify: ",
      variant: "error"
    }
  },
  PASSWORD_RESET: {
    type: "PASSWORD_RESET",
    data: {
      message: "Success: Please check your email to reset your password!",
      variant: "success"
    }
  },
  PASSWORD_RESET_ERR: {
    type: "PASSWORD_RESET_ERR",
    data: {
      message: "Failure: ",
      variant: "error"
    }
  },
  CHANGE_PASSWORD: {
    type: "CHANGE_PASSWORD",
    data: {
      message: "Successfully Changed Password",
      variant: "success"
    }
  },
  CHANGE_PASSWORD_ERR: {
    type: "CHANGE_PASSWORD_ERR",
    data: {
      message: "Change Password Failed: ",
      variant: "error"
    }
  },
  WORKSPACE_CRUD: {
    type: "WORKSPACE_CRUD",
    data: {
      message: "Workspace Successfully: ",
      variant: "success"
    }
  },
  WORKSPACE_ERR: {
    type: "WORKSPACE_ERR",
    data: {
      message: "Workspace Failure: ",
      variant: "error"
    }
  },
  DEPLOYMENT_CRUD: {
    type: "DEPLOYMENT_CRUD",
    data: {
      message: "Deployment Successfully: ",
      variant: "success"
    }
  },
  DEPLOYMENT_ERR: {
    type: "DEPLOYMENT_ERR",
    data: {
      message: "Deployment Failure: ",
      variant: "error"
    }
  },
  WIKI_CRUD: {
    type: "WIKI_CRUD",
    data: {
      message: "Wiki Successfully: ",
      variant: "success"
    }
  },
  WIKI_ERR: {
    type: "WIKI_ERR",
    data: {
      message: "Wiki Failure: ",
      variant: "error"
    }
  },
  USER_CRUD: {
    type: "USER_CRUD",
    data: {
      message: "User Successfully: ",
      variant: "success"
    }
  },
  USER_ERR: {
    type: "USER_ERR",
    data: {
      message: "User Failure: ",
      variant: "error"
    }
  },
  PROJECT_CRUD: {
    type: "PROJECT_CRUD",
    data: {
      message: "Project Successfully: ",
      variant: "success"
    }
  },
  PROJECT_ERR: {
    type: "PROJECT_ERR",
    data: {
      message: "Project Failure: ",
      variant: "error"
    }
  },
  PROJECT_LANE_CRUD: {
    type: "PROJECT_LANE_CRUD",
    data: {
      message: "Project Lane Successfully: ",
      variant: "success"
    }
  },
  PROJECT_LANE_ERR: {
    type: "PROJECT_LANE_ERR",
    data: {
      message: "Project Lane Failure: ",
      variant: "error"
    }
  },
  WORKSPACE_USER_CRUD: {
    type: "WORKSPACE_USERS_CRUD",
    data: {
      message: "Workspace User Successfully: ",
      variant: "success"
    }
  },
  WORKSPACE_USER_ERR: {
    type: "WORKSPACE_USERS_ERR",
    data: {
      message: "Workspace User Failure: ",
      variant: "error"
    }
  },
  LANE_TASK_CRUD: {
    type: "LANE_TASKS_CRUD",
    data: {
      message: "Project Task Successfully: ",
      variant: "success"
    }
  },
  LANE_TASK_ERR: {
    type: "LANE_TASKS_ERR",
    data: {
      message: "Project Task Failure: ",
      variant: "error"
    }
  }
};
var Role;
(function(Role2) {
  Role2["User"] = "user";
  Role2["SuperAdmin"] = "super_admin";
  Role2["WorkspaceAdmin"] = "workspace_admin";
})(Role || (Role = {}));
const WorkspaceRole = [Role.SuperAdmin, Role.User];
const InWorkspaceRole = [Role.WorkspaceAdmin, Role.User];
const roles = [];
for (const key in Role) {
  roles.push({ label: key, value: Role[key] });
}
var Action;
(function(Action2) {
  Action2["ManageUser"] = "users:manage";
  Action2["ManageWorkspace"] = "workspaces:manage";
  Action2["CreateWorkspace"] = "workspaces:create";
  Action2["ReadWorkspace"] = "workspaces:read";
  Action2["UpdateWorkspace"] = "workspaces:update";
  Action2["DeleteWorkspace"] = "workspaces:delete";
  Action2["CreateDeployment"] = "deployments:create";
  Action2["ReadDeployment"] = "deployments:read";
  Action2["ProxyDeployment"] = "deployments:proxy";
  Action2["UpdateDeployment"] = "deployments:update";
  Action2["DeleteDeployment"] = "deployments:delete";
  Action2["CreateWiki"] = "wiki:create";
  Action2["ReadWiki"] = "wiki:read";
  Action2["UpdateWiki"] = "wiki:update";
  Action2["DeleteWiki"] = "wiki:delete";
  Action2["CreateWikiSection"] = "wiki_sections:create";
  Action2["ReadWikiSection"] = "wiki_sections:read";
  Action2["UpdateWikiSection"] = "wiki_sections:update";
  Action2["DeleteWikiSection"] = "wiki_sections:delete";
  Action2["CreateWikiPage"] = "wiki_pages:create";
  Action2["ReadWikiPage"] = "wiki_pages:read";
  Action2["UpdateWikiPage"] = "wiki_pages:update";
  Action2["DeleteWikiPage"] = "wiki_pages:delete";
  Action2["CreateProject"] = "projects:create";
  Action2["ReadProject"] = "projects:read";
  Action2["UpdateProject"] = "projects:update";
  Action2["DeleteProject"] = "projects:delete";
  Action2["CreateProjectLane"] = "project_lanes:create";
  Action2["ReadProjectLane"] = "project_lanes:read";
  Action2["UpdateProjectLane"] = "project_lanes:update";
  Action2["DeleteProjectLane"] = "project_lanes:delete";
  Action2["CreateProjectTask"] = "project_tasks:create";
  Action2["ReadProjectTask"] = "project_tasks:read";
  Action2["UpdateProjectTask"] = "project_tasks:update";
  Action2["DeleteProjectTask"] = "project_tasks:delete";
})(Action || (Action = {}));
const WorkspaceActions = [
  Action.CreateWorkspace,
  Action.ReadWorkspace,
  Action.UpdateWorkspace,
  Action.DeleteWorkspace
];
const InWorkspaceActions = [
  Action.CreateDeployment,
  Action.ReadDeployment,
  Action.ProxyDeployment,
  Action.UpdateDeployment,
  Action.DeleteDeployment,
  Action.CreateWiki,
  Action.ReadWiki,
  Action.UpdateWiki,
  Action.DeleteWiki,
  Action.CreateWikiSection,
  Action.ReadWikiSection,
  Action.UpdateWikiSection,
  Action.DeleteWikiSection,
  Action.CreateWikiPage,
  Action.ReadWikiPage,
  Action.UpdateWikiPage,
  Action.DeleteWikiPage,
  Action.CreateProject,
  Action.ReadProject,
  Action.UpdateProject,
  Action.DeleteProject,
  Action.CreateProjectLane,
  Action.ReadProjectLane,
  Action.UpdateProjectLane,
  Action.DeleteProjectLane,
  Action.CreateProjectTask,
  Action.ReadProjectTask,
  Action.UpdateProjectTask,
  Action.DeleteProjectTask
];
class SignInFormModel extends FormModel {
  constructor() {
    super({
      data: {
        email: "",
        password: ""
      },
      validator: lib.SignInDto,
      submit: new APIRepo({
        path: "/api/auth/login",
        method: "POST",
        events: {
          onLoad: eventTypes.SIGNIN,
          onError: eventTypes.SIGNIN_ERR
        }
      })
    });
  }
}
class SignupFormModel extends FormModel {
  constructor() {
    super({
      data: {
        fullName: "",
        email: "",
        password: ""
      },
      validator: lib.CreateUserDto,
      submit: new APIRepo({
        path: "/api/auth/register",
        method: "POST",
        events: types.SIGNUP
      })
    });
  }
}
class CreateUserFormModel extends SignupFormModel {
  constructor() {
    super();
    this.submit = new APIRepo({
      path: "/api/users",
      method: "POST",
      events: types.SIGNUP
    });
  }
}
class VerifyAccountFormModel extends FormModel {
  constructor() {
    super({
      data: {
        token: ""
      },
      validator: lib.VerifyAccountDto,
      submit: new APIRepo({
        path: "/api/auth/verify-account",
        method: "POST",
        events: {
          onLoad: eventTypes.VERIFY,
          onError: eventTypes.VERIFY_ERR
        }
      })
    });
  }
}
class ForgotPasswordFormModel extends FormModel {
  constructor() {
    super({
      data: { email: "" },
      validator: lib.ForgotPasswordDto,
      submit: new APIRepo({
        path: "/api/auth/forgot-password",
        method: "POST"
      })
    });
  }
}
class ChangePasswordFormModel extends FormModel {
  constructor() {
    super({
      data: {
        token: "",
        password: "",
        confirmPassword: ""
      },
      validator: lib.ChangePasswordDto,
      submit: new APIRepo({
        path: "/api/auth/change-password",
        method: "POST"
      })
    });
  }
}
class UpdateUserFormModel extends FormModel {
  constructor(user) {
    super({
      repo: user.repo,
      validator: lib.UpdateUserDto,
      submit: new APIRepo({
        path: "/api/user",
        method: "PUT",
        events: {
          onLoad: eventTypes.USER_CRUD,
          onError: eventTypes.USER_ERR
        }
      })
    });
  }
}
class BaseAdminPermissionsFormModel extends FormModel {
  constructor(permissions) {
    super({
      repo: permissions.repo
    });
    this.permissions = permissions;
  }
  onSelectPermission(permission) {
    return () => {
      let change;
      if (this.hasPermission(permission))
        change = lodash.exports.without(this.data.permissions, permission);
      else
        change = [...this.data.permissions, permission];
      this.onChange("permissions")(change);
    };
  }
  hasPermission(permission) {
    return this.data.permissions.includes(permission);
  }
  onSelectRole(role) {
    return () => {
      let change = [role];
      this.onChange("roles")(change);
    };
  }
  hasRole(role) {
    return this.data.roles.includes(role);
  }
}
class WorkspacePermissionsFormModel extends BaseAdminPermissionsFormModel {
  constructor(permissions, workspace) {
    super(permissions);
    this.permissions = permissions;
    this.workspace = workspace;
    this.submit = new APIRepo({
      path: this.permissions.api,
      method: "PUT"
    });
  }
}
class AdminPermissionsFormModel extends BaseAdminPermissionsFormModel {
  constructor(permissions) {
    super(permissions);
    this.permissions = permissions;
    this.submit = new APIRepo({
      path: this.permissions.api,
      method: "PUT"
    });
  }
}
class AdminUpdateUserFormModel extends FormModel {
  constructor(user) {
    super({
      data: {
        fullName: user.fullName,
        password: ""
      },
      submit: new APIRepo({
        path: user.api,
        method: "PUT"
      })
    });
    this.user = user;
  }
  get payload() {
    if (this.data.password !== "") {
      return {
        fullName: this.data.fullName,
        password: this.data.password
      };
    }
    return {
      fullName: this.data.fullName
    };
  }
}
const useStyles$9 = makeStyles((theme2) => ({
  root: {
    color: "white",
    "& .MuiOutlinedInput-notchedOutline": {
      color: "white",
      borderColor: "white"
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "white"
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "white"
    }
  },
  input: {
    "&::selection": {
      color: "white"
    }
  }
}));
const useLabelStyles$1 = makeStyles({
  root: {
    color: "white",
    "&.Mui-focused": {
      color: "white"
    }
  }
});
observer((props) => {
  const { workspacesstore } = useStores();
  const workspaces = workspacesstore.workspaces;
  const options = workspaces.workspaces;
  const loading = workspaces.state === "loading";
  const classes = useStyles$9();
  const labelClasses = useLabelStyles$1();
  const onChange = (option, values) => {
    workspacesstore.selectedWorkspace = values;
  };
  if (loading)
    return null;
  return /* @__PURE__ */ react.exports.createElement(Autocomplete, {
    id: "combo-box-demo",
    loading,
    classes,
    value: workspacesstore.selectedWorkspace,
    onChange,
    options,
    getOptionLabel: (option) => option.name,
    style: { width: 300 },
    renderInput: (params) => /* @__PURE__ */ react.exports.createElement(TextField, __spreadProps(__spreadValues({}, params), {
      InputLabelProps: { classes: labelClasses },
      label: "Select Workspace...",
      variant: "outlined"
    }))
  });
});
const BaseSelect = observer((props) => {
  const _a = props, { form, id, options } = _a, rest = __objRest(_a, ["form", "id", "options"]);
  const value = form.get(id);
  const error = form.getError(id);
  return /* @__PURE__ */ react.exports.createElement(Select, __spreadValues({
    error: value && error != void 0,
    value,
    style: { width: "100%" },
    onChange: form.onChange(id),
    variant: "outlined"
  }, rest), options.map((option) => {
    return /* @__PURE__ */ react.exports.createElement(MenuItem, {
      key: option.label,
      value: option.value
    }, option.label);
  }));
});
observer((props) => {
  return /* @__PURE__ */ react.exports.createElement(BaseSelect, __spreadProps(__spreadValues({}, props), {
    id: "roles",
    options: roles,
    multiple: true
  }));
});
const Input = observer((props) => {
  const _a = props, { form, id, children, workspaceCheck, defaultVal } = _a, rest = __objRest(_a, ["form", "id", "children", "workspaceCheck", "defaultVal"]);
  let value = form.get(id);
  const error = form.errors[id];
  return /* @__PURE__ */ react.exports.createElement(TextField, __spreadValues({
    onChange: form.onChange(id),
    error: value && error != void 0,
    helperText: value ? error : void 0,
    value,
    variant: "outlined",
    margin: "normal",
    autoComplete: "off",
    required: true,
    fullWidth: true,
    id,
    name: id,
    defaultValue: workspaceCheck && Number(value)
  }, rest), children);
});
const useStyles$8 = makeStyles((theme2) => ({
  margin: {
    margin: theme2.spacing(1, 0, 1, 0)
  },
  subtitle: {
    margin: theme2.spacing(1, 0, 1, 0),
    color: "inherit",
    variant: "subtitle1"
  }
}));
const ResourcesInput = (props) => {
  const classes = useStyles$8();
  const { form } = props;
  const [persist, setPersist] = react.exports.useState(true);
  const handleCheckbox = () => {
    form.onChange("storageCount")(persist ? void 0 : 8);
    setPersist(!persist);
  };
  return /* @__PURE__ */ react.exports.createElement(react.exports.Fragment, null, /* @__PURE__ */ react.exports.createElement(CPUMemoryInput, {
    form
  }), /* @__PURE__ */ react.exports.createElement(Typography, null, /* @__PURE__ */ react.exports.createElement(Checkbox, {
    checked: persist,
    onChange: handleCheckbox,
    name: "checkedB",
    color: "primary"
  }), "Persist deployment"), persist ? /* @__PURE__ */ react.exports.createElement(Input, {
    form,
    className: classes.margin,
    margin: "dense",
    id: "storageCount",
    label: "Storage",
    type: "number",
    InputProps: {
      startAdornment: /* @__PURE__ */ react.exports.createElement(InputAdornment, {
        position: "start"
      }, /* @__PURE__ */ react.exports.createElement(default_1, null))
    },
    fullWidth: true
  }) : null);
};
const CPUMemoryInput = ({
  form
}) => {
  return /* @__PURE__ */ react.exports.createElement(react.exports.Fragment, null, /* @__PURE__ */ react.exports.createElement(CPUInput, {
    form
  }), /* @__PURE__ */ react.exports.createElement(MemoryInput, {
    form
  }));
};
const StorageInput = ({
  form
}) => {
  return /* @__PURE__ */ react.exports.createElement(ResourceInput, {
    form,
    id: "storageCount",
    label: "Storage",
    icon: /* @__PURE__ */ react.exports.createElement(default_1, null)
  });
};
const CPUInput = ({
  form
}) => {
  return /* @__PURE__ */ react.exports.createElement(ResourceInput, {
    form,
    id: "cpuCount",
    label: "CPU Cores",
    icon: /* @__PURE__ */ react.exports.createElement(default_1$1, null)
  });
};
const MemoryInput = ({
  form
}) => {
  return /* @__PURE__ */ react.exports.createElement(ResourceInput, {
    form,
    id: "memoryCount",
    label: "RAM (GBs)",
    icon: /* @__PURE__ */ react.exports.createElement(default_1$2, null)
  });
};
const ResourceInput = ({ form, id, icon, label }) => {
  const classes = useStyles$8();
  return /* @__PURE__ */ react.exports.createElement(Input, {
    form,
    className: classes.margin,
    margin: "dense",
    id,
    label,
    type: "number",
    InputProps: {
      startAdornment: /* @__PURE__ */ react.exports.createElement(InputAdornment, {
        position: "start"
      }, icon)
    },
    defaultVal: form.get(id),
    fullWidth: true
  });
};
const initialState = {
  mouseX: null,
  mouseY: null
};
const ContextMenu = (props) => {
  const [state, setState] = react.exports.useState(initialState);
  const { children, menuItems } = props;
  const handleClick = (e) => {
    e.preventDefault();
    setState({
      mouseX: e.clientX - 2,
      mouseY: e.clientY - 4
    });
  };
  const handleClose = () => {
    setState(initialState);
  };
  const onClick = (func) => {
    return () => {
      func();
      handleClose();
    };
  };
  return /* @__PURE__ */ react.exports.createElement("div", {
    onContextMenu: handleClick,
    style: { cursor: "context-menu" }
  }, children, /* @__PURE__ */ react.exports.createElement(Menu, {
    keepMounted: true,
    open: state.mouseY !== null,
    onClose: handleClose,
    anchorReference: "anchorPosition",
    anchorPosition: state.mouseY !== null && state.mouseX !== null ? { top: state.mouseY, left: state.mouseX } : void 0
  }, menuItems.map((item) => {
    return /* @__PURE__ */ react.exports.createElement(MenuItem, {
      onClick: onClick(item.onClick),
      key: item.label
    }, item.label);
  })));
};
const AddFABBase = (props) => {
  const { onClick } = props;
  return /* @__PURE__ */ react.exports.createElement(Fab, {
    color: "primary",
    "aria-label": "add",
    style: {
      position: "absolute",
      bottom: "40px",
      right: "50px"
    },
    onClick
  }, /* @__PURE__ */ react.exports.createElement(default_1$3, null));
};
const AddFAB = inject(ROUTER_STORE)(observer((props) => {
  const store = props[ROUTER_STORE];
  const { link } = props;
  return /* @__PURE__ */ react.exports.createElement(AddFABBase, {
    onClick: () => {
      store.push(link);
    }
  });
}));
const LinkButton = (props) => {
  return /* @__PURE__ */ react.exports.createElement(Button, __spreadValues({
    variant: "contained",
    color: "primary",
    style: { bottom: 3, right: 3, position: "absolute" },
    component: Link
  }, props), props.children);
};
const CancelCreateButtons = observer((props) => {
  const { routerstore } = useStores();
  const { form, labels } = props;
  const defaultCancel = routerstore.goBack;
  const defaultSubmit = async () => {
    await form.call();
    if (form.submit.state == "loaded") {
      routerstore.goBack();
    }
  };
  const cancel = props.cancel || defaultCancel;
  const submit = props.submit || defaultSubmit;
  const [label1, label2] = labels || ["Cancel", "Create"];
  const { isValid } = form;
  return /* @__PURE__ */ react.exports.createElement("div", {
    style: { float: "right" }
  }, /* @__PURE__ */ react.exports.createElement(Button, {
    onClick: cancel,
    color: "primary"
  }, label1), /* @__PURE__ */ react.exports.createElement(Button, {
    onClick: submit,
    disabled: !isValid,
    color: "primary"
  }, label2));
});
const MoreMenu = (props) => {
  const { options } = props;
  const [anchorEl, setAnchorEl] = react.exports.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const onClick = (option) => {
    return () => {
      option.onClick();
      handleClose();
    };
  };
  return /* @__PURE__ */ react.exports.createElement(react.exports.Fragment, null, /* @__PURE__ */ react.exports.createElement(IconButton, {
    "aria-label": "more",
    "aria-controls": "long-menu",
    "aria-haspopup": "true",
    onClick: handleClick
  }, /* @__PURE__ */ react.exports.createElement(default_1$4, null)), /* @__PURE__ */ react.exports.createElement(Menu, {
    id: "long-menu",
    anchorEl,
    keepMounted: true,
    open,
    onClose: handleClose
  }, options.map((option) => /* @__PURE__ */ react.exports.createElement(MenuItem, {
    key: option.name,
    onClick: onClick(option)
  }, option.name))));
};
const Label = (props) => {
  return /* @__PURE__ */ react.exports.createElement(Typography, {
    variant: "h6"
  }, props.children);
};
const ConfirmDeleteDialog = observer(() => {
  const { uistore } = useStores();
  const form = uistore.confirmDelete;
  const { dialog, submit, name } = form;
  return /* @__PURE__ */ react.exports.createElement(BaseDialog, {
    dialog
  }, /* @__PURE__ */ react.exports.createElement(DialogTitle, null, "Confirm Delete"), /* @__PURE__ */ react.exports.createElement(DialogContent, null, /* @__PURE__ */ react.exports.createElement(DialogContentText, null, "Are you sure you want to delete", /* @__PURE__ */ react.exports.createElement("br", null), name), /* @__PURE__ */ react.exports.createElement(Input, {
    autoFocus: true,
    form,
    error: !form.valid,
    helperText: `type ${name} to delete`,
    margin: "dense",
    id: "name",
    label: "Confirm Delete",
    type: "text",
    fullWidth: true
  })), /* @__PURE__ */ react.exports.createElement(DialogActions, null, /* @__PURE__ */ react.exports.createElement(Button, {
    onClick: dialog.onClose,
    color: "secondary"
  }, "Cancel"), /* @__PURE__ */ react.exports.createElement(Button, {
    onClick: submit,
    disabled: !form.valid,
    color: "primary"
  }, "Delete")));
});
var __defProp$5 = Object.defineProperty;
var __getOwnPropDesc$5 = Object.getOwnPropertyDescriptor;
var __decorateClass$5 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$5(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$5(target, key, result);
  return result;
};
class ConfirmDeleteValidator {
  constructor() {
    __publicField(this, "name");
  }
}
__decorateClass$5([
  IsString(),
  IsNotEmpty()
], ConfirmDeleteValidator.prototype, "name", 2);
var __defProp$4 = Object.defineProperty;
var __getOwnPropDesc$4 = Object.getOwnPropertyDescriptor;
var __decorateClass$4 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$4(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$4(target, key, result);
  return result;
};
class DialogModel {
  constructor(open) {
    __publicField(this, "open", false);
    __publicField(this, "onOpen", () => {
      this.open = true;
      console.log("OPEN", this);
    });
    __publicField(this, "onClose", () => {
      this.open = false;
    });
    this.open = open || false;
    makeObservable(this);
  }
}
__decorateClass$4([
  observable
], DialogModel.prototype, "open", 2);
class ConfirmDeleteModel extends FormModel {
  constructor() {
    super({ validator: ConfirmDeleteValidator, data: { name: "" } });
    __publicField(this, "dialog");
    __publicField(this, "callBack");
    __publicField(this, "name");
    __publicField(this, "setTarget", (name, callBack) => {
      this.name = name;
      this.callBack = callBack;
    });
    __publicField(this, "submit", async () => {
      if (this.valid) {
        await this.callBack();
        this.dialog.onClose();
      }
    });
    __publicField(this, "reset", () => {
      this.data.name = "";
    });
    this.dialog = new DialogModel();
    makeObservable(this);
  }
  get valid() {
    return this.data.name === this.name;
  }
}
__decorateClass$4([
  observable
], ConfirmDeleteModel.prototype, "name", 2);
class BaseUserDialogModel extends DialogModel {
  constructor() {
    super();
    __publicField(this, "user");
    makeObservable(this);
  }
  setUserAndOpen(user) {
    this.user = user;
    this.onOpen();
  }
}
__decorateClass$4([
  observable
], BaseUserDialogModel.prototype, "user", 2);
class BaseAdminUserDialogModel extends BaseUserDialogModel {
}
class AdminUserDialogModel extends BaseUserDialogModel {
}
class PermissionsDialogModel extends BaseAdminUserDialogModel {
  constructor(permissions, roles2) {
    super();
    this.permissions = permissions;
    this.roles = roles2;
  }
}
const WorkspaceAdminPermissionsDialogModel = new PermissionsDialogModel(InWorkspaceActions, InWorkspaceRole);
const AdminPermissionsDialogModel = new PermissionsDialogModel(WorkspaceActions, WorkspaceRole);
const PermissionsDialog = observer((props) => {
  const { dialog } = props;
  const { user } = dialog;
  console.log("PermissionsDialog", dialog, user);
  if (!user)
    return null;
  const form = user.permissions.permissionsForm;
  return /* @__PURE__ */ react.exports.createElement(BaseDialog, {
    dialog
  }, /* @__PURE__ */ react.exports.createElement(DialogTitle, null, "Permissions: ", user.fullName), /* @__PURE__ */ react.exports.createElement(DialogContent, null, /* @__PURE__ */ react.exports.createElement(RolesForm, {
    form,
    roles: dialog.roles
  }), /* @__PURE__ */ react.exports.createElement(PermissionsForm, {
    form,
    permissions: dialog.permissions
  })), /* @__PURE__ */ react.exports.createElement(DialogActions, null, /* @__PURE__ */ react.exports.createElement(CancelCreateButtons, {
    form,
    labels: ["Cancel", "Edit"],
    cancel: dialog.onClose,
    submit: async () => {
      form.call();
      console.log(JSON.stringify(form.payload));
    }
  })));
});
const BaseDialog = observer(({ dialog, children }) => {
  const { open, onClose } = dialog;
  return /* @__PURE__ */ react.exports.createElement(Dialog, {
    open,
    onClose
  }, children);
});
const InviteUserDialog = observer((props) => {
  const { dialog, form } = props;
  return /* @__PURE__ */ react.exports.createElement(BaseDialog, {
    dialog
  }, /* @__PURE__ */ react.exports.createElement(DialogTitle, null, "Invite User"), /* @__PURE__ */ react.exports.createElement(DialogContent, null, /* @__PURE__ */ react.exports.createElement(Label, null, "User Email"), /* @__PURE__ */ react.exports.createElement(Input, {
    form,
    id: "email"
  })), /* @__PURE__ */ react.exports.createElement(DialogActions, null, /* @__PURE__ */ react.exports.createElement(CancelCreateButtons, {
    form,
    labels: ["Cancel", "Invite"],
    cancel: dialog.onClose,
    submit: async () => {
      await form.call();
      dialog.onClose();
    }
  })));
});
const EditUserDialog = observer((props) => {
  const { adminstore } = useStores();
  const { editUserDialog } = adminstore;
  const { user } = editUserDialog;
  if (!user)
    return null;
  const form = user.updateUserForm;
  return /* @__PURE__ */ react.exports.createElement(BaseDialog, {
    dialog: editUserDialog
  }, /* @__PURE__ */ react.exports.createElement(DialogTitle, null, "Edit: ", user.fullName), /* @__PURE__ */ react.exports.createElement(DialogContent, null, /* @__PURE__ */ react.exports.createElement(Label, null, "Full Name"), /* @__PURE__ */ react.exports.createElement(Input, {
    form,
    id: "fullName"
  }), /* @__PURE__ */ react.exports.createElement(Label, null, "Password"), /* @__PURE__ */ react.exports.createElement(Input, {
    form,
    id: "password",
    type: "password"
  })), /* @__PURE__ */ react.exports.createElement(DialogActions, null, /* @__PURE__ */ react.exports.createElement(CancelCreateButtons, {
    form,
    cancel: () => {
      editUserDialog.onClose();
    },
    submit: async () => {
      await form.call();
      editUserDialog.onClose();
    },
    labels: ["Cancel", "Edit"]
  })));
});
const CreateUserDialog = observer((props) => {
  const { adminstore } = useStores();
  const { createUserDialog } = adminstore;
  const form = adminstore.users.createUserForm;
  return /* @__PURE__ */ react.exports.createElement(BaseDialog, {
    dialog: createUserDialog
  }, /* @__PURE__ */ react.exports.createElement(DialogTitle, null, "Create User"), /* @__PURE__ */ react.exports.createElement(DialogContent, null, /* @__PURE__ */ react.exports.createElement(Label, null, "Full Name"), /* @__PURE__ */ react.exports.createElement(Input, {
    form,
    id: "fullName"
  }), /* @__PURE__ */ react.exports.createElement(Label, null, "Email"), /* @__PURE__ */ react.exports.createElement(Input, {
    form,
    id: "email"
  }), /* @__PURE__ */ react.exports.createElement(Label, null, "Password"), /* @__PURE__ */ react.exports.createElement(Input, {
    form,
    id: "password",
    type: "password"
  })), /* @__PURE__ */ react.exports.createElement(DialogActions, null, /* @__PURE__ */ react.exports.createElement(CancelCreateButtons, {
    form,
    cancel: () => {
      createUserDialog.onClose();
    },
    submit: async () => {
      await form.call();
      createUserDialog.onClose();
    },
    labels: ["Cancel", "Create"]
  })));
});
const useStyles$7 = makeStyles({
  root: {
    width: "100%"
  },
  container: {
    maxHeight: 580
  },
  heading: {
    marginBottom: "20px"
  }
});
const PaginatedTable = (props) => {
  const classes = useStyles$7();
  const { columns: columns2, rows } = props;
  const [page, setPage] = react.exports.useState(0);
  const [rowsPerPage, setRowsPerPage] = react.exports.useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return /* @__PURE__ */ react.exports.createElement(Paper, {
    className: classes.root
  }, /* @__PURE__ */ react.exports.createElement(TableContainer, {
    className: classes.container
  }, /* @__PURE__ */ react.exports.createElement(Table, {
    stickyHeader: true,
    "aria-label": "sticky table"
  }, /* @__PURE__ */ react.exports.createElement(TableHead, null, /* @__PURE__ */ react.exports.createElement(TableRow, null, columns2.map((column) => /* @__PURE__ */ react.exports.createElement(TableCell, {
    key: column.id,
    align: column.align,
    style: { minWidth: column.minWidth }
  }, column.label)))), /* @__PURE__ */ react.exports.createElement(TableBody, null, rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
    return /* @__PURE__ */ react.exports.createElement(TableRow, {
      hover: true,
      role: "checkbox",
      tabIndex: -1,
      key: row.id
    }, columns2.map((column) => {
      const value = row[column.id];
      return /* @__PURE__ */ react.exports.createElement(TableCell, {
        key: column.id,
        align: column.align
      }, value);
    }));
  })))), /* @__PURE__ */ react.exports.createElement(TablePagination, {
    rowsPerPageOptions: [10, 25, 100],
    component: "div",
    count: rows.length,
    rowsPerPage,
    page,
    onPageChange: handleChangePage,
    onRowsPerPageChange: handleChangeRowsPerPage
  }));
};
const columns$2 = [
  {
    id: "fullName",
    label: "Full Name"
  },
  {
    id: "email",
    label: "Email"
  },
  {
    id: "id",
    label: "User ID"
  },
  {
    id: "isEnabled",
    label: "Enabled"
  },
  {
    id: "isVerified",
    label: "Verified"
  },
  {
    id: "menu",
    label: "",
    align: "right",
    minWidth: 50
  }
];
const UsersTable$1 = observer(() => {
  const { adminstore, uistore } = useStores();
  const { users } = adminstore;
  if (users.state !== "loaded")
    return null;
  const rows = users.map((user) => {
    return {
      email: user.email,
      fullName: user.fullName,
      id: user.id,
      isEnabled: user.isEnabled ? "True" : "False",
      isVerified: user.isVerified ? "True" : "False",
      menu: /* @__PURE__ */ react.exports.createElement(MoreMenu, {
        options: [
          {
            name: "Delete",
            onClick: () => {
              uistore.setDeleteTarget(user.fullName, user.onDelete);
            }
          },
          {
            name: "Edit",
            onClick: () => {
              adminstore.editUserDialog.setUserAndOpen(user);
            }
          },
          {
            name: user.isEnabled ? "Disable" : "Enable",
            onClick: () => {
              user.onFlipDisable();
            }
          },
          {
            name: user.isVerified ? "Unverify" : "Verify",
            onClick: () => {
              user.onFlipVerify();
            }
          },
          {
            name: "Reset Password",
            onClick: () => {
              user.onResetPassword();
            }
          },
          {
            name: "Permissions",
            onClick: () => {
              AdminPermissionsDialogModel.setUserAndOpen(user);
            }
          }
        ]
      })
    };
  });
  return /* @__PURE__ */ react.exports.createElement(react.exports.Fragment, null, /* @__PURE__ */ react.exports.createElement(Typography, {
    variant: "h4"
  }, "Users"), /* @__PURE__ */ react.exports.createElement(PaginatedTable, {
    columns: columns$2,
    rows
  }));
});
const AdminUsersPage = observer((props) => {
  const { adminstore } = useStores();
  return /* @__PURE__ */ react.exports.createElement("div", null, /* @__PURE__ */ react.exports.createElement(UsersTable$1, null), /* @__PURE__ */ react.exports.createElement(PermissionsDialog, {
    dialog: AdminPermissionsDialogModel
  }), /* @__PURE__ */ react.exports.createElement(EditUserDialog, null), /* @__PURE__ */ react.exports.createElement(CreateUserDialog, null), /* @__PURE__ */ react.exports.createElement(AddFABBase, {
    onClick: adminstore.createUserDialog.onOpen
  }));
});
const AdminHomePage = () => {
  return /* @__PURE__ */ react.exports.createElement("div", null, "admin home page");
};
const useStyles$6 = makeStyles((theme2) => ({
  root: {
    color: "white",
    "& .MuiOutlinedInput-notchedOutline": {
      color: "white",
      borderColor: "white"
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "white"
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "white"
    }
  },
  input: {
    "&::selection": {
      color: "white"
    }
  }
}));
const useLabelStyles = makeStyles({
  root: {
    color: "white",
    "&.Mui-focused": {
      color: "white"
    }
  }
});
const WorkspaceSelect = observer(() => {
  const { workspacesstore } = useStores();
  const classes = useStyles$6();
  const labelClasses = useLabelStyles();
  const workspaces = workspacesstore.workspaces;
  const options = workspaces.workspaces;
  const loading = workspaces.state !== "loaded";
  const selectedWorkspace = workspacesstore.selectedWorkspace;
  const onChange = (option, values) => {
    workspacesstore.selectedWorkspace = values;
  };
  return /* @__PURE__ */ react.exports.createElement("div", null, /* @__PURE__ */ react.exports.createElement(Autocomplete, {
    id: "combo-box-demo",
    loading,
    classes,
    value: selectedWorkspace,
    onChange,
    options,
    getOptionLabel: (option) => option.name,
    style: { width: 300 },
    renderInput: (params) => /* @__PURE__ */ react.exports.createElement(TextField, __spreadProps(__spreadValues({}, params), {
      InputLabelProps: { classes: labelClasses },
      label: "Select Workspace...",
      variant: "outlined"
    }))
  }));
});
const drawerWidth$1 = 240;
const useStyles$5 = makeStyles((theme2) => ({
  toolbar: {
    paddingRight: 24,
    marginTop: 5
  },
  appBar: {
    zIndex: theme2.zIndex.drawer + 1,
    transition: theme2.transitions.create(["width", "margin"], {
      easing: theme2.transitions.easing.sharp,
      duration: theme2.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth$1,
    width: `calc(100% - ${drawerWidth$1}px)`,
    transition: theme2.transitions.create(["width", "margin"], {
      easing: theme2.transitions.easing.sharp,
      duration: theme2.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  menuButtonHidden: {
    display: "none"
  },
  title: {
    flexGrow: 1
  },
  search: {
    position: "relative",
    borderRadius: theme2.shape.borderRadius,
    backgroundColor: alpha(theme2.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme2.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: "100%",
    [theme2.breakpoints.up("sm")]: {
      marginLeft: theme2.spacing(1),
      width: "auto"
    }
  },
  searchIcon: {
    padding: theme2.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme2.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme2.spacing(4)}px)`,
    transition: theme2.transitions.create("width"),
    width: "100%",
    [theme2.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch"
      }
    }
  },
  accountIcon: {
    position: "absolute",
    right: "0px"
  }
}));
const WorkspaceTopBar = observer((props) => {
  const { uistore, authstore } = useStores();
  const classes = useStyles$5();
  const [anchorEl, setAnchorEl] = react.exports.useState(null);
  const openAccount = Boolean(anchorEl);
  const open = uistore.sideBarOpen;
  const handleAccountMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleIconClose = () => {
    setAnchorEl(null);
  };
  const handleSignOut = async () => {
    await authstore.logout();
    setAnchorEl(null);
  };
  return /* @__PURE__ */ react.exports.createElement(AppBar, {
    position: "absolute",
    className: clsx(classes.appBar, open && classes.appBarShift)
  }, /* @__PURE__ */ react.exports.createElement(Toolbar, {
    className: classes.toolbar
  }, /* @__PURE__ */ react.exports.createElement(IconButton, {
    edge: "start",
    color: "inherit",
    "aria-label": "open drawer",
    onClick: uistore.toggleSidebar,
    className: clsx(classes.menuButton, open && classes.menuButtonHidden)
  }, /* @__PURE__ */ react.exports.createElement(default_1$5, null)), /* @__PURE__ */ react.exports.createElement(WorkspaceSelect, null), /* @__PURE__ */ react.exports.createElement("div", {
    className: classes.accountIcon
  }, /* @__PURE__ */ react.exports.createElement(IconButton, {
    "aria-label": "account of current user",
    "aria-controls": "menu-appbar",
    "aria-haspopup": "true",
    onClick: handleAccountMenu,
    color: "inherit"
  }, /* @__PURE__ */ react.exports.createElement(default_1$6, null)), /* @__PURE__ */ react.exports.createElement(Menu, {
    id: "menu-appbar",
    anchorEl,
    anchorOrigin: {
      vertical: "top",
      horizontal: "right"
    },
    keepMounted: true,
    transformOrigin: {
      vertical: "top",
      horizontal: "right"
    },
    open: openAccount,
    onClose: handleIconClose
  }, /* @__PURE__ */ react.exports.createElement(MenuItem, {
    button: true,
    component: Link,
    to: "/edit-profile"
  }, "My Profile"), /* @__PURE__ */ react.exports.createElement(MenuItem, {
    onClick: handleSignOut
  }, "Sign Out")))));
});
const TopBar = observer((props) => {
  const { uistore, authstore } = useStores();
  const classes = useStyles$5();
  const [anchorEl, setAnchorEl] = react.exports.useState(null);
  const openAccount = Boolean(anchorEl);
  const open = uistore.sideBarOpen;
  const handleAccountMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleIconClose = () => {
    setAnchorEl(null);
  };
  const handleSignOut = async () => {
    await authstore.logout();
    setAnchorEl(null);
  };
  return /* @__PURE__ */ react.exports.createElement(AppBar, {
    position: "absolute",
    className: clsx(classes.appBar, open && classes.appBarShift)
  }, /* @__PURE__ */ react.exports.createElement(Toolbar, {
    className: classes.toolbar
  }, /* @__PURE__ */ react.exports.createElement(IconButton, {
    edge: "start",
    color: "inherit",
    "aria-label": "open drawer",
    onClick: uistore.toggleSidebar,
    className: clsx(classes.menuButton, open && classes.menuButtonHidden)
  }, /* @__PURE__ */ react.exports.createElement(default_1$5, null)), /* @__PURE__ */ react.exports.createElement("div", {
    className: classes.accountIcon
  }, /* @__PURE__ */ react.exports.createElement(IconButton, {
    "aria-label": "account of current user",
    "aria-controls": "menu-appbar",
    "aria-haspopup": "true",
    onClick: handleAccountMenu,
    color: "inherit"
  }, /* @__PURE__ */ react.exports.createElement(default_1$6, null)), /* @__PURE__ */ react.exports.createElement(Menu, {
    id: "menu-appbar",
    anchorEl,
    anchorOrigin: {
      vertical: "top",
      horizontal: "right"
    },
    keepMounted: true,
    transformOrigin: {
      vertical: "top",
      horizontal: "right"
    },
    open: openAccount,
    onClose: handleIconClose
  }, /* @__PURE__ */ react.exports.createElement(MenuItem, {
    button: true,
    component: Link,
    to: "/edit-profile"
  }, "My Profile"), /* @__PURE__ */ react.exports.createElement(MenuItem, {
    onClick: handleSignOut
  }, "Sign Out")))));
});
const drawerWidth = 240;
const useStyles$4 = makeStyles((theme2) => ({
  toolbarIcon: __spreadValues({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px"
  }, theme2.mixins.toolbar),
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme2.transitions.create("width", {
      easing: theme2.transitions.easing.sharp,
      duration: theme2.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme2.transitions.create("width", {
      easing: theme2.transitions.easing.sharp,
      duration: theme2.transitions.duration.leavingScreen
    }),
    width: theme2.spacing(7),
    [theme2.breakpoints.up("sm")]: {
      width: theme2.spacing(9)
    }
  },
  paper: {
    padding: theme2.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  }
}));
const SideBarItems = ({ links }) => {
  const selected = (url) => {
    return window.location.pathname == url;
  };
  return /* @__PURE__ */ react.exports.createElement(react.exports.Fragment, null, links.map((link) => /* @__PURE__ */ react.exports.createElement(ListItem, {
    key: link.text,
    button: true,
    component: Link,
    to: link.url,
    selected: selected(link.url)
  }, /* @__PURE__ */ react.exports.createElement(ListItemIcon, null, link.icon), /* @__PURE__ */ react.exports.createElement(ListItemText, {
    primary: link.text
  }))));
};
const WorkspaceSideBar = observer((props) => {
  const classes = useStyles$4();
  const { uistore, workspacesstore } = useStores();
  const selectedWorkspace = workspacesstore.selectedWorkspace;
  if (!selectedWorkspace)
    return null;
  const workspaceUrl = selectedWorkspace == null ? void 0 : selectedWorkspace.link;
  const open = uistore.sideBarOpen;
  const sidebarItems = [
    {
      icon: /* @__PURE__ */ react.exports.createElement(default_1$8, null),
      url: workspaceUrl,
      text: "Deployments"
    },
    {
      icon: /* @__PURE__ */ react.exports.createElement(default_1$9, null),
      url: workspaceUrl + "/p",
      text: "Projects"
    },
    {
      icon: /* @__PURE__ */ react.exports.createElement(default_1$a, null),
      url: workspaceUrl + "/wiki",
      text: "Wiki"
    }
  ];
  const workspaceSidebarItems = [
    {
      icon: /* @__PURE__ */ react.exports.createElement(default_1$b, null),
      url: `/w/new`,
      text: "New"
    },
    {
      icon: /* @__PURE__ */ react.exports.createElement(default_1$c, null),
      url: `${workspaceUrl}/edit`,
      text: "Settings"
    },
    {
      icon: /* @__PURE__ */ react.exports.createElement(default_1$d, null),
      url: `${workspaceUrl}/metrics`,
      text: "Metrics"
    }
  ];
  const workspaceAdminSidebarItems = [
    {
      icon: /* @__PURE__ */ react.exports.createElement(default_1$e, null),
      url: `${workspaceUrl}/admin/users`,
      text: "Workspace Users"
    }
  ];
  const adminSidebarItems = [
    {
      icon: /* @__PURE__ */ react.exports.createElement(default_1$e, null),
      url: "/admin/users",
      text: "Users"
    }
  ];
  return /* @__PURE__ */ react.exports.createElement(react.exports.Fragment, null, /* @__PURE__ */ react.exports.createElement(Drawer, {
    variant: "permanent",
    classes: {
      paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)
    },
    open: uistore.sideBarOpen
  }, /* @__PURE__ */ react.exports.createElement("div", {
    className: classes.toolbarIcon
  }, /* @__PURE__ */ react.exports.createElement(IconButton, {
    onClick: uistore.toggleSidebar
  }, /* @__PURE__ */ react.exports.createElement(default_1$7, null))), /* @__PURE__ */ react.exports.createElement(Divider, null), /* @__PURE__ */ react.exports.createElement(List, null, /* @__PURE__ */ react.exports.createElement(SideBarItems, {
    links: sidebarItems
  })), /* @__PURE__ */ react.exports.createElement(Divider, null), /* @__PURE__ */ react.exports.createElement(List, {
    subheader: /* @__PURE__ */ react.exports.createElement(RenderIf, {
      if: open
    }, /* @__PURE__ */ react.exports.createElement(ListSubheader, null, "Workspace"))
  }, /* @__PURE__ */ react.exports.createElement(SideBarItems, {
    links: workspaceSidebarItems
  }), /* @__PURE__ */ react.exports.createElement(RenderIfRole, {
    roles: [Role.WorkspaceAdmin, Role.SuperAdmin],
    wid: selectedWorkspace.id
  }, /* @__PURE__ */ react.exports.createElement(SideBarItems, {
    links: workspaceAdminSidebarItems
  }))), /* @__PURE__ */ react.exports.createElement(Divider, null), /* @__PURE__ */ react.exports.createElement(RenderIfRole, {
    roles: [Role.SuperAdmin]
  }, /* @__PURE__ */ react.exports.createElement(List, {
    subheader: /* @__PURE__ */ react.exports.createElement(RenderIf, {
      if: open
    }, /* @__PURE__ */ react.exports.createElement(ListSubheader, null, "Admin"))
  }, /* @__PURE__ */ react.exports.createElement(SideBarItems, {
    links: adminSidebarItems
  })))));
});
const SideBar = observer((props) => {
  const { uistore, workspacesstore } = useStores();
  const classes = useStyles$4();
  const open = uistore.sideBarOpen;
  const sidebarItems = [
    {
      icon: /* @__PURE__ */ react.exports.createElement(default_1$f, null),
      url: "/",
      text: "Home"
    }
  ];
  const adminSidebarItems = [
    {
      icon: /* @__PURE__ */ react.exports.createElement(default_1$e, null),
      url: "/admin/users",
      text: "Users"
    }
  ];
  return /* @__PURE__ */ react.exports.createElement(react.exports.Fragment, null, /* @__PURE__ */ react.exports.createElement(Drawer, {
    variant: "permanent",
    classes: {
      paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)
    },
    open: uistore.sideBarOpen
  }, /* @__PURE__ */ react.exports.createElement("div", {
    className: classes.toolbarIcon
  }, /* @__PURE__ */ react.exports.createElement(IconButton, {
    onClick: uistore.toggleSidebar
  }, /* @__PURE__ */ react.exports.createElement(default_1$7, null))), /* @__PURE__ */ react.exports.createElement(Divider, null), /* @__PURE__ */ react.exports.createElement(List, null, /* @__PURE__ */ react.exports.createElement(SideBarItems, {
    links: sidebarItems
  })), /* @__PURE__ */ react.exports.createElement(Divider, null), /* @__PURE__ */ react.exports.createElement(RenderIfRole, {
    roles: [Role.SuperAdmin]
  }, /* @__PURE__ */ react.exports.createElement(List, {
    subheader: /* @__PURE__ */ react.exports.createElement(RenderIf, {
      if: open
    }, /* @__PURE__ */ react.exports.createElement(ListSubheader, null, "Admin"))
  }, /* @__PURE__ */ react.exports.createElement(SideBarItems, {
    links: adminSidebarItems
  })))));
});
const WorkspaceAppMenu = () => {
  return /* @__PURE__ */ react.exports.createElement(react.exports.Fragment, null, /* @__PURE__ */ react.exports.createElement(WorkspaceTopBar, null), /* @__PURE__ */ react.exports.createElement(WorkspaceSideBar, null));
};
const AppMenu = () => {
  return /* @__PURE__ */ react.exports.createElement(react.exports.Fragment, null, /* @__PURE__ */ react.exports.createElement(TopBar, null), /* @__PURE__ */ react.exports.createElement(SideBar, null));
};
const useStyles$3 = makeStyles((theme2) => ({
  paper: {
    position: "absolute",
    transform: "translateY(-50%)",
    top: "50%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    width: "500px"
  }
}));
const AuthPaper = (props) => {
  const classes = useStyles$3();
  return /* @__PURE__ */ react.exports.createElement(Paper, {
    className: classes.paper
  }, props.children);
};
const AuthWrapper = (props) => {
  const { children } = props;
  return /* @__PURE__ */ react.exports.createElement(Container, {
    component: "main",
    maxWidth: "xs"
  }, /* @__PURE__ */ react.exports.createElement(CssBaseline, null), /* @__PURE__ */ react.exports.createElement(AuthPaper, null, children));
};
const useStyles$2 = makeStyles((theme2) => {
  return {
    root: {
      display: "flex"
    },
    content: {
      overflow: "auto",
      marginTop: "69px",
      boxSizing: "border-box",
      width: "100%",
      height: `calc(100vh - 64px)`
    },
    container: {
      paddingTop: theme2.spacing(4),
      paddingBottom: theme2.spacing(4)
    },
    fixedHeight: {
      height: 240
    }
  };
});
const HomeWrapperBase = (props) => {
  const classes = useStyles$2();
  const { children } = props;
  return /* @__PURE__ */ react.exports.createElement("div", {
    className: classes.root
  }, /* @__PURE__ */ react.exports.createElement(WorkspaceAppMenu, null), /* @__PURE__ */ react.exports.createElement("main", {
    className: classes.content
  }, /* @__PURE__ */ react.exports.createElement(Container, {
    maxWidth: false,
    className: classes.container
  }, children)), /* @__PURE__ */ react.exports.createElement(ConfirmDeleteDialog, null));
};
const WorkspaceWrapperBase = (props) => {
  const { children } = props;
  const classes = useStyles$2();
  return /* @__PURE__ */ react.exports.createElement("div", {
    className: classes.root
  }, /* @__PURE__ */ react.exports.createElement(WorkspaceAppMenu, null), /* @__PURE__ */ react.exports.createElement("main", {
    className: classes.content
  }, children), /* @__PURE__ */ react.exports.createElement(ConfirmDeleteDialog, null));
};
const WorkspaceWrapper = (props) => {
  const { children } = props;
  const classes = useStyles$2();
  return /* @__PURE__ */ react.exports.createElement(WorkspaceWrapperBase, null, /* @__PURE__ */ react.exports.createElement(Container, {
    maxWidth: false,
    className: classes.container
  }, children));
};
const HomeWrapper = (props) => {
  const classes = useStyles$2();
  const { children } = props;
  return /* @__PURE__ */ react.exports.createElement("div", {
    className: classes.root
  }, /* @__PURE__ */ react.exports.createElement(AppMenu, null), /* @__PURE__ */ react.exports.createElement("main", {
    className: classes.content
  }, /* @__PURE__ */ react.exports.createElement(Container, {
    maxWidth: false,
    className: classes.container
  }, children)), /* @__PURE__ */ react.exports.createElement(ConfirmDeleteDialog, null));
};
const path$2 = "/admin/";
const AdminRoutes = () => {
  return /* @__PURE__ */ react.exports.createElement(HomeWrapper, null, /* @__PURE__ */ react.exports.createElement(Switch, null, /* @__PURE__ */ react.exports.createElement(Route, {
    path: `${path$2}users`,
    component: AdminUsersPage
  }), /* @__PURE__ */ react.exports.createElement(Route, {
    path: `${path$2}`,
    component: AdminHomePage
  })));
};
const useQuery = () => {
  return lib$1.parse(useLocation().search, { ignoreQueryPrefix: true });
};
const reload = (model, repos) => {
  for (const repo of repos) {
    repo.onLoad.subscribe(() => {
      model.load();
    });
  }
};
const update = (model, repos) => {
  const run = (repo) => {
    repo.onLoad.subscribe(() => {
      model.data = repo.data;
    });
  };
  if (Array.isArray(repos)) {
    for (const repo of repos) {
      run(repo);
    }
  } else {
    run(repos);
  }
};
const add = (collection, repo) => {
  repo.onLoad.subscribe(() => {
    collection.add(repo.data);
  });
};
const remove = (model, repo) => {
  repo.onLoad.subscribe(() => {
    model.remove();
  });
};
class BaseUserModel extends Model {
  get fullName() {
    return this.data.fullName;
  }
  get id() {
    return this.data.id;
  }
  get email() {
    return this.data.email;
  }
}
class BaseAdminUserModel extends BaseUserModel {
  constructor() {
    super(...arguments);
    __publicField(this, "permissions");
  }
}
class UserModel extends BaseUserModel {
  constructor() {
    super();
    __publicField(this, "permissions");
    __publicField(this, "updateUserForm");
    this.repos = {
      main: new APIRepo({ path: this.api, events: types.USERLOAD })
    };
    this.permissions = new UserPermissions(this);
    this.dependents = [this.permissions];
    this.updateUserForm = new UpdateUserFormModel(this);
  }
  get api() {
    return "/api/user";
  }
}
class AdminUsersModel extends CollectionModel {
  constructor() {
    super({
      collections: AdminUserModel
    });
    __publicField(this, "createUserForm");
    this.createUserForm = new CreateUserFormModel();
    this.repos = {
      main: new APIRepo({ path: this.api })
    };
    add(this, this.createUserForm.submit);
  }
  get api() {
    return "/api/users/";
  }
  get users() {
    return this.collection;
  }
}
class AdminUserModel extends BaseAdminUserModel {
  constructor({ parent, data, parentCollection }) {
    super({ parent, data, parentCollection });
    __publicField(this, "updateUserForm");
    __publicField(this, "deleteUserForm");
    __publicField(this, "users");
    __publicField(this, "disable");
    __publicField(this, "enable");
    __publicField(this, "verify");
    __publicField(this, "unverify");
    __publicField(this, "delete");
    __publicField(this, "resetPassword");
    __publicField(this, "onFlipDisable", async () => {
      if (this.isEnabled)
        this.disable.call();
      else
        this.enable.call();
    });
    __publicField(this, "onFlipVerify", async () => {
      if (this.isVerified)
        this.unverify.call();
      else
        this.verify.call();
    });
    __publicField(this, "onDelete", async () => {
      await this.delete.call();
    });
    __publicField(this, "onResetPassword", async () => {
      await this.resetPassword.call();
    });
    this.users = parent;
    this.updateUserForm = new AdminUpdateUserFormModel(this);
    this.permissions = new AdminUserPermissionsModel(this);
    this.disable = new APIRepo({
      path: this.api,
      method: "PUT",
      body: { isEnabled: false }
    });
    this.enable = new APIRepo({
      path: this.api,
      method: "PUT",
      body: { isEnabled: true }
    });
    this.verify = new APIRepo({
      path: this.api,
      method: "PUT",
      body: { isVerified: true }
    });
    this.unverify = new APIRepo({
      path: this.api,
      method: "PUT",
      body: { isVerified: false }
    });
    this.resetPassword = new APIRepo({
      path: "/api/auth/forgot-password",
      method: "POST",
      body: { email: this.email }
    });
    this.delete = new APIRepo({
      path: this.api,
      method: "DELETE"
    });
    update(this, [
      this.disable,
      this.enable,
      this.verify,
      this.unverify,
      this.updateUserForm.submit
    ]);
    remove(this, this.delete);
    this.dependents = [this.permissions];
  }
  get email() {
    return this.data.email;
  }
  get fullName() {
    return this.data.fullName;
  }
  get isEnabled() {
    return this.data.isEnabled;
  }
  get isVerified() {
    return this.data.isVerified;
  }
  get id() {
    return this.data.id;
  }
  get api() {
    return `/api/users/${this.data.id}`;
  }
}
class WorkspaceUsersModel extends CollectionModel {
  constructor(workspace, workspaceAdmin) {
    super({
      collections: { main: { key: "users", model: WorkspaceUserModel } }
    });
    this.workspace = workspace;
    this.workspaceAdmin = workspaceAdmin;
    this.repos = {
      main: new APIRepo({ path: this.api })
    };
  }
  get api() {
    return `${this.workspace.api}/users`;
  }
}
class WorkspaceUserModel extends BaseAdminUserModel {
  constructor({ data, parent, parentCollection }) {
    super({ data, parent, parentCollection });
    __publicField(this, "workspaceUsers");
    __publicField(this, "workspace");
    __publicField(this, "onRemove", async () => {
      await this.repos.remove.call();
    });
    this.workspaceUsers = parent;
    this.workspace = this.workspaceUsers.workspace;
    this.permissions = new WorkspaceAdminPermissionsModel(this, this.workspace);
    this.repos = {
      remove: new APIRepo({ path: this.api, method: "DELETE" })
    };
    this.dependents = [this.permissions];
    remove(this, this.repos.remove);
  }
  get id() {
    return this.data.id;
  }
  get api() {
    return `${this.workspaceUsers.api}/${this.id}`;
  }
}
class PermissionsBase {
  constructor(_array) {
    __publicField(this, "has", (value) => {
      return this.array.includes(value);
    });
    this._array = _array;
  }
  get array() {
    return this._array || [];
  }
}
class PermissionsModel extends Model {
}
class UserPermissions extends PermissionsModel {
  constructor(user) {
    super({});
    __publicField(this, "workspacesPermissions", {});
    __publicField(this, "getWorkspacePermission", (wid) => {
      return this.workspacesPermissions[wid];
    });
    __publicField(this, "postLoad", async () => {
      for (const wid in this.data.workspaces) {
        const data = this.data.workspaces[wid];
        this.workspacesPermissions[wid] = new UserWorkspacePermissions(wid, data);
      }
    });
    this.user = user;
    this.repos = {
      main: new APIRepo({
        path: this.api
      })
    };
  }
  get api() {
    return `/api/user/permissions`;
  }
  get permissions() {
    return new PermissionsBase(this.data.permissions);
  }
  get roles() {
    return new PermissionsBase(this.data.roles);
  }
}
class UserWorkspacePermissions {
  constructor(id, data) {
    this.id = id;
    this.data = data;
  }
  get permissions() {
    return new PermissionsBase(this.data.permissions);
  }
  get roles() {
    return new PermissionsBase(this.data.roles);
  }
}
class BaseAdminPermissionsModel extends Model {
  constructor() {
    super();
    __publicField(this, "permissionsForm");
  }
  get permissions() {
    return new PermissionsBase(this.data.permissions);
  }
  get roles() {
    return new PermissionsBase(this.data.roles);
  }
}
class WorkspaceAdminPermissionsModel extends BaseAdminPermissionsModel {
  constructor(user, workspace) {
    super();
    __publicField(this, "permissionsForm");
    __publicField(this, "permissionsDialog");
    this.user = user;
    this.workspace = workspace;
    this.forms = {
      main: this.permissionsForm
    };
    this.repos = {
      main: new APIRepo({ path: this.api })
    };
    this.permissionsForm = new WorkspacePermissionsFormModel(this, workspace);
  }
  get api() {
    return `${this.workspace.api}/users/${this.user.id}/permissions`;
  }
  get permissions() {
    return new PermissionsBase(this.data.permissions);
  }
  get roles() {
    return new PermissionsBase(this.data.roles);
  }
}
class AdminUserPermissionsModel extends BaseAdminPermissionsModel {
  constructor(user) {
    super();
    __publicField(this, "permissionsForm");
    this.user = user;
    this.repos = {
      main: new APIRepo({ path: this.api })
    };
    this.forms = {
      main: this.permissionsForm
    };
    this.permissionsForm = new AdminPermissionsFormModel(this);
  }
  get api() {
    return `${this.user.api}/permissions`;
  }
  get permissions() {
    return new PermissionsBase(this.data.permissions);
  }
  get roles() {
    return new PermissionsBase(this.data.roles);
  }
}
const columns$1 = [
  {
    id: "checkbox",
    label: ""
  },
  {
    id: "permission",
    label: "Permission"
  }
];
const PermissionsForm = observer((props) => {
  const { form, permissions } = props;
  const rows = [];
  for (const value of permissions) {
    rows.push({
      checkbox: /* @__PURE__ */ react.exports.createElement(Checkbox, {
        onClick: form.onSelectPermission(value),
        checked: form.hasPermission(value)
      }),
      permission: value
    });
  }
  return /* @__PURE__ */ react.exports.createElement("div", null, /* @__PURE__ */ react.exports.createElement(Label, null, "Permission Form"), /* @__PURE__ */ react.exports.createElement(PaginatedTable, {
    columns: columns$1,
    rows
  }));
});
const RolesForm = observer((props) => {
  const { form, roles: roles2 } = props;
  const rows = [];
  for (const value of roles2) {
    rows.push({
      checkbox: /* @__PURE__ */ react.exports.createElement(Checkbox, {
        onClick: form.onSelectRole(value),
        checked: form.hasRole(value)
      }),
      permission: value
    });
  }
  return /* @__PURE__ */ react.exports.createElement("div", null, /* @__PURE__ */ react.exports.createElement(Label, null, "Role Form"), /* @__PURE__ */ react.exports.createElement(PaginatedTable, {
    columns: columns$1,
    rows
  }));
});
const UpdateUserForm = observer((props) => {
  const { authstore, routerstore } = useStores();
  const user = authstore.user;
  const form = user.updateUserForm;
  return /* @__PURE__ */ react.exports.createElement("div", null, /* @__PURE__ */ react.exports.createElement(Typography, {
    variant: "h4"
  }, "Edit Profile"), /* @__PURE__ */ react.exports.createElement(Typography, {
    variant: "h6",
    style: { marginTop: "20px" }
  }, "Full Name"), /* @__PURE__ */ react.exports.createElement(Input, {
    form,
    id: "fullName"
  }), /* @__PURE__ */ react.exports.createElement(CancelCreateButtons, {
    form,
    labels: ["Cancel", "Update"]
  }));
});
const UserProfile = () => {
  return /* @__PURE__ */ react.exports.createElement(WorkspaceWrapper, null, /* @__PURE__ */ react.exports.createElement(UpdateUserForm, null));
};
const Logout = observer((props) => {
  const { authstore } = useStores();
  react.exports.useEffect(() => {
    authstore.logout();
  }, []);
  return null;
});
const ChangePassword = inject(AUTH_STORE)(observer((props) => {
  const store = props[AUTH_STORE];
  console.log("CHANGE PASSWORD");
  const query = useQuery();
  const { token } = query;
  const form = store.changePasswordForm;
  react.exports.useEffect(() => {
    form.data.token = token;
  }, []);
  if (form.submit.state == "loading") {
    return /* @__PURE__ */ react.exports.createElement(AuthWrapper, null, /* @__PURE__ */ react.exports.createElement(CircularProgress, null));
  }
  if (form.submit.state == "loaded") {
    return /* @__PURE__ */ react.exports.createElement(AuthWrapper, null, /* @__PURE__ */ react.exports.createElement(Typography, null, "Success"), /* @__PURE__ */ react.exports.createElement(Button, {
      fullWidth: true,
      variant: "contained",
      color: "primary",
      component: Link,
      to: "login"
    }, "Click here to login"));
  }
  return /* @__PURE__ */ react.exports.createElement(AuthWrapper, null, /* @__PURE__ */ react.exports.createElement(Typography, null, "Change Password"), /* @__PURE__ */ react.exports.createElement(Input, {
    form,
    id: "password",
    type: "password",
    label: "Password",
    autoComplete: "current-password"
  }), /* @__PURE__ */ react.exports.createElement(Input, {
    form,
    id: "confirmPassword",
    type: "password",
    label: "Confirm Password",
    autoComplete: "current-password"
  }), /* @__PURE__ */ react.exports.createElement(Button, {
    fullWidth: true,
    variant: "contained",
    color: "primary",
    disabled: !form.isValid,
    onClick: () => {
      store.changePassword();
    }
  }, "Change Password"));
}));
const GaugeChart = (props) => {
  return /* @__PURE__ */ React.createElement(Plot, __spreadValues({
    data: [
      {
        domain: { x: [0, 100], y: [0, 1] },
        value: 270,
        type: "indicator",
        mode: "gauge+number"
      }
    ],
    layout: {
      paper_bgcolor: "transparent",
      autosize: true,
      xaxis: {
        ticksuffix: "%"
      }
    },
    useResizeHandler: true,
    style: { width: "100%", height: "100%" }
  }, props));
};
let displayed = [];
const Notifier = withSnackbar(observer((props) => {
  const { snackbarstore } = useStores();
  console.log(snackbarstore.alerts);
  snackbarstore.alerts.forEach((alert) => {
    const _a = alert, { message } = _a, rest = __objRest(_a, ["message"]);
    if (displayed.includes(alert.key))
      return;
    props.enqueueSnackbar(message, rest);
    displayed = [...displayed, alert.key];
    snackbarstore.remove(alert);
  });
  return null;
}));
const SnackbarManager = (props) => {
  return /* @__PURE__ */ react.exports.createElement(SnackbarProvider, {
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "left"
    }
  }, /* @__PURE__ */ react.exports.createElement(Notifier, null));
};
const ForgotPassword = inject(AUTH_STORE)(observer((props) => {
  const store = props[AUTH_STORE];
  const form = store.forgotPasswordForm;
  return /* @__PURE__ */ react.exports.createElement(Container, {
    component: "main",
    maxWidth: "xs"
  }, /* @__PURE__ */ react.exports.createElement(CssBaseline, null), /* @__PURE__ */ react.exports.createElement(AuthPaper, null, /* @__PURE__ */ react.exports.createElement(Typography, {
    component: "h1",
    variant: "h5"
  }, "Forgot Password"), /* @__PURE__ */ react.exports.createElement(Input, {
    form,
    id: "email",
    label: "Email Address"
  }), /* @__PURE__ */ react.exports.createElement(Button, {
    fullWidth: true,
    variant: "contained",
    color: "primary",
    onClick: store.forgotPassword,
    disabled: !form.isValid
  }, "Send Reset Link")));
}));
const Login = observer((props) => {
  const { authstore } = useStores();
  const form = authstore.signinForm;
  return /* @__PURE__ */ react.exports.createElement(AuthWrapper, null, /* @__PURE__ */ react.exports.createElement(Avatar, null, /* @__PURE__ */ react.exports.createElement(default_1$g, null)), /* @__PURE__ */ react.exports.createElement(Typography, {
    component: "h1",
    variant: "h5"
  }, "Log in"), /* @__PURE__ */ react.exports.createElement(Input, {
    form,
    id: "email",
    label: "Email Address",
    autoFocus: true
  }), /* @__PURE__ */ react.exports.createElement(Input, {
    form,
    id: "password",
    type: "password",
    label: "Password",
    autoComplete: "current-password"
  }), /* @__PURE__ */ react.exports.createElement(Button, {
    fullWidth: true,
    variant: "contained",
    color: "primary",
    type: "submit",
    onClick: authstore.login,
    disabled: !form.isValid
  }, "Log In"), /* @__PURE__ */ react.exports.createElement(Grid, {
    container: true
  }, /* @__PURE__ */ react.exports.createElement(Grid, {
    item: true,
    xs: true
  }, /* @__PURE__ */ react.exports.createElement(Link, {
    to: "/forgotPassword"
  }, "Forgot password?")), /* @__PURE__ */ react.exports.createElement(Grid, {
    item: true
  }, /* @__PURE__ */ react.exports.createElement(Link, {
    to: "/signup"
  }, "Don't have an account? Sign Up"))));
});
const Signup = inject(AUTH_STORE)(observer((props) => {
  const store = props[AUTH_STORE];
  const form = store.signupForm;
  return /* @__PURE__ */ react.exports.createElement(AuthWrapper, null, /* @__PURE__ */ react.exports.createElement(Avatar, null, /* @__PURE__ */ react.exports.createElement(default_1$g, null)), /* @__PURE__ */ react.exports.createElement(Typography, {
    component: "h1",
    variant: "h5"
  }, "Sign Up"), /* @__PURE__ */ react.exports.createElement(Input, {
    form,
    id: "fullName",
    label: "Full Name",
    autoFocus: true
  }), /* @__PURE__ */ react.exports.createElement(Input, {
    form,
    id: "email",
    label: "Email Address"
  }), /* @__PURE__ */ react.exports.createElement(Input, {
    form,
    id: "password",
    type: "password",
    label: "Password",
    autoComplete: "current-password"
  }), /* @__PURE__ */ react.exports.createElement(Button, {
    fullWidth: true,
    variant: "contained",
    color: "primary",
    onClick: store.signup,
    disabled: !form.isValid
  }, "Sign Up"), /* @__PURE__ */ react.exports.createElement(Grid, {
    container: true
  }, /* @__PURE__ */ react.exports.createElement(Grid, {
    item: true,
    xs: true
  }), /* @__PURE__ */ react.exports.createElement(Grid, {
    item: true
  }, /* @__PURE__ */ react.exports.createElement(Link, {
    to: "/login"
  }, "Already have an account? Log In!"))));
}));
const VerifyAccount = inject(AUTH_STORE)(observer((props) => {
  const store = props[AUTH_STORE];
  const query = useQuery();
  const { token } = query;
  const form = store.verifyForm;
  react.exports.useEffect(() => {
    form.data.token = token;
    store.verify();
  }, []);
  if (form.submit.state == "loading") {
    return /* @__PURE__ */ react.exports.createElement(AuthWrapper, null, /* @__PURE__ */ react.exports.createElement(CircularProgress, null));
  }
  if (form.submit.state == "loaded") {
    return /* @__PURE__ */ react.exports.createElement(AuthWrapper, null, /* @__PURE__ */ react.exports.createElement(Typography, null, "Account Succesfully Verified!"), /* @__PURE__ */ react.exports.createElement(Button, {
      fullWidth: true,
      variant: "contained",
      color: "primary",
      component: Link,
      to: "login"
    }, "Click here to login"));
  }
  return /* @__PURE__ */ react.exports.createElement(AuthWrapper, null, /* @__PURE__ */ react.exports.createElement(Typography, {
    color: "error"
  }, form.submit.data.message), /* @__PURE__ */ react.exports.createElement(Button, {
    fullWidth: true,
    variant: "contained",
    color: "primary",
    component: Link,
    to: "login"
  }, "Go back to Log In"));
}));
var __defProp$3 = Object.defineProperty;
var __getOwnPropDesc$3 = Object.getOwnPropertyDescriptor;
var __decorateClass$3 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$3(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$3(target, key, result);
  return result;
};
class AuthStore {
  constructor(rootStore2) {
    __publicField(this, "state");
    __publicField(this, "signupForm");
    __publicField(this, "signinForm");
    __publicField(this, "verifyForm");
    __publicField(this, "forgotPasswordForm");
    __publicField(this, "changePasswordForm");
    __publicField(this, "user");
    __publicField(this, "logoutRepo");
    __publicField(this, "loadUser", async () => {
      this.state = "loading";
      await this.user.load();
      this.state = this.user.state == "loaded" ? "loggedin" : "unauthed";
    });
    __publicField(this, "login", async () => {
      await this.signinForm.call();
      if (this.signinForm.submit.state == "loaded") {
        this.rootStore.routerStore.push("/");
      }
    });
    __publicField(this, "logout", async () => {
      await this.logoutRepo.call();
      if (this.logoutRepo.state == "loaded") {
        this.rootStore.routerStore.push("/");
      }
    });
    __publicField(this, "signup", async () => {
      await this.signupForm.call();
    });
    __publicField(this, "forgotPassword", async () => {
      await this.forgotPasswordForm.call();
    });
    __publicField(this, "verify", async () => {
      await this.verifyForm.call();
    });
    __publicField(this, "changePassword", async () => {
      await this.changePasswordForm.call();
    });
    this.rootStore = rootStore2;
    this.state = "unauthed";
    this.signupForm = new SignupFormModel();
    this.signinForm = new SignInFormModel();
    this.verifyForm = new VerifyAccountFormModel();
    this.forgotPasswordForm = new ForgotPasswordFormModel();
    this.changePasswordForm = new ChangePasswordFormModel();
    this.logoutRepo = new APIRepo({
      path: "/api/auth/logout",
      method: "POST"
    });
    this.user = new UserModel();
    this.loadUser();
    makeObservable(this);
    events.on(types.SIGNIN.onLoad.type, () => {
      this.loadUser();
    });
  }
}
__decorateClass$3([
  observable
], AuthStore.prototype, "state", 2);
class RouterStore extends mobxReactRouter.exports.RouterStore {
  constructor(rootStore2, history2) {
    super();
    this.rootStore = rootStore2;
    if (history2) {
      this.history = mobxReactRouter.exports.syncHistoryWithStore(history2, this);
    }
    makeObservable(this);
  }
  get params() {
    const patterns = [
      /\/w\/(?<wid>[a-zA-Z0-9]{24})\/p\/(?<pid>[a-zA-Z0-9]{24})/,
      /\/w\/(?<wid>[a-zA-Z0-9]{24})\/wiki\/(?<sectionId>[a-zA-Z0-9]{24})/,
      /\/w\/(?<wid>[a-zA-Z0-9]{24})\/wiki\/(?<sectionId>[a-zA-Z0-9]{24})\/pages\/(?<pageId>[a-zA-Z0-9]{24})/,
      /\/w\/(?<wid>[a-zA-Z0-9]{24})/,
      /\/w\/(?<wid>[a-zA-Z0-9]{24})\/d\/(?<did>[a-zA-Z0-9]{24})/
    ];
    let out = {};
    for (const pattern of patterns) {
      const matches = this.location.pathname.match(pattern);
      out = __spreadValues(__spreadValues({}, (matches == null ? void 0 : matches.groups) || {}), out);
    }
    return out;
  }
  get workspaceUrl() {
    var _a;
    const wid = (_a = this.rootStore.workspacesStore.selectedWorkspace) == null ? void 0 : _a.id;
    return `/w/${wid}`;
  }
}
class CreateProjectFormModel extends FormModel {
  constructor(workspace) {
    super({});
    this.workspace = workspace;
  }
}
class UpdateWorkspaceFormModel extends FormModel {
  constructor(workspace) {
    super({
      data: workspace.data,
      keys: [
        ["cpuCount", { key: "properties.resources.cpuCount", cast: Number }],
        [
          "memoryCount",
          { key: "properties.resources.memoryCount", cast: Number }
        ],
        [
          "storageCount",
          { key: "properties.resources.storageCount", cast: Number }
        ]
      ],
      submit: new APIRepo({ path: workspace.api, method: "PUT" })
    });
    this.workspace = workspace;
  }
}
class CreateWorkspaceFormModel extends FormModel {
  constructor() {
    super({
      validator: lib.CreateWorkspaceDto,
      data: {
        name: "",
        properties: {
          resources: {
            cpuCount: void 0,
            memoryCount: void 0,
            storageCount: void 0
          }
        }
      },
      keys: [
        ["cpuCount", { key: "properties.resources.cpuCount", cast: Number }],
        [
          "memoryCount",
          { key: "properties.resources.memoryCount", cast: Number }
        ],
        [
          "storageCount",
          { key: "properties.resources.storageCount", cast: Number }
        ]
      ],
      submit: new APIRepo({ path: "/api/workspaces", method: "POST" })
    });
  }
}
class InviteWorkspaceUserFormModel extends FormModel {
  constructor(workspace) {
    super({
      data: {
        email: ""
      },
      validator: lib.AddWorkspaceUserDto,
      submit: new APIRepo({ path: `${workspace.api}/users`, method: "PUT" })
    });
  }
}
const WorkspaceAdminHomePage = () => {
  return null;
};
const columns = [
  {
    id: "fullName",
    label: "Full Name"
  },
  {
    id: "email",
    label: "Email"
  },
  {
    id: "menu",
    label: "",
    align: "right",
    minWidth: 50
  }
];
const UsersTable = observer((props) => {
  const { workspaceAdmin } = props;
  const { users } = workspaceAdmin;
  if (users.state !== "loaded")
    return null;
  const rows = users.map((user) => {
    return {
      email: user.email,
      fullName: user.fullName,
      menu: /* @__PURE__ */ react.exports.createElement(MoreMenu, {
        options: [
          {
            name: "Remove",
            onClick: () => {
              user.onRemove();
            }
          },
          {
            name: "Permissions",
            onClick: () => {
              WorkspaceAdminPermissionsDialogModel.setUserAndOpen(user);
            }
          }
        ]
      })
    };
  });
  return /* @__PURE__ */ react.exports.createElement(react.exports.Fragment, null, /* @__PURE__ */ react.exports.createElement(Typography, {
    variant: "h4"
  }, "Users"), /* @__PURE__ */ react.exports.createElement(PaginatedTable, {
    columns,
    rows
  }));
});
const WorkspaceAdminUsersPage = observer((props) => {
  const { workspacesstore } = useStores();
  const workspace = workspacesstore.selectedWorkspace;
  if (!workspace)
    return null;
  const workspaceAdmin = workspace.workspaceAdmin;
  return /* @__PURE__ */ react.exports.createElement("div", null, /* @__PURE__ */ react.exports.createElement(UsersTable, {
    workspaceAdmin
  }), /* @__PURE__ */ react.exports.createElement(PermissionsDialog, {
    dialog: WorkspaceAdminPermissionsDialogModel
  }), /* @__PURE__ */ react.exports.createElement(InviteUserDialog, {
    form: workspaceAdmin.inviteUserForm,
    dialog: workspaceAdmin.inviteUserDialog
  }), /* @__PURE__ */ react.exports.createElement(AddFABBase, {
    onClick: workspaceAdmin.inviteUserDialog.onOpen
  }));
});
class WorkspaceAdminModel extends Model {
  constructor(workspace) {
    super({});
    __publicField(this, "users");
    __publicField(this, "permissionsDialog");
    __publicField(this, "inviteUserDialog");
    __publicField(this, "inviteUserForm");
    this.workspace = workspace;
    this.inviteUserDialog = new DialogModel();
    this.inviteUserForm = new InviteWorkspaceUserFormModel(workspace);
    this.users = new WorkspaceUsersModel(this.workspace, this);
    this.dependents = [this.users];
    reload(this.users, [this.inviteUserForm.submit]);
  }
}
class DeploymentLogsModel extends Model {
  constructor(deployment) {
    super({
      data: ""
    });
    this.deployment = deployment;
    this.repos = {
      main: OnDemandRepo(new APIRepo({ path: this.api }))
    };
  }
  get logs() {
    return JSON.stringify(this.data);
  }
  get api() {
    return `${this.deployment.api}/logs`;
  }
}
class DeploymentMetricsModel extends Model {
  constructor(deployment) {
    super({});
    this.deployment = deployment;
    this.repos = {
      main: OnDemandRepo(new APIRepo({ path: this.api }))
    };
  }
  get api() {
    return `${this.deployment.api}/metrics`;
  }
  get memory() {
    return this.data.memory;
  }
  get cpu() {
    return this.data.cpu;
  }
  get cpuChart() {
    return {
      data: [
        {
          value: this.cpu,
          gauge: {
            axis: { range: [0, 100] }
          },
          number: { suffix: "%" },
          title: { text: "CPU Usage" },
          type: "indicator",
          mode: "gauge+number"
        }
      ]
    };
  }
  get memoryChart() {
    return {
      data: [
        {
          value: this.memory,
          gauge: {
            axis: { range: [0, 100] }
          },
          number: { suffix: "%" },
          title: { text: "Memory Usage" },
          type: "indicator",
          mode: "gauge+number"
        }
      ]
    };
  }
}
class CreateDeploymentFormModel extends FormModel {
  constructor(deployments) {
    super({
      data: {
        properties: {
          image: {
            type: "VSCODE"
          },
          scalingMethod: "ALWAYS_ON"
        }
      },
      keys: [
        ["cpuCount", { key: "properties.resources.cpuCount", cast: Number }],
        [
          "memoryCount",
          { key: "properties.resources.memoryCount", cast: Number }
        ],
        [
          "storageCount",
          { key: "properties.resources.storageCount", cast: Number }
        ],
        ["isFavorite", "properties.isFavorite"],
        ["sudoPassword", "properties.sudoPassword"],
        ["type", "properties.image.type"],
        ["version", "properties.image.version"],
        ["scalingMethod", "properties.scalingMethod"]
      ],
      validator: lib.CreateDeploymentDto,
      submit: new APIRepo({ path: deployments.api, method: "POST" })
    });
    this.deployments = deployments;
  }
}
class EditDeploymentFormModel extends FormModel {
  constructor(deployment) {
    super({
      data: {
        name: deployment.data.name,
        properties: {
          isFavorite: false,
          image: deployment.data.properties.image,
          resources: {
            cpuCount: deployment.data.properties.resources.cpuCount,
            memoryCount: deployment.data.properties.resources.memoryCount
          }
        }
      },
      keys: [
        ["cpuCount", { key: "properties.resources.cpuCount", cast: Number }],
        [
          "memoryCount",
          { key: "properties.resources.memoryCount", cast: Number }
        ],
        [
          "storageCount",
          { key: "properties.resources.storageCount", cast: Number }
        ],
        ["isFavorite", "properties.isFavorite"],
        ["sudoPassword", "properties.sudoPassword"],
        ["type", "properties.image.type"],
        ["version", "properties.image.version"]
      ],
      validator: lib.UpdateDeploymentDto,
      submit: new APIRepo({ path: deployment.api, method: "PUT" })
    });
    this.deployment = deployment;
  }
}
class DeploymentsModel extends CollectionModel {
  constructor(workspace) {
    super({
      collections: DeploymentModel
    });
    __publicField(this, "createDeployment");
    __publicField(this, "postLoad", async () => {
      console.log("deployments loaded");
    });
    this.workspace = workspace;
    this.createDeployment = new CreateDeploymentFormModel(this);
    this.repos = {
      main: new APIRepo({ path: this.api })
    };
    add(this, this.createDeployment.submit);
  }
  get deployments() {
    return this.collection.models || [];
  }
  get api() {
    return `${this.workspace.api}/deployments`;
  }
}
class DeploymentModel extends Model {
  constructor({ data, parent, parentCollection }) {
    super({ data, parentCollection, parent });
    __publicField(this, "deployments");
    __publicField(this, "logs");
    __publicField(this, "metrics");
    __publicField(this, "workspace");
    __publicField(this, "delete");
    this.deployments = parent;
    this.workspace = this.deployments.workspace;
    this.logs = new DeploymentLogsModel(this);
    this.metrics = new DeploymentMetricsModel(this);
    this.dependents = [this.logs, this.metrics];
    this.forms = {
      edit: new EditDeploymentFormModel(this)
    };
    this.delete = new APIRepo({ path: this.api, method: "DELETE" });
    this.repos = {
      delete: this.delete
    };
    remove(this, this.delete);
  }
  get name() {
    return this.data.name;
  }
  get status() {
    return this.data.status;
  }
  get id() {
    return this.data.id;
  }
  get link() {
    return `${this.deployments.workspace.link}/d/${this.id}`;
  }
  get api() {
    return `${this.deployments.api}/${this.id}`;
  }
  get cpuCount() {
    return this.data.properties.resources.cpuCount;
  }
  get memoryCount() {
    return this.data.properties.resources.memoryCount;
  }
  get storageCount() {
    return this.data.properties.resources.storageCount;
  }
  get proxyUrl() {
    return this.data.properties.proxyUrl;
  }
}
class ProjectsModel extends CollectionModel {
  constructor(workspace) {
    super({
      collections: ProjectModel
    });
    this.workspace = workspace;
    this.repos = {
      main: new APIRepo({ path: this.api }),
      create: new APIRepo({ path: this.api, method: "POST" })
    };
  }
  get api() {
    return `${this.workspace.api}/deployments`;
  }
}
class ProjectModel extends Model {
  constructor(data, projects) {
    super({ data });
    this.projects = projects;
  }
}
class WikiSectionsModel extends CollectionModel {
  constructor(workspace) {
    super({
      collections: WikiSectionModel
    });
    __publicField(this, "addSection");
    __publicField(this, "onAddSection", () => {
      this.addSection.call();
    });
    this.workspace = workspace;
    this.addSection = new APIRepo({
      path: this.api,
      method: "POST",
      body: { name: "New Section" },
      events: types.WIKISECTIONS
    });
    this.addSection.onLoad.subscribe(() => {
      this.load();
    });
    this.repos = {
      main: new APIRepo({ path: this.api }),
      addSection: this.addSection
    };
  }
  get link() {
    return `${this.workspace.link}/wiki`;
  }
  get api() {
    return `${this.workspace.api}/sections`;
  }
}
class WikiSectionModel extends Model {
  constructor({ data, parent }) {
    super({ data });
    __publicField(this, "sections");
    __publicField(this, "wikiPages");
    __publicField(this, "sectionForm");
    __publicField(this, "delete");
    __publicField(this, "onSubmitNameChange", () => {
    });
    __publicField(this, "onDelete", async () => {
      await this.delete.call();
    });
    this.sections = parent;
    this.sectionForm = new FormModel({
      data: {
        name: data.name
      }
    });
    this.delete = new APIRepo({ path: this.api, method: "DELETE" });
    this.wikiPages = new WikiPagesModel(this);
    this.delete.onLoad.subscribe(() => {
      this.sections.load();
    });
    this.dependents = [this.wikiPages];
  }
  get id() {
    return this.data.id;
  }
  get link() {
    return `${this.sections.link}/${this.id}`;
  }
  get api() {
    return `${this.sections.api}/${this.id}`;
  }
}
class WikiPagesModel extends CollectionModel {
  constructor(wikiSection) {
    super({
      collections: WikiPageModel
    });
    __publicField(this, "addPage");
    __publicField(this, "onAddPage", () => {
      this.addPage.call();
    });
    this.wikiSection = wikiSection;
    this.addPage = new APIRepo({
      path: this.api,
      method: "POST",
      body: {
        title: "New Page",
        body: "# New Page!"
      },
      events: types.WIKIPAGES
    });
    this.addPage.onLoad.subscribe(() => {
      this.load();
    });
    this.repos = {
      main: new APIRepo({ path: this.api })
    };
  }
  get link() {
    return `${this.wikiSection.link}/pages`;
  }
  get api() {
    return `${this.wikiSection.api}/pages`;
  }
}
class WikiPageModel extends Model {
  constructor({ data, parent }) {
    super({ data });
    __publicField(this, "pages");
    __publicField(this, "pageForm");
    __publicField(this, "delete");
    __publicField(this, "onSave", async () => {
      await this.pageForm.call();
    });
    __publicField(this, "onDelete", async () => {
      await this.delete.call();
      if (this.delete.state == "loaded") {
        this.pages.load();
      }
    });
    this.pages = parent;
    this.pageForm = new FormModel({
      data: {
        title: data.title,
        body: data.body
      },
      submit: new APIRepo({ path: this.api, method: "PUT" })
    });
    this.delete = new APIRepo({ path: this.api, method: "DELETE" });
  }
  get id() {
    return this.data.id;
  }
  get api() {
    return `${this.pages.api}/${this.id}`;
  }
  get link() {
    return `${this.pages.link}/${this.id}`;
  }
}
class DeploymentImagesModel extends Model {
  constructor(workspace) {
    super({});
    __publicField(this, "types");
    __publicField(this, "versions", {});
    __publicField(this, "postLoad", async () => {
      this.types = [...new Set(this.data.map((d) => d.type))];
      for (const type of this.types) {
        this.versions[type] = [];
      }
      this.data.map((d) => {
        this.versions[d.type].push(d.version);
      });
    });
    this.workspace = workspace;
    this.repos = {
      main: new APIRepo({ path: this.api })
    };
    this.load();
  }
  getTypes() {
    return this.types.map((d) => ({
      label: lib.DeploymentLabelingUtil.generateImageTypeLabel(d),
      value: d
    }));
  }
  getVersions(type) {
    if (type != void 0 && !this.versions[type])
      return [];
    return this.versions[type].map((d) => ({
      label: lib.DeploymentLabelingUtil.generateImageVersionLabel(d),
      value: d
    }));
  }
  get api() {
    return `${this.workspace.api}/deployments/images/`;
  }
}
class WorkspaceMetricsModel extends Model {
  constructor(workspace) {
    super({});
    this.workspace = workspace;
    this.repos = {
      main: new APIRepo({ path: this.api })
    };
  }
  get api() {
    return `${this.workspace.api}/metrics`;
  }
  get memory() {
    return this.data.memory;
  }
  get cpu() {
    return this.data.cpu;
  }
  get storage() {
    return this.data.storage;
  }
  get cpuChart() {
    return {
      data: [
        {
          value: this.cpu,
          gauge: {
            axis: { range: [0, 100] }
          },
          number: { suffix: "%" },
          title: { text: "CPU Usage" },
          type: "indicator",
          mode: "gauge+number"
        }
      ]
    };
  }
  get memoryChart() {
    return {
      data: [
        {
          value: this.memory,
          gauge: {
            axis: { range: [0, 100] }
          },
          number: { suffix: "%" },
          title: { text: "Memory Usage" },
          type: "indicator",
          mode: "gauge+number"
        }
      ]
    };
  }
  get storageChart() {
    return {
      data: [
        {
          value: this.storage,
          gauge: {
            axis: { range: [0, 100] }
          },
          number: { suffix: "%" },
          title: { text: "Storage Usage" },
          type: "indicator",
          mode: "gauge+number"
        }
      ]
    };
  }
}
class WorkspacesModel extends CollectionModel {
  constructor() {
    super({
      collections: WorkspaceModel
    });
    __publicField(this, "createWorkspaceForm");
    __publicField(this, "postLoad", async () => {
      console.log("workspaces loaded");
    });
    this.createWorkspaceForm = new CreateWorkspaceFormModel();
    add(this, this.createWorkspaceForm.submit);
    this.repos = {
      main: new APIRepo({ path: this.api }),
      create: new APIRepo({ path: this.api, method: "POST" })
    };
  }
  get api() {
    return "/api/workspaces";
  }
  get workspaces() {
    return this.collection.models || [];
  }
  get selectedWorkspace() {
    return this.workspaces[0];
  }
  get workspaceUrl() {
    return `/w/${this.selectedWorkspace.id}`;
  }
}
class WorkspaceModel extends Model {
  constructor(config) {
    super(config);
    __publicField(this, "wikiSections");
    __publicField(this, "deploymentImages");
    __publicField(this, "deployments");
    __publicField(this, "projects");
    __publicField(this, "metrics");
    __publicField(this, "workspaceAdmin");
    __publicField(this, "workspaces");
    __publicField(this, "updateWorkspace");
    __publicField(this, "createDeployment");
    __publicField(this, "createProject");
    __publicField(this, "delete");
    __publicField(this, "onDelete", async () => {
      await this.delete.call();
      if (this.delete.state === "loaded")
        rootStore.routerStore.push("/");
    });
    this.workspaces = this.parent;
    this.repos = {
      update: new APIRepo({ path: this.api, method: "PUT" }),
      createDeployment: new APIRepo({
        path: `${this.api}/deployments`,
        method: "POST"
      })
    };
    this.delete = new APIRepo({ path: this.api, method: "DELETE" });
    this.updateWorkspace = new UpdateWorkspaceFormModel(this);
    this.createProject = new CreateProjectFormModel(this);
    this.forms = {
      createDeployment: this.createDeployment,
      createProject: this.createProject,
      update: this.updateWorkspace
    };
    this.deployments = new DeploymentsModel(this);
    this.projects = new ProjectsModel(this);
    this.wikiSections = new WikiSectionsModel(this);
    this.deploymentImages = new DeploymentImagesModel(this);
    this.metrics = new WorkspaceMetricsModel(this);
    this.workspaceAdmin = new WorkspaceAdminModel(this);
    this.dependents = [
      this.deployments,
      this.deploymentImages,
      this.workspaceAdmin,
      this.metrics,
      this.wikiSections
    ];
    update(this, this.updateWorkspace.submit);
    remove(this, this.delete);
  }
  get id() {
    return this.data.id;
  }
  get name() {
    return this.data.name;
  }
  get users() {
    return this.data.users;
  }
  get resources() {
    return this.data.properties.resources;
  }
  get cpuCount() {
    return this.resources.cpuCount;
  }
  get memoryCount() {
    return this.resources.memoryCount;
  }
  get storageCount() {
    return this.resources.storageCount || 0;
  }
  get link() {
    return `/w/${this.id}`;
  }
  get api() {
    return `/api/workspaces/${this.id}`;
  }
}
var __defProp$2 = Object.defineProperty;
var __getOwnPropDesc$2 = Object.getOwnPropertyDescriptor;
var __decorateClass$2 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$2(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$2(target, key, result);
  return result;
};
class WorkspacesStore {
  constructor(rootStore2) {
    __publicField(this, "_selectedWorkspace");
    __publicField(this, "wikiEdit");
    __publicField(this, "workspaces");
    __publicField(this, "count", 0);
    __publicField(this, "selectWorkspace", (wid) => {
      const selectedWorkspace = this.workspaces.getBy("id", wid)[0];
      if (selectedWorkspace)
        this.selectedWorkspace = selectedWorkspace;
    });
    this.rootStore = rootStore2;
    this.workspaces = new WorkspacesModel();
    this.wikiEdit = false;
    makeObservable(this);
    events.on(types.USERLOAD.onLoad.type, () => {
      this.workspaces.load();
    });
  }
  set selectedWorkspace(workspace) {
    if (!workspace)
      return;
    this.rootStore.routerStore.push(workspace.link);
    this._selectedWorkspace = this.selectedWorkspace;
  }
  get selectedWorkspace() {
    const { wid } = this.rootStore.routerStore.params;
    let selectedWorkspace = void 0;
    if (wid) {
      selectedWorkspace = this.workspaces.getBy("id", wid)[0];
    } else if (this._selectedWorkspace !== void 0) {
      selectedWorkspace = this._selectedWorkspace;
    } else {
      selectedWorkspace = this.workspaces.workspaces[0];
    }
    this._selectedWorkspace = selectedWorkspace;
    return selectedWorkspace;
  }
  get selectedDeployment() {
    const { did } = this.rootStore.routerStore.params;
    if (this.selectedWorkspace) {
      return this.selectedWorkspace.deployments.getBy("id", did)[0];
    }
    return void 0;
  }
  get selectedWikiSection() {
    const { sectionId } = this.rootStore.routerStore.params;
    if (this.selectedWorkspace) {
      return this.selectedWorkspace.wikiSections.getBy("id", sectionId)[0];
    }
    return void 0;
  }
  get selectedWikiPage() {
    const { pageId } = this.rootStore.routerStore.params;
    if (this.selectedWikiSection) {
      return this.selectedWikiSection.wikiPages.getBy("id", pageId)[0];
    }
    return void 0;
  }
}
__decorateClass$2([
  observable
], WorkspacesStore.prototype, "_selectedWorkspace", 2);
__decorateClass$2([
  observable
], WorkspacesStore.prototype, "wikiEdit", 2);
__decorateClass$2([
  observable
], WorkspacesStore.prototype, "count", 2);
var __defProp$1 = Object.defineProperty;
var __getOwnPropDesc$1 = Object.getOwnPropertyDescriptor;
var __decorateClass$1 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$1(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$1(target, key, result);
  return result;
};
class SnackbarStore {
  constructor() {
    __publicField(this, "alerts", []);
    this.initEvents();
    makeObservable(this);
  }
  push(alert) {
    this.alerts.push(__spreadValues({
      key: new Date().getTime() + Math.random(),
      autoHideDuration: 6e3
    }, alert));
  }
  get() {
    return this.alerts;
  }
  remove(alert) {
    return () => {
      this.alerts = this.alerts.filter((a) => {
        a.key != alert.key;
      });
    };
  }
  initEvents() {
    Object.values(eventTypes).forEach((v) => {
      events.on(v.type, (data) => {
        this.push({
          message: v.data.message,
          variant: v.data.variant
        });
      });
    });
  }
}
__decorateClass$1([
  observable
], SnackbarStore.prototype, "alerts", 2);
var __defProp2 = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp2(target, key, result);
  return result;
};
class UIStore extends Model {
  constructor(rootStore2) {
    super({});
    __publicField(this, "confirmDelete");
    __publicField(this, "count", 0);
    __publicField(this, "sideBarOpen", false);
    __publicField(this, "setDeleteTarget", (name, callBack) => {
      this.confirmDelete.setTarget(name, callBack);
      this.confirmDelete.dialog.onOpen();
    });
    __publicField(this, "toggleSidebar", () => {
      this.sideBarOpen = !this.sideBarOpen;
    });
    this.rootStore = rootStore2;
    this.confirmDelete = new ConfirmDeleteModel();
    this.forms = {
      confirmDelete: this.confirmDelete
    };
    makeObservable(this);
  }
}
__decorateClass([
  observable
], UIStore.prototype, "count", 2);
__decorateClass([
  observable
], UIStore.prototype, "sideBarOpen", 2);
class AdminStore extends Model {
  constructor(rootStore2) {
    super();
    __publicField(this, "users");
    __publicField(this, "editUserDialog");
    __publicField(this, "createUserDialog");
    var _a;
    this.rootStore = rootStore2;
    this.users = new AdminUsersModel();
    this.editUserDialog = new AdminUserDialogModel();
    this.createUserDialog = new DialogModel();
    (_a = rootStore2.authStore.user.repo) == null ? void 0 : _a.onLoad.subscribe((val) => {
      console.log("authstore onload admin", val);
      this.load();
    });
    this.dependents = [this.users];
  }
}
class RootStore {
  constructor(history2) {
    __publicField(this, "routerStore");
    __publicField(this, "authStore");
    __publicField(this, "workspacesStore");
    __publicField(this, "snackbarStore");
    __publicField(this, "uiStore");
    __publicField(this, "adminStore");
    this.routerStore = new RouterStore(this, history2);
    this.authStore = new AuthStore(this);
    this.workspacesStore = new WorkspacesStore(this);
    this.snackbarStore = new SnackbarStore();
    this.uiStore = new UIStore(this);
    this.adminStore = new AdminStore(this);
  }
  get stores() {
    return {
      [ROUTER_STORE]: this.routerStore,
      [AUTH_STORE]: this.authStore,
      [WORKSPACES_STORE]: this.workspacesStore,
      [SNACKBAR_STORE]: this.snackbarStore,
      [UI_STORE]: this.uiStore,
      [ADMIN_STORE]: this.adminStore
    };
  }
}
const history = createBrowserHistory();
const rootStore = new RootStore(history);
const storesContext = react.exports.createContext(rootStore.stores);
const useStores = () => react.exports.useContext(storesContext);
const AuthGuard = observer((props) => {
  const { authstore } = useStores();
  if (authstore.state == "unauthed")
    return /* @__PURE__ */ react.exports.createElement(Redirect, {
      to: "/login"
    });
  switch (authstore.state) {
    case "loggedin":
      return props.children;
    default:
      return "loading...";
  }
});
const AuthedRoute = observer((props) => {
  const { authstore } = useStores();
  if (authstore.state == "unauthed")
    return /* @__PURE__ */ react.exports.createElement(Redirect, {
      to: "/login"
    });
  switch (authstore.state) {
    case "loggedin":
      return /* @__PURE__ */ react.exports.createElement(Route, __spreadValues({}, props));
    default:
      return null;
  }
});
const UnauthedRoute = observer((props) => {
  const { authstore } = useStores();
  switch (authstore.state) {
    case "loggedin":
      return /* @__PURE__ */ react.exports.createElement(Redirect, {
        to: "/"
      });
    case "unauthed":
      return /* @__PURE__ */ react.exports.createElement(Route, __spreadValues({}, props));
    default:
      return null;
  }
});
observer((props) => {
  const { authstore } = useStores();
  switch (authstore.user.state) {
    case "loaded":
      return /* @__PURE__ */ react.exports.createElement(AuthedRoute, __spreadValues({}, props));
    default:
      return null;
  }
});
const RenderIf = (props) => {
  if (!props.if)
    return null;
  return props.children;
};
const RenderIfHas = (props) => {
  const { array, permissions } = props;
  let allow = false;
  for (const perm of array) {
    if (permissions.has(perm)) {
      allow = true;
      break;
    }
  }
  if (allow)
    return props.children;
  return null;
};
const RenderIfRole = observer((props) => {
  var _a;
  const { authstore } = useStores();
  const { roles: roles2, wid } = props;
  let perms = authstore.user.permissions.roles;
  if (wid) {
    perms = ((_a = authstore.user.permissions.getWorkspacePermission(wid)) == null ? void 0 : _a.roles) || perms;
  }
  return /* @__PURE__ */ react.exports.createElement(RenderIfHas, {
    array: roles2,
    permissions: perms
  }, props.children);
});
observer((props) => {
  var _a;
  const { authstore } = useStores();
  const { permissions, wid } = props;
  let perms = authstore.user.permissions.permissions;
  if (wid) {
    perms = ((_a = authstore.user.permissions.getWorkspacePermission(wid)) == null ? void 0 : _a.permissions) || perms;
  }
  return /* @__PURE__ */ react.exports.createElement(RenderIfHas, {
    array: permissions,
    permissions: perms
  }, props.children);
});
const WorkspacesLoaded = observer((props) => {
  var _a;
  const { workspacesstore } = useStores();
  const workspaces = workspacesstore.workspaces;
  if (workspaces.state == "loaded") {
    const wid = (_a = workspacesstore.selectedWorkspace) == null ? void 0 : _a.id;
    if (!wid) {
      return /* @__PURE__ */ react.exports.createElement(Redirect, {
        to: `/w/new`
      });
    } else {
      return /* @__PURE__ */ react.exports.createElement(AuthedRoute, __spreadValues({}, props));
    }
  } else {
    return null;
  }
});
observer((props) => {
  const { workspacesstore } = useStores();
  const workspace = workspacesstore.selectedWorkspace;
  if (workspace == void 0)
    return null;
  switch (workspace.deployments.state) {
    case "reloading":
      return /* @__PURE__ */ react.exports.createElement(AuthedRoute, __spreadValues({}, props));
    case "loaded":
      return /* @__PURE__ */ react.exports.createElement(AuthedRoute, __spreadValues({}, props));
    default:
      return null;
  }
});
observer((props) => {
  const { workspacesstore } = useStores();
  const workspace = workspacesstore.selectedWorkspace;
  if (workspace == void 0)
    return null;
  switch (workspace.projects.state) {
    case "reloading":
      return /* @__PURE__ */ react.exports.createElement(AuthedRoute, __spreadValues({}, props));
    case "loaded":
      return /* @__PURE__ */ react.exports.createElement(AuthedRoute, __spreadValues({}, props));
    default:
      return null;
  }
});
inject(WORKSPACES_STORE)(observer((props) => {
  const { workspacesstore } = useStores();
  const workspace = workspacesstore.selectedWorkspace;
  if (workspace == void 0)
    return null;
  switch (workspace.wikiSections.state) {
    case "reloading":
      return /* @__PURE__ */ react.exports.createElement(AuthedRoute, __spreadValues({}, props));
    case "loaded":
      return /* @__PURE__ */ react.exports.createElement(AuthedRoute, __spreadValues({}, props));
    default:
      return null;
  }
}));
const ImageSelect = observer((props) => {
  const { form, workspace } = props;
  const images = workspace.deploymentImages;
  const types2 = images.getTypes();
  const type = form.get("type") || images.types[0];
  const version = form.get("version");
  const versions = images.getVersions(type);
  const onChange = (id) => {
    return (e) => {
      form.onChange(id)(e.target.value);
    };
  };
  const onChangeType = (e) => {
    form.onChange("version")(void 0);
    return onChange("type")(e);
  };
  const onChangeVersion = (e) => {
    return onChange("version")(e);
  };
  return /* @__PURE__ */ react.exports.createElement(react.exports.Fragment, null, /* @__PURE__ */ react.exports.createElement(BaseSelect, __spreadProps(__spreadValues({}, props), {
    id: "type",
    label: "Type",
    defaultValue: types2[0],
    options: types2,
    onChange: onChangeType,
    value: type
  })), /* @__PURE__ */ react.exports.createElement(BaseSelect, __spreadProps(__spreadValues({}, props), {
    id: "version",
    label: "Version",
    defaultValue: versions[0],
    options: versions,
    onChange: onChangeVersion,
    value: version
  })));
});
const CreateDeployment = observer((props) => {
  const { workspacesstore } = useStores();
  const selectedWorkspace = workspacesstore.selectedWorkspace;
  if (!selectedWorkspace)
    return null;
  const form = selectedWorkspace.deployments.createDeployment;
  return /* @__PURE__ */ react.exports.createElement(WorkspaceWrapper, null, /* @__PURE__ */ react.exports.createElement(Typography, {
    variant: "h4"
  }, "Create Deployment"), /* @__PURE__ */ react.exports.createElement(CreateDeploymentForm, {
    form
  }));
});
const CreateDeploymentForm = observer((props) => {
  const { form } = props;
  const workspace = form.deployments.workspace;
  return /* @__PURE__ */ react.exports.createElement(Form, {
    form
  }, /* @__PURE__ */ react.exports.createElement(Label, null, "Deployment Name"), /* @__PURE__ */ react.exports.createElement(Input, {
    form,
    id: "name",
    label: "deployment name",
    autoComplete: "off"
  }), /* @__PURE__ */ react.exports.createElement(Label, null, "Sudo Password"), /* @__PURE__ */ react.exports.createElement(Input, {
    form,
    id: "sudoPassword",
    type: "password",
    label: "Sudo Password",
    autoComplete: "current-password"
  }), /* @__PURE__ */ react.exports.createElement(Label, null, "Container Image"), /* @__PURE__ */ react.exports.createElement(ImageSelect, {
    form,
    workspace
  }), /* @__PURE__ */ react.exports.createElement(Label, null, "Scaling Method"), /* @__PURE__ */ react.exports.createElement(ScalingMethodSelect, {
    form
  }), /* @__PURE__ */ react.exports.createElement(Label, null, "Resources"), /* @__PURE__ */ react.exports.createElement(Typography, {
    variant: "body1"
  }, "Specify the maximum amount of resources the deployment can use."), /* @__PURE__ */ react.exports.createElement(ResourcesInput, {
    form
  }), /* @__PURE__ */ react.exports.createElement(CancelCreateButtons, {
    form
  }));
});
const iframeWrapper = "_iframeWrapper_1z0e6_1";
const iframe = "_iframe_1z0e6_1";
var style$2 = {
  iframeWrapper,
  iframe
};
const DeploymentProxy = inject(WORKSPACES_STORE)(observer((props) => {
  const { workspacesstore } = useStores();
  const [state, setState] = react.exports.useState("loading");
  const deployment = workspacesstore.selectedDeployment;
  if (!deployment)
    return null;
  deployment.id;
  return /* @__PURE__ */ react.exports.createElement(HomeWrapperBase, null, /* @__PURE__ */ react.exports.createElement("iframe", {
    id: style$2.iframe,
    src: `https://${deployment.proxyUrl}`,
    onLoad: () => {
      setState("loaded");
    }
  }));
}));
const EditDeployment = (props) => {
  const { workspacesstore, uistore } = useStores();
  const deployment = workspacesstore.selectedDeployment;
  const form = deployment == null ? void 0 : deployment.forms.edit;
  return /* @__PURE__ */ react.exports.createElement(WorkspaceWrapper, null, /* @__PURE__ */ react.exports.createElement(EditDeploymentForm, {
    form
  }));
};
const EditDeploymentForm = observer((props) => {
  const { routerstore } = useStores();
  const { form } = props;
  console.log(JSON.stringify(form == null ? void 0 : form.errors), form == null ? void 0 : form.isValid);
  if (!form)
    return null;
  return /* @__PURE__ */ react.exports.createElement(Form, {
    form
  }, /* @__PURE__ */ react.exports.createElement(Label, null, "Deployment Name"), /* @__PURE__ */ react.exports.createElement(Input, {
    form,
    id: "name",
    label: "name",
    autoComplete: "off"
  }), /* @__PURE__ */ react.exports.createElement(Label, null, "Resources"), /* @__PURE__ */ react.exports.createElement(Typography, {
    variant: "body1"
  }, "Specify the maximum amount of resources the deployment can use:"), /* @__PURE__ */ react.exports.createElement(Label, null, "Container Image"), /* @__PURE__ */ react.exports.createElement(ImageSelect, {
    form,
    workspace: form.deployment.workspace
  }), /* @__PURE__ */ react.exports.createElement(CPUMemoryInput, {
    form
  }), /* @__PURE__ */ react.exports.createElement(CancelCreateButtons, {
    form,
    cancel: () => {
      routerstore.goBack();
    },
    submit: async () => {
      console.log("SUBMIT", form, form.payload);
      await form.call();
    },
    labels: ["Cancel", "Edit"]
  }));
});
const chips$1 = {
  FAILED: /* @__PURE__ */ react.exports.createElement(Chip, {
    style: { backgroundColor: "red" },
    label: "Error"
  }),
  SUCCESS: /* @__PURE__ */ react.exports.createElement(Chip, {
    style: { backgroundColor: "red" },
    label: "Error"
  }),
  STARTING: /* @__PURE__ */ react.exports.createElement(Chip, {
    style: { backgroundColor: "red" },
    label: "Error"
  }),
  STOPPED: /* @__PURE__ */ react.exports.createElement(Chip, {
    style: { backgroundColor: "red" },
    label: "STOPPED"
  }),
  PENDING: /* @__PURE__ */ react.exports.createElement(Chip, {
    color: "secondary",
    label: "PENDING"
  }),
  CREATING: /* @__PURE__ */ react.exports.createElement(Chip, {
    color: "secondary",
    label: "CREATING"
  }),
  RUNNING: /* @__PURE__ */ react.exports.createElement(Chip, {
    color: "primary",
    label: "RUNNING"
  }),
  UPDATING: /* @__PURE__ */ react.exports.createElement(Chip, {
    color: "secondary",
    label: "UPDATING"
  }),
  DELETING: /* @__PURE__ */ react.exports.createElement(Chip, {
    style: { backgroundColor: "red" },
    label: "DELETING"
  }),
  UNKNOWN: /* @__PURE__ */ react.exports.createElement(Chip, {
    style: { backgroundColor: "purple" },
    label: "UNKNOWN"
  })
};
const DeploymentChip$1 = (props) => {
  const { deployment } = props;
  return /* @__PURE__ */ react.exports.createElement("div", {
    style: { paddingTop: "15px" }
  }, chips$1[deployment.status] || null);
};
const DeploymentLaunch = (props) => {
  const { deployment } = props;
  return /* @__PURE__ */ react.exports.createElement(LinkButton, {
    variant: "contained",
    color: "primary",
    style: { bottom: 3, right: 3, position: "absolute" },
    to: deployment.link,
    disabled: deployment.status !== "RUNNING"
  }, "Launch \u{1F680}");
};
const ResourceChip = ({
  icon,
  label,
  value
}) => {
  if (value === void 0)
    return null;
  return /* @__PURE__ */ react.exports.createElement(Grid, {
    item: true,
    xs: 4
  }, /* @__PURE__ */ react.exports.createElement(Chip, {
    icon,
    label: label + value
  }));
};
const DeploymentResources = (props) => {
  const { deployment } = props;
  const { cpuCount, memoryCount, storageCount } = deployment;
  return /* @__PURE__ */ react.exports.createElement(Grid, {
    container: true,
    style: { paddingTop: "20px" }
  }, /* @__PURE__ */ react.exports.createElement(ResourceChip, {
    icon: /* @__PURE__ */ react.exports.createElement(default_1$1, null),
    label: "CPU: ",
    value: cpuCount
  }), /* @__PURE__ */ react.exports.createElement(ResourceChip, {
    icon: /* @__PURE__ */ react.exports.createElement(default_1$2, null),
    label: "RAM: ",
    value: memoryCount
  }), /* @__PURE__ */ react.exports.createElement(ResourceChip, {
    icon: /* @__PURE__ */ react.exports.createElement(default_1, null),
    label: "Storage: ",
    value: storageCount
  }));
};
const DeploymentMenu = observer((props) => {
  const { deployment } = props;
  const { routerstore, uistore } = useStores();
  return /* @__PURE__ */ react.exports.createElement("div", {
    style: {
      position: "absolute",
      top: "2%",
      right: "2%"
    }
  }, /* @__PURE__ */ react.exports.createElement(MoreMenu, {
    options: [
      {
        name: "Edit",
        onClick: () => {
          routerstore.push(deployment.link + "/edit");
        }
      },
      {
        name: "Info",
        onClick: () => {
          routerstore.push(deployment.link + "/info");
        }
      },
      {
        name: "Delete",
        onClick: () => {
          uistore.setDeleteTarget(deployment.name, deployment.delete.call);
        }
      }
    ]
  }));
});
const DeploymentCard = (props) => {
  const { deployment } = props;
  return /* @__PURE__ */ react.exports.createElement(Card, {
    style: {
      width: "400px",
      minWidth: "400px",
      height: "256px",
      padding: "20px",
      position: "relative"
    }
  }, /* @__PURE__ */ react.exports.createElement(Typography, {
    variant: "h4",
    color: "primary",
    noWrap: true
  }, deployment.name), /* @__PURE__ */ react.exports.createElement(DeploymentMenu, {
    deployment
  }), /* @__PURE__ */ react.exports.createElement(DeploymentChip$1, {
    deployment
  }), /* @__PURE__ */ react.exports.createElement(DeploymentResources, {
    deployment
  }), /* @__PURE__ */ react.exports.createElement(DeploymentLaunch, {
    deployment
  }));
};
const DeploymentsList = observer(({ workspace }) => {
  console.log(workspace.deployments);
  return /* @__PURE__ */ react.exports.createElement(react.exports.Fragment, null, /* @__PURE__ */ react.exports.createElement(Grid, {
    container: true,
    direction: "row",
    spacing: 5,
    alignItems: "flex-start",
    justifyContent: "flex-start"
  }, workspace.deployments.map((deployment) => /* @__PURE__ */ react.exports.createElement(Grid, {
    item: true,
    key: deployment.id
  }, /* @__PURE__ */ react.exports.createElement(DeploymentCard, {
    deployment
  })))));
});
const ScalingMethodSelect = observer((props) => {
  const { form } = props;
  const options = [
    {
      value: "ALWAYS_ON",
      label: "Always On"
    },
    {
      value: "ON_DEMAND",
      label: "On Demand"
    }
  ];
  const scalingMethod = form.get("scalingMethod");
  const onChange = (id) => {
    return (e) => {
      form.onChange(id)(e.target.value);
    };
  };
  return /* @__PURE__ */ react.exports.createElement(react.exports.Fragment, null, /* @__PURE__ */ react.exports.createElement(BaseSelect, __spreadProps(__spreadValues({}, props), {
    id: "type",
    label: "Type",
    defaultValue: options[0],
    options,
    onChange: onChange("scalingMethod"),
    value: scalingMethod
  })));
});
const textarea = "_textarea_1m4mx_1";
var style$1 = {
  textarea
};
const chips = {
  FAILED: /* @__PURE__ */ react.exports.createElement(Chip, {
    style: { backgroundColor: "red" },
    label: "Error"
  }),
  SUCCESS: /* @__PURE__ */ react.exports.createElement(Chip, {
    style: { backgroundColor: "red" },
    label: "Error"
  }),
  STARTING: /* @__PURE__ */ react.exports.createElement(Chip, {
    style: { backgroundColor: "red" },
    label: "Error"
  }),
  PENDING: /* @__PURE__ */ react.exports.createElement(Chip, {
    color: "secondary",
    label: "PENDING"
  }),
  CREATING: /* @__PURE__ */ react.exports.createElement(Chip, {
    color: "secondary",
    label: "CREATING"
  }),
  RUNNING: /* @__PURE__ */ react.exports.createElement(Chip, {
    color: "primary",
    label: "RUNNING"
  }),
  UPDATING: /* @__PURE__ */ react.exports.createElement(Chip, {
    color: "secondary",
    label: "UPDATING"
  }),
  DELETING: /* @__PURE__ */ react.exports.createElement(Chip, {
    style: { backgroundColor: "red" },
    label: "DELETING"
  }),
  UNKNOWN: /* @__PURE__ */ react.exports.createElement(Chip, {
    style: { backgroundColor: "purple" },
    label: "UNKNOWN"
  })
};
const DeploymentChip = (props) => {
  const { deployment } = props;
  return /* @__PURE__ */ react.exports.createElement("div", {
    style: { paddingTop: "15px" }
  }, chips[deployment.status] || null);
};
const DeploymentLogs = observer((props) => {
  const { deployment } = props;
  if (!deployment)
    return null;
  const logs = deployment.logs;
  const logText = logs.logs;
  return /* @__PURE__ */ react.exports.createElement(react.exports.Fragment, null, /* @__PURE__ */ react.exports.createElement(Typography, {
    variant: "h4"
  }, "Logs"), /* @__PURE__ */ react.exports.createElement("textarea", {
    className: style$1.textarea,
    disabled: true,
    value: logText
  }));
});
const ChartWrapper = (props) => {
  return /* @__PURE__ */ react.exports.createElement(Grid, {
    item: true,
    style: { width: "100%", height: "37vh" }
  }, props.children);
};
const DeploymentMetrics = observer((props) => {
  const { deployment } = props;
  if (!deployment)
    return null;
  const metrics = deployment == null ? void 0 : deployment.metrics;
  return /* @__PURE__ */ react.exports.createElement(react.exports.Fragment, null, /* @__PURE__ */ react.exports.createElement(Typography, {
    variant: "h4"
  }, "Metrics"), /* @__PURE__ */ react.exports.createElement(Grid, {
    container: true,
    item: true,
    direction: "column"
  }, /* @__PURE__ */ react.exports.createElement(ChartWrapper, null, /* @__PURE__ */ react.exports.createElement(GaugeChart, __spreadValues({}, metrics.cpuChart))), /* @__PURE__ */ react.exports.createElement(ChartWrapper, null, /* @__PURE__ */ react.exports.createElement(GaugeChart, __spreadValues({}, metrics.memoryChart)))));
});
const DeploymentAlert = (props) => {
  const { deployment } = props;
  const failureReason = deployment.data["failureReason"];
  if (deployment.status === "FAILED")
    return /* @__PURE__ */ react.exports.createElement(Alert, {
      severity: "error"
    }, failureReason);
  return null;
};
const DeploymentInfoPage = observer((props) => {
  const { workspacesstore } = useStores();
  const deployment = workspacesstore.selectedDeployment;
  if (!deployment)
    return null;
  return /* @__PURE__ */ react.exports.createElement(WorkspaceWrapper, null, /* @__PURE__ */ react.exports.createElement(Typography, {
    variant: "h3"
  }, "Deployment: ", deployment.name), /* @__PURE__ */ react.exports.createElement(Typography, {
    variant: "h6"
  }, /* @__PURE__ */ react.exports.createElement(DeploymentChip, {
    deployment
  }), /* @__PURE__ */ react.exports.createElement("br", null), /* @__PURE__ */ react.exports.createElement(DeploymentAlert, {
    deployment
  }), /* @__PURE__ */ react.exports.createElement("br", null)), /* @__PURE__ */ react.exports.createElement("div", {
    style: { height: "60vh", display: "block" }
  }, /* @__PURE__ */ react.exports.createElement(Grid, {
    container: true,
    direction: "row"
  }, /* @__PURE__ */ react.exports.createElement(Grid, {
    item: true,
    xs: 12,
    sm: 6,
    md: 6,
    lg: 3,
    xl: 3
  }, /* @__PURE__ */ react.exports.createElement(DeploymentMetrics, {
    deployment
  })), /* @__PURE__ */ react.exports.createElement(Grid, {
    item: true,
    xs: 12,
    sm: 6,
    md: 6,
    lg: 9,
    xl: 9
  }, /* @__PURE__ */ react.exports.createElement(DeploymentLogs, {
    deployment
  })))));
});
const useStyles$1 = makeStyles((theme2) => ({
  margin: {
    margin: theme2.spacing(1, 0, 1, 0)
  },
  description: {
    paddingTop: "10px",
    paddingBottom: "5px"
  }
}));
const CreateWorkspaceForm = observer((props) => {
  const classes = useStyles$1();
  const { workspacesstore } = useStores();
  const form = workspacesstore.workspaces.createWorkspaceForm;
  return /* @__PURE__ */ react.exports.createElement(react.exports.Fragment, null, /* @__PURE__ */ react.exports.createElement(Typography, {
    variant: "h4"
  }, "Create Workspace"), /* @__PURE__ */ react.exports.createElement(Typography, {
    variant: "body1",
    className: classes.description
  }, "Please fill out the form below and press 'Create' to create a workspace."), /* @__PURE__ */ react.exports.createElement(Input, {
    autoFocus: true,
    form,
    className: classes.margin,
    margin: "dense",
    id: "name",
    label: "Workspace Name",
    type: "text",
    fullWidth: true
  }), /* @__PURE__ */ react.exports.createElement(Label, null, "Resources"), /* @__PURE__ */ react.exports.createElement(Typography, {
    variant: "body1",
    className: classes.description
  }, "Optionally, specify the maximum amount of resources the workspace can use."), /* @__PURE__ */ react.exports.createElement(CPUMemoryInput, {
    form
  }), /* @__PURE__ */ react.exports.createElement(StorageInput, {
    form
  }), /* @__PURE__ */ react.exports.createElement(CancelCreateButtons, {
    form
  }));
});
const WorkspaceHome = observer(() => {
  const { workspacesstore, uistore } = useStores();
  const workspaces = workspacesstore.workspaces;
  const selectedWorkspace = workspacesstore.selectedWorkspace;
  if (!selectedWorkspace)
    return null;
  return /* @__PURE__ */ react.exports.createElement(WorkspaceWrapper, null, /* @__PURE__ */ react.exports.createElement(DeploymentsList, {
    workspace: selectedWorkspace
  }), /* @__PURE__ */ react.exports.createElement(AddFAB, {
    link: `${workspaces.workspaceUrl}/new`
  }));
});
const WorkspaceAlert = (props) => {
  const { metrics } = props;
  if (metrics.state === "error")
    return /* @__PURE__ */ react.exports.createElement(Alert, {
      severity: "error"
    }, "This workspace has no configured resource limitations!");
  return null;
};
const WorkspaceMetricsPage = observer((props) => {
  const { workspacesstore } = useStores();
  const workspace = workspacesstore.selectedWorkspace;
  if (!workspace)
    return null;
  const metrics = workspace == null ? void 0 : workspace.metrics;
  return /* @__PURE__ */ react.exports.createElement(WorkspaceWrapper, null, /* @__PURE__ */ react.exports.createElement(Typography, {
    variant: "h4"
  }, workspace.name, " Metrics"), /* @__PURE__ */ react.exports.createElement("br", null), /* @__PURE__ */ react.exports.createElement(WorkspaceAlert, {
    metrics
  }), /* @__PURE__ */ react.exports.createElement("br", null), /* @__PURE__ */ react.exports.createElement(Grid, {
    container: true,
    spacing: 4
  }, /* @__PURE__ */ react.exports.createElement(Grid, {
    item: true,
    xs: 12,
    sm: 12,
    md: 6,
    lg: 6,
    xl: 6
  }, /* @__PURE__ */ react.exports.createElement(GaugeChart, __spreadValues({}, metrics.cpuChart))), /* @__PURE__ */ react.exports.createElement(Grid, {
    item: true,
    xs: 12,
    sm: 12,
    md: 6,
    lg: 6,
    xl: 6
  }, /* @__PURE__ */ react.exports.createElement(GaugeChart, __spreadValues({}, metrics.memoryChart))), /* @__PURE__ */ react.exports.createElement(Grid, {
    item: true,
    xs: 12,
    sm: 12,
    md: 6,
    lg: 6,
    xl: 6
  }, /* @__PURE__ */ react.exports.createElement(GaugeChart, __spreadValues({}, metrics.storageChart)))));
});
const NewWorkspace = () => {
  return /* @__PURE__ */ react.exports.createElement(HomeWrapper, null, /* @__PURE__ */ react.exports.createElement(CreateWorkspaceForm, null));
};
const WorkspaceRedirect = observer((props) => {
  const { workspacesstore } = useStores();
  const { workspaces } = workspacesstore;
  console.log("WorkspaceRedirect", workspaces);
  if (workspaces.state != "loaded") {
    return null;
  }
  const workspace = workspacesstore.selectedWorkspace;
  if (workspace)
    return /* @__PURE__ */ react.exports.createElement(Redirect, {
      to: workspace.link
    });
  return /* @__PURE__ */ react.exports.createElement(Redirect, {
    to: `/w/new`
  });
});
const UpdateWorkspace = observer((props) => {
  const { workspacesstore, uistore } = useStores();
  const workspace = workspacesstore.selectedWorkspace;
  if (!workspace)
    return null;
  const form = workspace.updateWorkspace;
  return /* @__PURE__ */ react.exports.createElement(WorkspaceWrapper, null, /* @__PURE__ */ react.exports.createElement(Typography, {
    variant: "h4"
  }, "Update Workspace"), /* @__PURE__ */ react.exports.createElement(Label, null, "Workspace Name"), /* @__PURE__ */ react.exports.createElement(Input, {
    form,
    id: "name",
    label: "Workspace Name",
    autoComplete: "off"
  }), /* @__PURE__ */ react.exports.createElement(Label, null, "Resources"), /* @__PURE__ */ react.exports.createElement(Typography, {
    variant: "body1"
  }, "Specify the maximum amount of resources the deployment can use:"), /* @__PURE__ */ react.exports.createElement(CPUMemoryInput, {
    form
  }), /* @__PURE__ */ react.exports.createElement(StorageInput, {
    form
  }), /* @__PURE__ */ react.exports.createElement("div", {
    style: { float: "left" }
  }, /* @__PURE__ */ react.exports.createElement(Button, {
    onClick: async () => {
      uistore.setDeleteTarget(workspace.name, workspace.onDelete);
    },
    color: "secondary"
  }, "Delete")), /* @__PURE__ */ react.exports.createElement("div", {
    style: { float: "right" }
  }, /* @__PURE__ */ react.exports.createElement(CancelCreateButtons, {
    form,
    labels: ["Cancel", "Edit"],
    submit: () => {
      form.call();
    }
  })));
});
const path$1 = "/w/:wid/admin/";
const WorkspaceAdminRoutes = () => {
  return /* @__PURE__ */ react.exports.createElement(WorkspaceWrapper, null, /* @__PURE__ */ react.exports.createElement(Switch, null, /* @__PURE__ */ react.exports.createElement(Route, {
    path: `${path$1}users`,
    component: WorkspaceAdminUsersPage
  }), /* @__PURE__ */ react.exports.createElement(Route, {
    path: `${path$1}`,
    component: WorkspaceAdminHomePage
  })));
};
const sidebar = "_sidebar_161eo_1";
const topsidebar = "_topsidebar_161eo_9";
const nested = "_nested_161eo_13";
const editorWrapper = "_editorWrapper_161eo_1";
const wrapper = "_wrapper_161eo_1";
var style = {
  sidebar,
  topsidebar,
  nested,
  editorWrapper,
  wrapper
};
const WikiPageHeaderTitle = observer((props) => {
  const { page } = props;
  const { workspacesstore } = useStores();
  const form = page.pageForm;
  if (workspacesstore.wikiEdit)
    return /* @__PURE__ */ react.exports.createElement(InputBase, {
      value: form.get("title"),
      onChange: form.onChange("title"),
      style: { fontSize: "3rem", letterSpacing: "0rem" }
    });
  return /* @__PURE__ */ react.exports.createElement(Typography, {
    variant: "h3",
    style: { paddingTop: 7 }
  }, form.get("title"));
});
const WikiPageEdit = observer((props) => {
  const { page } = props;
  const form = page.pageForm;
  return /* @__PURE__ */ react.exports.createElement(react.exports.Fragment, null, /* @__PURE__ */ react.exports.createElement(WikiPageHeader, {
    page
  }), /* @__PURE__ */ react.exports.createElement("div", {
    id: style.editorWrapper
  }, /* @__PURE__ */ react.exports.createElement(index, {
    language: "markdown",
    value: form.get("body"),
    loading: /* @__PURE__ */ react.exports.createElement("div", null),
    onChange: (val, ev) => {
      if (!val)
        return;
      form.onChange("body")(val);
    },
    options: {
      wordWrap: "on",
      lineNumbers: "off",
      wrappingIndent: "indent"
    }
  })));
});
const WikiPageRender = (props) => {
  const { page } = props;
  const form = page.pageForm;
  return /* @__PURE__ */ react.exports.createElement(react.exports.Fragment, null, /* @__PURE__ */ react.exports.createElement(WikiPageHeader, {
    page
  }), /* @__PURE__ */ react.exports.createElement(Markdown, {
    source: form.get("body")
  }));
};
const WikiPage = observer((props) => {
  const { workspacesstore } = useStores();
  const page = workspacesstore.selectedWikiPage;
  if (page == void 0) {
    return /* @__PURE__ */ react.exports.createElement("div", {
      id: style.wrapper
    }, "Wiki page not found");
  }
  return /* @__PURE__ */ react.exports.createElement("div", {
    id: style.wrapper
  }, workspacesstore.wikiEdit ? /* @__PURE__ */ react.exports.createElement(WikiPageEdit, {
    page
  }) : /* @__PURE__ */ react.exports.createElement(WikiPageRender, {
    page
  }));
});
const WikiPageHeader = (props) => {
  const { page } = props;
  return /* @__PURE__ */ react.exports.createElement(Grid, {
    container: true
  }, /* @__PURE__ */ react.exports.createElement(Grid, {
    item: true,
    xs: 9,
    sm: 11
  }, /* @__PURE__ */ react.exports.createElement(WikiPageHeaderTitle, {
    page
  })), /* @__PURE__ */ react.exports.createElement(Grid, {
    item: true,
    xs: 3,
    sm: 1
  }, /* @__PURE__ */ react.exports.createElement(IconButton, {
    onClick: page.onSave
  }, /* @__PURE__ */ react.exports.createElement(default_1$h, null))));
};
const useStyles = makeStyles((theme2) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    width: 360
  },
  lists: {
    backgroundColor: theme2.palette.background.paper,
    marginTop: theme2.spacing(1)
  },
  nested: {
    paddingLeft: theme2.spacing(6)
  },
  selected: {
    paddingLeft: theme2.spacing(6),
    backgroundColor: "#e3e3e3"
  }
}));
const PageButton = observer((props) => {
  var _a;
  const { page } = props;
  const classes = useStyles();
  const { uistore, workspacesstore } = useStores();
  const menuItems = [
    {
      label: "Delete",
      onClick: () => {
        uistore.setDeleteTarget(page.data.title, page.onDelete);
      }
    }
  ];
  const selected = ((_a = workspacesstore.selectedWikiPage) == null ? void 0 : _a.id) === page.id;
  return /* @__PURE__ */ react.exports.createElement("li", null, /* @__PURE__ */ react.exports.createElement(ContextMenu, {
    menuItems
  }, /* @__PURE__ */ react.exports.createElement(ListItem, {
    button: true,
    component: Link,
    to: page.link,
    className: selected ? classes.selected : classes.nested
  }, /* @__PURE__ */ react.exports.createElement(ListItemText, {
    primary: page.data.title
  }))));
});
const SectionButton = observer((props) => {
  const { section, open, onClick } = props;
  const form = section.sectionForm;
  const { uistore } = useStores();
  console.log(section.id);
  const menuItems = [
    {
      label: "Delete",
      onClick: () => {
        uistore.setDeleteTarget(section.data.name, () => {
          console.log(section.id);
          section.onDelete();
        });
      }
    }
  ];
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      section.onSubmitNameChange();
    }
  };
  return /* @__PURE__ */ react.exports.createElement(ListItem, null, /* @__PURE__ */ react.exports.createElement(ListItemText, null, /* @__PURE__ */ react.exports.createElement(ContextMenu, {
    menuItems
  }, /* @__PURE__ */ react.exports.createElement(InputBase, {
    value: form.get("name"),
    onChange: form.onChange("name"),
    onKeyDown: handleKeyDown
  }))), /* @__PURE__ */ react.exports.createElement(Tooltip, {
    title: "Add Page To Section",
    "aria-label": "Add Page To Section"
  }, /* @__PURE__ */ react.exports.createElement(IconButton, {
    onClick: section.wikiPages.onAddPage
  }, /* @__PURE__ */ react.exports.createElement(default_1$3, {
    color: "primary"
  }))), /* @__PURE__ */ react.exports.createElement("div", null, /* @__PURE__ */ react.exports.createElement(IconButton, {
    onClick
  }, open ? /* @__PURE__ */ react.exports.createElement(default_1$i, null) : /* @__PURE__ */ react.exports.createElement(default_1$j, null))));
});
const WikiSectionList = observer((props) => {
  var _a;
  const { section } = props;
  const { workspacesstore } = useStores();
  const selected = ((_a = workspacesstore.selectedWikiSection) == null ? void 0 : _a.id) === section.id;
  const pages = section.wikiPages;
  const [open, setOpen] = react.exports.useState(false);
  react.exports.useEffect(() => {
    setOpen(selected || open);
  }, [selected]);
  const onClick = () => {
    setOpen(!open);
  };
  return /* @__PURE__ */ react.exports.createElement(react.exports.Fragment, null, /* @__PURE__ */ react.exports.createElement(SectionButton, {
    section,
    open,
    onClick
  }), /* @__PURE__ */ react.exports.createElement(Collapse, {
    component: "li",
    in: open,
    timeout: "auto",
    unmountOnExit: true
  }, /* @__PURE__ */ react.exports.createElement(List, {
    disablePadding: true
  }, pages.map((page) => {
    return /* @__PURE__ */ react.exports.createElement(PageButton, {
      key: page.id,
      page
    });
  }))));
});
const WikiList = observer((props) => {
  const { workspacesstore } = useStores();
  const workspace = workspacesstore.selectedWorkspace;
  if (!workspace)
    return null;
  const wikiSections = workspace.wikiSections;
  const selectedWikiPage = workspacesstore.selectedWikiPage;
  return /* @__PURE__ */ react.exports.createElement("div", {
    className: style.sidebar
  }, /* @__PURE__ */ react.exports.createElement("div", {
    className: style.topsidebar
  }, /* @__PURE__ */ react.exports.createElement(ListItem, null, /* @__PURE__ */ react.exports.createElement(MUIInput, {
    placeholder: "Search..."
  }), /* @__PURE__ */ react.exports.createElement(Tooltip, {
    title: "Add Section",
    "aria-label": "Add Section"
  }, /* @__PURE__ */ react.exports.createElement(IconButton, {
    onClick: wikiSections.onAddSection
  }, /* @__PURE__ */ react.exports.createElement(default_1$3, {
    color: "primary"
  }))), /* @__PURE__ */ react.exports.createElement(Tooltip, {
    title: "Edit Selected Wiki Page",
    "aria-label": "Edit Selected Wiki Page"
  }, /* @__PURE__ */ react.exports.createElement(IconButton, {
    color: "primary",
    disabled: selectedWikiPage == void 0,
    onClick: () => {
      workspacesstore.wikiEdit = !workspacesstore.wikiEdit;
    }
  }, /* @__PURE__ */ react.exports.createElement(default_1$k, null))))), /* @__PURE__ */ react.exports.createElement(List, null, wikiSections.map((section) => {
    return /* @__PURE__ */ react.exports.createElement(WikiSectionList, {
      key: section.id,
      section
    });
  })));
});
const WikiPages = () => {
  return null;
};
const WikiSections = () => {
  return null;
};
const path = `/w/:wid/wiki/`;
const WikiRoutes = () => {
  return /* @__PURE__ */ react.exports.createElement(WorkspaceWrapperBase, null, /* @__PURE__ */ react.exports.createElement(WikiList, null), /* @__PURE__ */ react.exports.createElement(Switch, null, /* @__PURE__ */ react.exports.createElement(Route, {
    path: `${path}:sectionId/pages/:pageId`,
    component: WikiPage
  }), /* @__PURE__ */ react.exports.createElement(Route, {
    path: `${path}:sectionId/pages`,
    component: WikiPages
  }), /* @__PURE__ */ react.exports.createElement(Route, {
    path: `${path}`,
    component: WikiSections
  })));
};
const App = ({ history: history2 }) => {
  return /* @__PURE__ */ react.exports.createElement(Router, {
    history: history2
  }, /* @__PURE__ */ react.exports.createElement(Switch, null, /* @__PURE__ */ react.exports.createElement(UnauthedRoute, {
    path: "/login",
    component: Login
  }), /* @__PURE__ */ react.exports.createElement(UnauthedRoute, {
    path: "/signup",
    component: Signup
  }), /* @__PURE__ */ react.exports.createElement(UnauthedRoute, {
    path: "/forgotPassword",
    component: ForgotPassword
  }), /* @__PURE__ */ react.exports.createElement(UnauthedRoute, {
    path: "/verify-account",
    component: VerifyAccount
  }), /* @__PURE__ */ react.exports.createElement(UnauthedRoute, {
    path: "/change-password",
    component: ChangePassword
  })), /* @__PURE__ */ react.exports.createElement(AuthGuard, null, /* @__PURE__ */ react.exports.createElement(Switch, null, /* @__PURE__ */ react.exports.createElement(AuthedRoute, {
    path: "/logout",
    component: Logout
  }), /* @__PURE__ */ react.exports.createElement(AuthedRoute, {
    path: "/w/new",
    component: NewWorkspace
  }), /* @__PURE__ */ react.exports.createElement(WorkspacesLoaded, {
    path: "/w/:wid/new",
    component: CreateDeployment
  }), /* @__PURE__ */ react.exports.createElement(WorkspacesLoaded, {
    path: "/w/:wid/wiki",
    component: WikiRoutes
  }), /* @__PURE__ */ react.exports.createElement(WorkspacesLoaded, {
    path: "/w/:wid/metrics",
    component: WorkspaceMetricsPage
  }), /* @__PURE__ */ react.exports.createElement(WorkspacesLoaded, {
    path: "/w/:wid/admin",
    component: WorkspaceAdminRoutes
  }), /* @__PURE__ */ react.exports.createElement(WorkspacesLoaded, {
    path: "/w/:wid/edit",
    component: UpdateWorkspace
  }), /* @__PURE__ */ react.exports.createElement(WorkspacesLoaded, {
    path: "/w/:wid/d/:did/info",
    component: DeploymentInfoPage
  }), /* @__PURE__ */ react.exports.createElement(WorkspacesLoaded, {
    path: "/w/:wid/d/:did/edit",
    component: EditDeployment
  }), /* @__PURE__ */ react.exports.createElement(WorkspacesLoaded, {
    path: "/w/:wid/d/:did/",
    component: DeploymentProxy
  }), /* @__PURE__ */ react.exports.createElement(WorkspacesLoaded, {
    path: "/w/:wid",
    component: WorkspaceHome
  }), /* @__PURE__ */ react.exports.createElement(AuthedRoute, {
    path: "/admin",
    component: AdminRoutes
  }), /* @__PURE__ */ react.exports.createElement(WorkspacesLoaded, {
    path: "/edit-profile",
    component: UserProfile
  }), /* @__PURE__ */ react.exports.createElement(WorkspacesLoaded, {
    path: "/",
    component: WorkspaceRedirect
  }))));
};
const theme = createTheme({
  palette: {
    primary: {
      main: "#2196f3",
      light: "#4dabf5",
      dark: "#1769aa",
      contrastText: "#fff"
    },
    secondary: {
      main: "#ff9100",
      light: "#ffa733",
      dark: "#b26500",
      contrastText: "#000"
    }
  },
  overrides: {
    MuiAvatar: {
      root: {
        backgroundColor: "#ff9100"
      }
    },
    MuiButton: {
      root: {
        margin: "20px"
      }
    }
  }
});
configure({
  isolateGlobalState: true,
  enforceActions: "never"
});
reactDom.exports.render(/* @__PURE__ */ react.exports.createElement(ThemeProvider, {
  theme
}, /* @__PURE__ */ react.exports.createElement(Provider, __spreadValues({}, rootStore.stores), /* @__PURE__ */ react.exports.createElement(App, {
  history
}), /* @__PURE__ */ react.exports.createElement(SnackbarManager, null))), document.getElementById("root"));
