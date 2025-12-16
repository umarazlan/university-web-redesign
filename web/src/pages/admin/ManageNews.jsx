import { useState, useEffect } from 'react';
import { Plus, Trash, Search } from 'lucide-react';
import api from '../../services/api';

const ManageNews = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({ title: '', content: '', category: 'Notifications', image: '' });

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        try {
            const res = await api.get('/news');
            setNews(res.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            await api.delete(`/news/${id}`);
            setNews(news.filter(item => item.id !== id));
        } catch (error) {
            alert('Failed to delete');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/news', formData);
            setNews([res.data, ...news]);
            setFormData({ title: '', content: '', category: 'Notifications', image: '' });
            setIsModalOpen(false);
        } catch (error) {
            alert('Failed to add news');
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Manage News</h2>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition"
                >
                    <Plus className="h-4 w-4" />
                    <span>Add News</span>
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {loading ? (
                            <tr><td colSpan="4" className="px-6 py-4 text-center">Loading...</td></tr>
                        ) : news.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.title}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.category}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(item.date).toLocaleDateString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-900">
                                        <Trash className="h-4 w-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Simple Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-8 max-w-md w-full">
                        <h3 className="text-lg font-bold mb-4">Add News Item</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Title</label>
                                <input type="text" required className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                    value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Category</label>
                                <select className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                    value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })}>
                                    <option>Notifications</option>
                                    <option>Academic</option>
                                    <option>Events</option>
                                    <option>Exams</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Content</label>
                                <textarea required className="mt-1 block w-full border border-gray-300 rounded-md p-2" rows="3"
                                    value={formData.content} onChange={e => setFormData({ ...formData, content: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Image URL</label>
                                <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                    value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} />
                            </div>
                            <div className="flex justify-end space-x-3 mt-6">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded-md hover:bg-gray-50">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageNews;
