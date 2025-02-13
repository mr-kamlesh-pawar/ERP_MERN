import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
} from "@/components/ui/select";
import axios from "axios";

const AdminSubjects = () => {
  const [departments, setDepartments] = useState([]); // Fetch departments from API
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [subjectCode, setSubjectCode] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch departments on initial load
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/admin/departments"
        );
        if (response.data.success && Array.isArray(response.data.departments)) {
          setDepartments(response.data.departments);
        } else {
          console.error(
            "Invalid response format for departments:",
            response.data
          );
        }
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    fetchDepartments();
  }, []);

  // Fetch subjects on initial load
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/admin/subjects"
        );
        setSubjects(response.data);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };

    fetchSubjects();
  }, []);

  // Add a new subject
  const handleAddSubject = async () => {
    if (!selectedDepartment || !selectedYear || !subjectCode || !subjectName) {
      alert("Please fill all fields before adding the subject.");
      return;
    }

    setLoading(true); // Start loading
    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/subjects",
        {
          subjectName,
          subjectCode,
          department: selectedDepartment,
          year: selectedYear,
          semester: selectedSemester,
        }
      );

      setSubjects([...subjects, response.data.subject]);
      setSubjectCode("");
      setSubjectName("");
      setSelectedDepartment("");
      setSelectedYear("");
      setSelectedSemester("");
    } catch (error) {
      console.error("Error adding subject:", error);
      alert(
        error.response?.data?.message ||
          "Failed to add subject. Please try again."
      );
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Delete a subject
  const handleDeleteSubject = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/subjects/${id}`);
      setSubjects(subjects.filter((subject) => subject._id !== id));
    } catch (error) {
      console.error("Error deleting subject:", error);
      alert(
        error.response?.data?.message ||
          "Failed to delete subject. Please try again."
      );
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-6">
        Subject Management
      </h1>

      {/* Select Department */}
      <div className="mb-4">
        <Label className="block text-sm font-semibold mb-2">
          Select Department
        </Label>
        <Select
          onValueChange={(value) => setSelectedDepartment(value)}
          value={selectedDepartment}
        >
          <SelectTrigger className="w-full">
            <span>{selectedDepartment || "Select Department"}</span>
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

      {/* Select Year */}
      <div className="mb-4">
        <Label className="block text-sm font-semibold mb-2">Select Year</Label>
        <Select
          onValueChange={(value) => setSelectedYear(value)}
          value={selectedYear}
        >
          <SelectTrigger className="w-full">
            <span>{selectedYear || "Select Year"}</span>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1st Year">1st Year</SelectItem>
            <SelectItem value="2nd Year">2nd Year</SelectItem>
            <SelectItem value="3rd Year">3rd Year</SelectItem>
            <SelectItem value="4th Year">4th Year</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {/* Select Semester */}
      <div className="mb-4">
        <Label className="block text-sm font-semibold mb-2">
          Select Semester
        </Label>
        <Select
          onValueChange={(value) => setSelectedSemester(value)}
          value={selectedSemester}
        >
          <SelectTrigger className="w-full">
            <span>{selectedSemester || "Select Semester"}</span>
          </SelectTrigger>
          <SelectContent>
            <SelectItem key="1" value="1st Semester">
              1st Semester
            </SelectItem>
            <SelectItem key="2" value="2nd Semester">
              2nd Semester
            </SelectItem>
            <SelectItem key="3" value="3rd Semester">
              3rd Semester
            </SelectItem>
            <SelectItem key="4" value="4th Semester">
              4th Semester
            </SelectItem>
            <SelectItem key="5" value="5th Semester">
              5th Semester
            </SelectItem>
            <SelectItem key="6" value="6th Semester">
              6th Semester
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Subject Code */}
      <div className="mb-4">
        <Label className="block text-sm font-semibold mb-2">Subject Code</Label>
        <Input
          type="text"
          value={subjectCode}
          onChange={(e) => setSubjectCode(e.target.value)}
          placeholder="Enter subject code"
          className="w-full"
        />
      </div>

      {/* Subject Name */}
      <div className="mb-4">
        <Label className="block text-sm font-semibold mb-2">Subject Name</Label>
        <Input
          type="text"
          value={subjectName}
          onChange={(e) => setSubjectName(e.target.value)}
          placeholder="Enter subject name"
          className="w-full"
        />
      </div>

      {/* Add Button */}
      <div className="mb-6">
        <Button
          onClick={handleAddSubject}
          className="w-full text-white"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Subject"}
        </Button>
      </div>

      {/* Subjects Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border border-gray-300 text-sm sm:text-base">
                ID
              </th>
              <th className="px-4 py-2 border border-gray-300 text-sm sm:text-base">
                Department
              </th>
              <th className="px-4 py-2 border border-gray-300 text-sm sm:text-base">
                Year
              </th>
              <th className="px-4 py-2 border border-gray-300 text-sm sm:text-base">
                Semester
              </th>
              <th className="px-4 py-2 border border-gray-300 text-sm sm:text-base">
                Subject Code
              </th>
              <th className="px-4 py-2 border border-gray-300 text-sm sm:text-base">
                Subject Name
              </th>
              <th className="px-4 py-2 border border-gray-300 text-sm sm:text-base">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subject) => (
              <tr key={subject._id}>
                <td className="px-4 py-2 border border-gray-300">
                  {subject._id}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {subject.department}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {subject.year}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {subject.semester}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {subject.subjectCode}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {subject.subjectName}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  <Button
                    onClick={() => handleDeleteSubject(subject._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminSubjects;
