import * as React from 'react'
import { Typography } from '@material-ui/core'

export * from './select'
export * from './TextField'
export * from './Buttons'

export const Label = (props) => {
    return <Typography variant="h6">
        {props.children}
    </Typography>
}