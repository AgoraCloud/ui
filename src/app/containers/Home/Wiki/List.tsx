import * as React from 'react'
import * as style from './style.scss'
import { List, ListItem, ListItemText, Collapse, makeStyles, InputBase, IconButton, Input, Tooltip } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { WORKSPACES_STORE, UI_STORE } from 'app/constants'
import { observer, inject } from 'mobx-react'

// icons
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'
import { WorkspacesStore, UIStore } from 'app/stores'
import { WikiSectionModel, WikiPageModel } from 'app/models'
import { ContextMenu } from 'app/components/Inputs/ContextMenu'


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
    selected: {
        paddingLeft: theme.spacing(6),
        backgroundColor: "#e3e3e3"
    }
}));





export const PageButton = inject(UI_STORE)(observer((props: {
    page: WikiPageModel
}) => {
    const { page } = props
    const classes = useStyles()
    const store = props[UI_STORE] as UIStore


    const menuItems = [
        {
            label: 'Delete',
            onClick: () => {store.setDeleteTarget(page.title, page.delete)}
        }
    ]
    
    return <li>
        <ContextMenu menuItems={menuItems}>
            <ListItem button component={Link} to={page.link} className={page.selected ? classes.selected : classes.nested}>
                <ListItemText primary={page.title} />
            </ListItem>
        </ContextMenu>

    </li>
}))

export const SectionButton = observer((props: {
    section: WikiSectionModel
    open: boolean
    onClick: () => any
}) => {
    const { section, open, onClick } = props

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            section.onSubmitNameChange()
        }
    }
    return (
        <ListItem>
            <ListItemText>
                <InputBase value={section.editableName} onChange={section.onNameChange} onKeyDown={handleKeyDown} />
            </ListItemText>
            <Tooltip title="Add Page To Section" aria-label="Add Page To Section">
                <IconButton onClick={section.onAddPage}>
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
})

export const WikiSectionList = observer((props: {
    section: WikiSectionModel
}) => {
    const { section } = props
    const pages = section.wikiPages
    const [open, setOpen] = React.useState(false)
    React.useEffect(()=>{
        setOpen(section.selected || open)
    }, [section.selected])
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
})


export const WikiList = inject(WORKSPACES_STORE)(observer((props) => {
    const store = props[WORKSPACES_STORE] as WorkspacesStore

    const wikiSections = store.selectedWorkspace.wikiSections
    const selectedWiki = store.selectedWiki
    return <div className={style.sidebar}>
        <div className={style.topsidebar}>
            <ListItem>
                <Input placeholder="Search..." />
                <Tooltip title="Add Section" aria-label="Add Section">
                    <IconButton onClick={wikiSections.onAddSection}>
                        <AddIcon color="primary" />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Edit Selected Wiki Page" aria-label="Edit Selected Wiki Page">
                    <IconButton color="primary" disabled={selectedWiki == undefined} onClick={() => {
                        store.wikiEdit = !store.wikiEdit
                    }}>
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