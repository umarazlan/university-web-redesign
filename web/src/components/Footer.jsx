import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-white text-lg font-bold mb-4">AWKUM</h3>
                        <p className="text-sm leading-relaxed text-gray-400">
                            Abdul Wali Khan University Mardan is a premier institution of higher learning dedicated to excellence in education and research.
                        </p>
                        <div className="flex space-x-4 mt-6">
                            <a href="#" className="hover:text-blue-400"><Facebook className="h-5 w-5" /></a>
                            <a href="#" className="hover:text-blue-400"><Twitter className="h-5 w-5" /></a>
                            <a href="#" className="hover:text-blue-400"><Linkedin className="h-5 w-5" /></a>
                            <a href="#" className="hover:text-pink-400"><Instagram className="h-5 w-5" /></a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-white text-lg font-bold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
                            <li><a href="#" className="hover:text-white transition">Academics</a></li>
                            <li><Link to="/about#research" className="hover:text-white transition">Research</Link></li>
                            <li><a href="#" className="hover:text-white transition">Campus Life</a></li>
                            <li><a href="#" className="hover:text-white transition">Alumni</a></li>
                            <li><Link to="/staff/login" className="hover:text-yellow-300 transition text-gray-400 font-semibold">Staff Portal</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white text-lg font-bold mb-4">Admissions</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-white transition">How to Apply</a></li>
                            <li><a href="#" className="hover:text-white transition">Scholarships</a></li>
                            <li><a href="#" className="hover:text-white transition">Fee Structure</a></li>
                            <li><a href="#" className="hover:text-white transition">International Students</a></li>
                            <li><a href="#" className="hover:text-white transition">Academic Calendar</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white text-lg font-bold mb-4">Contact</h3>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start space-x-3">
                                <MapPin className="h-10 w-8 mt-0.5 text-blue-400" />
                                <span>Garden Campus, Toru Road, Mardan, Khyber Pakhtunkhwa, Pakistan</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Phone className="h-5 w-5 text-blue-400" />
                                <span>+92-937-9230640</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Mail className="h-5 w-5 text-blue-400" />
                                <span>registrar@awkum.edu.pk</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-500">
                    &copy; {new Date().getFullYear()} Abdul Wali Khan University Mardan. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
