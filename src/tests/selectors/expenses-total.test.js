import expenses from '../fixtures/expenses';
import getExpensesTotal from '../../selectors/expenses-total';

test("should return 0 if no expenses", () => {
    const total = getExpensesTotal([]);
    expect(total).toBe(0);
});

test("should correctly add up a single expense", () => {
    const total = getExpensesTotal([expenses[1]]);
    expect(total).toBe(109500);
});

test("should correctly add up multiple expenses", () => {
    const total = getExpensesTotal(expenses);
    expect(total).toBe(114195);
});