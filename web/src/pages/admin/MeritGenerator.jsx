import { useState } from 'react';
import { Play } from 'lucide-react';
import api from '../../services/api';

const MeritGenerator = () => {
    const [genCriteria, setGenCriteria] = useState({
        program: 'Computer Science', title: 'First Merit List', testWeight: 50, academicWeight: 50
    });

    const handleGenerate = async (e) => {
        e.preventDefault();
        try {
            await api.post('/merit/generate', genCriteria);
            alert('Merit list generated successfully!');
        } catch (error) {
            alert(error.response?.data?.message || 'Error generating list');
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center space-x-2 mb-6">
                <Play className="h-6 w-6 text-green-600" />
                <h2 className="text-xl font-bold text-gray-800">Generate Merit List</h2>
            </div>
            <form onSubmit={handleGenerate} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium">Title (e.g., First Merit List)</label>
                        <input type="text" required className="mt-1 w-full border rounded-md p-2"
                            value={genCriteria.title} onChange={e => setGenCriteria({ ...genCriteria, title: e.target.value })} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Program</label>
                        <select className="mt-1 w-full border rounded-md p-2"
                            value={genCriteria.program} onChange={e => setGenCriteria({ ...genCriteria, program: e.target.value })}>
                            <option>Computer Science</option>
                            <option>English</option>
                            <option>Chemistry</option>
                            <option>Mathematics</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Test Weightage (%)</label>
                        <input type="number" required className="mt-1 w-full border rounded-md p-2"
                            value={genCriteria.testWeight} onChange={e => setGenCriteria({ ...genCriteria, testWeight: Number(e.target.value) })} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Academic Weightage (%)</label>
                        <input type="number" required className="mt-1 w-full border rounded-md p-2"
                            value={genCriteria.academicWeight} onChange={e => setGenCriteria({ ...genCriteria, academicWeight: Number(e.target.value) })} />
                    </div>
                </div>
                <button type="submit" className="w-full bg-primary text-white py-3 rounded-md hover:bg-primary-dark font-medium text-lg">
                    Generate & Publish List
                </button>
            </form>
        </div>
    );
};

export default MeritGenerator;
