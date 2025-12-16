import { useState, useEffect } from 'react';
import api from '../../services/api';
import { Calendar, CheckCircle, XCircle, Clock } from 'lucide-react';

const StaffAttendance = () => {
    const [attendance, setAttendance] = useState([]);
    const [stats, setStats] = useState({ present: 0, absent: 0, leave: 0, percentage: 0 });

    useEffect(() => {
        const fetchAttendance = async () => {
            try {
                const res = await api.get('/staff/attendance');
                setAttendance(res.data);
                calculateStats(res.data);
            } catch (error) {
                console.error('Failed to fetch attendance');
            }
        };
        fetchAttendance();
    }, []);

    const calculateStats = (data) => {
        const total = data.length;
        if (total === 0) return;

        const present = data.filter(a => a.status === 'Present').length;
        const absent = data.filter(a => a.status === 'Absent').length;
        const leave = data.filter(a => a.status === 'Leave').length;

        setStats({
            present,
            absent,
            leave,
            percentage: Math.round((present / total) * 100)
        });
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Present': return <CheckCircle className="h-5 w-5 text-green-500" />;
            case 'Absent': return <XCircle className="h-5 w-5 text-red-500" />;
            case 'Leave': return <Clock className="h-5 w-5 text-yellow-500" />;
            default: return null;
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">My Attendance</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <p className="text-xs text-gray-500 uppercase">Attendance Rate</p>
                    <p className="text-2xl font-bold text-primary mt-1">{stats.percentage}%</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <p className="text-xs text-gray-500 uppercase">Present Days</p>
                    <p className="text-2xl font-bold text-green-600 mt-1">{stats.present}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <p className="text-xs text-gray-500 uppercase">Absent Days</p>
                    <p className="text-2xl font-bold text-red-600 mt-1">{stats.absent}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <p className="text-xs text-gray-500 uppercase">Leaves Taken</p>
                    <p className="text-2xl font-bold text-yellow-600 mt-1">{stats.leave}</p>
                </div>
            </div>

            {/* Attendance List */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100">
                    <h3 className="font-semibold text-gray-800">Recent Records</h3>
                </div>
                <div className="divide-y divide-gray-100">
                    {attendance.length > 0 ? (
                        attendance.sort((a, b) => new Date(b.date) - new Date(a.date)).map((record) => (
                            <div key={record.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50">
                                <div className="flex items-center space-x-3">
                                    <div className="bg-gray-100 p-2 rounded-lg">
                                        <Calendar className="h-5 w-5 text-gray-600" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">{new Date(record.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                        <p className="text-xs text-gray-500">{new Date(record.date).toLocaleTimeString()}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    {getStatusIcon(record.status)}
                                    <span className={`text-sm font-medium ${record.status === 'Present' ? 'text-green-700' :
                                            record.status === 'Absent' ? 'text-red-700' : 'text-yellow-700'
                                        }`}>
                                        {record.status}
                                    </span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="p-8 text-center text-gray-500">
                            No attendance records found.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StaffAttendance;
