import React from 'react';
import { Menu, MenuItem } from '@material-ui/core';

/**
 * code sourced from https://material-ui.com/components/menus/#context-menu
 */

const initialState = {
  mouseX: null,
  mouseY: null,
};

interface menuItem_i {
  id?: string;
  label: string;
  component?: React.ReactNode;
  onClick: () => any;
}

export const ContextMenu = (props: {
  menuItems: menuItem_i[];
  children: React.ReactNode;
}) => {
  const [state, setState] = React.useState<{
    mouseX: null | number;
    mouseY: null | number;
  }>(initialState);
  const { children, menuItems } = props;
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setState({
      mouseX: e.clientX - 2,
      mouseY: e.clientY - 4,
    });
  };

  const handleClose = () => {
    setState(initialState);
  };

  const onClick = (func: () => any) => {
    return () => {
      func();
      handleClose();
    };
  };

  return (
    <div onContextMenu={handleClick} style={{ cursor: 'context-menu' }}>
      {children}
      <Menu
        keepMounted
        open={state.mouseY !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          state.mouseY !== null && state.mouseX !== null
            ? { top: state.mouseY, left: state.mouseX }
            : undefined
        }
      >
        {menuItems.map((item) => {
          if (item.id) {
            return (
              <MenuItem onClick={onClick(item.onClick)} key={item.label}>
                <span id={item.id}>{item.label}</span>
              </MenuItem>
            );
          } else {
            return (
              <MenuItem onClick={onClick(item.onClick)} key={item.label}>
                {item.label}
              </MenuItem>
            );
          }
        })}
      </Menu>
    </div>
  );
};
