import { Building2, BookOpen, Users, Globe, Award, Microscope, ScrollText } from 'lucide-react';

const About = () => {
    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Hero Section */}
            <div className="relative bg-primary text-white py-24">
                <div className="absolute inset-0 overflow-hidden">
                    <img
                        src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
                        alt="University Campus"
                        className="w-full h-full object-cover opacity-20"
                    />
                </div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">About AWKUM</h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                        A center of excellence dedicated to education, research, and innovation.
                    </p>
                </div>
            </div>

            {/* University Overview */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Our History & Legacy</h2>
                        <p className="text-gray-600 mb-4 leading-relaxed">
                            Abdul Wali Khan University Mardan (AWKUM) was established in 2009. Within a short span of time, it has emerged as one of the leading institutions of Khyber Pakhtunkhwa. The university is named after the great freedom fighter, Khan Abdul Wali Khan, honoring his struggle for democracy and rights.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            Starting with a few departments, AWKUM now boasts multiple campuses and a wide array of disciplines ranging from Social Sciences to Natural Sciences and Technology. We are committed to providing affordable quality education to the masses.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
                            <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                            <h3 className="text-2xl font-bold text-gray-900">12k+</h3>
                            <p className="text-sm text-gray-500">Students</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
                            <Building2 className="h-8 w-8 text-primary mx-auto mb-2" />
                            <h3 className="text-2xl font-bold text-gray-900">3</h3>
                            <p className="text-sm text-gray-500">Campuses</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
                            <BookOpen className="h-8 w-8 text-primary mx-auto mb-2" />
                            <h3 className="text-2xl font-bold text-gray-900">30+</h3>
                            <p className="text-sm text-gray-500">Departments</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
                            <Globe className="h-8 w-8 text-primary mx-auto mb-2" />
                            <h3 className="text-2xl font-bold text-gray-900">Top 10</h3>
                            <p className="text-sm text-gray-500">National Ranking</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Vision & Mission */}
            <div className="bg-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-blue-50 p-8 rounded-xl border-l-4 border-primary">
                            <h3 className="text-2xl font-bold text-primary mb-4">Vision</h3>
                            <p className="text-gray-700 italic">
                                "To become a center of excellence in education and research, contributing effectively to the socio-economic development of the region and the country."
                            </p>
                        </div>
                        <div className="bg-green-50 p-8 rounded-xl border-l-4 border-green-600">
                            <h3 className="text-2xl font-bold text-green-800 mb-4">Mission</h3>
                            <p className="text-gray-700 italic">
                                "To provide quality education and foster a culture of research and innovation, empowering students with knowledge and skills to face global challenges."
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Research Section */}
            <div id="research" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-12">
                    <span className="text-primary font-semibold tracking-wider uppercase text-sm">Innovation & Discovery</span>
                    <h2 className="text-3xl font-bold text-gray-900 mt-2">Research at AWKUM</h2>
                    <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                        We pride ourselves on a vibrant research culture. Our Office of Research, Innovation, and Commercialization (ORIC) actively supports faculty and students in cutting-edge projects.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    <div className="card bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-500">
                        <Microscope className="h-10 w-10 text-blue-500 mb-4" />
                        <h3 className="text-xl font-bold mb-2">Natural Sciences</h3>
                        <p className="text-gray-600 text-sm">
                            Leading research in Chemistry, Physics, and Zoology with focus on material science and biodiversity.
                        </p>
                    </div>
                    <div className="card bg-white p-6 rounded-lg shadow-md border-t-4 border-green-500">
                        <Globe className="h-10 w-10 text-green-500 mb-4" />
                        <h3 className="text-xl font-bold mb-2">Social Sciences</h3>
                        <p className="text-gray-600 text-sm">
                            Addressing societal challenges through Psychology, Sociology, and Economics research.
                        </p>
                    </div>
                    <div className="card bg-white p-6 rounded-lg shadow-md border-t-4 border-purple-500">
                        <Award className="h-10 w-10 text-purple-500 mb-4" />
                        <h3 className="text-xl font-bold mb-2">Computer Science</h3>
                        <p className="text-gray-600 text-sm">
                            Innovating in AI, Data Science, and Network Security to shape the digital future.
                        </p>
                    </div>
                </div>

                <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-xl">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        <div className="p-10 md:p-12 flex flex-col justify-center">
                            <h3 className="text-2xl font-bold text-white mb-6">Our Research Journals</h3>
                            <ul className="space-y-4">
                                <li className="flex items-center text-gray-300">
                                    <ScrollText className="h-5 w-5 mr-3 text-primary-light" />
                                    <span>Tahdhib-al-Afkar (Islamic Studies)</span>
                                </li>
                                <li className="flex items-center text-gray-300">
                                    <ScrollText className="h-5 w-5 mr-3 text-primary-light" />
                                    <span>FWU Journal of Social Sciences (Collaborative)</span>
                                </li>
                                <li className="flex items-center text-gray-300">
                                    <ScrollText className="h-5 w-5 mr-3 text-primary-light" />
                                    <span>AWKUM Journal of Management Sciences</span>
                                </li>
                                <li className="flex items-center text-gray-300">
                                    <ScrollText className="h-5 w-5 mr-3 text-primary-light" />
                                    <span>Review of Law and Economics</span>
                                </li>
                            </ul>
                            <button className="mt-8 self-start px-6 py-3 bg-primary text-white font-semibold rounded-md hover:bg-primary-light transition">
                                Access Repository
                            </button>
                        </div>
                        <div className="hidden md:block">
                            <img
                                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                                alt="Research Work"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Administration / Leadership */}
            <div className="bg-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-12">Administration</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="flex flex-col items-center">
                            <div className="h-32 w-32 rounded-full bg-gray-200 mb-4 overflow-hidden">
                                {/* Placeholder for Chancellor Image */}
                                <UserPlaceholder />
                            </div>
                            <h3 className="text-lg font-bold">Governor KP</h3>
                            <p className="text-primary text-sm">Chancellor</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="h-32 w-32 rounded-full bg-gray-200 mb-4 overflow-hidden">
                                {/* Placeholder for VC Image */}
                                <UserPlaceholder />
                            </div>
                            <h3 className="text-lg font-bold">Prof. Dr. Zahoor Ul Haq</h3>
                            <p className="text-primary text-sm">Vice Chancellor</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="h-32 w-32 rounded-full bg-gray-200 mb-4 overflow-hidden">
                                {/* Placeholder for Registrar Image */}
                                <UserPlaceholder />
                            </div>
                            <h3 className="text-lg font-bold">Muhammad Tariq</h3>
                            <p className="text-primary text-sm">Registrar</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Simple internal placeholder component
const UserPlaceholder = () => (
    <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500">
        <Users className="h-12 w-12" />
    </div>
);

export default About;
