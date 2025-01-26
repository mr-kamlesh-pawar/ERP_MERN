import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Pencil, Plus, Trash2 } from "lucide-react";
import React, { useState } from "react";

const AdminOurFaculty = () => {
  const [faculties, setFaculties] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [action, setAction] = useState("create");
  const [facultyData, setFacultyData] = useState({
    id: null,
    name: "",
    email: "",
    password: "",
    department: "",
    bio: "",
    profilePhoto: "",
  });

  // Handle Create/Update
  const handleSaveFaculty = () => {
    if (action === "create") {
      setFaculties([...faculties, { ...facultyData, id: Date.now() }]);
    } else if (action === "update") {
      setFaculties(
        faculties.map((faculty) =>
          faculty.id === facultyData.id ? { ...facultyData } : faculty
        )
      );
    }
    setShowModal(false);
    setFacultyData({
      id: null,
      name: "",
      email: "",
      password: "",
      department: "",
      bio: "",
      profilePhoto: "",
    });
  };

  // Handle Delete
  const handleDeleteFaculty = (id) => {
    setFaculties(faculties.filter((faculty) => faculty.id !== id));
  };

  // Open Modal for Create or Update
  const openModal = (faculty = null, actionType = "create") => {
    setAction(actionType);
    setFacultyData(
      faculty || {
        id: null,
        name: "",
        email: "",
        password: "",
        department: "",
        bio: "",
        profilePhoto: "",
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
              <tr key={faculty.id}>
                <td className="px-4 py-2 border border-gray-300">{faculty.id}</td>
                <td className="px-4 py-2 border border-gray-300">{faculty.name}</td>
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
                    onClick={() => handleDeleteFaculty(faculty.id)}
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
                value={facultyData.name}
                onChange={(e) => setFacultyData({ ...facultyData, name: e.target.value })}
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
              <Input
                id="department"
                type="text"
                value={facultyData.department}
                onChange={(e) => setFacultyData({ ...facultyData, department: e.target.value })}
                className="mt-2 w-full"
              />
            </div>

            <div className="mb-4">
              <Label htmlFor="bio" className="block text-sm font-semibold text-gray-700">
                Bio
              </Label>
              <Textarea
                id="bio"
                value={facultyData.bio}
                onChange={(e) => setFacultyData({ ...facultyData, bio: e.target.value })}
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
                value={facultyData.profilePhoto}
                onChange={(e) => setFacultyData({ ...facultyData, profilePhoto: e.target.value })}
                className="mt-2 w-full"
              />
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
