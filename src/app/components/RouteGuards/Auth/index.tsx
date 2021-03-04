import * as React from 'react'
import { observer, inject } from 'mobx-react'
import { AUTH_STORE } from 'app/constants'
import { AuthStore } from 'app/stores'
import { Redirect, Route } from 'react-router'


export const AuthedRoute = inject(AUTH_STORE)(observer((props) => {
    const store = props[AUTH_STORE] as AuthStore
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