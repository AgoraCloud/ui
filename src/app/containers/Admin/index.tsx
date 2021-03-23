import * as React from 'react'
import { HomeWrapperBase } from 'app/containers/Home'
import { Switch } from 'react-router-dom'
import { Route } from 'react-router'
import { Provider } from 'mobx-react'
import { rootStore } from 'app/stores'




export const AdminUsersPage = () => {
    return <div>
        admin users page
    </div>
}

export const AdminPage = () => {
    return <div>
        admin home page
    </div>
}


const path = '/admin/'

export const AdminRoutes = () => {
    return <HomeWrapperBase>
        <Provider {...rootStore.adminStores}>
            <Switch>
                <Route path={`${path}users`} component={AdminUsersPage}/>
                <Route path={`${path}`} component={AdminPage}/>
            </Switch>
        </Provider>
    </HomeWrapperBase>
}