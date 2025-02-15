import React, { useState, useEffect } from "react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

const UploadNotes = () => {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [department, setDepartment] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [departments, setDepartments] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    // Fetch departments from the backend API
    const fetchDepartments = async () => {
      try {
        const response = await axios.get("https://rmd-erp-server.vercel.app/api/faculty/departments");
        setDepartments(response.data.departments);
      } catch (error) {
        console.error("Error fetching departments:", error);
        toast({ title: "Failed to fetch departments.", variant: "error" });
      }
    };

    fetchDepartments();
  }, [toast]);

  useEffect(() => {
    // Fetch subjects based on the selected department
    const fetchSubjects = async () => {
      if (department) {
        try {
          const response = await axios.get(`https://rmd-erp-server.vercel.app/api/faculty/dept-subjects/${department}`);
          setSubjects(response.data);
        } catch (error) {
          console.error("Error fetching subjects:", error);
          toast({ title: "Failed to fetch subjects.", variant: "error" });
        }
      }
    };

    fetchSubjects();
  }, [department, toast]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !subject || !department || !file) {
      toast({ title: "Please fill all fields and select a file.", variant: "error" });
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("subject", subject);
    formData.append("department", department);
    formData.append("file", file);

    setLoading(true);
    try {
      const response = await axios.post("https://rmd-erp-server.vercel.app/api/faculty/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      toast({ title: "Notes uploaded successfully!", variant: "success" });
      setTitle("");
      setSubject("");
      setDepartment("");
      setFile(null);
    } catch (error) {
      console.error("Error uploading notes:", error);
      toast({ title: "Failed to upload notes.", variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <Card className="max-w-2xl mx-auto shadow-lg border border-gray-200 rounded-lg bg-white">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold text-gray-800">
            Upload Notes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                type="text"
                placeholder="Enter notes title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="department">Department</Label>
              <Select onValueChange={setDepartment}>
                <SelectTrigger className="mt-1">
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

            <div>
              <Label htmlFor="subject">Subject</Label>
              <Select onValueChange={setSubject}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select subject" />
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
              <Label htmlFor="file">Upload File</Label>
              <Input
                id="file"
                type="file"
                onChange={handleFileChange}
                className="mt-1"
                accept=".pdf,.doc,.docx,.txt,.jpg"
              />
            </div>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Uploading..." : "Upload Notes"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UploadNotes;