import { ExpenseProvider } from './context/ExpenseContext';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import ExpenseFilter from './components/ExpenseFilter';
import ExpenseChart from './components/ExpenseChart';

function App() {
  return (
    <ExpenseProvider>
      <div className="min-h-screen bg-gray-100 p-4 md:p-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">Expense Tracker</h1>
        
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <ExpenseForm />
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <ExpenseFilter />
            </div>
          </div>
          
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <ExpenseChart />
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <ExpenseList />
            </div>
          </div>
        </div>
      </div>
    </ExpenseProvider>
  );
}

export default App;