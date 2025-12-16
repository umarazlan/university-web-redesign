import { useState, useEffect } from 'react';
import api from '../../services/api';
import { Plus, Trash, User, Shield, Briefcase } from 'lucide-react';

const ManageStaff = () => {
    const [staff, setStaff] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        name: '', email: '', staffId: '', department: '', role: 'Teacher', password: '', status: 'Active'
    });

    useEffect(() => {
        fetchStaff();
    }, []);

    const fetchStaff = async () => {
        try {
            const res = await api.get('/staff');
            setStaff(res.data);
        } catch (error) {
            console.error('Failed to fetch staff');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await api.put(`/staff/${editingId}`, formData);
                alert('Staff member updated successfully');
            } else {
                await api.post('/staff/create', formData);
                alert('Staff member created successfully');
            }
            fetchStaff();
            resetForm();
        } catch (error) {
            alert(error.response?.data?.message || 'Operation failed');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to remove this staff member? This action cannot be undone.')) {
            try {
                await api.delete(`/staff/${id}`);
                fetchStaff();
            } catch (error) {
                alert(error.response?.data?.message || 'Failed to delete staff');
            }
        }
    };

    const handleEdit = (member) => {
        setEditingId(member.id);
        setFormData({
            name: member.name,
            email: member.email,
            staffId: member.staffId,
            department: member.department,
            role: member.role,
            password: '',
            status: member.status || 'Active'
        });
        setIsModalOpen(true);
    };

    const resetForm = () => {
        setIsModalOpen(false);
        setEditingId(null);
        setFormData({ name: '', email: '', staffId: '', department: '', role: 'Teacher', password: '', status: 'Active' });
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Manage Staff</h2>
                <button
                    onClick={() => { resetForm(); setIsModalOpen(true); }}
                    className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition"
                >
                    <Plus className="h-4 w-4" />
                    <span>Add New Staff</span>
                </button>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Staff Info</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {staff.map((member) => (
                            <tr key={member.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold">
                                            {member.name.charAt(0)}
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">{member.name}</div>
                                            <div className="text-sm text-gray-500">{member.email}</div>
                                            <div className="text-xs text-gray-400">ID: {member.staffId}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                                        {member.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {member.department}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${member.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {member.status || 'Active'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <div className="flex justify-end space-x-3">
                                        <button onClick={() => handleEdit(member)} className="text-blue-600 hover:text-blue-900 flex items-center">
                                            <Briefcase className="h-4 w-4 mr-1" /> Edit
                                        </button>
                                        <button onClick={() => handleDelete(member.id)} className="text-red-600 hover:text-red-900 flex items-center">
                                            <Trash className="h-4 w-4 mr-1" /> Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-8 max-w-2xl w-full">
                        <h3 className="text-lg font-bold mb-4">{editingId ? 'Edit Staff Member' : 'Add New Staff Member'}</h3>
                        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                            <div className="col-span-2 md:col-span-1">
                                <label className="block text-sm font-medium">Full Name</label>
                                <input type="text" required className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                    value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                            </div>
                            <div className="col-span-2 md:col-span-1">
                                <label className="block text-sm font-medium">Email</label>
                                <input type="email" required className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                    value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Staff ID</label>
                                <input type="text" required className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                    value={formData.staffId} onChange={e => setFormData({ ...formData, staffId: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Department</label>
                                <input type="text" required className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                    value={formData.department} onChange={e => setFormData({ ...formData, department: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Role</label>
                                <select className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                    value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })}>
                                    <option value="Teacher">Teacher/Lecturer</option>
                                    <option value="Coordinator">Coordinator</option>
                                    <option value="HOD">Head of Department</option>
                                    <option value="Admin">Admin</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Status</label>
                                <select className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                    value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}>
                                    <option value="Active">Active</option>
                                    <option value="On Leave">On Leave</option>
                                    <option value="Resigned">Resigned</option>
                                </select>
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm font-medium">Password {editingId && '(Leave empty to keep unchanged)'}</label>
                                <input type="password" required={!editingId} className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                    value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} />
                            </div>

                            <div className="col-span-2 flex justify-end space-x-3 mt-4">
                                <button type="button" onClick={resetForm} className="px-4 py-2 border rounded-md hover:bg-gray-50">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark">
                                    {editingId ? 'Update Staff Member' : 'Create Staff Account'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageStaff;
