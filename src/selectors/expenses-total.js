// Return total of expenses

export default (expenses) => {
    return expenses.reduce( (accum, curVal) => {
        return accum + curVal.amount;
    }, 0);
};