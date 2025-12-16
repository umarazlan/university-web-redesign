import { useState, useEffect } from 'react';
import { Plus, Trash, Check, X } from 'lucide-react';
import api from '../../services/api';

const ManageAdmissions = () => {
    const [admissions, setAdmissions] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({ title: '', department: '', deadline: '', criteria: '', status: 'Open' });

    useEffect(() => {
        const fetchAdmissions = async () => {
            const res = await api.get('/admissions');
            setAdmissions(res.data);
        };
        fetchAdmissions();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Deleting this admission cycle. Continue?')) return;
        try {
            await api.delete(`/admissions/${id}`);
            setAdmissions(admissions.filter(item => item.id !== id));
        } catch (error) {
            alert('Failed to delete');
        }
    };

    const toggleStatus = async (item) => {
        const newStatus = item.status === 'Open' ? 'Closed' : 'Open';
        try {
            const res = await api.put(`/admissions/${item.id}`, { ...item, status: newStatus });
            setAdmissions(admissions.map(a => a.id === item.id ? res.data : a));
        } catch (error) {
            alert('Failed to update');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/admissions', formData);
            setAdmissions([...admissions, res.data]);
            setIsModalOpen(false);
            setFormData({ title: '', department: '', deadline: '', criteria: '', status: 'Open' });
        } catch (error) {
            alert('Failed to create');
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Manage Admissions</h2>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition"
                >
                    <Plus className="h-4 w-4" />
                    <span>New Admission Cycle</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {admissions.map((item) => {
                    const isExpired = new Date(item.deadline) < new Date();
                    return (
                        <div key={item.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex justify-between items-start">
                            <div>
                                <div className="flex items-center space-x-2 mb-2">
                                    {isExpired ? (
                                        <span className="px-2 py-0.5 rounded text-xs font-bold bg-gray-100 text-gray-500 border border-gray-300">
                                            Expired
                                        </span>
                                    ) : (
                                        <span className={`px-2 py-0.5 rounded text-xs font-bold ${item.status === 'Open' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                            {item.status}
                                        </span>
                                    )}
                                    <span className="text-sm text-gray-500">{item.department}</span>
                                </div>
                                <h3 className="font-bold text-lg">{item.title}</h3>
                                <p className={`text-sm mt-1 ${isExpired ? 'text-red-500 font-semibold' : 'text-gray-600'}`}>
                                    Deadline: {new Date(item.deadline).toLocaleDateString()}
                                </p>
                                <p className="text-sm text-gray-500 mt-2 italic">{item.criteria}</p>
                            </div>
                            <div className="flex flex-col space-y-2">
                                <button onClick={() => toggleStatus(item)} className="p-2 text-gray-400 hover:text-primary bg-gray-50 rounded-full">
                                    {item.status === 'Open' ? <X className="h-4 w-4" /> : <Check className="h-4 w-4" />}
                                </button>
                                <button onClick={() => handleDelete(item.id)} className="p-2 text-red-400 hover:text-red-700 bg-red-50 rounded-full">
                                    <Trash className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-8 max-w-md w-full">
                        <h3 className="text-lg font-bold mb-4">New Admission Cycle</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium">Title</label>
                                <input type="text" required className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                    value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Department</label>
                                <input type="text" required className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                    value={formData.department} onChange={e => setFormData({ ...formData, department: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Deadline</label>
                                <input type="date" required className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                    value={formData.deadline} onChange={e => setFormData({ ...formData, deadline: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Criteria</label>
                                <textarea required className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                    value={formData.criteria} onChange={e => setFormData({ ...formData, criteria: e.target.value })} />
                            </div>
                            <div className="flex justify-end space-x-3 mt-6">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded-md hover:bg-gray-50">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark">Create</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageAdmissions;
