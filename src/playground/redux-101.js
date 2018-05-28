import { createStore } from 'redux';

// Action generators (functions that return objects)

const incrementCount = ( {incrementBy = 1} = {} ) => ({
    type: 'INCREMENT',
    incrementBy
});

const decrementCount = ( {decrementBy = 1} = {} ) => ({
    type: 'DECREMENT',
    decrementBy
});

const setCount = ( {count} ) => ({
    type: 'SET',
    count
});

const resetCount = () => ({
    type: 'RESET'
});

// Reducers take actions and change the state

const countReducer = (state = { count: 0 }, action) => {
    console.log('running');

    switch (action.type) {
        case 'INCREMENT':
            return {
                count: state.count + action.incrementBy
            };
        case 'DECREMENT':
            return {
                count: state.count - action.decrementBy
            };
        case 'SET':
            return {
                count: action.count
            }
        case 'RESET':
            return {
                count: 0
            };
        default:
            return state;
    }

}

const store = createStore(countReducer);

// The return value from subscribe()
// is a function that can be used to unsubscribe.
// Subscribe() will run until you call unsubscribe().
const unsubscribe = store.subscribe( () => {
    console.log(store.getState());
});

store.dispatch(incrementCount({ incrementBy: 5}));

store.dispatch(incrementCount());

store.dispatch(decrementCount());

store.dispatch(decrementCount({ decrementBy: 8}));

store.dispatch(resetCount());

store.dispatch(setCount({ count: 101}));