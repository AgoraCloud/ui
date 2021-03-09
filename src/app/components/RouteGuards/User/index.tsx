import * as React from 'react'
import { observer, inject } from 'mobx-react'
import { USER_STORE } from 'app/constants'
import { UserStore } from 'app/stores'
import { AuthedRoute } from '../Auth'


export const UserLoaded = inject(USER_STORE)(observer((props) => {
    const store = props[USER_STORE] as UserStore
    switch(store.state){
        // case 'unauthed' : return <Redirect to='/login'/>
        case 'loaded' : return <AuthedRoute {...props} />
        default: return null;
        
    }
}))