import React, { useState, useEffect } from "react";
import axios from "../axios";
import type { UsersByRole } from "../types";

const UserList: React.FC = () => {
  const [usersByRole, setUsersByRole] = useState<UsersByRole>({});

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<UsersByRole>("/api/users");
        setUsersByRole(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Users by Role</h1>
          <button
            onClick={() => (window.location.href = "/")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add New User
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(usersByRole).map(([role, users]) => (
            <div
              key={role}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700">
                <h2 className="text-xl font-semibold text-white flex items-center">
                  <span className="mr-2">{role}</span>
                  <span className="bg-white/20 text-white text-sm py-1 px-2 rounded-full">
                    {users.length} {users.length === 1 ? "user" : "users"}
                  </span>
                </h2>
              </div>

              <div className="px-6 py-4">
                {users.length > 0 ? (
                  <div className="divide-y divide-gray-200">
                    {users.map((user) => (
                      <div
                        key={user.id}
                        className="py-4 flex items-center justify-between"
                      >
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">
                            {user.full_name}
                          </h3>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            className="text-gray-400 hover:text-blue-600 transition-colors"
                            title="Edit user"
                            aria-label="Edit user"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 text-gray-500">
                    No users with this role
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserList;
