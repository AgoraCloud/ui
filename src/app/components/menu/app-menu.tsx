import * as React from 'react';
import { TopBar } from './top-bar';
import { SideBar } from './side-bar';

export const AppMenu = (props) => {
  //drawer handlers
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <TopBar open={open} openDrawer={handleDrawerOpen} />
      <SideBar open={open} closeDrawer={handleDrawerClose} />
    </>
  );
};
