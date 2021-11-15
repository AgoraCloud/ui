import * as React from 'react';
import { Redirect } from 'react-router';
import { observer } from 'mobx-react';
import { useStores } from 'app/stores';

export const WorkspaceRedirect = observer((props) => {
  const { workspacesstore } = useStores();
  const { workspaces } = workspacesstore;
  console.log('WorkspaceRedirect', workspaces);
  if (workspaces.state != 'loaded') {
    return null;
  }
  const workspace = workspacesstore.selectedWorkspace;
  if (workspace) return <Redirect to={workspace.link} />;
  return <Redirect to={`/w/new`} />;
  // return null
});
