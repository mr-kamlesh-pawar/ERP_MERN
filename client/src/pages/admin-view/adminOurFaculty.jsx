import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pencil, Plus, Trash2 } from "lucide-react";
import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminOurFaculty = () => {
  const [faculties, setFaculties] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [action, setAction] = useState("create");
  const [facultyData, setFacultyData] = useState({
    id: null,
    userName: "",
    email: "",
    password: "",
    department: "",
  });

  // Fetch all faculties and departments on initial load
  useEffect(() => {
    const fetchFaculties = async () => {
      try {
        const response = await axios.get("https://rmd-erp-server.vercel.app/api/admin/faculties");
        setFaculties(response.data);
      } catch (error) {
        console.error("Error fetching faculties:", error);
      }
    };

    const fetchDepartments = async () => {
      try {
        const response = await axios.get("https://rmd-erp-server.vercel.app/api/admin/departments");
        
        // Check if the response has a `departments` property and it is an array
        if (response.data.success && Array.isArray(response.data.departments)) {
          setDepartments(response.data.departments); // Set the array of departments
        } else {
          console.error("Invalid response format for departments:", response.data);
          setDepartments([]); // Fallback to empty array
        }
      } catch (error) {
        console.error("Error fetching departments:", error);
        setDepartments([]); // Fallback to empty array on error
      }
    };

    fetchFaculties();
    fetchDepartments();
  }, []);

  // Handle Create/Update Faculty
  
  const handleSaveFaculty = async () => {
    try {
      const apiUrl =
        action === "create"
          ? "https://rmd-erp-server.vercel.app/api/admin/faculty"
          : `https://rmd-erp-server.vercel.app/api/admin/faculty/${facultyData.id}`;
  
      const method = action === "create" ? "post" : "put";
  
      console.log("Sending data to backend:", facultyData); // Log the payload
  
      const response = await axios.request({
        method,
        url: apiUrl,
        data: facultyData,
      });
  
      if (action === "create") {
        setFaculties([...faculties, response.data.faculty]);
      } else {
        setFaculties(
          faculties.map((faculty) =>
            faculty._id === facultyData.id ? response.data.faculty : faculty
          )
        );
      }
  
      setShowModal(false);
      setFacultyData({
        id: null,
        userName: "",
        email: "",
        password: "",
        department: "",
      });
    } catch (error) {
      console.error("Error saving faculty:", error);
      if (error.response) {
        console.error("Backend response error:", error.response.data); // Log backend error details
      }
    }
  };

  // Handle Delete Faculty
  const handleDeleteFaculty = async (id) => {
    try {
      await axios.delete(`https://rmd-erp-server.vercel.app/api/admin/faculty/${id}`);
      setFaculties(faculties.filter((faculty) => faculty._id !== id));
    } catch (error) {
      console.error("Error deleting faculty:", error);
    }
  };

  // Open Modal for Create/Update
  const openModal = (faculty = null, actionType = "create") => {
    setAction(actionType);
    setFacultyData(
      faculty
        ? {
            id: faculty._id,
            userName: faculty.userName,
            email: faculty.email,
            password: faculty.password,
            department: faculty.department,
          }
        : {
            id: null,
            userName: "",
            email: "",
            password: "",
            department: "",
          }
    );
    setShowModal(true);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Manage Faculty</h1>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 mb-6">
        <Button
          onClick={() => openModal(null, "create")}
          className="text-white bg-blue-800 flex items-center font-bold"
        >
          <Plus size={44} strokeWidth={3} />
          Add Faculty
        </Button>
      </div>

      {/* Faculty Table */}
      <div className="overflow-x-auto mb-8">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border border-gray-300 text-sm sm:text-base">ID</th>
              <th className="px-4 py-2 border border-gray-300 text-sm sm:text-base">Name</th>
              <th className="px-4 py-2 border border-gray-300 text-sm sm:text-base">Email</th>
              <th className="px-4 py-2 border border-gray-300 text-sm sm:text-base">Department</th>
              <th className="px-4 py-2 border border-gray-300 text-sm sm:text-base">Actions</th>
            </tr>
          </thead>
          <tbody>
            {faculties.map((faculty) => (
              <tr key={faculty._id}>
                <td className="px-4 py-2 border border-gray-300">{faculty._id}</td>
                <td className="px-4 py-2 border border-gray-300">{faculty.userName}</td>
                <td className="px-4 py-2 border border-gray-300">{faculty.email}</td>
                <td className="px-4 py-2 border border-gray-300">{faculty.department}</td>
                <td className="px-4 py-2 border border-gray-300">
                  <Button
                    onClick={() => openModal(faculty, "update")}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
                  >
                    <Pencil /> Update
                  </Button>
                  <Button
                    onClick={() => handleDeleteFaculty(faculty._id)}
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

      {/* Modal for Create/Update Faculty */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md shadow-lg w-96 sm:w-3/4 md:w-1/2 lg:w-1/3">
            <h2 className="text-xl font-bold mb-4">
              {action === "create" ? "Add Faculty" : "Update Faculty"}
            </h2>

            <div className="mb-4">
              <Label htmlFor="name" className="block text-sm font-semibold text-gray-700">
                Name
              </Label>
              <Input
                id="name"
                type="text"
                value={facultyData.userName}
                onChange={(e) => setFacultyData({ ...facultyData, userName: e.target.value })}
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
                value={facultyData.email}
                onChange={(e) => setFacultyData({ ...facultyData, email: e.target.value })}
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
                value={facultyData.password}
                onChange={(e) => setFacultyData({ ...facultyData, password: e.target.value })}
                disabled={action === "update"}
                className="mt-2 w-full"
              />
            </div>

            <div className="mb-4">
              <Label htmlFor="department" className="block text-sm font-semibold text-gray-700">
                Department
              </Label>
              <Select
                value={facultyData.department}
                onValueChange={(value) => setFacultyData({ ...facultyData, department: value })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept._id} value={dept.department}>
                      {dept.department}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end gap-4">
              <Button onClick={() => setShowModal(false)} className="bg-gray-600 text-white">
                Cancel
              </Button>
              <Button onClick={handleSaveFaculty} className="bg-blue-600 text-white">
                Save
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOurFaculty;