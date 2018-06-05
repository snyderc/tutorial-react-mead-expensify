import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';

import selectExpenses from '../selectors/expenses';
import getExpensesTotal from '../selectors/expenses-total';

export const ExpensesSummary = (props) => (
    <div>
        <p>Viewing {props.expenses.length} expense{props.expenses.length !== 1 && 's'} totalling {numeral(getExpensesTotal(props.expenses)/100).format('$0,0.00')}</p>
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