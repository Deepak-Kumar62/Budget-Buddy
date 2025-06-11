const Header = ({ menuOpen, setMenuOpen }) => (
    <div className="md:hidden flex justify-between items-center p-4 bg-white shadow-md z-20">
        <h2 className="text-xl font-bold">💸 Budget Buddy</h2>
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-600 text-2xl">
            ☰
        </button>
    </div>
);
export default Header;
