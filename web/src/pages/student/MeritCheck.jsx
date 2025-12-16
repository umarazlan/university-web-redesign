import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import { AlertCircle, CheckCircle, Clock } from 'lucide-react';

const MeritCheck = () => {
    const { user, loading: authLoading } = useAuth();
    const [loading, setLoading] = useState(true);
    const [hasApplied, setHasApplied] = useState(false);
    const [applications, setApplications] = useState([]);

    // Application Form State
    const [formData, setFormData] = useState({
        program: 'Computer Science',
        fatherName: '',
        cnic: user?.cnic || '',
        academicScore: ''
    });

    useEffect(() => {
        if (!user && !authLoading) {
            // Redirect or show access denied
            // For now, we return early in render, but explicit redirect is better
            window.location.href = '/login';
            return;
        }
        if (user) {
            fetchStatus();
        }
    }, [user, authLoading]);

    const fetchStatus = async () => {
        try {
            const res = await api.get('/student/merit-status');
            setHasApplied(res.data.hasApplied);
            if (res.data.hasApplied) {
                setApplications(res.data.applications);
            }
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const handleApply = async (e) => {
        e.preventDefault();
        try {
            await api.post('/student/apply', formData);
            alert('Application Submitted Successfully!');
            fetchStatus(); // Refresh status
        } catch (error) {
            alert(error.response?.data?.message || 'Application failed');
        }
    };

    if (authLoading || loading) return <div className="text-center py-20">Loading status...</div>;
    if (!user) return <div className="text-center py-20">Please log in.</div>;

    return (
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Admission & Merit Portal</h1>

            {!hasApplied ? (
                <div className="bg-white shadow sm:rounded-lg overflow-hidden">
                    <div className="px-4 py-5 sm:p-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                            Apply for Admission
                        </h3>
                        <div className="mt-2 max-w-xl text-sm text-gray-500">
                            <p>Please submit your details to be considered for the merit list.</p>
                        </div>
                        <form className="mt-5 space-y-4" onSubmit={handleApply}>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                    <input type="text" disabled value={user.name} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-100 sm:text-sm" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Father Name</label>
                                    <input type="text" required value={formData.fatherName} onChange={e => setFormData({ ...formData, fatherName: e.target.value })} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-primary focus:border-primary sm:text-sm" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">CNIC</label>
                                    <input type="text" required value={formData.cnic} onChange={e => setFormData({ ...formData, cnic: e.target.value })} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-primary focus:border-primary sm:text-sm" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Program</label>
                                    <select value={formData.program} onChange={e => setFormData({ ...formData, program: e.target.value })} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-primary focus:border-primary sm:text-sm">
                                        <option>Computer Science</option>
                                        <option>English</option>
                                        <option>Chemistry</option>
                                        <option>Mathematics</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Academic Score (Normalized/100)</label>
                                    <input type="number" required value={formData.academicScore} onChange={e => setFormData({ ...formData, academicScore: e.target.value })} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-primary focus:border-primary sm:text-sm" />
                                </div>
                            </div>
                            <div className="pt-5">
                                <button type="submit" className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                                    Submit Application
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            ) : (
                <div className="space-y-6">
                    <div className="bg-white shadow sm:rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Your Applications Status</h3>

                            {applications.map((app, index) => (
                                <div key={index} className="border-t border-gray-200 pt-4 mt-4 first:border-0 first:pt-0 first:mt-0">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="text-lg font-bold text-gray-800">{app.program}</h4>
                                            <p className="text-sm text-gray-500">Applied on: {new Date(app.appliedDate).toLocaleDateString()}</p>
                                            <p className="text-xs text-gray-400">Valid Until: {new Date(app.validUntil).toLocaleDateString()}</p>
                                        </div>
                                        <div className="text-right">
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium 
                                                ${app.meritStatus === 'Selected' ? 'bg-green-100 text-green-800' :
                                                    app.meritStatus === 'Not Selected' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                {app.meritStatus === 'Selected' && <CheckCircle className="w-4 h-4 mr-1" />}
                                                {app.meritStatus === 'Pending' && <Clock className="w-4 h-4 mr-1" />}
                                                {app.meritStatus === 'Not Selected' && <AlertCircle className="w-4 h-4 mr-1" />}
                                                {app.meritStatus}
                                            </span>
                                        </div>
                                    </div>

                                    {app.meritStatus === 'Selected' && (
                                        <div className="mt-4 bg-green-50 p-4 rounded-md">
                                            <p className="text-green-800 font-medium">Congratulations! You have been selected.</p>
                                            <p className="text-sm text-green-700 mt-1">
                                                Merit List: {app.meritListTitle} | Position: #{app.position}
                                            </p>
                                        </div>
                                    )}

                                    <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-gray-600">
                                        <div>Test Score: <span className="font-semibold">{app.testScore || 'Pending (Admin to add)'}</span></div>
                                        <div>Academic Score: <span className="font-semibold">{app.academicScore}</span></div>
                                    </div>
                                </div>
                            ))}

                            <div className="mt-6 border-t border-gray-200 pt-4">
                                <button onClick={() => setHasApplied(false)} className="text-primary hover:text-primary-dark text-sm font-medium">
                                    + Apply for another program
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MeritCheck;
