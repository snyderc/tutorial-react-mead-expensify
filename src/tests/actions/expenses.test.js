import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { 
    addExpense, 
    startAddExpense, 
    removeExpense, 
    startRemoveExpense, 
    editExpense,
    startEditExpense, 
    setExpenses, 
    startSetExpenses
} from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

// Creating config so test cases can create a mock store
// pass in middleware to configureMockStore() as an array of middleware
const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
    const expensesData = {};
    expenses.forEach( ({id, description, note, amount, createdAt}) => {
        expensesData[id] = { description, note, amount, createdAt };
    });
    database.ref('expenses').set(expensesData).then( () => done() );
});

test('should setup remove expense action object', () => {
    const action = removeExpense({ id: '123abc' });
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    });
});

test('should setup edit expense action object', () => {
    const action = editExpense( '123abc', {note: 'hello there!'} );
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '123abc',
        updates: {
            note: 'hello there!'
        }
    });
});

test('should setup add expense action object from passed values', () => {
    const action = addExpense(expenses[2]);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[2]
    });
});

// Using redux-mock-store
// "done" is a function that tells jest to wait
// until "done()" is called (good for async functions)
test('should add expense to database and store', (done) => {
    const store = createMockStore({});
    const expenseData = {
        description: 'Mouse',
        amount: 3000,
        note: 'This one is better',
        createdAt: 52859
    };
    store.dispatch(startAddExpense(expenseData)).then(() => {
        // Make sure the redux-mock-store gets the right action
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });
        // Look at the db to make sure it was stored
        // This is returning a promise, and the next then()
        // is the success case of that promise, with the promise passing
        // the snapshot into then()
        return database.ref(`expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
    });
});

test('should add expense with defaults to database and store', (done) => {
    const store = createMockStore({});
    const defaultExpenseData = {
        description: '',
        amount: 0,
        note: '',
        createdAt: 0
    };
    store.dispatch(startAddExpense()).then(() => {
        // Make sure the redux-mock-store gets the right action
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...defaultExpenseData
            }
        });
        // Look at the db to make sure it was stored
        // This is returning a promise, and the next then()
        // is the success case of that promise, with the promise passing
        // the snapshot into then()
        return database.ref(`expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(defaultExpenseData);
        done();
    });
});

test('should setup expense action object with data', () => {
    const action = setExpenses(expenses);
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    });
});

test('should fetch the expenses from firebase', (done) => {
    const store = createMockStore({});
    store.dispatch(startSetExpenses()).then( () => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses
        });
        done();
    });
});

test('should remove expense from firebase', (done) => {
    const store = createMockStore({});
    store.dispatch(startRemoveExpense({ id: expenses[1].id })).then( () => {
        // Make sure proper action is given to the store
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'REMOVE_EXPENSE',
            id: expenses[1].id
        });
        // Make sure it was deleted from the firebase db
        return database.ref(`expenses/${expenses[1].id}`).once('value').then((snapshot) => {
            expect(snapshot.val()).toBeNull();
            done();
        });
    });
});

test('should edit expense on firebase', (done) => {
    const store = createMockStore({});
    const id = expenses[1].id;
    const updates = {
        amount: 80000,
        description: 'updated thing'
    };
    store.dispatch(startEditExpense(id, updates)).then( () => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'EDIT_EXPENSE',
            id,
            updates
        });
        // You can test individual changes too:
        // E.g. snapshot.val().amount toBe updates.amount
        return database.ref(`expenses/${id}`).once('value').then((snapshot) => {
            expect(snapshot.val()).toEqual({
                createdAt: expenses[1].createdAt,
                note: expenses[1].note,
                ...updates
            });
            done();
        });
    });
});


// test('should setup add expense action object from default values', () => {
//     // No object passed into addExpense()
//     const action = addExpense();
//     expect(action).toEqual({
//         type: 'ADD_EXPENSE',
//         expense: {
//             id: expect.any(String),
//             description: '',
//             note: '',
//             amount: 0,
//             createdAt: 0
//         }
//     })
// });