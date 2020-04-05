import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import Dashboard from './pages/Dashboard';
import Store from './redux/Store';
import withAuth from './components/utils/AuthRedirects';

const App = () => (
  <Provider store={Store}>
    <BrowserRouter>
      <Switch>
        <Redirect exact from="/" to="/login"/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/register" component={Register}/>
        <Route exact path="/dashboard" component={withAuth(Dashboard)}/>
        <Route component={NotFound}/>
      </Switch>
    </BrowserRouter>
  </Provider>
)

export default App;
