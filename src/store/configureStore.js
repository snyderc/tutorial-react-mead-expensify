// createStore/combineReducers are Redux imports

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import expensesReducer from '../reducers/expenses';
import filtersReducer from '../reducers/filters';
import thunk from 'redux-thunk';

// To allow use of devtools & middleware simultaneously
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Store Creation
export default () => {
    const store = createStore(
        combineReducers(
            {
                expenses: expensesReducer,
                filters: filtersReducer
            }
        ),
        composeEnhancers(applyMiddleware(thunk))
        // The below line used to be relevant before we started using middleware.
        // Was replaced with composeEnhancers() syntax 
        // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
    return store;
}