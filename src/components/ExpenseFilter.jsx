import { useContext, useState } from 'react';
import { ExpenseContext } from '../context/ExpenseContext';

const ExpenseFilter = () => {
  const { expenses, categories } = useContext(ExpenseContext);
  const [filters, setFilters] = useState({
    category: 'all',
    month: 'all',
    year: new Date().getFullYear().toString()
  });

  const filteredExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    const expenseYear = expenseDate.getFullYear().toString();
    const expenseMonth = (expenseDate.getMonth() + 1).toString();
    
    return (
      (filters.category === 'all' || expense.category === filters.category) &&
      (filters.year === 'all' || expenseYear === filters.year) &&
      (filters.month === 'all' || expenseMonth === filters.month)
    );
  });

  const totalAmount = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  const availableYears = [...new Set(expenses.map(expense => 
    new Date(expense.date).getFullYear().toString()
  ))];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">Filters</h2>
      
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
          <select
            name="year"
            value={filters.year}
            onChange={handleFilterChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="all">All Years</option>
            {availableYears.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Month</label>
          <select
            name="month"
            value={filters.month}
            onChange={handleFilterChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="all">All Months</option>
            {Array.from({ length: 12 }, (_, i) => {
              const month = new Date(0, i).toLocaleString('default', { month: 'long' });
              return (
                <option key={i + 1} value={i + 1}>{month}</option>
              );
            })}
          </select>
        </div>
      </div>
      
      <div className="pt-4 border-t border-gray-200">
        <p className="text-lg font-medium">
          Total: <span className="text-blue-600">${totalAmount.toFixed(2)}</span>
        </p>
        <p className="text-sm text-gray-500">
          {filteredExpenses.length} {filteredExpenses.length === 1 ? 'expense' : 'expenses'} found
        </p>
      </div>
    </div>
  );
};

export default ExpenseFilter;