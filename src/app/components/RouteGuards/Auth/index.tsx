import * as React from 'react'
import { observer, inject } from 'mobx-react'
import { AUTH_STORE, ROUTER_STORE } from 'app/constants'
import { AuthStore, RouterStore } from 'app/stores'
import { Redirect, Route } from 'react-router'


export const AuthedRoute = inject(AUTH_STORE, ROUTER_STORE)(observer((props) => {
    const store = props[AUTH_STORE] as AuthStore
    const routerStore = props[ROUTER_STORE] as RouterStore

    if(props.path === "/w/new"){
        routerStore.selected = 3
    } else if (props.path.includes("/admin")){
        routerStore.selected = 6
    }

    switch(store.state){
        case 'unauthed' : return <Redirect to='/login'/>
        case 'loggedin' : return <Route {...props} />
        default: return null;
    }
}))

export const UnauthedRoute = inject(AUTH_STORE)(observer((props) => {
    const store = props[AUTH_STORE] as AuthStore
    console.log({...props});
    switch(store.state){
        case 'loggedin' : return <Redirect to='/'/>
        case 'unauthed' : return <Route {...props} />
        default: return null;
    }
}))