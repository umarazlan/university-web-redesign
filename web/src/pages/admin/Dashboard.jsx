import { FileText, Calendar, TrendingUp, Users } from 'lucide-react';

const Dashboard = () => {
    // In a real app, these would be fetched from API
    const stats = [
        { name: 'Total News', value: '12', icon: FileText, change: '+2 this week', color: 'bg-blue-500' },
        { name: 'Active Admissions', value: '3', icon: Calendar, change: 'Ends in 5 days', color: 'bg-green-500' },
        { name: 'Total Applicants', value: '145', icon: TrendingUp, change: '+28 today', color: 'bg-purple-500' },
    ];

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {stats.map((stat) => (
                    <div key={stat.name} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                            </div>
                            <div className={`${stat.color} p-3 rounded-lg text-white`}>
                                <stat.icon className="h-6 w-6" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center text-sm">
                            <span className="text-green-600 font-medium">{stat.change}</span>
                            <span className="text-gray-400 ml-2">vs last period</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900">Recent Activity</h3>
                </div>
                <div className="divide-y divide-gray-100">
                    {[
                        { action: 'New Student Registered', desc: 'Sarah Khan registered for BS Computer Science', time: '2 mins ago', icon: Users, color: 'bg-green-100 text-green-600' },
                        { action: 'Application Submitted', desc: 'Ali Ahmed submitted application for Fall 2025', time: '15 mins ago', icon: FileText, color: 'bg-blue-100 text-blue-600' },
                        { action: 'Merit List Generated', desc: 'BS Software Engineering Merit List #1 Generated', time: '1 hour ago', icon: TrendingUp, color: 'bg-purple-100 text-purple-600' },
                        { action: 'New Staff Member', desc: 'Dr. Hamza assigned as Coordinator for Physics', time: '3 hours ago', icon: Calendar, color: 'bg-orange-100 text-orange-600' },
                        { action: 'System Update', desc: 'Database backup completed successfully', time: '5 hours ago', icon: FileText, color: 'bg-gray-100 text-gray-600' },
                    ].map((item, index) => (
                        <div key={index} className="p-6 flex items-start space-x-4 hover:bg-gray-50 transition duration-150">
                            <div className={`p-2 rounded-full ${item.color} flex-shrink-0`}>
                                <item.icon className="h-5 w-5" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900">{item.action}</p>
                                <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
                            </div>
                            <span className="text-xs text-gray-400 whitespace-nowrap">{item.time}</span>
                        </div>
                    ))}
                </div>
                <div className="p-4 bg-gray-50 border-t border-gray-100 text-center">
                    <button className="text-sm text-primary font-medium hover:text-primary-dark">View All Activity</button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
