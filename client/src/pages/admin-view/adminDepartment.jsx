import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil, Plus, Trash2 } from "lucide-react";
import axios from "axios";

const AdminDepartment = () => {
  const [departments, setDepartments] = useState([]);
  const [action, setAction] = useState("create");
  const [departmentData, setDepartmentData] = useState({
    id: null,
    department: "",
    departmentCode: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch all departments from the backend
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get("https://rmd-erp-server.vercel.app/api/admin/departments");
        setDepartments(response.data.departments);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };
    fetchDepartments();
  }, []);

  // Handle Save Department
  const handleSaveDepartment = async () => {
    try {
      if (action === "create") {
        // Create a new department
        const response = await axios.post("https://rmd-erp-server.vercel.app/api/admin/departments", departmentData);
        setDepartments([...departments, response.data.department]);
      } else if (action === "update") {
        // Update an existing department
        const response = await axios.put(
          `https://rmd-erp-server.vercel.app/api/admin/departments/${departmentData.id}`,
          departmentData
        );
        setDepartments(
          departments.map((dept) =>
            dept._id === departmentData.id ? response.data.department : dept
          )
        );
      }
      closeModal();
    } catch (error) {
      console.error("Error saving department:", error);
    }
  };

  // Handle Delete Department
  const handleDeleteDepartment = async (id) => {
    try {
      await axios.delete(`https://rmd-erp-server.vercel.app/api/admin/departments/${id}`);
      setDepartments(departments.filter((dept) => dept._id !== id));
    } catch (error) {
      console.error("Error deleting department:", error);
    }
  };

  // Open Modal for Create/Update Department
  const openModal = (department = null, actionType = "create") => {
    setAction(actionType);
    setDepartmentData(
      department
        ? { id: department._id, department: department.department, departmentCode: department.departmentCode }
        : { id: null, department: "", departmentCode: "" }
    );
    setIsModalOpen(true);
  };

  // Close Modal
  const closeModal = () => {
    setIsModalOpen(false);
    setDepartmentData({
      id: null,
      department: "",
      departmentCode: "",
    });
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
              <th className="px-4 py-2 border border-gray-300 text-sm sm:text-base">Department Code</th>
              <th className="px-4 py-2 border border-gray-300 text-sm sm:text-base">Actions</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((department) => (
              <tr key={department._id}>
                <td className="px-4 py-2 border border-gray-300">{department._id}</td>
                <td className="px-4 py-2 border border-gray-300">{department.department}</td>
                <td className="px-4 py-2 border border-gray-300">{department.departmentCode}</td>
                <td className="px-4 py-2 border border-gray-300">
                  <Button
                    onClick={() => openModal(department, "update")}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
                  >
                    <Pencil /> Update
                  </Button>
                  <Button
                    onClick={() => handleDeleteDepartment(department._id)}
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
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
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
              <Label htmlFor="department" className="block text-sm font-semibold text-gray-700">
                Department Name
              </Label>
              <Input
                id="department"
                type="text"
                value={departmentData.department}
                onChange={(e) =>
                  setDepartmentData({ ...departmentData, department: e.target.value })
                }
                className="mt-2 w-full"
              />
            </div>

            <div className="mb-4">
              <Label htmlFor="departmentCode" className="block text-sm font-semibold text-gray-700">
                Department Code
              </Label>
              <Input
                id="departmentCode"
                type="text"
                value={departmentData.departmentCode}
                onChange={(e) =>
                  setDepartmentData({ ...departmentData, departmentCode: e.target.value })
                }
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
    </div>
  );
};

export default AdminDepartment;