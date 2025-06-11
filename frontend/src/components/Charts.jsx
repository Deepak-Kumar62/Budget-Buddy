import { Pie, Line } from "react-chartjs-2";
import { useAppContext } from "../contexts/AppContext";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from "chart.js";

// Register required components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const Charts = () => {
    const { incomes, expenses } = useAppContext();

    const totalIncome = incomes.reduce((sum, item) => sum + parseFloat(item.amount), 0)
    const totalExpense = expenses.reduce((sum, item) => sum + parseFloat(item.amount), 0)
    const totalBalance = totalIncome - totalExpense

    // Pie chart data
    const pieData = {
        labels: ["Income", "Expense", "Balance"],
        datasets: [
            {
                data: [totalIncome, totalExpense, totalBalance],
                backgroundColor: ["#22c55e", "#ef4444", "#3b82f6"],
                borderWidth: 1,
            },
        ],
    };

    // Line chart data
    const lineData = {
        labels: ["Jan", "Feb", "Mar"], // Replace with real date series if needed
        datasets: [
            {
                label: "Income",
                data: incomes.map((i) => i.amount),
                borderColor: "#22c55e",
                backgroundColor: "#dcfce7",
                tension: 0.4,
            },
            {
                label: "Expense",
                data: expenses.map((e) => e.amount),
                borderColor: "#ef4444",
                backgroundColor: "#fee2e2",
                tension: 0.4,
            },
        ],
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-8">
            <div className="bg-white p-4 md:p-6 rounded-2xl shadow-md">
                <h2 className="text-base md:text-lg font-semibold mb-4 text-gray-700">
                    📈 Income vs Expense
                </h2>
                <Line data={lineData} />
            </div>
            <div className="bg-white p-4 md:p-6 rounded-2xl shadow-md">
                <h2 className="text-base md:text-lg font-semibold mb-4 text-gray-700">
                    🍰 Financial Distribution
                </h2>
                <Pie data={pieData} />
            </div>
        </div>
    );
};

export default Charts;
