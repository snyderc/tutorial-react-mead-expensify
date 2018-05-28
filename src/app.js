import React from 'react';
import ReactDOM from 'react-dom';

import 'react-dates/initialize'

import { Provider } from 'react-redux';

import AppRouter from './routers/AppRouter';

import configureStore from './store/configureStore';

import { addExpense } from './actions/expenses';
import { setTextFilter } from './actions/filters';
import getVisibleExpenses from './selectors/expenses';

import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';

const store = configureStore();

// addExpense -> Water bill
// addExpense -> Gas bill
// setTextFilter -> "bill" (2 items)
// getVisibleExpenses & print to screen

store.dispatch(addExpense( {
    description: 'Water bill',
    amount: 500,
    createdAt: 15000
}));

store.dispatch(addExpense( {
    description: 'Gas bill',
    amount: 250,
    createdAt: 1527259860163
}));

store.dispatch(addExpense( {
    description: 'Rent',
    amount: 10950,
    createdAt: 5
}));

// store.dispatch(setTextFilter('bill'));

// setTimeout( () => {
//     store.dispatch(setTextFilter('rent'));
// }, 3000);

const state = store.getState();
console.log(getVisibleExpenses(state.expenses, state.filters));

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));
