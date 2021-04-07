import * as React from 'react'
import { observer, inject } from 'mobx-react'
import { WORKSPACES_STORE } from 'app/constants'
import { WorkspacesStore } from 'app/stores'
import { AuthedRoute } from '../Auth'
import { Redirect } from 'react-router'


export const WorkspacesLoaded = inject(WORKSPACES_STORE)(observer((props) => {
    const store = props[WORKSPACES_STORE] as WorkspacesStore
    const workspaces = store.workspaces
    // switch(workspaces.state){
    //     // case 'unauthed' : return <Redirect to='/login'/>
    //     case 'reloading' : return <AuthedRoute {...props} />
    //     case 'loaded' : return <AuthedRoute {...props} />
    //     default: return null;
    // }
    // || store.state == 'reloading'
    if(store.state == 'loaded' ){
        const wid = store.workspaces?.workspaces[0]?.id
        if(!wid){
            return <Redirect to={`/w/new`}/>
        } else {
            return <AuthedRoute {...props} />
        }
    } else {
        return null
    }

    // switch(store.state){
    //     // case 'unauthed' : return <Redirect to='/login'/>
    //     case 'loaded' : return <AuthedRoute {...props} />
    //     default: return null;
    // }
}))

export const DeploymentLoaded = inject(WORKSPACES_STORE)(observer((props)=>{
    const store = props[WORKSPACES_STORE] as WorkspacesStore
    const workspace = store.selectedWorkspace
    if(workspace == undefined) return null
    switch(workspace.deployments.state){
        // case 'unauthed' : return <Redirect to='/login'/>
        case 'reloading' : return <AuthedRoute {...props} />
        case 'loaded' : return <AuthedRoute {...props} />
        default: return null;
    }
}))

export const ProjectsLoaded = inject(WORKSPACES_STORE)(observer((props)=>{
    const store = props[WORKSPACES_STORE] as WorkspacesStore
    const workspace = store.selectedWorkspace

    if(workspace == undefined) return null
    switch(workspace.projects.state){
        // case 'unauthed' : return <Redirect to='/login'/>
        case 'reloading' : return <AuthedRoute {...props} />
        case 'loaded' : return <AuthedRoute {...props} />
        default: return null;
    }
}))

export const WikiLoaded = inject(WORKSPACES_STORE)(observer((props)=>{
    const store = props[WORKSPACES_STORE] as WorkspacesStore
    const workspace = store.selectedWorkspace
    if(workspace == undefined) return null
    switch(workspace.wikiSections.state){
        // case 'unauthed' : return <Redirect to='/login'/>
        case 'reloading' : return <AuthedRoute {...props} />
        case 'loaded' : return <AuthedRoute {...props} />
        default: return null;
    }
}))

export const LanesLoaded = inject(WORKSPACES_STORE)(observer((props)=>{
    const store = props[WORKSPACES_STORE] as WorkspacesStore
    const workspace = store.selectedWorkspace
    
    if(workspace == undefined) return null
    switch(workspace.projects.state){
        case 'loaded' : 
            const project = store.selectedProject
            if(project == undefined){
                console.log('PROJECT UNDEFINED')
                return null
            }
            // const lane = project.lanes.lanes[0]
            // if(!lane) {
            //     console.log('LANE UNDEFINED')
            //     return null
            // }
            switch(project.lanes.state){
                // case 'unauthed' : return <Redirect to='/login'/>
                case 'loaded' : return <AuthedRoute {...props} />
                default: return null;
            }
        default: return null;
    }  

}))