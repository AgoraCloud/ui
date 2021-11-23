import * as React from 'react';
import { TopBar, WorkspaceTopBar } from './TopBar';
import { SideBar, WorkspaceSideBar } from './SideBar';
import { useStores } from 'app/stores';

export const WorkspaceAppMenu = () => {
  return (
    <>
      <WorkspaceTopBar />
      <WorkspaceSideBar />
    </>
  );
};

export const AppMenu = () => {
  const { workspacesstore } = useStores();
  if (workspacesstore.selectedWorkspace == undefined) {
    return (
      <>
        <TopBar />
        <SideBar />
      </>
    );
  }
  return <WorkspaceAppMenu />;
};
