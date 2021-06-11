import * as React from 'react';
import { TopBar } from 'app/components/TopBar';
import { SideBar } from 'app/components/SideBar';

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
