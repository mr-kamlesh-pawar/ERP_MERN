import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectItem, SelectTrigger, SelectContent, SelectLabel } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AdminStudents = () => {
  const [departments, setDepartments] = useState([
    { id: 1, name: "Computer Science" },
    { id: 2, name: "Mechanical Engineering" },
    { id: 3, name: "Electrical Engineering" },
  ]);
  
  const [classes, setClasses] = useState({
    1: ["CS101", "CS102", "CS103"], // Classes for Computer Science
    2: ["ME101", "ME102", "ME103"], // Classes for Mechanical Engineering
    3: ["EE101", "EE102", "EE103"], // Classes for Electrical Engineering
  });

  const [students, setStudents] = useState([
    { id: 1, name: "John Doe", departmentId: 1, class: "CS101" },
    { id: 2, name: "Jane Smith", departmentId: 1, class: "CS102" },
    { id: 3, name: "Sam Brown", departmentId: 2, class: "ME101" },
    { id: 4, name: "Lucy Green", departmentId: 3, class: "EE103" },
    { id: 5, name: "Tom White", departmentId: 1, class: "CS103" },
  ]);

  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [filteredStudents, setFilteredStudents] = useState([]);

  // Handle department selection change
  const handleDepartmentChange = (departmentId) => {
    setSelectedDepartment(departmentId);
    setSelectedClass(null); // Reset class selection when department changes
  };

  // Handle class selection change
  const handleClassChange = (className) => {
    setSelectedClass(className);
  };

  // Search students based on department and class
  const handleSearch = () => {
    const filtered = students.filter((student) => {
      return (
        (selectedDepartment ? student.departmentId === selectedDepartment : true) &&
        (selectedClass ? student.class === selectedClass : true)
      );
    });
    setFilteredStudents(filtered);
  };

  return (
    <div className="sm:flex space-x-6  sm:flex-col lg:flex-row justify-center ">
      {/* Left Side: Search */}
      <div className="w-1/3">
        <h2 className="text-xl font-semibold mb-4">Search Students</h2>

        <div className="mb-4">
          <Label htmlFor="department" className="block text-sm font-semibold text-gray-700">
            Select Department
          </Label>
          <Select
            id="department"
            onValueChange={handleDepartmentChange}
            value={selectedDepartment || ""}
          >
            <SelectTrigger>
              <span>{selectedDepartment ? departments.find(dept => dept.id === selectedDepartment)?.name : "Select Department"}</span>
            </SelectTrigger>
            <SelectContent>
              {departments.map((department) => (
                <SelectItem key={department.id} value={department.id}>
                  {department.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedDepartment && (
          <div className="mb-4">
            <Label htmlFor="class" className="block text-sm font-semibold text-gray-700">
              Select Class
            </Label>
            <Select
              id="class"
              onValueChange={handleClassChange}
              value={selectedClass || ""}
            >
              <SelectTrigger>
                <span>{selectedClass || "Select Class"}</span>
              </SelectTrigger>
              <SelectContent>
                {classes[selectedDepartment]?.map((classItem, index) => (
                  <SelectItem key={index} value={classItem}>
                    {classItem}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="flex justify-end">
          <Button
            onClick={handleSearch}
            className="bg-blue-600 text-white w-full md:w-auto"
          >
            Search
          </Button>
        </div>
      </div>

      {/* Right Side: Display Students */}
      <div className="w-2/3">
        <h2 className="text-xl font-semibold mb-4">Student List</h2>
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border border-gray-300">ID</th>
                <th className="px-4 py-2 border border-gray-300">Name</th>
                <th className="px-4 py-2 border border-gray-300">Class</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <tr key={student.id}>
                    <td className="px-4 py-2 border border-gray-300">{student.id}</td>
                    <td className="px-4 py-2 border border-gray-300">{student.name}</td>
                    <td className="px-4 py-2 border border-gray-300">{student.class}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="px-4 py-2 border border-gray-300 text-center">
                    No students found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminStudents;
