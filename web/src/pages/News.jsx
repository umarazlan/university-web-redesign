import { useState, useEffect } from 'react';
import { Search, Filter, Calendar, Tag } from 'lucide-react';
import api from '../services/api';

const News = () => {
    const [news, setNews] = useState([]);
    const [filteredNews, setFilteredNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const res = await api.get('/news');
                setNews(res.data);
                setFilteredNews(res.data);
            } catch (error) {
                console.error("Error fetching news", error);
            } finally {
                setLoading(false);
            }
        };
        fetchNews();
    }, []);

    useEffect(() => {
        let result = news;
        if (filter !== 'All') {
            result = result.filter(item => item.category === filter);
        }
        if (search) {
            result = result.filter(item =>
                item.title.toLowerCase().includes(search.toLowerCase()) ||
                item.content.toLowerCase().includes(search.toLowerCase())
            );
        }
        setFilteredNews(result);
    }, [filter, search, news]);

    const categories = ['All', 'Academic', 'Events', 'Exams', 'Notifications'];

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900">University News & Updates</h1>
                    <p className="mt-4 text-gray-600">Stay informed with the latest announcements from AWKUM</p>
                </div>

                {/* Search & Filter */}
                <div className="bg-white p-6 rounded-lg shadow-sm mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search news..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary focus:outline-none"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="flex space-x-2 overflow-x-auto pb-2 md:pb-0">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${filter === cat ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* News Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredNews.length > 0 ? (
                        filteredNews.map((item) => (
                            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
                                {item.image ? (
                                    <img src={item.image} alt={item.title} className="h-48 w-full object-cover" />
                                ) : (
                                    <div className="h-48 w-full bg-primary/10 flex items-center justify-center">
                                        <Tag className="h-12 w-12 text-primary/40" />
                                    </div>
                                )}
                                <div className="p-6 flex flex-col flex-1">
                                    <div className="flex items-center text-xs text-gray-500 mb-3">
                                        <span className={`px-2 py-1 rounded bg-blue-50 text-blue-700 font-medium`}>
                                            {item.category}
                                        </span>
                                        <div className="flex items-center ml-auto">
                                            <Calendar className="h-3 w-3 mr-1" />
                                            {formatDate(item.date)}
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">{item.title}</h3>
                                    <p className="text-gray-600 mb-4 line-clamp-3 text-sm flex-1">{item.content}</p>
                                    <button className="text-primary font-medium hover:text-primary-dark mt-auto self-start">
                                        Read More &rarr;
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12">
                            <p className="text-gray-500 text-lg">No news found matching your criteria.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default News;
