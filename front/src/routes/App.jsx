import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from '../Pages/Home';
import Login from '../Pages/LogIn';
import RegisterPage from '../Pages/RegisterPage';
import OverView from '../Pages/OverView';
import PrivateRoute from './PrivateRoute'
import Favorite from '../Pages/Favorite';
import CountryWeather from '../Pages/CountryWeather';
import NotFound from '../Pages/NotFound';
import { AuthProvider } from '../context/AuthContext';
import Layout from '../components/Layout';

const preloadedState = window.__PRELOADED_STATE__;
console.log(`preloadedState`, preloadedState)
const App = (props) => {
 return (
     <Router>
        <AuthProvider>
            <Layout>
                <Switch>
                    <Route exact path="/" component={OverView} />
                    <PrivateRoute exact path="/home" component={Home} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={RegisterPage} />
                    <PrivateRoute exact path="/cityWeather/:id/:name" component={CountryWeather} />
                    <PrivateRoute exact path="/favorite" component={Favorite} />
                    <Route component={NotFound} />
                </Switch>
            </Layout>
        </AuthProvider>
     </Router>
 )
}
export default App