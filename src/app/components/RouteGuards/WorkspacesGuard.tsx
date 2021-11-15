import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { WORKSPACES_STORE } from 'app/constants';
import { AuthedRoute } from './AuthGuards';
import { useStores } from 'app/stores';
import { Redirect, Route } from 'react-router';
import { LoadingPage } from '../LoadingPage';

export const WorkspacesLoaded = (props) => {
  return (
    <AuthedRoute
      {...props}
      component={observer(() => {
        const { workspacesstore } = useStores();
        const workspaces = workspacesstore.workspaces;
        console.log('workspacesloaded', workspaces.state);
        if (workspaces.state == 'loading') return <LoadingPage />;
        if (workspaces.state == 'loaded') {
          const wid = workspacesstore.selectedWorkspace?.id;
          if (!wid) {
            return <Redirect to={`/w/new`} />;
            // return null;
          } else {
            return <AuthedRoute {...props} />;
          }
        } else {
          return null;
        }
      })}
    />
  );
};

export const DeploymentLoaded = observer((props) => {
  const { workspacesstore } = useStores();
  const workspace = workspacesstore.selectedWorkspace;

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
  const workspace = workspacesstore.selectedWorkspace;

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
    const workspace = workspacesstore.selectedWorkspace;

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

// export const LanesLoaded = observer((props) => {
//   const { workspacesstore } = useStores();
//   const workspace = workspacesstore.selectedWorkspace;

//   if (workspace == undefined) return null;
//   return null
//   switch (workspace.projects.state) {
//     // case 'loaded':
//     // const project = workspacesstore.selectedProject;
//     //   if (project == undefined) {
//     //     console.log('PROJECT UNDEFINED');
//     //     return null;
//     //   }
//     //   switch (project.lanes.state) {
//     //     // case 'unauthed' : return <Redirect to='/login'/>
//     //     case 'loaded':
//     //       return <AuthedRoute {...props} />;
//     //     default:
//     //       return null;
//     //   }
//     // default:
//     //   return null;
//   }
// });
