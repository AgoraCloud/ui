import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { WORKSPACES_STORE, ROUTER_STORE } from 'app/constants';
import { WorkspacesStore, RouterStore } from 'app/stores';
import { AuthedRoute } from '../auth';
import { Redirect } from 'react-router';
import { useStores } from 'app/stores/use-store';

export const WorkspacesLoaded = observer((props) => {
  const { workspacesstore } = useStores();
  const workspaces = workspacesstore.newWorkspaces;

  console.log(workspaces.state);

  if (workspaces.state == 'loaded') {
    const wid = workspaces.selectedWorkspace.id;
    if (!wid) {
      return <Redirect to={`/w/new`} />;
    } else {
      return <AuthedRoute {...props} />;
    }
  } else {
    return null;
  }
});

export const DeploymentLoaded = observer((props) => {
  const { workspacesstore } = useStores();
  const workspace = workspacesstore.newWorkspaces.selectedWorkspace;

  if (workspace == undefined) return null;
  switch (workspace.deployments.state) {
    // case 'unauthed' : return <Redirect to='/login'/>
    case 'reloading':
      return <AuthedRoute {...props} />;
    case 'loaded':
      return <AuthedRoute {...props} />;
    default:
      return null;
  }
});

export const ProjectsLoaded = observer((props) => {
  const { workspacesstore } = useStores();
  const workspace = workspacesstore.newWorkspaces.selectedWorkspace;

  if (workspace == undefined) return null;
  switch (workspace.projects.state) {
    // case 'unauthed' : return <Redirect to='/login'/>
    case 'reloading':
      return <AuthedRoute {...props} />;
    case 'loaded':
      return <AuthedRoute {...props} />;
    default:
      return null;
  }
});

export const WikiLoaded = inject(WORKSPACES_STORE)(
  observer((props) => {
    const { workspacesstore } = useStores();
    const workspace = workspacesstore.newWorkspaces.selectedWorkspace;

    if (workspace == undefined) return null;
    switch (workspace.wikiSections.state) {
      // case 'unauthed' : return <Redirect to='/login'/>
      case 'reloading':
        return <AuthedRoute {...props} />;
      case 'loaded':
        return <AuthedRoute {...props} />;
      default:
        return null;
    }
  }),
);

export const LanesLoaded = observer((props) => {
  const { workspacesstore } = useStores();
  const workspace = workspacesstore.newWorkspaces.selectedWorkspace;

  if (workspace == undefined) return null;
  switch (workspace.projects.state) {
    case 'loaded':
      const project = workspacesstore.selectedProject;
      if (project == undefined) {
        console.log('PROJECT UNDEFINED');
        return null;
      }
      switch (project.lanes.state) {
        // case 'unauthed' : return <Redirect to='/login'/>
        case 'loaded':
          return <AuthedRoute {...props} />;
        default:
          return null;
      }
    default:
      return null;
  }
});
