import { useState, useEffect } from 'react';
import { FileText, Download, ChevronRight } from 'lucide-react';
import api from '../services/api';

const MeritList = () => {
    const [lists, setLists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedList, setSelectedList] = useState(null);

    useEffect(() => {
        const fetchLists = async () => {
            try {
                const res = await api.get('/merit/lists');
                setLists(res.data);
            } catch (error) {
                console.error("Error fetching merit lists", error);
            } finally {
                setLoading(false);
            }
        };
        fetchLists();
    }, []);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString();
    };

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900">Merit Lists</h1>
                    <p className="mt-4 text-gray-600">View provisional and final merit lists for various programs</p>
                </div>

                {loading ? (
                    <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* List of Merit Lists */}
                        <div className="lg:col-span-1 space-y-4">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">Available Lists</h2>
                            {lists.map((list) => (
                                <button
                                    key={list.id}
                                    onClick={() => setSelectedList(list)}
                                    className={`w-full text-left p-4 rounded-lg bg-white border transition-all ${selectedList?.id === list.id
                                            ? 'border-primary ring-1 ring-primary shadow-md'
                                            : 'border-gray-200 hover:border-primary/50'
                                        }`}
                                >
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-semibold text-gray-900">{list.title}</h3>
                                            <p className="text-sm text-gray-500 mt-1">{list.program}</p>
                                        </div>
                                        <ChevronRight className={`h-5 w-5 text-gray-400 ${selectedList?.id === list.id ? 'text-primary' : ''}`} />
                                    </div>
                                    <div className="mt-3 text-xs text-gray-400 flex items-center">
                                        <FileText className="h-3 w-3 mr-1" />
                                        Posted: {formatDate(list.generatedDate)}
                                    </div>
                                </button>
                            ))}
                            {lists.length === 0 && (
                                <p className="text-gray-500 italic">No merit lists published yet.</p>
                            )}
                        </div>

                        {/* List Detail View */}
                        <div className="lg:col-span-2">
                            {selectedList ? (
                                <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                                    <div className="flex justify-between items-center mb-6 pb-6 border-b border-gray-100">
                                        <div>
                                            <h2 className="text-2xl font-bold text-gray-900">{selectedList.title}</h2>
                                            <p className="text-gray-600">{selectedList.program} - Session 2025</p>
                                        </div>
                                        <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition shadow-sm">
                                            <Download className="h-4 w-4" />
                                            <span>Download PDF</span>
                                        </button>
                                    </div>

                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Rank</th>
                                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Name</th>
                                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Father Name</th>
                                                    <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Aggregate</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {selectedList.list.map((student, index) => (
                                                    <tr key={index} className="hover:bg-gray-50">
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                            #{index + 1}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                            {student.name}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {student.fatherName}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-bold text-primary">
                                                            {student.aggregate}%
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-white rounded-lg shadow-sm p-12 text-center border border-dashed border-gray-300">
                                    <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                                    <h3 className="text-lg font-medium text-gray-900">Select a list to view details</h3>
                                    <p className="text-gray-500">Click on any merit list from the sidebar to view the full student ranking.</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MeritList;
