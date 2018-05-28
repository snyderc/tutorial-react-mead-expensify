import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { addExpense } from '../actions/expenses';

// Changed to a class-based component
// so that onSubmit wouldn't have an inline function
// b/c that would get recalculated on every render
export class AddExpensePage extends React.Component {
    onSubmit = (expense) => {
        this.props.addExpense(expense);
        this.props.history.push('/');
    }
    render() {
        return (
            <div>
                <h1>Add Expense</h1>
                <ExpenseForm 
                    onSubmit={this.onSubmit}
                />
            </div>
        );
    }
}

// A react-redux function that makes it easier
// for us to put a spy on props.dispatch(addExpense(expense))
// b/c now we can say props.onSubmit(expense) up above
const mapDispatchToProps = (dispatch) => ({
    addExpense: (expense) => dispatch(addExpense(expense))
});

// "mapStateToProps" not needed here, so passing "undefined" to connect()
export default connect(undefined, mapDispatchToProps)(AddExpensePage);