import * as React from 'react'
import { Fab, Button, ButtonProps, Grid } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react'
import { ROUTER_STORE } from 'app/constants'
import { RouterStore } from 'app/stores';
import { BaseFormModel } from 'app/forms';



export const BaseFAB = (props: {
    onClick: () => any
    children: React.ReactElement
}) => {
    const {onClick, children} = props
    return <Fab color="secondary" aria-label="add" style={{
        position: "absolute",
        bottom: "40px",
        right: "50px"
    }}
        onClick={onClick}
    >
        {children}
    </Fab>
}

export const AddFAB = inject(ROUTER_STORE)(observer((props: {
    link: string
}) => {
    const store = props[ROUTER_STORE] as RouterStore
    const {link} = props
    return <BaseFAB
        onClick={() => {
            store.push(link)
        }}
    >
        <AddIcon />
    </BaseFAB>
}))



interface LinkButtonProps extends ButtonProps {
    to: string
}
export const LinkButton = (props: LinkButtonProps) => {
    return <Button
        variant="contained"
        color="primary"
        style={{ bottom: 3, right: 3, position: "absolute" }}
        component={Link} {...props}>
        {props.children}
    </Button>
}



export const CancelCreateButtons = observer((props: {
    form: BaseFormModel<any,any>
    cancel: () => any
    submit: () => any
}) => {
    const {form, cancel, submit} = props
    // console.log("isValid2", form.isValid)
    
    const {isValid} = form
    return <div style={{float: 'right'}}>
        <Button onClick={cancel} color="primary">
            Cancel
        </Button>

        {/*  */}
        {/* fix the forms before doing this */}
        <Button onClick={submit} disabled={!isValid} color="primary">
            Create
        </Button>
    </div>
})