import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { startLogout } from '../actions/auth';

export const Header = ({ startLogout }) => (
    <header>
        <h1>Expensify</h1>
        <NavLink to='/dashboard' activeClassName='is-active'>
            Dashboard
        </NavLink>
         | 
        <NavLink to='/create' activeClassName='is-active'>
            Create Expense
        </NavLink>
        <button onClick={startLogout}>Logout</button>
    </header>
)

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(Header);

/*
<NavLink to='/' activeClassName='is-active' exact={true}>
The "exact={true}" prop is needed to go to the homepage
because otherwise to='/' will match any route
starting with that string.
*/