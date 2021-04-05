export enum Role {
  User = 'user',
  SuperAdmin = 'super_admin',
  WorkspaceAdmin = 'workspace_admin',
}

export let roles:any = [] 
for(const key in Role){
  roles.push({label: key, value:Role[key]})
}

export enum Action {
    // User Actions
    ManageUser = 'users:manage',
    // Workspace Actions
    ManageWorkspace = 'workspaces:manage',
    CreateWorkspace = 'workspaces:create',
    ReadWorkspace = 'workspaces:read',
    UpdateWorkspace = 'workspaces:update',
    DeleteWorkspace = 'workspaces:delete',
    // Deployment Actions
    CreateDeployment = 'deployments:create',
    ReadDeployment = 'deployments:read',
    ProxyDeployment = 'deployments:proxy',
    UpdateDeployment = 'deployments:update',
    DeleteDeployment = 'deployments:delete',
    // Wiki Actions
    CreateWiki = 'wiki:create',
    ReadWiki = 'wiki:read',
    UpdateWiki = 'wiki:update',
    DeleteWiki = 'wiki:delete',
    // Wiki Section Actions
    CreateWikiSection = 'wiki_sections:create',
    ReadWikiSection = 'wiki_sections:read',
    UpdateWikiSection = 'wiki_sections:update',
    DeleteWikiSection = 'wiki_sections:delete',
    // Wiki Page Actions
    CreateWikiPage = 'wiki_pages:create',
    ReadWikiPage = 'wiki_pages:read',
    UpdateWikiPage = 'wiki_pages:update',
    DeleteWikiPage = 'wiki_pages:delete',
    // Project Actions
    CreateProject = 'projects:create',
    ReadProject = 'projects:read',
    UpdateProject = 'projects:update',
    DeleteProject = 'projects:delete',
    // Project Lane Actions
    CreateProjectLane = 'project_lanes:create',
    ReadProjectLane = 'project_lanes:read',
    UpdateProjectLane = 'project_lanes:update',
    DeleteProjectLane = 'project_lanes:delete',
    // Project Task Actions
    CreateProjectTask = 'project_tasks:create',
    ReadProjectTask = 'project_tasks:read',
    UpdateProjectTask = 'project_tasks:update',
    DeleteProjectTask = 'project_tasks:delete',
  }