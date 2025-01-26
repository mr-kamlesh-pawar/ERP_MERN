import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectItem, SelectTrigger, SelectContent, SelectLabel } from "@/components/ui/select";
import { Pencil, Plus, Trash2 } from "lucide-react";

const AdminDepartment = () => {
  const [departments, setDepartments] = useState([]);
  const [action, setAction] = useState("create");
  const [departmentData, setDepartmentData] = useState({ id: null, name: "", classes: [] });
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle Save Department
  const handleSaveDepartment = () => {
    if (action === "create") {
      setDepartments([...departments, { ...departmentData, id: Date.now() }]);
    } else if (action === "update") {
      setDepartments(
        departments.map((dept) => (dept.id === departmentData.id ? { ...departmentData } : dept))
      );
    }
    closeModal();
  };

  // Handle Delete Department
  const handleDeleteDepartment = (id) => {
    setDepartments(departments.filter((dept) => dept.id !== id));
  };

  // Open Modal for Create/Update Department
  const openModal = (department = null, actionType = "create") => {
    setAction(actionType);
    setDepartmentData(department || { id: null, name: "", classes: [] });
    setIsModalOpen(true);
  };

  // Open Modal to view Department details
  const openViewDepartmentModal = (department) => {
    setAction("view");
    setDepartmentData(department);
    setIsModalOpen(true);
  };

  // Close Modal
  const closeModal = () => {
    setIsModalOpen(false);
    setDepartmentData({ id: null, name: "", classes: [] });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Manage Departments</h1>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 mb-6">
        <Button
          onClick={() => openModal(null, "create")}
          className="text-white bg-blue-800 flex items-center font-bold"
        >
          <Plus size={44} strokeWidth={3} />
          Add Department
        </Button>
      </div>

      {/* Departments Table */}
      <div className="overflow-x-auto mb-8">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border border-gray-300 text-sm sm:text-base">ID</th>
              <th className="px-4 py-2 border border-gray-300 text-sm sm:text-base">Department</th>
              <th className="px-4 py-2 border border-gray-300 text-sm sm:text-base">Classes</th>
              <th className="px-4 py-2 border border-gray-300 text-sm sm:text-base">Actions</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((department) => (
              <tr key={department.id}>
                <td className="px-4 py-2 border border-gray-300">{department.id}</td>
                <td
                  className="px-4 py-2 border border-gray-300 text-blue-600 cursor-pointer"
                  onClick={() => openViewDepartmentModal(department)}
                >
                  {department.name}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {department.classes.join(", ")}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  <Button
                    onClick={() => openModal(department, "update")}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
                  >
                    <Pencil /> Update
                  </Button>
                  <Button
                    onClick={() => handleDeleteDepartment(department.id)}
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

      {/* Modal for Create/Update Department */}
      {isModalOpen && action !== "view" && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={closeModal}
        >
          <div
            className="bg-white p-6 rounded-lg w-96"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">
              {action === "create" ? "Add Department" : "Update Department"}
            </h2>

            <div className="mb-4">
              <Label htmlFor="name" className="block text-sm font-semibold text-gray-700">
                Department Name
              </Label>
              <Input
                id="name"
                type="text"
                value={departmentData.name}
                onChange={(e) => setDepartmentData({ ...departmentData, name: e.target.value })}
                className="mt-2 w-full"
              />
            </div>

            <div className="mb-4">
              <Label htmlFor="classes" className="block text-sm font-semibold text-gray-700">
                Classes (comma separated)
              </Label>
              <Input
                id="classes"
                type="text"
                value={departmentData.classes.join(", ")}
                onChange={(e) => setDepartmentData({ ...departmentData, classes: e.target.value.split(",") })}
                className="mt-2 w-full"
              />
            </div>

            <div className="flex justify-end gap-4">
              <Button onClick={closeModal} className="bg-gray-600 text-white">
                Cancel
              </Button>
              <Button onClick={handleSaveDepartment} className="bg-blue-600 text-white">
                Save
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for View Department */}
      {isModalOpen && action === "view" && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={closeModal}
        >
          <div
            className="bg-white p-6 rounded-lg w-96"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">Department Details</h2>

            <div className="mb-4">
              <Label htmlFor="name" className="block text-sm font-semibold text-gray-700">
                Department Name
              </Label>
              <Input
                id="name"
                type="text"
                value={departmentData.name}
                readOnly
                className="mt-2 w-full"
              />
            </div>

            <div className="mb-4">
              <Label htmlFor="classes" className="block text-sm font-semibold text-gray-700">
                Classes
              </Label>
              <Input
                id="classes"
                type="text"
                value={departmentData.classes.join(", ")}
                readOnly
                className="mt-2 w-full"
              />
            </div>

            <div className="flex justify-end gap-4">
              <Button onClick={closeModal} className="bg-gray-600 text-white">
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDepartment;
