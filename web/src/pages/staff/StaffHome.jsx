import { useAuth } from '../../context/AuthContext';

const StaffHome = () => {
    const { user } = useAuth();

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">My Profile</h1>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
                <div className="bg-primary/5 p-6 border-b border-gray-100 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="h-20 w-20 rounded-full bg-primary text-white text-3xl font-bold flex items-center justify-center">
                            {user?.name?.charAt(0)}
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">{user?.name}</h2>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize mt-1">
                                {user?.role}
                            </span>
                        </div>
                    </div>
                    <div className="text-right">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${user?.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                            {user?.status || 'Active'}
                        </span>
                    </div>
                </div>

                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">Identification</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="text-xs text-gray-500">Staff ID</label>
                                <p className="font-medium text-gray-900">{user?.staffId}</p>
                            </div>
                            <div>
                                <label className="text-xs text-gray-500">Email Address</label>
                                <p className="font-medium text-gray-900">{user?.email}</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">Department Info</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="text-xs text-gray-500">Department</label>
                                <p className="font-medium text-gray-900">{user?.department}</p>
                            </div>
                            <div>
                                <label className="text-xs text-gray-500">Joined Date</label>
                                <p className="font-medium text-gray-900">{new Date(user?.dateJoined || Date.now()).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50 p-6 border-t border-gray-100">
                    <h3 className="text-sm font-medium text-gray-900">Current Responsibilities</h3>
                    <p className="mt-2 text-sm text-gray-500">
                        You are currently assigned as a <span className="font-semibold">{user?.role}</span> in the <span className="font-semibold">{user?.department}</span> department.
                        Please check your attendance regularly.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default StaffHome;
