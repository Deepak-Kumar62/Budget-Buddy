import { NavLink } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext"

const Sidebar = ({ menuOpen }) => {
  const { logout } = useAppContext();

  return (
    <aside className={`md:w-64 bg-white shadow-xl p-6 md:rounded-r-3xl md:block ${menuOpen ? 'block' : 'hidden'} md:h-screen z-10`}>
      <div className="hidden md:block mb-10">
        <h2 className="text-xl font-extrabold text-gray-800">💸 Budget Buddy</h2>
      </div>
      <ul className="space-y-4 text-gray-600">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? 'text-blue-600 font-semibold block' : 'hover:text-blue-600 block'
          }
        >
          <li className="cursor-pointer">🏠 Dashboard</li>
        </NavLink>

        <NavLink
          to="/transactions"
          className={({ isActive }) =>
            isActive ? 'text-blue-600 font-semibold block' : 'hover:text-blue-600 block'
          }
        >
          <li className="cursor-pointer">📑 All Transactions</li>
        </NavLink>

        <NavLink
          to="/income-history"
          className={({ isActive }) =>
            isActive ? 'text-blue-600 font-semibold block' : 'hover:text-blue-600 block'
          }
        >
          <li className="cursor-pointer">📈 Income History</li>
        </NavLink>

        <NavLink
          to="/expense-history"
          className={({ isActive }) =>
            isActive ? 'text-blue-600 font-semibold block' : 'hover:text-blue-600 block'
          }
        >
          <li className="cursor-pointer">📉 Expense History</li>
        </NavLink>

        <NavLink
          to="/add-income"
          className={({ isActive }) =>
            isActive ? 'text-blue-600 font-semibold block' : 'hover:text-blue-600 block'
          }
        >
          <li className="cursor-pointer">➕ Add Income</li>
        </NavLink>

        <NavLink
          to="/add-expense"
          className={({ isActive }) =>
            isActive ? 'text-blue-600 font-semibold block' : 'hover:text-blue-600 block'
          }
        >
          <li className="cursor-pointer">➖ Add Expense</li>
        </NavLink>

        <li
        onClick={logout}
        className="cursor-pointer text-red-500 font-bold block pt-4 border-t border-gray-200 hover:text-red-600">🚪 Logout</li>
      </ul>
  </aside>
  );
}

export default Sidebar