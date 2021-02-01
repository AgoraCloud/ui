import * as React from 'react'
import { Deployment } from 'app/models'
import Card from '@material-ui/core/Card'


export const DeploymentCard = (props: {
    deployment: Deployment
}) => {
    const { deployment } = props
    return <Card>
        {deployment.name}
        <br/>
        {deployment._id}
        <br/>
        {JSON.stringify(deployment.data, null, 2)}
    </Card>
}