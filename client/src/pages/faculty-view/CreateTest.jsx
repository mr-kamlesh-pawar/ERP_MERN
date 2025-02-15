import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, PlusCircle } from "lucide-react";

const CreateTest = () => {
  const [testTitle, setTestTitle] = useState("");
  const [totalMarks, setTotalMarks] = useState("");
  const [subject, setSubject] = useState("");
  const [year, setYear] = useState("");
  const [class1, setClass1] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get("https://rmd-erp-server.vercel.app/api/faculty/get-dept-sub", {
          withCredentials: true,
        });
        setSubjects(response.data);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };

    fetchSubjects();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "https://rmd-erp-server.vercel.app/api/faculty/create-test",
        { testTitle, totalMarks, subject, year, class1 },
        { withCredentials: true }
      );

      toast({
        title: "Success",
        description: "Test created successfully!",
        variant: "default",
      });

      setTestTitle("");
      setTotalMarks("");
      setSubject("");
      setYear("");
      setClass1("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Error creating test.",
        variant: "destructive",
      });
      console.error("Error creating test:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PlusCircle className="w-6 h-6" />
          Create Test
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="testTitle">Test Title</Label>
            <Input
              id="testTitle"
              value={testTitle}
              onChange={(e) => setTestTitle(e.target.value)}
              placeholder="Enter the test title"
              required
            />
          </div>
          <div>
            <Label htmlFor="totalMarks">Total Marks</Label>
            <Input
              id="totalMarks"
              type="number"
              value={totalMarks}
              onChange={(e) => setTotalMarks(e.target.value)}
              placeholder="Enter the total marks"
              required
            />
          </div>
          <div>
            <Label htmlFor="subject">Subject</Label>
            <Select value={subject} onValueChange={setSubject} required>
              <SelectTrigger>
                <SelectValue placeholder="Select Subject" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((sub) => (
                  <SelectItem key={sub._id} value={sub.subjectName}>
                    {sub.subjectName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="year">Year</Label>
            <Select value={year} onValueChange={setYear} required>
              <SelectTrigger>
                <SelectValue placeholder="Select Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1st Year">1st Year</SelectItem>
                <SelectItem value="2nd Year">2nd Year</SelectItem>
                <SelectItem value="3rd Year">3rd Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="class">Class</Label>
            <Select value={class1} onValueChange={setClass1} required>
              <SelectTrigger>
                <SelectValue placeholder="Select Class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Class 01</SelectItem>
                <SelectItem value="2">Class 02</SelectItem>
                <SelectItem value="3">Class 03</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            {loading ? "Creating..." : "Create Test"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateTest;