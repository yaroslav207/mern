import React from 'react'
import {useRoutes} from './routes'
import {AuthContext} from './context/AuthContext'
import {useAuth} from './hooks/auth.hook'
import "materialize-css"
import {Navbar} from './components/Navbar'
import {Loader} from './components/Loader'


function App() {
    const {login, logout, token, userId, ready} = useAuth()
    const isAuthenticated = !!token
    console.log(isAuthenticated)
    const routes = useRoutes(isAuthenticated);

    if (!ready){
        return <Loader/>
    }
    return (
        <AuthContext.Provider value={{login, logout, token, userId}}>
            {isAuthenticated && <Navbar />}

                <div className="container">
                    {routes}
                </div>

        </AuthContext.Provider>
    );
}

export default App;
