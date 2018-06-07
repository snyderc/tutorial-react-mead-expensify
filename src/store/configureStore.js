// createStore/combineReducers are Redux imports

import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import expensesReducer from '../reducers/expenses';
import filtersReducer from '../reducers/filters';
import authReducer from '../reducers/auth';

// To allow use of devtools & middleware simultaneously
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Store Creation
export default () => {
    const store = createStore(
        combineReducers(
            {
                expenses: expensesReducer,
                filters: filtersReducer,
                auth: authReducer
            }
        ),
        composeEnhancers(applyMiddleware(thunk))
        // The below line used to be relevant before we started using middleware.
        // Was replaced with composeEnhancers() syntax 
        // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
    return store;
}