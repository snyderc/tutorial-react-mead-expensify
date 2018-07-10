import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import numeral from 'numeral';

import selectExpenses from '../selectors/expenses';
import getExpensesTotal from '../selectors/expenses-total';

export const ExpensesSummary = (props) => (
    <div className="page-header">
        <div className="content-container">
            <h1 className="page-header__title">Viewing <span>{props.expenses.length}</span> expense{props.expenses.length !== 1 && 's'} totalling <span>{numeral(getExpensesTotal(props.expenses)/100).format('$0,0.00')}</span></h1>
            <div className="page-header__actions">
                <Link className="button" to="/create">Add Expense</Link>
            </div>
        </div>
    </div>
);

const mapStateToProps = (state) => {
    return {
        expenses: selectExpenses(state.expenses, state.filters)
    }
};

/*
Andrew Mead's solution:
const visibleExpenses = selectExpenses()
then return an object with expenseCount and expenseTotal
That way, the test case just uses a # and $, not the expense array
Also, nomenclature: Import expenses-total as selectExpensesTotal
*/

export default connect(mapStateToProps)(ExpensesSummary);