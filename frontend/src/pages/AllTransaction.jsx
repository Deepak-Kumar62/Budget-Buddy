import { useAppContext } from '../contexts/AppContext';

const AllTransaction = () => {
  const { incomes, expenses } = useAppContext();

  const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString('en-IN');

  const allTransactions = [...incomes, ...expenses].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">📑 All Transactions</h1>

      <div className="overflow-x-auto shadow rounded-lg bg-white">
        <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-6 py-3">Title</th>
              <th className="px-6 py-3">Amount</th>
              <th className="px-6 py-3">Type</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">Description</th>
              <th className="px-6 py-3">Date</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {allTransactions.map((item, idx) => (
              <tr key={idx} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 font-medium text-gray-800">{item.title}</td>
                <td className={`px-6 py-4 font-bold ${item.type === 'income' ? 'text-green-600' : 'text-red-500'}`}>
                  ₹{item.amount}
                </td>
                <td className="px-6 py-4 capitalize">{item.type}</td>
                <td className="px-6 py-4">{item.category}</td>
                <td className="px-6 py-4 text-gray-600">{item.description || '-'}</td>
                <td className="px-6 py-4">{formatDate(item.date)}</td>
              </tr>
            ))}
            {allTransactions.length === 0 && (
              <tr>
                <td colSpan="6" className="px-6 py-6 text-center text-gray-500">
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllTransaction;
