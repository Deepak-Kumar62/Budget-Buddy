import { useAppContext } from "../contexts/AppContext";

const StatsCards = () => {
  const { incomes, expenses } = useAppContext();

  const totalIncome = incomes.reduce((sum, item) => sum + parseFloat(item.amount), 0)
  const totalExpense = expenses.reduce((sum, item) => sum + parseFloat(item.amount), 0)
  const totalBalance = totalIncome - totalExpense

  const stats = [
    { title: "Total Income", value: totalIncome, color: "green" },
    { title: "Total Expense", value: totalExpense, color: "red" },
    { title: "Total Balance", value: totalBalance, color: "blue" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
      {stats.map(({ title, value, color }) => (
        <div key={title} className={`bg-white p-4 md:p-6 rounded-2xl shadow-md border-t-4 border-${color}-500`}>
          <h2 className="text-base md:text-lg font-semibold text-gray-600">{title}</h2>
          <p className={`text-${color}-600 font-bold text-xl md:text-2xl mt-2`}>₹{value}</p>
        </div>
      ))}
    </div>
  );
};
export default StatsCards;
