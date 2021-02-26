import React from 'react'
import ExpenseItem from './ExpenseItem'
import { MdDelete } from "react-icons/md";

const ExpenseList = ({expenses,clearExpenses,handleDelete,handleEdit}) => {
    return (
        <>
            <ul>
                {expenses.map((expense) => {
                return <ExpenseItem 
                            key={expense.id} 
                            expense={expense} 
                            handleDelete={handleDelete} 
                            handleEdit={handleEdit} 
                        />
            })}
            </ul>
            {/* the clear expenses only shows when there is atleast one item in the list */}
            {expenses.length > 0 && 
            <button className='btn' onClick={clearExpenses}>
                Clear expenses
                <MdDelete className='btn-icon'/> 
            </button>}
        </>
    )
}

export default ExpenseList;