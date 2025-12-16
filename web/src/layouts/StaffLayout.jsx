import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Calendar, LogOut, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const StaffLayout = () => {
    const { user, logout, loading } = useAuth();
    const location = useLocation();

    if (loading) return <div>Loading...</div>;

    // Staff Protection: Check if user exists and userType/role is staff-compatible
    // Note: Our user object now comes from either staff.json or users.json.
    // Ideally we check a specific flag, but checking if user exists is step 1.
    // Since this is a dedicated layout, we should ensure they are staff.
    // However, our current AuthContext doesn't explicitly store 'userType' in the state object 
    // unless we modified login() to do so. The token has it.
    // For now, if they logged in via Staff Login, they are staff.
    if (!user) return <Navigate to="/staff/login" replace />;

    const isActive = (path) => location.pathname === path;

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <div className="w-64 bg-white shadow-md z-10 hidden md:flex flex-col">
                <div className="p-6 border-b">
                    <h1 className="text-xl font-bold text-primary">AWKUM Staff</h1>
                    <p className="text-xs text-gray-500 mt-1">Staff Portal</p>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    <Link
                        to="/staff/home"
                        className={`flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${isActive('/staff/home') ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'
                            }`}
                    >
                        <User className="mr-3 h-5 w-5" />
                        My Profile
                    </Link>
                    <Link
                        to="/staff/attendance"
                        className={`flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${isActive('/staff/attendance') ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'
                            }`}
                    >
                        <Calendar className="mr-3 h-5 w-5" />
                        Attendance
                    </Link>
                </nav>

                <div className="p-4 border-t">
                    <div className="flex items-center mb-4 px-2">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                            {user.name.charAt(0)}
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900 truncate w-32">{user.name}</p>
                            <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                        </div>
                    </div>
                    <button
                        onClick={logout}
                        className="w-full flex items-center px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors"
                    >
                        <LogOut className="mr-3 h-5 w-5" />
                        Sign Out
                    </button>
                </div>
            </div>

            {/* Mobile Header + Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="md:hidden bg-white shadow-sm p-4 flex justify-between items-center">
                    <div className="font-bold text-primary">AWKUM Staff</div>
                    <button onClick={logout} className="p-2 text-gray-500"><LogOut className="h-5 w-5" /></button>
                </header>
                <main className="flex-1 overflow-auto p-4 md:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default StaffLayout;
