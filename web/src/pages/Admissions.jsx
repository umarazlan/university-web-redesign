import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, CheckCircle, XCircle } from 'lucide-react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const Admissions = () => {
    const [admissions, setAdmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAdmissions = async () => {
            try {
                const res = await api.get('/admissions');
                setAdmissions(res.data);
            } catch (error) {
                console.error("Error fetching admissions", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAdmissions();
    }, []);

    const formatDate = (dateString) => {
        if (!dateString) return 'TBA';
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const handleApplyClick = () => {
        if (user) {
            navigate('/check-merit');
        } else {
            navigate('/register');
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900">Admissions</h1>
                    <p className="mt-4 text-gray-600">Start your journey with Abdul Wali Khan University Mardan</p>
                </div>

                {loading ? (
                    <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {admissions.map((admission) => {
                            const isExpired = new Date(admission.deadline) < new Date();
                            const isOpen = admission.status === 'Open' && !isExpired;

                            return (
                                <div key={admission.id} className="bg-white rounded-lg shadow-md overflow-hidden border-t-4 border-primary hover:shadow-lg transition-all">
                                    <div className="p-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600">
                                                {admission.department}
                                            </div>
                                            {isOpen ? (
                                                <span className="flex items-center text-green-600 text-sm font-medium">
                                                    <CheckCircle className="h-4 w-4 mr-1" /> Open
                                                </span>
                                            ) : (
                                                <span className="flex items-center text-red-600 text-sm font-medium">
                                                    <XCircle className="h-4 w-4 mr-1" /> Closed
                                                </span>
                                            )}
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">{admission.title}</h3>

                                        <div className="space-y-3 mt-4">
                                            <div className="flex items-start text-sm text-gray-600">
                                                <Calendar className="h-4 w-4 mr-2 mt-0.5 text-primary" />
                                                <span>Deadline: <span className={`font-semibold ${isExpired ? 'text-red-500' : 'text-gray-800'}`}>{formatDate(admission.deadline)}</span></span>
                                            </div>
                                            <div className="bg-blue-50 p-3 rounded text-sm text-blue-800">
                                                <span className="font-semibold">Criteria:</span> {admission.criteria}
                                            </div>
                                        </div>

                                        <button
                                            onClick={handleApplyClick}
                                            disabled={!isOpen}
                                            className={`mt-6 w-full py-2 px-4 rounded-md font-medium transition-colors ${isOpen
                                                ? 'bg-primary text-white hover:bg-primary-dark'
                                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                                }`}
                                        >
                                            {isOpen ? 'Apply Now' : 'Applications Closed'}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                        {admissions.length === 0 && (
                            <div className="col-span-full text-center py-12 bg-white rounded-lg shadow-sm">
                                <p className="text-gray-500">No active admission cycles at the moment.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Admissions;
