import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import Dashboard from './pages/Dashboard';
import store, { persistor } from './redux/Store';
import withAuth from './components/utils/AuthRedirects';
import { PersistGate } from 'redux-persist/integration/react';

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Switch>
          <Redirect exact from="/" to="/login"/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/register" component={Register}/>
          <Route exact path="/dashboard" component={withAuth(Dashboard)}/>
          <Route component={NotFound}/>
        </Switch>
      </BrowserRouter>
    </PersistGate>
  </Provider>
)

export default App;
