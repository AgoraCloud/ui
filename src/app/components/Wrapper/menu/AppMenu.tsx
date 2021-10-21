import * as React from 'react';
import { TopBar, WorkspaceTopBar } from './TopBar';
import { SideBar, WorkspaceSideBar } from './SideBar';

export const WorkspaceAppMenu = () => {
  return (
    <>
      <WorkspaceTopBar/>
      <WorkspaceSideBar/>
    </>
  );
};

export const AppMenu = () => {
  return (
    <>
      <TopBar/>
      <SideBar/>
    </>
  );
};



