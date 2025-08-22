import React, { useState, useEffect } from "react";
import axios from "../axios";
import { isAxiosError } from "axios";
import type { Role, UserFormData } from "../types";
import { useNavigate } from "react-router-dom";

interface UserFormProps {
  initialData?: UserFormData;
  onSubmit: (data: UserFormData) => Promise<void>;
  submitButtonText: string;
}

const UserForm: React.FC<UserFormProps> = ({
  initialData,
  onSubmit,
  submitButtonText,
}) => {
  const [roles, setRoles] = useState<Role[]>([]);
  const navigate = useNavigate();
  const [formData, setFormData] = useState<UserFormData>({
    full_name: "",
    email: "",
    roles: [],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    // Fetch roles from backend
    const fetchRoles = async () => {
      try {
        const response = await axios.get<Role[]>("/api/roles");
        setRoles(response.data);
      } catch (error: unknown) {
        console.error("Error fetching roles:", error);
        setErrors((prev) => ({
          ...prev,
          roles: "Failed to load roles. Please refresh the page.",
        }));
      }
    };
    fetchRoles();
  }, []);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      await onSubmit(formData);
    } catch (error: unknown) {
      if (isAxiosError(error) && error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors({
          general: "An unexpected error occurred. Please try again.",
        });
      }
    }
  };

  const handleRoleChange = (roleId: number) => {
    const newRoles = formData.roles.includes(roleId)
      ? formData.roles.filter((id) => id !== roleId)
      : [...formData.roles, roleId];
    setFormData({ ...formData, roles: newRoles });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700">
            <h1 className="text-2xl font-semibold text-white">
              Create New User
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.full_name}
                  onChange={(e) =>
                    setFormData({ ...formData, full_name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter full name"
                />
                {errors.full_name && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.full_name}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter email address"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-3">
                  Assign Roles
                </label>
                <div className="space-y-3">
                  {roles.map((role) => (
                    <label
                      key={role.id}
                      className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-all"
                    >
                      <input
                        type="checkbox"
                        checked={formData.roles.includes(role.id)}
                        onChange={() => handleRoleChange(role.id)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-all"
                      />
                      <span className="ml-3">
                        <span className="block text-sm font-medium text-gray-900">
                          {role.name}
                        </span>
                      </span>
                    </label>
                  ))}
                </div>
                {errors.roles && (
                  <p className="mt-1 text-sm text-red-600">{errors.roles}</p>
                )}
              </div>

              {errors.general && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-sm text-red-700">{errors.general}</p>
                </div>
              )}

              <div className="flex items-center justify-between pt-4">
                <button
                  type="button"
                  onClick={() => navigate("/users")}
                  className="text-gray-500 hover:text-gray-700 font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
                >
                  {submitButtonText}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
