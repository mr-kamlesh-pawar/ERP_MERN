import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil, Plus, Trash2 } from "lucide-react";
import React, { useState, useEffect } from "react";
import axios from "axios";

const ShowAdmins = () => {
  const [admins, setAdmins] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [action, setAction] = useState("create");
  const [adminData, setAdminData] = useState({
    id: null,
    userName: "",
    email: "",
    password: "",
  });

  // Fetch all admins from the backend
  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/admin/admins");
        setAdmins(response.data.admins);
      } catch (error) {
        console.error("Error fetching admins:", error);
      }
    };
    fetchAdmins();
  }, []);

  // Handle Create/Update
  const handleSaveAdmin = async () => {
    try {
      if (action === "create") {
        // Create a new admin
        const response = await axios.post("http://localhost:5000/api/admin/admins", adminData);
        setAdmins([...admins, response.data.admin]);
      } else if (action === "update") {
        // Update an existing admin
        const response = await axios.put(
          `http://localhost:5000/api/admin/admins/${adminData.id}`,
          adminData
        );
        setAdmins(admins.map((admin) => (admin._id === adminData.id ? response.data.admin : admin)));
      }
      setShowModal(false);
      setAdminData({
        id: null,
        userName: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.error("Error saving admin:", error);
    }
  };

  // Handle Delete
  const handleDeleteAdmin = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/admins/${id}`);
      setAdmins(admins.filter((admin) => admin._id !== id));
    } catch (error) {
      console.error("Error deleting admin:", error);
    }
  };

  // Open Modal for Create or Update
  const openModal = (admin = null, actionType = "create") => {
    setAction(actionType);
    setAdminData(
      admin || {
        id: null,
        userName: "",
        email: "",
        password: "",
      }
    );
    setShowModal(true);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Manage Admin</h1>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 mb-6">
        <Button
          onClick={() => openModal(null, "create")}
          className="text-white bg-blue-800 flex items-center font-bold"
        >
          <Plus size={44} strokeWidth={3} />
          Create Admin
        </Button>
      </div>

      {/* Admin Table */}
      <div className="overflow-x-auto mb-8">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border border-gray-300 text-sm sm:text-base">ID</th>
              <th className="px-4 py-2 border border-gray-300 text-sm sm:text-base">Name</th>
              <th className="px-4 py-2 border border-gray-300 text-sm sm:text-base">Email</th>
              <th className="px-4 py-2 border border-gray-300 text-sm sm:text-base">Actions</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin._id}>
                <td className="px-4 py-2 border border-gray-300">{admin._id}</td>
                <td className="px-4 py-2 border border-gray-300">{admin.userName}</td>
                <td className="px-4 py-2 border border-gray-300">{admin.email}</td>
                <td className="px-4 py-2 border border-gray-300">
                  <Button
                    onClick={() => openModal(admin, "update")}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
                  >
                    <Pencil /> Update
                  </Button>
                  <Button
                    onClick={() => handleDeleteAdmin(admin._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 ml-2"
                  >
                    <Trash2 /> Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Create/Update Admin */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md shadow-lg w-96 sm:w-3/4 md:w-1/2 lg:w-1/3">
            <h2 className="text-xl font-bold mb-4">
              {action === "create" ? "Create Admin" : "Update Admin"}
            </h2>

            <div className="mb-4">
              <Label htmlFor="userName" className="block text-sm font-semibold text-gray-700">
                UserName
              </Label>
              <Input
                id="userName"
                type="text"
                value={adminData.userName}
                onChange={(e) => setAdminData({ ...adminData, userName: e.target.value })}
                className="mt-2 w-full"
              />
            </div>

            <div className="mb-4">
              <Label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={adminData.email}
                onChange={(e) => setAdminData({ ...adminData, email: e.target.value })}
                disabled={action === "update"}
                className="mt-2 w-full"
              />
            </div>

            <div className="mb-4">
              <Label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={adminData.password}
                onChange={(e) => setAdminData({ ...adminData, password: e.target.value })}
                disabled={action === "update"}
                className="mt-2 w-full"
              />
            </div>

            <div className="flex justify-end gap-4">
              <Button onClick={() => setShowModal(false)} className="bg-gray-600 text-white">
                Cancel
              </Button>
              <Button onClick={handleSaveAdmin} className="bg-blue-600 text-white">
                Save
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowAdmins;