import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, BookOpen, Award } from 'lucide-react';

const Home = () => {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="relative bg-primary-dark overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
                        alt="University Campus"
                        className="w-full h-full object-cover opacity-20"
                    />
                    <div className="absolute inset-0 bg-primary-dark/80 mix-blend-multiply" />
                </div>
                <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                        Abdul Wali Khan University Mardan
                    </h1>
                    <p className="mt-6 text-xl text-blue-100 max-w-3xl">
                        A premier institution dedicated to excellence in higher education, research, and innovation. Empowering the next generation of leaders.
                    </p>
                    <div className="mt-10 flex space-x-4">
                        <Link
                            to="/admissions"
                            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-white hover:bg-blue-50 transition"
                        >
                            Apply Admission
                        </Link>
                        <Link
                            to="/news"
                            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition"
                        >
                            Latest News
                        </Link>
                    </div>
                </div>
            </div>

            {/* Features Stats */}
            <div className="py-12 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 text-center">
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <BookOpen className="mx-auto h-12 w-12 text-primary" />
                            <h3 className="mt-4 text-2xl font-bold text-gray-900">50+</h3>
                            <p className="text-gray-500">Academic Programs</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <Award className="mx-auto h-12 w-12 text-primary" />
                            <h3 className="mt-4 text-2xl font-bold text-gray-900">#1</h3>
                            <p className="text-gray-500">Ranked in Region</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <Calendar className="mx-auto h-12 w-12 text-primary" />
                            <h3 className="mt-4 text-2xl font-bold text-gray-900">2009</h3>
                            <p className="text-gray-500">Established</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* News Highlights (Static Placeholder for now, can be dynamic later) */}
            <div className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900">Latest Updates</h2>
                        <Link to="/news" className="flex items-center text-primary font-medium hover:text-primary-dark">
                            View all news <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="flex flex-col rounded-lg shadow-lg overflow-hidden border border-gray-100 transition hover:shadow-xl">
                                <div className="flex-shrink-0">
                                    <img className="h-48 w-full object-cover" src={`https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60`} alt="University Event" />
                                </div>
                                <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-blue-600">
                                            Academic
                                        </p>
                                        <a href="#" className="block mt-2">
                                            <p className="text-xl font-semibold text-gray-900">
                                                Fall 2025 Admission Schedule Announced
                                            </p>
                                            <p className="mt-3 text-base text-gray-500">
                                                Admissions for the upcoming Fall semester are now open. Check eligibility criteria and applies online...
                                            </p>
                                        </a>
                                    </div>
                                    <div className="mt-6 flex items-center">
                                        <div className="text-sm text-gray-500">
                                            <time dateTime="2025-03-16">Mar 16, 2025</time>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
