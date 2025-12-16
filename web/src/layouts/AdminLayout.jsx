import { Navigate, Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    LayoutDashboard,
    FileText,
    Calendar,
    Users,
    Award,
    LogOut,
    Briefcase
} from 'lucide-react';

const AdminLayout = () => {
    const { user, loading, logout } = useAuth();
    const location = useLocation();

    if (loading) return <div>Loading...</div>;

    if (!user || user.role !== 'admin') {
        return <Navigate to="/admin/login" />;
    }

    const navItems = [
        { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
        { name: 'News & Updates', path: '/admin/news', icon: FileText },
        { name: 'Admissions', path: '/admin/admissions', icon: Calendar },
        { name: 'Applicants', path: '/admin/applicants', icon: Users },
        { name: 'Merit Generator', path: '/admin/merit-generator', icon: Award },
        { name: 'Manage Staff', path: '/admin/staff', icon: Briefcase },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-64 bg-gray-900 text-white flex flex-col">
                <div className="p-6 border-b border-gray-800">
                    <h1 className="text-xl font-bold">Admin Panel</h1>
                    <p className="text-xs text-gray-400 mt-1">AWKUM Portal</p>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive(item.path)
                                ? 'bg-primary text-white'
                                : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                                }`}
                        >
                            <item.icon className="h-5 w-5" />
                            <span>{item.name}</span>
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-gray-800">
                    <div className="flex items-center mb-4 px-2">
                        <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-sm font-bold">
                            {user.name.charAt(0)}
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium">{user.name}</p>
                            <p className="text-xs text-gray-400 truncate w-32">{user.email}</p>
                        </div>
                    </div>
                    <button
                        onClick={logout}
                        className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                    >
                        <LogOut className="h-4 w-4" />
                        <span>Logout</span>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto">
                <header className="bg-white shadow-sm py-4 px-8 flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-800">
                        {navItems.find(i => isActive(i.path))?.name || 'Dashboard'}
                    </h2>
                </header>
                <main className="p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
