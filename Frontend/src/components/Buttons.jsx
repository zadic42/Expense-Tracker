import { useState } from 'react';
import './Buttons.css'
import { publicRequest } from '../requestMethods';

function Buttons() {
    
    const [showAddExpense , setShowAddExpense] = useState(false) ;
    const [label , setLabel] = useState('') ;
    const [date , setDate] = useState('') ;
    const [amount , setAmount] = useState(0) ;

    const handleAddExpense = () => {
        setShowAddExpense(!showAddExpense) ;
    }
    const handleExpense = async () => {
        try {
            await publicRequest.post('/expense' ,{
                label ,
                value:amount ,
                date 
            });
            window.location.reload() ; 
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <div>
        <div className='Container'>
        <button className='Add' onClick={handleAddExpense}>Add</button>
        </div>
        {showAddExpense && 
                <div className='AddExpense'>
                    <label htmlFor="Expense" className='ExpenseText'>Expense Name</label><br />
                    <input type="text" className='ExpenseName' onChange={(e) => setLabel(e.target.value)} /><br />
                    <label htmlFor="Expense" className='DateText'>Date</label><br />
                    <input type="date" className='ExpenseDate' onChange={(e) => setDate(e.target.value)} /><br />
                    <label htmlFor="Expense">Expense Amount</label><br />
                    <input type="Number" className='ExpenseAmount' onChange={(e) => setAmount(e.target.value)} /><br />
                    <div className='Buttons'>
                        <button className='ExpenseClose' onClick={handleAddExpense}>Close</button>
                        <button className='ExpenseSave' onClick={handleExpense}>Save</button>
                    </div>
                </div>
        }
        </div>
    )
}

export default Buttons ;