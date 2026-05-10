// AdminSidebar - admin panel sidebar
import { useNavigate } from "react-router-dom";

const AdminSidebar = ({
  activeTab,
  setActiveTab,
  productsCount,
  usersCount,
  ordersCount,
}) => {
  const navigate = useNavigate();

  // Logout function - clear storage aur home page
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  // Tabs data - products, users, orders
  const tabs = [
    { id: "products", label: "Products", icon: "📦", count: productsCount },
    { id: "users", label: "Users", icon: "👥", count: usersCount },
    { id: "orders", label: "Orders", icon: "📋", count: ordersCount },
  ];

  return (
    <div className="w-64 bg-slate-900 min-h-screen p-4 border-r border-white/10 fixed flex flex-col justify-between">
      {/* Header section */}
      <div>
        <div className="mb-6 pb-2 border-b border-white/10">
          <h2 className="text-xl font-bold text-amber-400">⚡ Admin Panel</h2>
          <p className="text-xs text-gray-500 mt-1">Full Control Dashboard</p>
        </div>
        {/* Navigation tabs */}
        <nav className="space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full text-left px-4 py-2.5 rounded-lg transition flex items-center justify-between ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white"
                  : "text-gray-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <span>
                <span className="mr-2">{tab.icon}</span> {tab.label}
              </span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  activeTab === tab.id ? "bg-white/20" : "bg-slate-700"
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Logout button */}
      <div className="border-t border-white/10 pt-4 mt-4">
        <button
          onClick={handleLogout}
          className="w-full text-left px-4 py-2.5 rounded-lg text-red-400 hover:bg-red-600/20 hover:text-red-300 transition flex items-center gap-2"
        >
          <span>🚪</span> Logout
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
