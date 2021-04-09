import * as React from 'react'
import { observer, inject } from 'mobx-react'
import { AUTH_STORE, USER_STORE } from 'app/constants'
import { AuthStore, UserStore } from 'app/stores'
import { Redirect, Route } from 'react-router'


export const AuthedRoute = inject(AUTH_STORE, USER_STORE)(observer((props) => {
    const store = props[AUTH_STORE] as AuthStore
    const userStore = props[USER_STORE] as UserStore

    if(store.state == 'unauthed') return <Redirect to='/login'/>
    if(userStore.state != 'loaded') return null
    
    switch(store.state){
        // case 'unauthed' : return <Redirect to='/login'/>
        case 'loggedin' : return <Route {...props} />
        default: return null;
    }
}))

export const UnauthedRoute = inject(AUTH_STORE, USER_STORE)(observer((props) => {
    const store = props[AUTH_STORE] as AuthStore
    // const userStore = props[USER_STORE] as UserStore
    // if(userStore.state != 'loaded') return null
    switch(store.state){
        case 'loggedin' : return <Redirect to='/'/>
        case 'unauthed' : return <Route {...props} />
        default: return null;
    }
}))