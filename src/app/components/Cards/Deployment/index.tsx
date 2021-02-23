import * as React from 'react'
import { Deployment } from 'app/models'
import Card from '@material-ui/core/Card'
import { Typography, Chip, Button, Grid, Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core'
import { Link } from 'react-router-dom'

import MemoryIcon from '@material-ui/icons/Memory';
import MoneyIcon from '@material-ui/icons/Money';
import StorageIcon from '@material-ui/icons/Storage';
import { LinkButton } from 'app/components/Inputs'

const chips = {
    'FAILED': <Chip style={{ backgroundColor: 'red' }} label="Error" />,
    'SUCCESS': <Chip style={{ backgroundColor: 'red' }} label="Error" />,
    'STARTING': <Chip style={{ backgroundColor: 'red' }} label="Error" />,
    'PENDING': <Chip color="secondary" label="PENDING" />,
    'CREATING': <Chip color="secondary" label="CREATING" />,
    'RUNNING': <Chip color="primary" label="RUNNING" />,
    'UPDATING': <Chip color="secondary" label="UPDATING" />,
    'DELETING': <Chip style={{ backgroundColor: 'red' }} label="DELETING" />,
    'UNKNOWN': <Chip style={{ backgroundColor: 'purple' }} label="UNKNOWN" />,

}
export const DeploymentChip = (props: {
    deployment: Deployment
}) => {

    const { deployment } = props
    return <div style={{ paddingTop: "15px" }}>
        {chips[deployment.status] || null}
    </div>
}

export const DeploymentLaunch = (props: {
    deployment: Deployment
}) => {
    const { deployment } = props
    return <LinkButton
        variant="contained"
        color="primary"
        style={{ bottom: 3, right: 3, position: "absolute" }}
        to={deployment.link}>
        Launch
    </LinkButton>
}

export const DeploymentResources = (props: {
    deployment: Deployment
}) => {
    const { deployment } = props
    const { cpuCount, memoryCount, storageCount } = deployment
    return <Grid container style={{ paddingTop: "20px" }}>
        <Grid item xs={4}>
            <Chip icon={<MemoryIcon />} label={"CPU: " + cpuCount} />
        </Grid>
        <Grid item xs={4}>
            <Chip icon={<MoneyIcon />} label={"RAM:" + memoryCount} />
        </Grid>
        <Grid item xs={4}>
            <Chip icon={<StorageIcon />} label={"Storage: " + storageCount} />
        </Grid>
    </Grid>
    // return <div>
    //     <Table size="small">
    //         <TableHead>
    //             <TableRow>
    //                 <TableCell>CPU</TableCell>
    //                 <TableCell>RAM</TableCell>
    //                 <TableCell>STORAGE</TableCell>
    //             </TableRow>
    //         </TableHead>
    //         <TableBody>
    //             <TableRow>
    //                 <TableCell>{cpuCount}</TableCell>
    //                 <TableCell>{memoryCount}</TableCell>
    //                 <TableCell>{storageCount}</TableCell>
    //             </TableRow>
    //         </TableBody>
    //     </Table>
    // </div>
}

export const DeploymentCard = (props: {
    deployment: Deployment
}) => {
    const { deployment } = props
    return <Card style={{
        width: "100%",
        height: "256px",
        padding: "20px",
        position: "relative"
    }}>
        <Typography variant="h4" color="primary">
            {deployment.name}
        </Typography>
        <DeploymentChip deployment={deployment} />
        <DeploymentResources deployment={deployment} />
        <DeploymentLaunch deployment={deployment} />
        {/* {JSON.stringify(deployment.data, null, 2)} */}
    </Card>
}