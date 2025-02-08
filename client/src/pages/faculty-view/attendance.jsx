import { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const MarkAttendance = () => {
  const [departments, setDepartments] = useState([]);
  const [years, setYears] = useState([]);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchingStudents, setFetchingStudents] = useState(false);
  const { toast } = useToast();
  const [filters, setFilters] = useState({
    department: "",
    year: "",
    class1: "",
    subject: "",
    date: new Date(),
  });

  // Fetch departments on component mount
  useEffect(() => {
    axios.get("http://localhost:5000/api/faculty/departments")
      .then((res) => setDepartments(res.data.departments))
      .catch((err) => console.error("Error fetching departments:", err));
  }, []);

  // Fetch years based on selected department
  useEffect(() => {
    if (filters.department) {
      setYears(["1st Year", "2nd Year", "3rd Year"]);
    }
  }, [filters.department]);

  // Fetch classes based on selected year and department
  useEffect(() => {
    if (filters.year && filters.department) {
      setClasses(["1", "2", "3"]);
    }
  }, [filters.year, filters.department]);

  // Fetch subjects based on selected class and department
  useEffect(() => {
    if (filters.class1 && filters.department) {
      axios.get(`http://localhost:5000/api/faculty/dept-subjects/${filters.department}`)
        .then((res) => setSubjects(res.data))
        .catch((err) => console.error("Error fetching subjects:", err));
    }
  }, [filters.class1, filters.department]);

  // Fetch students and their attendance status when the Fetch Students button is clicked
  const handleFetchStudents = async () => {
    if (!filters.subject || !filters.department || !filters.year || !filters.class1) {
      toast.error("Please select all filters before fetching students.");
      return;
    }
    setFetchingStudents(true);
    try {
      // Fetch students based on filters
      const studentsRes = await axios.post("http://localhost:5000/api/faculty/fetch-students-filter", filters);
      setStudents(studentsRes.data.students || []);
  
      console.log("Fetched Students:", studentsRes.data.students);
  
      // Fetch attendance records for the selected date and subject
      const attendanceRes = await axios.post("http://localhost:5000/api/faculty/get-attendance", {
        ...filters,
        date: filters.date.toISOString(),
      });
  
      console.log("Attendance Response:", attendanceRes.data);
  
      // If attendance records exist, mark students as present/absent
      if (attendanceRes.data.attendanceRecords && attendanceRes.data.attendanceRecords.length > 0) {
        const presentStudents = attendanceRes.data.attendanceRecords
          .filter((record) => record.lectureAttended === 1)
          .map((record) => record.studentId._id);
  
        console.log("Present Students:", presentStudents);
  
        setSelectedStudents(presentStudents);
      } else {
        // If no attendance records exist, reset selectedStudents
        setSelectedStudents([]);
      }
    } catch (error) {
      console.error("Error fetching students:", error);
      toast.error("Failed to fetch students.");
    }
    setFetchingStudents(false);
  };

  // Handle marking/updating attendance
  const handleMarkAttendance = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/faculty/mark-attendance", {
        ...filters,
        selectedStudents,
        date: filters.date.toISOString(),
      });
      toast({ title: "Attendance marked successfully!", variant: "success" });
      setSelectedStudents([]);
    } catch (error) {
      toast({ title: "Something went wrong!", variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6">
      {/* Filters */}
      <Card className="w-full md:w-1/3 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Filters</h2>
        <Select onValueChange={(value) => setFilters({ ...filters, department: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select Department" />
          </SelectTrigger>
          <SelectContent>
            {departments.map((d) => (
              <SelectItem key={d._id} value={d.department}>
                {d.department}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={(value) => setFilters({ ...filters, year: value })} disabled={!filters.department}>
          <SelectTrigger>
            <SelectValue placeholder="Select Year" />
          </SelectTrigger>
          <SelectContent>
            {years.map((y) => (
              <SelectItem key={y} value={y}>
                {y}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={(value) => setFilters({ ...filters, class1: value })} disabled={!filters.year}>
          <SelectTrigger>
            <SelectValue placeholder="Select Class" />
          </SelectTrigger>
          <SelectContent>
            {classes.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={(value) => setFilters({ ...filters, subject: value })} disabled={!filters.class1}>
          <SelectTrigger>
            <SelectValue placeholder="Select Subject" />
          </SelectTrigger>
          <SelectContent>
            {subjects.map((s) => (
              <SelectItem key={s._id} value={s.subjectName}>
                {s.subjectName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Select Date</label>
          <DatePicker
            selected={filters.date}
            onChange={(date) => setFilters({ ...filters, date })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            dateFormat="yyyy/MM/dd"
          />
        </div>

        <Button onClick={handleFetchStudents} className="mt-4" disabled={fetchingStudents || !filters.subject}>
          {fetchingStudents ? "Fetching Students..." : "Fetch Students"}
        </Button>
      </Card>

      {/* Students Table */}
      <Card className="w-full md:w-2/3 p-4 bg-white shadow rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Students</h2>
        {fetchingStudents ? (
          <div className="text-center">Loading students...</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Roll No</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Select</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student,index) => (
                <TableRow key={student._id}>
                  <TableCell>{index + 1}</TableCell> 
                  <TableCell>{student.name}</TableCell>
                  <TableCell>
                    <Checkbox
                      checked={selectedStudents.includes(student._id)}
                      onCheckedChange={(checked) => {
                        setSelectedStudents((prev) =>
                          checked
                            ? [...prev, student._id]
                            : prev.filter((id) => id !== student._id)
                        );
                      }}
                      className={`relative inline-flex items-center justify-center w-6 h-6 border-2 rounded-full cursor-pointer transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        selectedStudents.includes(student._id)
                          ? "bg-blue-500 border-blue-500"
                          : "bg-white border-gray-400"
                      }`}
                    >
                      {selectedStudents.includes(student._id) && (
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </Checkbox>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        <Button
          className="w-full mt-6"
          onClick={handleMarkAttendance}
          disabled={loading || selectedStudents.length === 0}
        >
          {loading ? "Marking Attendance..." : "Mark Attendance"}
        </Button>
      </Card>
    </div>
  );
};

export default MarkAttendance;