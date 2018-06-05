import React from 'react';
import { shallow } from 'enzyme';

import { ExpensesSummary } from '../../components/ExpensesSummary';
import expenses from '../fixtures/expenses';

// 'should correctly render ExpensesSummary with multiple expenses'
test('should render message viewing multiple expenses with total amount', () => {
    const wrapper = shallow(<ExpensesSummary expenses={expenses} />);
    expect(wrapper).toMatchSnapshot();
});

// 'should correctly render ExpensesSummary with one expense'
test('should render message viewing 1 expense with amount', () => {
    const wrapper = shallow(<ExpensesSummary expenses={[expenses[1]]} />);
    expect(wrapper).toMatchSnapshot();
});