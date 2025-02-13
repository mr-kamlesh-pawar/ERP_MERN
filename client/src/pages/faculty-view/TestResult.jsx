import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Upload, CheckCircle } from "lucide-react";

const UploadTestMarks = () => {
  const [testId, setTestId] = useState("");
  const [totalMarks, setTotalMarks] = useState("");
  const [students, setStudents] = useState([]);
  const [marks, setMarks] = useState({});
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [tests, setTests] = useState([]);

  // Fetch available tests
  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/faculty/get-tests", {
          withCredentials: true,
        });
        setTests(response.data);
      } catch (error) {
        console.error("Error fetching tests:", error);
      }
    };

    fetchTests();
  }, []);

  // Handle test selection & update total marks
  const handleTestChange = (selectedTestId) => {
    setTestId(selectedTestId);
    const selectedTest = tests.find((test) => test._id === selectedTestId);
    if (selectedTest) {
      setTotalMarks(selectedTest.totalMarks);
    }
  };

  // Fetch students for the selected test
  const handleFetchStudents = async () => {
    if (!testId) {
      toast({
        title: "Error",
        description: "Please select a test.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/faculty/students-for-test/${testId}`, {
        withCredentials: true,
      });

      // Set students and their marks
      setStudents(response.data);

      // Initialize marks state with fetched marks
      const initialMarks = {};
      response.data.forEach((student) => {
        if (student.marksObtained !== null) {
          initialMarks[student._id] = student.marksObtained;
        }
      });
      setMarks(initialMarks);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch students.",
        variant: "destructive",
      });
      console.error("Error fetching students:", error);
    } finally {
      setLoading(false);
    }
  };

  // Upload test marks
  const handleUploadMarks = async () => {
    if (!testId || students.length === 0) {
      toast({
        title: "Error",
        description: "Please ensure students are fetched.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const marksData = students.map((student) => ({
        testId,
        studentId: student._id,
        marksObtained: marks[student._id] || 0,
        totalMarks,
      }));

      await axios.post("http://localhost:5000/api/faculty/upload-test-result", marksData, {
        withCredentials: true,
      });

      toast({
        title: "Success",
        description: "Marks uploaded successfully!",
        variant: "default",
      });

      setTestId("");
      setStudents([]);
      setMarks({});
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload marks.",
        variant: "destructive",
      });
      console.error("Error uploading marks:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto mt-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="w-6 h-6" />
          Upload Test Marks
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="test">Select Test</Label>
              <Select value={testId} onValueChange={handleTestChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Test" />
                </SelectTrigger>
                <SelectContent>
                  {tests.map((test) => (
                    <SelectItem key={test._id} value={test._id}>
                      {test.testTitle}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button type="button" onClick={handleFetchStudents} disabled={loading}>
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            {loading ? "Fetching Students..." : "Fetch Students"}
          </Button>

          {students.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4">Students List</h3>
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border p-2">Student Name</th>
                    <th className="border p-2">Marks (out of {totalMarks})</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student._id} className="border">
                      <td className="border p-2">{student.name}</td>
                      <td className="border p-2">
                        <Input
                          type="number"
                          value={marks[student._id] || ""}
                          onChange={(e) => setMarks({ ...marks, [student._id]: e.target.value })}
                          placeholder={`0/${totalMarks}`}
                          className="w-24"
                          max={totalMarks}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Button type="button" onClick={handleUploadMarks} disabled={loading} className="mt-4">
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CheckCircle className="mr-2 h-4 w-4" />}
                {loading ? "Uploading..." : "Upload Marks"}
              </Button>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default UploadTestMarks;