import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';

test('should render ExpenseForm correctly', () => {
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseForm with expense data', () => {
    const wrapper = shallow(<ExpenseForm expense={expenses[1]} />);
    expect(wrapper).toMatchSnapshot();
});

test('should render error for invalid form submission', () => {
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
    wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
    });
    expect(wrapper.state('error').length).toBeGreaterThan(0);
    expect(wrapper).toMatchSnapshot();
});

test('should set description on input change', () => {
    const value = 'New description';
    const wrapper = shallow(<ExpenseForm />);
    // .at allows you to specify which index to match
    wrapper.find('input').at(0).simulate('change', {
        target: { value }
    });
    expect(wrapper.state('description')).toBe(value);
});

test('should set note on textarea change', () => {
    const value = 'New note';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('textarea').simulate('change', {
        target: { value }
    });
    expect(wrapper.state('note')).toBe(value);
});

test('should set amount if valid input', () => {
    const value = '23.50';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(1).simulate('change', {
        target: { value }
    });
    expect(wrapper.state('amount')).toBe(value);
});

test('should not set amount if invalid input', () => {
    const value = '12.122';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(1).simulate('change', {
        target: { value }
    });
    expect(wrapper.state('amount')).toBe('');
});

test('should call onSubmit prop for valid form submission', () => {
    // Function returns a new spy
    const onSubmitSpy = jest.fn();
    const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} />)
    wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
    });
    expect(wrapper.state('error')).toBe('');
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
        description: expenses[0].description,
        amount: expenses[0].amount,
        createdAt: expenses[0].createdAt,
        note: expenses[0].note
    });
});

test('should set new date on date change', () => {
    const now = moment();
    const wrapper = shallow(<ExpenseForm />);
    // .prop() is an Enzyme function
    // .prop('onDateChange')(now)
    // the first part gets the function from the prop onDate Change
    // the second part calls the return value (aka calls the function)
    // with parameter "now" which is a variable defined above
    wrapper.find('withStyles(SingleDatePicker)').prop('onDateChange')(now);
    expect(wrapper.state('createdAt')).toEqual(now);
});

test('should set calendar focus on change', () => {
    const focused = true;
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('withStyles(SingleDatePicker)').prop('onFocusChange')({focused});
    expect(wrapper.state('calendarFocused')).toBe(focused);
});

// Why you have to call "withStyles(SingleDatePicker)":
//
// Kevin  · 2 months ago 
// The main issue appears to be that enzyme is not able to find the date-picker component as written in the lecture if you are using a more recent version of react-dates and the component name no longer works as a selector. We just have to find an alternative enzyme selector & we should be ready to roll. 
// using the selector display name as found in the snapshot from earlier in the test file: 
// wrapper.find('withStyles(SingleDatePicker)').prop("onDateChange")(now);  
// This will find the component by name as of v16.3. But this may change again...

// using a prop selector:
// wrapper.find('[onDateChange]').prop('onDateChange')(now);  
// This may help if the folks @ Airbnb decide to change the component name again but keep the same onDateChange prop...

// using a component constructor (requires import of component @ the top of the test file to pass the reference):
// -- at the top: import { SingleDatePicker } from 'react-dates'; 
// wrapper.find(SingleDatePicker).prop('onDateChange')(now); 

// Feel free to come up with your own take using another enzyme selector.
// http://airbnb.io/enzyme/docs/api/selector.html