import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectItem, SelectTrigger, SelectContent } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { Loader2, Search, PlusCircle, Trash2 } from "lucide-react"; // Icons for better UX
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"; // Card components for better layout
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"; // Table components for better structure

const AdminStudents = () => {
  const [departments, setDepartments] = useState([]);
  const [years, setYears] = useState(["1st Year", "2nd Year", "3rd Year", "4th Year"]);
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const [newStudent, setNewStudent] = useState({
    userName: "",
    email: "",
    password: "",
    name: "",
    year: "",
    department: "",
    batch: "",
    dob: "",
    gender: "",
    fatherName: "",
    motherName: "",
    contactNumber: "",
    fatherContactNumber: "",
    avatar: "",
    semester:""
  });

  // Fetch departments and all students on initial load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [departmentsResponse, studentsResponse] = await Promise.all([
          axios.get("https://rmd-erp-server.vercel.app/api/admin/departments"),
          axios.get("https://rmd-erp-server.vercel.app/api/admin/students"),
        ]);
        setDepartments(departmentsResponse.data.departments);
        setStudents(studentsResponse.data);
        setFilteredStudents(studentsResponse.data); // Default: Show all students
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Search students by department and year
  const handleSearch = async () => {
    try {
      const response = await axios.get("https://rmd-erp-server.vercel.app/api/admin/students/search", {
        params: {
          department: selectedDepartment,
          year: selectedYear,
        },
      });
      setFilteredStudents(response.data);
    } catch (error) {
      console.error("Error searching students:", error);
      setError("Failed to search students. Please try again.");
    }
  };

  // Add a new student
  const handleAddStudent = async () => {
    try {
      const response = await axios.post("https://rmd-erp-server.vercel.app/api/admin/students", newStudent);
      setStudents([...students, response.data.student]);
      setFilteredStudents([...filteredStudents, response.data.student]);
      alert("Student added successfully!");
      setNewStudent({
        userName: "",
        email: "",
        password: "",
        name: "",
        year: "",
        department: "",
        batch: "",
        dob: "",
        gender: "",
        fatherName: "",
        motherName: "",
        contactNumber: "",
        fatherContactNumber: "",
        avatar: "",
        class1:"",
        semester:""
      }); // Reset form
    } catch (error) {
      console.error("Error adding student:", error);
      alert("Failed to add student. Please check the details and try again.");
    }
  };

  // Delete a student
  const handleDeleteStudent = async (id) => {
    try {
      await axios.delete(`https://rmd-erp-server.vercel.app/api/admin/students/${id}`);
      setStudents(students.filter((student) => student._id !== id));
      setFilteredStudents(filteredStudents.filter((student) => student._id !== id));
      alert("Student deleted successfully!");
    } catch (error) {
      console.error("Error deleting student:", error);
      alert("Failed to delete student. Please try again.");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Manage Students</h1>

      {/* Add Student Form */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Add New Student</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Username"
              value={newStudent.userName}
              onChange={(e) => setNewStudent({ ...newStudent, userName: e.target.value })}
            />
            <Input
              placeholder="Email"
              value={newStudent.email}
              onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
            />
            <Input
              placeholder="Password"
              type="password"
              value={newStudent.password}
              onChange={(e) => setNewStudent({ ...newStudent, password: e.target.value })}
            />
            <Input
              placeholder="Name"
              value={newStudent.name}
              onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
            />
            <Select onValueChange={(value) => setNewStudent({ ...newStudent, year: value })}>
              <SelectTrigger>
                <span>{newStudent.year || "Select Year"}</span>
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year} value={year}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select onValueChange={(value) => setNewStudent({ ...newStudent, department: value })}>
              <SelectTrigger>
                <span>{newStudent.department || "Select Department"}</span>
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept._id} value={dept.department}>
                    {dept.department}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Input
              placeholder="Batch"
              value={newStudent.batch}
              onChange={(e) => setNewStudent({ ...newStudent, batch: e.target.value })}
            />
                <Select onValueChange={(value) => setNewStudent({ ...newStudent, class1: value })}>
              <SelectTrigger>
                <span>{newStudent.class1 || "Select Class"}</span>
              </SelectTrigger>
              <SelectContent>
               
                  <SelectItem key="1" value="1">
                    class 01
                  </SelectItem>
                  <SelectItem key="2" value="2">
                    class 02
                  </SelectItem>
                  <SelectItem key="3" value="3">
                    class 03
                  </SelectItem>
                
              </SelectContent>
            </Select>
                <Select onValueChange={(value) => setNewStudent({ ...newStudent, semester: value })}>
              <SelectTrigger>
                <span>{newStudent.semester || "Select Semester"}</span>
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
          <Button onClick={handleAddStudent} className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white">
            <PlusCircle className="mr-2 h-4 w-4" /> Add Student
          </Button>
        </CardContent>
      </Card>

      {/* Search Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Search Students</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select onValueChange={(value) => setSelectedDepartment(value)}>
              <SelectTrigger>
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
            <Select onValueChange={(value) => setSelectedYear(value)}>
              <SelectTrigger>
                <span>{selectedYear || "Select Year"}</span>
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year} value={year}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleSearch} className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white">
            <Search className="mr-2 h-4 w-4" /> Search
          </Button>
        </CardContent>
      </Card>

      {/* Student List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Student List</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center h-32">
              <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
            </div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Year</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student._id}>
                    <TableCell>{student._id}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.department}</TableCell>
                    <TableCell>{student.year}</TableCell>
                    <TableCell>{student.class1}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => handleDeleteStudent(student._id)}
                        className="bg-red-500 hover:bg-red-600 text-white"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminStudents;