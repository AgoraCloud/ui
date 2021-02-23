import * as React from 'react'
import { Switch, Route } from "react-router";
import { HomeWrapperBase } from 'app/containers/Home';
import { AddFAB } from 'app/components/Inputs';
import { WikiList } from './List';
import { WORKSPACES_STORE } from 'app/constants';
import { observer, inject } from 'mobx-react';
import { WorkspacesStore } from 'app/stores';
import { Typography } from '@material-ui/core';






export const WikiPage = inject(WORKSPACES_STORE)(observer((props) => {
    // todo get current wiki page
    const store = props[WORKSPACES_STORE] as WorkspacesStore
    const page = store.selectedWiki

    console.log("PAGE", page)

    if(page == undefined){
        return <div>Wiki page not found</div>
    }
    return <div style={{
        display: "inline-block",
        verticalAlign: "top",
        paddingTop: "20px"
    }}>
        <Typography variant="h3">
            {page.title}
        </Typography>
        {page.body}
    </div>
}))

export const WikiPages = () => {
    return <div>
        wiki pages
    </div>
}
export const WikiSections = () => {
    return <div>
        {/* <WikiList/> */}
        <AddFAB link={'wiki.link'}/>
    </div>
}


export const WikiCreateSection = () => {
    return <div>
        create wiki section
    </div>
}

export const WikiCreatePage = () => {
    return <div>
        create wiki page
    </div>
}

const path = `/w/:wid/wiki`
export const WikiRoutes = () => {
    return <HomeWrapperBase>
        <WikiList/>
        <Switch>
            <Route path={`${path}/:sectionId/pages/:pageId/`} component={WikiPage} />
            <Route path={`${path}/:sectionId/pages/new`} component={WikiCreatePage} />
            <Route path={`${path}/:sectionId/pages`} component={WikiPages} />
            <Route path={`${path}/new`} component={WikiCreateSection} />
            <Route path={`${path}/`} component={WikiSections} />
        </Switch>
    </HomeWrapperBase>
}