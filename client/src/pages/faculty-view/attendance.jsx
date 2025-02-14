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
import { Loader2, CheckCircle, XCircle } from "lucide-react"; // Lucide icons

const MarkAttendance = () => {
  const [semesters] = useState(['1st Semester', '2nd Semester', '3rd Semester', '4th Semester', '5th Semester', '6th Semester']);
  const [subjects, setSubjects] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchingStudents, setFetchingStudents] = useState(false);
  const { toast } = useToast();

  const [filters, setFilters] = useState({
    semester: "",
    subject: "",
    class1: "",
    date: new Date(),
  });

  // Fetch subjects based on semester
  useEffect(() => {
    if (filters.semester) {
      setLoading(true);
      axios.get(`http://localhost:5000/api/faculty/get-subsem/${filters.semester}`, { withCredentials: true })
        .then((res) => {
          setSubjects(res.data.subjects);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching subjects:", err);
          toast.error("Failed to fetch subjects");
          setLoading(false);
        });
    }
  }, [filters.semester]);

  // Fetch students and their attendance status
  const handleFetchStudents = async () => {
    if (!filters.subject || !filters.semester) {
      toast.error("Please select all filters");
      return;
    }

    setFetchingStudents(true);
    try {
      // Fetch students for the selected semester
      const studentsRes = await axios.post("http://localhost:5000/api/faculty/fetch-students", {
        semester: filters.semester,
        class1: filters.class1
      });

      // Fetch attendance if it exists
      const attendanceRes = await axios.post("http://localhost:5000/api/faculty/get-attendance", {
        subject: filters.subject,
        date: filters.date.toISOString().split("T")[0] // Convert to "YYYY-MM-DD"
      }, {
        withCredentials: true
      });

      setStudents(studentsRes.data.students);
      toast({
        title: 'Success',
        description: 'Students fetched successfully.',
        variant: 'default',
      });

      // Check if attendance data exists
      if (attendanceRes.data.attendance) {
        // Extract the IDs of the present students
        const presentStudentIds = attendanceRes.data.attendance.presentStudents.map(student => student._id);
        setSelectedStudents(presentStudentIds);
      } else if (attendanceRes.data.message === "Attendance not found") {
        // If attendance not found, reset selectedStudents to empty array
        setSelectedStudents([]);
      }
    } catch (error) {
      console.error("Error:", error);
      // If there's an error (e.g., network error), reset selectedStudents to empty array
      setSelectedStudents([]);
    }
    setFetchingStudents(false);
  };

  // Handle marking/updating attendance
  const handleMarkAttendance = async () => {
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/faculty/mark-attendance", {
        semester: filters.semester,
        subject: filters.subject,
        date: filters.date.toISOString(),
        presentStudents: selectedStudents,
        totalStudents: students.map(student => student._id)
      }, { withCredentials: true });

      toast({ title: "Attendance marked successfully!", variant: "success" });
    } catch (error) {
      toast({ title: "Failed to mark attendance", variant: "error" });
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6">
      {/* Filters */}
      <Card className="w-full md:w-1/3 p-6 bg-gray-50 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Filters</h2>

        <div className="space-y-4">
          <Select
            onValueChange={(value) => setFilters({ ...filters, semester: value })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Semester" />
            </SelectTrigger>
            <SelectContent>
              {semesters.map((sem) => (
                <SelectItem key={sem} value={sem.toString()}>
                  {sem}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            onValueChange={(value) => setFilters({ ...filters, subject: value })}
            disabled={!filters.semester}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Subject" />
            </SelectTrigger>
            <SelectContent>
              {subjects.map((subject) => (
                <SelectItem key={subject._id} value={subject._id}>
                  {subject.subjectName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            onValueChange={(value) => setFilters({ ...filters, class1: value })}
            disabled={!filters.semester}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Class" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem key="1" value="1">Class 1</SelectItem>
              <SelectItem key="2" value="2">Class 2</SelectItem>
              <SelectItem key="3" value="3">Class 3</SelectItem>
            </SelectContent>
          </Select>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Date</label>
            <DatePicker
              selected={filters.date}
              onChange={(date) => setFilters({ ...filters, date })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              dateFormat="yyyy/MM/dd"
            />
          </div>

          <Button
            onClick={handleFetchStudents}
            className="w-full mt-4 hover:bg-blue-900"
            disabled={fetchingStudents || !filters.subject}
          >
            {fetchingStudents ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Fetch Students"
            )}
          </Button>
        </div>
      </Card>

      {/* Students Table */}
      <Card className="w-full md:w-2/3 p-6 bg-gray-50 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Students</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Roll No</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student, index) => (
              <TableRow key={student._id} className="hover:bg-gray-100 transition-colors">
                <TableCell>{index + 1}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      className="w-5 h-5 rounded-full border-2 border-blue-500 data-[state=checked]:bg-blue-500 bg-white"
                      checked={selectedStudents.includes(student._id)}
                      onCheckedChange={(checked) => {
                        setSelectedStudents(prev =>
                          checked
                            ? [...prev, student._id]
                            : prev.filter(id => id !== student._id)
                        );
                      }}
                    />
                    {selectedStudents.includes(student._id) ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-500" />
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Button
          className="w-full mt-6  hover:bg-green-900"
          onClick={handleMarkAttendance}
          disabled={loading || students.length === 0}
        >
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            "Save Attendance"
          )}
        </Button>
      </Card>
    </div>
  );
};

export default MarkAttendance;