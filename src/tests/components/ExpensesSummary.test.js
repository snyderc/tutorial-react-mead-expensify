import React from 'react';
import { shallow } from 'enzyme';

import { ExpensesSummary } from '../../components/ExpensesSummary';
import expenses from '../fixtures/expenses';

test('should render message viewing multiple expenses with total amount', () => {
    const wrapper = shallow(<ExpensesSummary expenses={expenses} />);
    expect(wrapper).toMatchSnapshot();
});

test('should render message viewing 1 expense with amount', () => {
    const wrapper = shallow(<ExpensesSummary expenses={[expenses[1]]} />);
    expect(wrapper).toMatchSnapshot();
});