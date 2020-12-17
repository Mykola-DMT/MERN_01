import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {FilmsPage} from "./pages/Films/FilmsPage"
import {CreateFilmPage} from "./pages/Films/CreateFilmPage"
import {AuthPage} from "./pages/AuthPage"
import {HomePage} from "./pages/HomePage"
import {DetailsFilmPage} from "./pages/Films/DetailsFilmPage"
import {EditFilmPage} from './pages/Films/EditFilmPage'
import {UserPage} from './pages/User/UserPage'

export const useRoutes = isAuthenticated =>{
    if(isAuthenticated){
        return (
            <Switch>
                <Route path='/film' exact>
                    <FilmsPage />
                </Route>
                <Route path='/film/add' exact>
                    <CreateFilmPage/>
                </Route>
                <Route path="/film/:id" exact>
                    <DetailsFilmPage/>
                </Route>
                <Route path="/film/:id/edit" exact>
                    <EditFilmPage/>
                </Route>
                <Route path='/home'>
                    <HomePage />
                </Route>
                <Route path='/profile'>
                    <UserPage />
                </Route>
                <Redirect to="/home"/>

            </Switch>
        )
    }

    return (
        <Switch>
            <Route path="/" exact>
                <AuthPage/>
            </Route>
            <Redirect to="/"/>
        </Switch>
    )
}
