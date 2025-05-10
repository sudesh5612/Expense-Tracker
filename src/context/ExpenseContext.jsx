import { createContext, useState } from 'react';

export const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [categories] = useState([
    'Food', 'Transport', 'Shopping', 'Entertainment', 'Utilities', 'Other'
  ]);

  const addExpense = (expense) => {
    setExpenses([...expenses, { ...expense, id: Date.now() }]);
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  const updateExpense = (id, updatedExpense) => {
    setExpenses(expenses.map(expense => 
      expense.id === id ? { ...expense, ...updatedExpense } : expense
    ));
  };

  return (
    <ExpenseContext.Provider 
      value={{ expenses, categories, addExpense, deleteExpense, updateExpense }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};