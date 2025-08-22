import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";
import axios from "../axios";
import type { User, UserFormData } from "../types";
import UserForm from "./UserForm";

const UserFormContainer: React.FC<{ mode: "create" | "edit" }> = ({ mode }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(mode === "edit");
  const [error, setError] = useState<string | null>(null);
  const [initialData, setInitialData] = useState<UserFormData | undefined>(
    undefined
  );

  useEffect(() => {
    const fetchUser = async () => {
      if (mode === "edit" && id) {
        try {
          const response = await axios.get<User>(`/api/users/${id}`);
          setInitialData({
            full_name: response.data.full_name,
            email: response.data.email,
            roles: response.data.roles.map((role) => role.id),
          });
        } catch (error) {
          if (isAxiosError(error)) {
            setError(
              error.response?.data?.message || "Failed to fetch user details"
            );
          } else {
            setError("An unexpected error occurred");
          }
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUser();
  }, [mode, id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  const handleSubmit = async (data: UserFormData) => {
    try {
      if (mode === "edit" && id) {
        await axios.put(`/api/users/${id}`, data);
      } else {
        await axios.post("/api/users", data);
      }
      navigate("/users");
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.data?.errors) {
          throw error;
        } else {
          throw new Error("Failed to save user");
        }
      }
      throw new Error("An unexpected error occurred");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700">
            <h1 className="text-2xl font-semibold text-white">
              {mode === "edit" ? "Edit User" : "Create New User"}
            </h1>
          </div>
          <div className="p-6">
            <UserForm
              initialData={initialData}
              onSubmit={handleSubmit}
              submitButtonText={mode === "edit" ? "Update User" : "Create User"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserFormContainer;
