// Description, amount, createdAt

import React from 'react';
import { Link } from 'react-router-dom';

//ExpenseListItem
// What's being passed in is the partially destructured "props"
export const ExpenseListItem = ( {id, description, amount, createdAt} ) => (
    <div>
        <p>Description: <Link to={`/edit/${id}`}>{description}</Link></p>
        <p>Amount: {amount}</p>
        <p>Created at: {createdAt}</p>
    </div>
);

export default ExpenseListItem;