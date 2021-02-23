import * as React from 'react'
import * as style from './style.scss'
import { List, ListItem, ListItemText, Collapse, makeStyles, InputBase, IconButton, Input, Tooltip } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { WORKSPACES_STORE } from 'app/constants'
import { observer, inject } from 'mobx-react'

// icons
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'
import { WorkspacesStore } from 'app/stores'
import { WikiPages, WikiSection, WikiPage } from 'app/models'


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        width: 360,
    },
    lists: {
        backgroundColor: theme.palette.background.paper,
        marginTop: theme.spacing(1),
    },
    nested: {
        paddingLeft: theme.spacing(6),
    },
}));


export const PageButton = (props: {
    page: WikiPage
}) => {
    const { page } = props
    const classes = useStyles()
    return <li>
        <ListItem button component={Link} to={page.link} className={classes.nested}>
            <ListItemText primary={page.title} />
        </ListItem>
    </li>
}

export const SectionButton = (props: {
    section: WikiSection
    open: boolean
    onClick: () => any
}) => {
    const { section, open, onClick } = props
    return (
        <ListItem>
            <ListItemText>
                <InputBase value={section.name} />
            </ListItemText>
            <Tooltip title="Add Page To Section" aria-label="Add Page To Section">
                <IconButton>
                    <AddIcon color="primary" />
                </IconButton>
            </Tooltip>
            <div>
                <IconButton onClick={onClick}>
                    {open ? <ExpandMore /> : <ExpandLess />}
                </IconButton>
            </div>
        </ListItem>
    );
}

export const WikiSectionList = (props: {
    section: WikiSection
}) => {
    const { section } = props
    const pages = section.wikiPages
    const [open, setOpen] = React.useState(false)
    const onClick = () => {
        setOpen(!open)
    }
    return <>
        <SectionButton section={section} open={open} onClick={onClick} />
        <Collapse component="li" in={open} timeout="auto" unmountOnExit>
            <List disablePadding>
                {pages?.pages.map((page) => {
                    return <PageButton key={page.id} page={page} />
                })}
            </List>
        </Collapse>
    </>
}


export const WikiList = inject(WORKSPACES_STORE)(observer((props) => {
    const store = props[WORKSPACES_STORE] as WorkspacesStore

    const wikiSections = store.selectedWorkspace.wikiSections
    const selectedWiki = store.selectedWiki
    return <div className={style.sidebar}>
        <div className={style.topsidebar}>
            <ListItem>
                <Input placeholder="Search..." />
                <Tooltip title="Add Section" aria-label="Add Section">
                    <IconButton>
                        <AddIcon color="primary" />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Edit Selected Wiki Page" aria-label="Edit Selected Wiki Page">
                    <IconButton color="primary" disabled={selectedWiki == undefined}>
                        <EditIcon />
                    </IconButton>
                </Tooltip>
            </ListItem>
        </div>

        <List>
            {wikiSections?.sections.map((section) => {
                return <WikiSectionList key={section.id} section={section} />
            })}
        </List>
    </div>
}))