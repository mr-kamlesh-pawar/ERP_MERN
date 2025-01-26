import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectItem, SelectTrigger, SelectContent } from "@/components/ui/select";

const AdminSubjects = () => {
  const [departments] = useState(["Computer Science", "Mechanical", "Civil", "Electronics"]);
  const [semesters] = useState(["1st Semester", "2nd Semester", "3rd Semester", "4th Semester", "5th Semester", "6th Semester", "7th Semester", "8th Semester"]);
  const [subjects, setSubjects] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [subjectName, setSubjectName] = useState("");

  const handleAddSubject = () => {
    if (selectedDepartment && selectedSemester && subjectName) {
      setSubjects([
        ...subjects,
        { id: Date.now(), department: selectedDepartment, semester: selectedSemester, name: subjectName },
      ]);
      setSubjectName("");
    } else {
      alert("Please fill all fields before adding the subject.");
    }
  };

  const handleDeleteSubject = (id) => {
    setSubjects(subjects.filter((subject) => subject.id !== id));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Subject Management</h1>

      {/* Select Department */}
      <div className="mb-4">
        <Label className="block text-sm font-semibold mb-2">Select Department</Label>
        <Select
          onValueChange={(value) => setSelectedDepartment(value)}
          value={selectedDepartment}
        >
          <SelectTrigger className="w-full">
            <span>{selectedDepartment || "Select Department"}</span>
          </SelectTrigger>
          <SelectContent>
            {departments.map((dept) => (
              <SelectItem key={dept} value={dept}>
                {dept}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Select Semester */}
      <div className="mb-4">
        <Label className="block text-sm font-semibold mb-2">Select Semester</Label>
        <Select
          onValueChange={(value) => setSelectedSemester(value)}
          value={selectedSemester}
        >
          <SelectTrigger className="w-full">
            <span>{selectedSemester || "Select Semester"}</span>
          </SelectTrigger>
          <SelectContent>
            {semesters.map((sem) => (
              <SelectItem key={sem} value={sem}>
                {sem}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Add Subject */}
      <div className="mb-4">
        <Label className="block text-sm font-semibold mb-2">Add Subject Name</Label>
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
        <Button onClick={handleAddSubject} className="w-full  text-white">
          Add Subject
        </Button>
      </div>

      {/* Subjects Table */}
      <div className="overflow-x-auto ">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border border-gray-300 text-sm sm:text-base">ID</th>
              <th className="px-4 py-2 border border-gray-300 text-sm sm:text-base">Department</th>
              <th className="px-4 py-2 border border-gray-300 text-sm sm:text-base">Semester</th>
              <th className="px-4 py-2 border border-gray-300 text-sm sm:text-base">Subject Name</th>
              <th className="px-4 py-2 border border-gray-300 text-sm sm:text-base">Actions</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subject) => (
              <tr key={subject.id}>
                <td className="px-4 py-2 border border-gray-300">{subject.id}</td>
                <td className="px-4 py-2 border border-gray-300">{subject.department}</td>
                <td className="px-4 py-2 border border-gray-300">{subject.semester}</td>
                <td className="px-4 py-2 border border-gray-300">{subject.name}</td>
                <td className="px-4 py-2 border border-gray-300">
                  <Button
                    onClick={() => handleDeleteSubject(subject.id)}
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
