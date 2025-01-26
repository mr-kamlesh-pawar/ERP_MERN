import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ChartNoAxesGantt, Pencil, Plus, Trash2 } from "lucide-react";
import React, { useState } from "react";

const ShowAdmins = () => {
  const [admins, setAdmins] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [action, setAction] = useState("create");
  const [adminData, setAdminData] = useState({
    id: null,
    name: "",
    email: "",
    password: "",
    authority: "",
    profilePhoto: "",
  });

  // Handle Create/Update
  const handleSaveAdmin = () => {
    if (action === "create") {
      setAdmins([...admins, { ...adminData, id: Date.now() }]);
    } else if (action === "update") {
      setAdmins(
        admins.map((admin) =>
          admin.id === adminData.id ? { ...adminData } : admin
        )
      );
    }
    setShowModal(false);
    setAdminData({ id: null, name: "", email: "", password: "", authority: "", profilePhoto: "" });
  };

  // Handle Delete
  const handleDeleteAdmin = (id) => {
    setAdmins(admins.filter((admin) => admin.id !== id));
  };

  // Open Modal for Create or Update
  const openModal = (admin = null, actionType = "create") => {
    setAction(actionType);
    setAdminData(admin || { id: null, name: "", email: "", password: "", authority: "", profilePhoto: "" });
    setShowModal(true);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Manage Admin</h1>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 mb-6">
        <Button onClick={() => openModal(null, "create")} className="text-white bg-blue-800 flex items-center font-bold">
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
              <th className="px-4 py-2 border border-gray-300 text-sm sm:text-base">Authority</th>
              <th className="px-4 py-2 border border-gray-300 text-sm sm:text-base">Actions</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin.id}>
                <td className="px-4 py-2 border border-gray-300">{admin.id}</td>
                <td className="px-4 py-2 border border-gray-300">{admin.name}</td>
                <td className="px-4 py-2 border border-gray-300">{admin.email}</td>
                <td className="px-4 py-2 border border-gray-300">{admin.authority}</td>
                <td className="px-4 py-2 border border-gray-300">
                  <Button onClick={() => openModal(admin, "update")} className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600">
                    <Pencil /> Update
                  </Button>
                  <Button onClick={() => handleDeleteAdmin(admin.id)} className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 ml-2">
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
              <Label htmlFor="name" className="block text-sm font-semibold text-gray-700">
                UserName
              </Label>
              <Input
                id="name"
                type="text"
                value={adminData.name}
                onChange={(e) => setAdminData({ ...adminData, name: e.target.value })}
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

            <div className="mb-4">
              <Label htmlFor="authority" className="block text-sm font-semibold text-gray-700">
                Authority
              </Label>
              <Input
                id="authority"
                type="text"
                value={adminData.authority}
                onChange={(e) => setAdminData({ ...adminData, authority: e.target.value })}
                className="mt-2 w-full"
              />
            </div>

            <div className="mb-4">
              <Label htmlFor="profilePhoto" className="block text-sm font-semibold text-gray-700">
                Profile Photo URL
              </Label>
              <Input
                id="profilePhoto"
                type="text"
                value={adminData.profilePhoto}
                onChange={(e) => setAdminData({ ...adminData, profilePhoto: e.target.value })}
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
