import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [expenses, setExpenses] = useState([]);
    const [incomes, setIncomes] = useState([]);
    const [loading, setLoading] = useState(true);

    // Axios config
    axios.defaults.withCredentials = true;
    axios.defaults.baseURL = import.meta.env.VITE_BASE_URL || "http://localhost:8000/api/v1";


    // ================== AUTH =====================
    const register = async (formData) => {
        try {
            const res = await axios.post("/user/register", formData);
            toast.success(res.data.message);
            setUser(res.data.user);
            navigate("/");
        } catch (error) {
            toast.error(error.response?.data?.message || "Registration failed");
        }
    };

    const login = async (formData) => {
        try {
            const res = await axios.post("/user/login", formData);
            toast.success(res.data.message);
            setUser(res.data.user);
            navigate("/");
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed");
        }
    };

    const logout = async () => {
        try {
            await axios.post("/user/logout");
            setUser(null);
            toast.success("Logged out successfully");
            navigate("/");
        } catch (error) {
            toast.error("Logout failed");
        }
    };

    const getCurrentUser = async () => {
        try {
            const res = await axios.get("/user");
            setUser(res.data.user);
        } catch {
            setUser(null);
        }
    };

    // ================== EXPENSE =====================
    const getExpenses = async () => {
        try {
            const res = await axios.get("/expense");
            setExpenses(res.data.data);
        } catch {
            toast.error("Failed to fetch expenses");
        }
    };

    const addExpense = async (data) => {
        try {
            const res = await axios.post("/expense", data);
            toast.success(res.data.message);
            getExpenses();
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to add expense");
        }
    };

    const updateExpense = async (id, updatedData) => {
        try {
            const res = await axios.put(`/expense/${id}`, updatedData);
            toast.success(res.data.message);
            getExpenses();
        } catch (error) {
            toast.error("Failed to update expense");
        }
    };

    const deleteExpense = async (id) => {
        try {
            const res = await axios.delete(`/expense/${id}`);
            toast.success(res.data.message);
            getExpenses();
        } catch {
            toast.error("Failed to delete expense");
        }
    };

    // ================== INCOME =====================
    const getIncomes = async () => {
        try {
            const res = await axios.get("/income");
            setIncomes(res.data.data);
        } catch {
            toast.error("Failed to fetch incomes");
        }
    };

    const addIncome = async (data) => {
        try {
            const res = await axios.post("/income", data);
            toast.success(res.data.message);
            getIncomes();
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to add income");
        }
    };

    const updateIncome = async (id, updatedData) => {
        try {
            const res = await axios.put(`/income/${id}`, updatedData);
            toast.success(res.data.message);
            getIncomes();
        } catch (error) {
            toast.error("Failed to update income");
        }
    };

    const deleteIncome = async (id) => {
        try {
            const res = await axios.delete(`/income/${id}`);
            toast.success(res.data.message);
            getIncomes();
        } catch {
            toast.error("Failed to delete income");
        }
    };

    useEffect(() => {
        getCurrentUser();
    }, []);

    const value = {
        user,
        register,
        login,
        logout,
        getCurrentUser,

        expenses,
        getExpenses,
        addExpense,
        updateExpense,
        deleteExpense,

        incomes,
        getIncomes,
        addIncome,
        updateIncome,
        deleteIncome,

        loading,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Custom hook
export const useAppContext = () => {
    return useContext(AppContext);
};
