import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import LinksPage from './pages/LinksPage';
import CreatePage from './pages/CreatePage';
import DetailPage from './pages/DetailPage';
import AuthPage from './pages/AuthPage';

export const useRoutes = isAutenticated => {
    if(isAutenticated){
        return (
            <Switch>
                <Route path="/links" exact><LinksPage/></Route>
                <Route path="/create" exact><CreatePage/></Route>
                <Route path="/details/:id" exact><DetailPage/></Route>
                <Redirect to="/create"/>
            </Switch>
        )
    } else {
        return (
            <Switch>
                <Route path="/" exact>
                    <AuthPage/>
                </Route>
                <Redirect to="/" />
            </Switch>
        )
    }
}