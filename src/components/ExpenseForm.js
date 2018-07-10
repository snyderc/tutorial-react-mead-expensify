import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';

// const now = moment();
// console.log(now.format('MMM Do, YYYY'));

// Use local component state to track changes to all these inputs
// After submit, do something with the information (send to Redux to add or edit expense)

export default class ExpenseForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description: props.expense ? props.expense.description : '',
            note: props.expense ? props.expense.note : '',
            amount: props.expense ? (props.expense.amount / 100).toString() : '',
            createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
            calendarFocused: false,
            error: ''
        }
    };
    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState( () => ({ description }));
    };
    onNoteChange = (e) => {
        const note = e.target.value;
        this.setState( () => ({ note }));
    };
    onAmountChange = (e) => {
        const amount = e.target.value;
        if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.setState( () => ({ amount }));
        }
    }
    onDateChange = (createdAt) => {
        if (createdAt) {
            this.setState(() => ({ createdAt }));
        }
    };
    // The passed in value is from a destructured object
    onFocusChange = ( { focused } ) => {
        this.setState( () => ({ calendarFocused: focused }))
    };
    onSubmit = (e) => {
        e.preventDefault(); // to avoid full-page refresh, etc.
        if (!this.state.description || !this.state.amount) {
            // Set error state equal to 'please provide desc/amt'
            this.setState( () => ({ error: 'Error: Please provide both description and amount'}));
        } else {
            // Clear the error and submit
            this.setState( () => ({ error: ''}));
            this.props.onSubmit({
                description: this.state.description,
                amount: parseFloat(this.state.amount)*100, // format: store as cents
                createdAt: this.state.createdAt.valueOf(),
                note: this.state.note
            });
        }
    };
    render() {
        return (
            <form className="form" onSubmit={this.onSubmit}>
                <input
                    type="text"
                    placeholder="Description"
                    autoFocus
                    className="text-input"
                    value={this.state.description}
                    onChange={this.onDescriptionChange}
                />
                <input
                    type="text"
                    placeholder="Amount"
                    className="text-input"
                    value={this.state.amount}
                    onChange={this.onAmountChange}
                />
                <SingleDatePicker 
                    date={this.state.createdAt}
                    onDateChange={this.onDateChange}
                    focused={this.state.calendarFocused}
                    onFocusChange={this.onFocusChange}
                    numberOfMonths={1}
                    isOutsideRange={() => false}
                />
                <textarea
                    placeholder="Add a note for your expense (optional)"
                    value={this.state.note}
                    className="textarea"
                    onChange={this.onNoteChange}
                >
                </textarea>
                {this.state.error && <p className="form__error">{this.state.error}</p>}
                <div>
                    <button className="button">Save Expense</button>
                </div>
            </form>
        )
    }
}