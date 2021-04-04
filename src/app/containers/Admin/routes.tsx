import * as React from 'react'
import { HomeWrapper } from 'app/containers/Home'
import { Switch } from 'react-router-dom'
import { Route } from 'react-router'
import { Provider} from 'mobx-react'
import { rootStore } from 'app/stores'
import { AdminUsersPage } from './Users'
import { AdminHomePage } from './Home'



const path = '/admin/'

export const AdminRoutes = () => {
    return <HomeWrapper>
        <Provider {...rootStore.adminStores}>
            <Switch>
                <Route path={`${path}users`} component={AdminUsersPage} />
                <Route path={`${path}`} component={AdminHomePage} />
            </Switch>
        </Provider>
    </HomeWrapper>
}