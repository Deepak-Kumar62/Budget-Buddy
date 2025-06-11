import { useAppContext } from '../contexts/AppContext';

const RecentHistory = () => {
    const { incomes, expenses } = useAppContext();

    // Combine and sort by date (descending)
    const mergedHistory = [...incomes, ...expenses]
        .map(item => ({
            ...item,
            type: item.type === 'income' ? 'Income' : 'Expense',
            amount: item.type === 'income' ? item.amount : -Math.abs(item.amount)
        }))
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5); // Get the latest 5

    return (
        <div className="bg-white p-4 md:p-6 rounded-2xl shadow-md">
            <h2 className="text-base md:text-lg font-semibold mb-4 text-gray-700">🕒 Recent Transactions</h2>
            {mergedHistory.length === 0 ? (
                <p className="text-gray-500 text-sm">No recent transactions.</p>
            ) : (
                <ul className="space-y-3 text-sm text-gray-700">
                    {mergedHistory.map((item, idx) => (
                        <li key={idx} className="flex justify-between border-b pb-2">
                            <span>
                                {item.type}: {item.title}
                            </span>
                            <span className={`${item.amount > 0 ? 'text-green-600' : 'text-red-600'} font-medium`}>
                                {item.amount > 0 ? '+' : '-'} ₹{Math.abs(item.amount)}
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default RecentHistory;
