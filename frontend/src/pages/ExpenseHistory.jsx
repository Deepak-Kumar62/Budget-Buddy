import { useAppContext } from '../contexts/AppContext';

const ExpenseHistory = () => {
  const { expenses, deleteExpense } = useAppContext();

  const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString('en-IN');

  const handleEdit = (expense) => {
    // You can add navigation or modal popup here
    alert(`Edit expense: ${expense.title}`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      deleteExpense(id);
    }
  };

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">📉 Expense History</h1>

      <div className="overflow-x-auto shadow rounded-lg bg-white">
        <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-6 py-3">Title</th>
              <th className="px-6 py-3">Amount</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">Description</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {expenses.map((expense) => (
              <tr key={expense._id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 font-medium text-gray-800">{expense.title}</td>
                <td className="px-6 py-4 font-bold text-red-600">₹{expense.amount}</td>
                <td className="px-6 py-4">{expense.category}</td>
                <td className="px-6 py-4 text-gray-600">{expense.description || '-'}</td>
                <td className="px-6 py-4">{formatDate(expense.date)}</td>
                <td className="px-6 py-4 text-center space-x-2">
                  <button
                    onClick={() => handleEdit(expense)}
                    className="px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(expense._id)}
                    className="px-3 py-1 text-xs font-semibold bg-red-100 text-red-700 rounded hover:bg-red-200"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {expenses.length === 0 && (
              <tr>
                <td colSpan="6" className="px-6 py-6 text-center text-gray-500">
                  No expenses found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpenseHistory;
