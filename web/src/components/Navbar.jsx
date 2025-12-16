import { Link, useLocation } from 'react-router-dom';
import { Menu, X, GraduationCap, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useAuth();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'News', path: '/news' },
        { name: 'Admissions', path: '/admissions' },
        { name: 'Merit Lists', path: '/merit-lists' },
    ];

    return (
        <nav className="bg-primary text-white sticky top-0 z-50 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <Link to="/" className="flex items-center space-x-3">
                        <div className="bg-white p-2 rounded-full">
                            <GraduationCap className="h-8 w-8 text-primary" />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-xl tracking-wide">AWKUM</span>
                            <span className="text-xs text-gray-300 uppercase tracking-wider">Abdul Wali Khan University Mardan</span>
                        </div>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`text-sm font-medium transition-colors duration-200 hover:text-blue-200 ${isActive(link.path) ? 'text-blue-200 border-b-2 border-blue-200' : 'text-white'}`}
                            >
                                {link.name}
                            </Link>
                        ))}

                        {user ? (
                            <div className="flex items-center space-x-4 ml-6 pl-6 border-l border-primary-light">
                                <span className="text-sm text-gray-300 truncate max-w-[100px]">Hi, {user.name}</span>
                                {user.role === 'admin' ? (
                                    <Link to="/admin/dashboard" className="px-4 py-2 rounded bg-primary-light hover:bg-primary-dark transition text-sm font-medium">
                                        Dashboard
                                    </Link>
                                ) : (
                                    <Link to="/check-merit" className="px-4 py-2 rounded bg-green-600 hover:bg-green-700 transition text-sm font-medium">
                                        Status
                                    </Link>
                                )}
                                <button onClick={logout} className="text-sm text-gray-300 hover:text-white">
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-3 ml-6">
                                <Link to="/login" className="text-sm font-medium hover:text-blue-200">
                                    Login
                                </Link>
                                <Link to="/register" className="px-4 py-2 rounded-full bg-white text-primary hover:bg-gray-100 transition text-sm font-bold">
                                    Apply Now
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-white">
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-primary-dark border-t border-primary-light">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className={`fork-item block px-3 py-2 rounded-md text-base font-medium hover:bg-primary-light ${isActive(link.path) ? 'bg-primary-light' : ''}`}
                            >
                                <div className="flex items-center justify-between">
                                    {link.name}
                                    <ChevronRight className="h-4 w-4 opacity-50" />
                                </div>
                            </Link>
                        ))}
                        {user ? (
                            <>
                                {user.role === 'admin' ? (
                                    <Link to="/admin/dashboard" className="block px-3 py-2 text-base font-medium hover:bg-primary-light">Dashboard</Link>
                                ) : (
                                    <Link to="/check-merit" className="block px-3 py-2 text-base font-medium hover:bg-primary-light bg-green-600">Check Merit Status</Link>
                                )}
                                <button onClick={logout} className="block w-full text-left px-3 py-2 text-base font-medium hover:bg-primary-light text-red-200">Logout</button>
                            </>
                        ) : (
                            <div className="grid grid-cols-2 gap-2 mt-4 px-2">
                                <Link to="/login" className="text-center px-3 py-2 rounded-md bg-primary-light hover:bg-primary-dark text-white text-sm font-medium">Login</Link>
                                <Link to="/register" className="text-center px-3 py-2 rounded-md bg-white text-primary hover:bg-gray-100 text-sm font-medium">Register</Link>
                            </div>
                        )}
                        <div className="pt-2 border-t border-primary-light mt-2">
                            <Link to="/admin/login" className="block px-3 py-2 text-xs font-medium text-gray-400 hover:text-white">Staff Only</Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
