import { useEffect, useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import { useAppContext } from './contexts/AppContext';
import { Route, Routes } from 'react-router-dom';
import IncomeHistory from './pages/IncomeHistory';
import ExpenseHistory from './pages/ExpenseHistory';
import AddIncome from './pages/AddIncome';
import AddExpense from './pages/AddExpense';
import AllTransaction from './pages/AllTransaction';
import { ToastContainer } from 'react-toastify';
import Login from './pages/Login';

const App = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const { user, getCurrentUser, getIncomes, getExpenses } = useAppContext();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            await getCurrentUser();
            setLoading(false);
        };
        fetchUser();
    }, []);

    useEffect(() => {
        if (user) {
            getIncomes();
            getExpenses();
        }
    }, [user]);


    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p>Loading...</p>
            </div>
        );
    }

    if (!user) {
        return (
            <>
                <ToastContainer />
                <Routes>
                    <Route path="*" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </>
        );
    }


    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-gray-100 to-white font-sans">
            <ToastContainer />
            <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            <Sidebar menuOpen={menuOpen} />
            <main className="flex-1 p-4 md:p-8 h-screen overflow-auto">
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/transactions" element={<AllTransaction />} />
                    <Route path="/add-income" element={<AddIncome />} />
                    <Route path="/add-expense" element={<AddExpense />} />
                    <Route path="/income-history" element={<IncomeHistory />} />
                    <Route path="/expense-history" element={<ExpenseHistory />} />
                </Routes>
            </main>
        </div>
    );
};

export default App;