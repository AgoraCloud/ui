import * as React from 'react'
import { Deployment } from 'app/models'
import Card from '@material-ui/core/Card'
import { Typography, Chip, Grid } from '@material-ui/core'

import MemoryIcon from '@material-ui/icons/Memory';
import MoneyIcon from '@material-ui/icons/Money';
import StorageIcon from '@material-ui/icons/Storage';
import { LinkButton, MoreMenu } from 'app/components/Inputs'
import { inject, observer } from 'mobx-react'
import { ROUTER_STORE, UI_STORE } from 'app/constants'
import { RouterStore } from 'app/stores'
import { UIStore } from 'app/stores/UIStore';

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
        to={deployment.link}
        disabled={deployment.status !== 'RUNNING'}
        >
        Launch 🚀
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
}


export const DeploymentMenu = inject(ROUTER_STORE, UI_STORE)(observer((props: {
    deployment: Deployment
}) => {
    const { deployment } = props
    const store = props[ROUTER_STORE] as RouterStore
    const uistore = props[UI_STORE] as UIStore
    return <div style={{
        position: "absolute",
        top: "2%",
        right: "2%"
    }}>
        <MoreMenu options={[
            {
                name: "Edit",
                onClick: () => {
                    store.push(deployment.link + 'edit/')
                }
            },
            {
                name: "Info",
                onClick: () => {
                    store.push(deployment.link + 'info/')
                }
            },
            {
                name: "Delete",
                onClick: () => {
                    // deployment.delete()
                    uistore.setDeleteTarget(deployment.name, deployment.delete)
                }
            }
        ]} />
    </div>
}))

export const DeploymentCard = (props: {
    deployment: Deployment
}) => {
    const { deployment } = props
    return <Card style={{
        width: "100%",
        minWidth: "333px",
        maxWidth: "333px",
        height: "256px",
        padding: "20px",
        position: "relative"
    }}>
        <Typography variant="h4" color="primary" noWrap>
            {deployment.name}
        </Typography>
        <DeploymentMenu deployment={deployment} />
        <DeploymentChip deployment={deployment} />
        <DeploymentResources deployment={deployment} />
        <DeploymentLaunch deployment={deployment} />
        {/* {JSON.stringify(deployment.data, null, 2)} */}
    </Card>
}