import { useState } from 'react';
import { useAppContext } from '../contexts/AppContext';

const AddExpense = () => {
    const { addExpense } = useAppContext();

    const [form, setForm] = useState({
        title: '',
        amount: '',
        category: '',
        description: '',
        date: '',
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const { title, amount, category, date } = form;
        if (!title || !amount || !category || !date) {
            return setError('Please fill in all required fields');
        }

        addExpense({ ...form, type: 'expense' });

        setForm({
            title: '',
            amount: '',
            category: '',
            description: '',
            date: '',
        });
        setError('');
    };

    return (
        <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">➖ Add Expense</h1>

            <form
                onSubmit={handleSubmit}
                className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md space-y-4"
            >
                {error && <p className="text-red-600 text-sm">{error}</p>}

                <div>
                    <label className="block text-gray-700 font-medium">Title *</label>
                    <input
                        type="text"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        className="mt-1 w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium">Amount (₹) *</label>
                    <input
                        type="number"
                        name="amount"
                        value={form.amount}
                        onChange={handleChange}
                        className="mt-1 w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium">Category *</label>
                    <select
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        className="mt-1 w-full border border-gray-300 rounded px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="">Select Category</option>
                        <option value="food">Food</option>
                        <option value="transport">Transport</option>
                        <option value="utilities">Utilities</option>
                        <option value="entertainment">Entertainment</option>
                        <option value="medical">Medical</option>
                        <option value="shopping">Shopping</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div>
                    <label className="block text-gray-700 font-medium">Description</label>
                    <textarea
                        name="description"
                        rows="3"
                        value={form.description}
                        onChange={handleChange}
                        className="mt-1 w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium">Date *</label>
                    <input
                        type="date"
                        name="date"
                        value={form.date}
                        onChange={handleChange}
                        className="mt-1 w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-red-600 text-white font-semibold py-2 rounded hover:bg-red-700 transition"
                >
                    Add Expense
                </button>
            </form>
        </div>
    );
};

export default AddExpense;