import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Lock, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

const StaffLogin = () => {
    const [formData, setFormData] = useState({ staffId: '', password: '' });
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const res = await api.post('/staff/login', formData);
            login(res.data);
            navigate('/staff/home');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-lg shadow-xl overflow-hidden">
                <div className="bg-primary p-6 text-center">
                    <GraduationCap className="h-12 w-12 text-white mx-auto" />
                    <h2 className="mt-4 text-2xl font-bold text-white">Staff Portal</h2>
                    <p className="text-blue-100 mt-1">Authorized Access Only</p>
                </div>

                <div className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="bg-red-50 border-l-4 border-red-500 p-4 text-sm text-red-700">
                                {error}
                            </div>
                        )}

                        <div>
                            <label className="text-sm font-medium text-gray-700 block mb-1">Staff ID or Email</label>
                            <div className="relative">
                                <User className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
                                <input
                                    type="text"
                                    required
                                    className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary p-2 border"
                                    placeholder="Enter your ID"
                                    value={formData.staffId}
                                    onChange={(e) => setFormData({ ...formData, staffId: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-700 block mb-1">Password</label>
                            <div className="relative">
                                <Lock className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
                                <input
                                    type="password"
                                    required
                                    className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary p-2 border"
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
                        >
                            Sign In
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-xs text-gray-500">
                            Contact Admin if you forgot your credentials.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StaffLogin;
