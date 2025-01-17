import { useEffect, useState } from "react";
import "./Expenses.css";
import { publicRequest } from "../requestMethods";

function Expense() {
    const [showEditExpense, setShowEditExpense] = useState(false);
    const [searchQuery, setSearchQuery] = useState(""); // State to store search query

    const handleEditExpense = (id) => {
        setShowEditExpense(!showEditExpense);
        setUpdatedId(id);
    };

    const handleupdateExpense = async () => {
        if (updatedId) {
            try {
                await publicRequest.put(`/expense/${updatedId}`, {
                    label: updatedLabel,
                    value: updateAmount,
                    date: updatedDate,
                });
                window.location.reload();
            } catch (error) {
                console.log(error);
            }
        }
    };

    const [expenses, setExpenses] = useState([]);
    const [updatedId, setUpdatedId] = useState("");
    const [updatedLabel, setUpdatedLabel] = useState("");
    const [updatedDate, setUpdatedDate] = useState("");
    const [updateAmount, setUpdatedAmount] = useState(0);

    useEffect(() => {
        const getExpenses = async () => {
            try {
                const res = await publicRequest.get("/expense");
                setExpenses(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        getExpenses();
    }, []);

    // Function to filter expenses based on the search query
    const filteredExpenses = expenses.filter((expense) => {
        return (
            expense.label.toLowerCase().includes(searchQuery.toLowerCase()) || // Search by label
            expense.date.includes(searchQuery) // Search by date
        );
    });

    // Calculate the total expenses
    const totalExpense = filteredExpenses.reduce((total, expense) => total + expense.value, 0);

    const handleDelete = async (id) => {
        try {
            await publicRequest.delete(`/expense/${id}`);
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="GetExpense">
            <div className="search">
                {/* Search bar */}
                <input
                    type="text"
                    className="Search"
                    placeholder="Search by label or date"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} // Update search query
                />
            </div>
            <div>
                <h2 className="HeaderExpense">All Expenses</h2>
            </div>

            {/* Display total expense */}
            <div className="TotalExpense">
                <h3>Total Expense: ${totalExpense.toFixed(2)}</h3>
            </div>

            <div>
                {/* Display filtered expenses */}
                {filteredExpenses.map((item, index) => {
                    return (
                        <div className="AllExpenses" key={index}>
                            <span className="Label">{item.label}</span>
                            <span className="Date">{item.date}</span>
                            <span className="Amount">${item.value}</span>
                            <div className="AllExpensess">
                                <button
                                    className="Update"
                                    onClick={() => handleEditExpense(item._id)}
                                >
                                    Update
                                </button>
                                <button
                                    className="Delete"
                                    onClick={() => handleDelete(item._id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {showEditExpense && (
                <div className="AddExpense">
                    <label htmlFor="Expense" className="ExpenseText">
                        Expense Name
                    </label>
                    <br />
                    <input
                        type="text"
                        className="ExpenseName"
                        onChange={(e) => setUpdatedLabel(e.target.value)}
                    />
                    <br />
                    <label htmlFor="Expense" className="DateText">
                        Date
                    </label>
                    <br />
                    <input
                        type="date"
                        className="ExpenseDate"
                        onChange={(e) => setUpdatedDate(e.target.value)}
                    />
                    <br />
                    <label htmlFor="Expense">Expense Amount</label>
                    <br />
                    <input
                        type="Number"
                        className="ExpenseAmount"
                        onChange={(e) => setUpdatedAmount(e.target.value)}
                    />
                    <br />
                    <div className="Buttons">
                        <button className="ExpenseClose" onClick={handleEditExpense}>
                            Close
                        </button>
                        <button className="ExpenseSave" onClick={handleupdateExpense}>
                            Save
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Expense;
