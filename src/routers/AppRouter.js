import React from 'react';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import DashboardPage from '../components/DashboardPage';
import AddRecipePage from '../components/AddRecipePage';
import EditRecipePage from '../components/EditRecipePage';
import ViewRecipePage from '../components/ViewRecipePage';
import NotFoundPage from '../components/NotFoundPage';
import LoginPage from '../components/LoginPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <PublicRoute path="/" component={LoginPage} exact={true} />
        <PrivateRoute path="/dashboard" component={DashboardPage} />
        <PrivateRoute path="/addRecipe" component={AddRecipePage} />
        <PrivateRoute path="/editRecipe/:id" component={EditRecipePage} />
        <PrivateRoute path="/recipe/:id" component={ViewRecipePage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
