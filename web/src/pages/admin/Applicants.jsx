import { useState, useEffect } from 'react';
import { Users, Trash, Edit, Save, X } from 'lucide-react';
import api from '../../services/api';

const Applicants = () => {
    const [applicants, setApplicants] = useState([]);
    const [applicantData, setApplicantData] = useState({
        name: '', fatherName: '', cnic: '', program: 'Computer Science', testScore: '', academicScore: ''
    });
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(true);

    const programs = ['Computer Science', 'English', 'Chemistry', 'Mathematics'];

    useEffect(() => {
        fetchApplicants();
    }, []);

    const fetchApplicants = async () => {
        try {
            const res = await api.get('/merit/applicants');
            setApplicants(res.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                const res = await api.put(`/merit/applicants/${editingId}`, applicantData);
                setApplicants(applicants.map(app => app.id === editingId ? res.data : app));
                alert('Applicant updated!');
                setEditingId(null);
            } else {
                const res = await api.post('/merit/applicants', applicantData);
                setApplicants([res.data, ...applicants]);
                alert('Applicant added!');
            }
            setApplicantData({ name: '', fatherName: '', cnic: '', program: 'Computer Science', testScore: '', academicScore: '' });
        } catch (error) {
            alert('Error saving applicant');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this applicant?')) return;
        try {
            await api.delete(`/merit/applicants/${id}`);
            setApplicants(applicants.filter(app => app.id !== id));
        } catch (error) {
            alert('Error deleting applicant');
        }
    };

    const handleEdit = (applicant) => {
        setEditingId(applicant.id);
        setApplicantData({
            name: applicant.name,
            fatherName: applicant.fatherName,
            cnic: applicant.cnic,
            program: applicant.program,
            testScore: applicant.testScore,
            academicScore: applicant.academicScore
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setApplicantData({ name: '', fatherName: '', cnic: '', program: 'Computer Science', testScore: '', academicScore: '' });
    };

    return (
        <div className="space-y-8">
            {/* Form Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-2">
                        <Users className="h-6 w-6 text-primary" />
                        <h2 className="text-xl font-bold text-gray-800">{editingId ? 'Edit Applicant' : 'Add Applicant'}</h2>
                    </div>
                    {editingId && (
                        <button onClick={handleCancelEdit} className="text-sm text-red-500 hover:underline flex items-center">
                            <X className="h-3 w-3 mr-1" /> Cancel Edit
                        </button>
                    )}
                </div>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium">Applicant Name</label>
                        <input type="text" required className="mt-1 w-full border rounded-md p-2"
                            value={applicantData.name} onChange={e => setApplicantData({ ...applicantData, name: e.target.value })} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Father Name</label>
                        <input type="text" required className="mt-1 w-full border rounded-md p-2"
                            value={applicantData.fatherName} onChange={e => setApplicantData({ ...applicantData, fatherName: e.target.value })} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">CNIC</label>
                        <input type="text" required className="mt-1 w-full border rounded-md p-2"
                            value={applicantData.cnic} onChange={e => setApplicantData({ ...applicantData, cnic: e.target.value })} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Program</label>
                        <select className="mt-1 w-full border rounded-md p-2"
                            value={applicantData.program} onChange={e => setApplicantData({ ...applicantData, program: e.target.value })}>
                            {programs.map(p => <option key={p}>{p}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Test Score (0-100)</label>
                        <input type="number" required className="mt-1 w-full border rounded-md p-2"
                            value={applicantData.testScore} onChange={e => setApplicantData({ ...applicantData, testScore: e.target.value })} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Academic Score (Normalized/100)</label>
                        <input type="number" required className="mt-1 w-full border rounded-md p-2"
                            value={applicantData.academicScore} onChange={e => setApplicantData({ ...applicantData, academicScore: e.target.value })} />
                    </div>
                    <div className="md:col-span-2">
                        <button type="submit" className={`w-full py-2 rounded-md transition-colors text-white font-medium ${editingId ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-900 hover:bg-gray-800'}`}>
                            {editingId ? 'Update Applicant Record' : 'Add Applicant Record'}
                        </button>
                    </div>
                </form>
            </div>

            {/* List Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-lg font-bold text-gray-800">Recent Applicants</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name / Father Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CNIC</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Program</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Scores</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {loading ? (
                                <tr><td colSpan="5" className="px-6 py-4 text-center">Loading...</td></tr>
                            ) : applicants.length === 0 ? (
                                <tr><td colSpan="5" className="px-6 py-4 text-center text-gray-500">No applicants found</td></tr>
                            ) : (
                                applicants.map((app) => (
                                    <tr key={app.id} className={editingId === app.id ? 'bg-blue-50' : 'hover:bg-gray-50'}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{app.name}</div>
                                            <div className="text-sm text-gray-500">{app.fatherName}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{app.cnic}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                                {app.program}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <div>Test: <span className="font-bold">{app.testScore}</span></div>
                                            <div>Acad: <span className="font-bold">{app.academicScore}</span></div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                            <button onClick={() => handleEdit(app)} className="text-primary hover:text-blue-900 p-1 bg-blue-50 rounded">
                                                <Edit className="h-4 w-4" />
                                            </button>
                                            <button onClick={() => handleDelete(app.id)} className="text-red-600 hover:text-red-900 p-1 bg-red-50 rounded">
                                                <Trash className="h-4 w-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Applicants;
