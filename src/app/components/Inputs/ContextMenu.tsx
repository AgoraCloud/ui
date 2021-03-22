import * as React from 'react'
import { Menu, MenuItem } from '@material-ui/core'



const initialState = {
    mouseX: null,
    mouseY: null,
};

interface menuItem_i{
    label: string
    onClick: ()=>any
}

export const ContextMenu = (props: {
    menuItems: menuItem_i[]
    children: React.ReactNode
}) => {
    const [state, setState] = React.useState<{
        mouseX: null | number;
        mouseY: null | number;
      }>(initialState);
    const { children, menuItems } = props
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        setState({
            mouseX: e.clientX - 2,
            mouseY: e.clientY - 4,
        });
    }

    const handleClose = () => {
        setState(initialState);
    }

    const onClick = (func: ()=>any) => {
        return () => {
            func()
            handleClose();
        }
    }

    return <div onContextMenu={handleClick} style={{ cursor: 'context-menu' }}>
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
            {menuItems.map((item)=>{
                return <MenuItem onClick={onClick(item.onClick)} key={item.label}>{item.label}</MenuItem>
            })}
        </Menu>
    </div>
}