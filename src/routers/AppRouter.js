// BrowserRouter: Used once
// Route: Used for each page
import React from 'react';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import AddExpensePage from '../components/AddExpensePage';
import EditExpensePage from '../components/EditExpensePage';
import ExpenseDashboardPage from '../components/ExpenseDashboardPage';
import HelpPage from '../components/HelpPage';
import LoginPage from '../components/LoginPage';
import NotFoundPage from '../components/NotFoundPage';
import PrivateRoute from './PrivateRoute';

export const history = createHistory();

const AppRouter = () => (
    <Router history={history}>
        <div>
            <Switch>
                <Route path='/' component={LoginPage} exact={true}  />
                <PrivateRoute path='/dashboard' component={ExpenseDashboardPage} />
                <PrivateRoute path='/create' component={AddExpensePage} />
                <PrivateRoute path='/edit/:id' component={EditExpensePage} />
                <Route path='/help' component={HelpPage} />
                <Route component={NotFoundPage} />
            </Switch>
        </div>
    </Router>
);

// Set equal to some JSX, so put it in parentheses
// For component names, use self-closing tag if no children
// BrowserRouter expects 0 or 1 children, so put all routes in a div
// By default, path matches anything unless exact is set
// One way around that is use Switch component (stops when it finds a match)

export default AppRouter;



// import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';
// BrowserRouter uses the browser history by default
// const AppRouter = () => (
//     <BrowserRouter>
//         <div>
//             <Header />
//             <Switch>
//                 <Route path='/' component={LoginPage} exact={true}  />
//             </Switch>
//         </div>
//     </BrowserRouter>
// );