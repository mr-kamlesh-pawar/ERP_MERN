import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, BookOpen } from "lucide-react"; // Lucide icons

const NotesList = () => {
  const [notes, setNotes] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch subjects
        const subjectsResponse = await axios.get("http://localhost:5000/api/faculty/get-all-Subjects", {
          withCredentials: true,
        });
        setSubjects(subjectsResponse.data.subjects);

        // Fetch notes
        const notesResponse = await axios.get("http://localhost:5000/api/faculty/notes", {
          withCredentials: true,
        });
        setNotes(notesResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filter notes by selected subject
  const filteredNotes = selectedSubject
    ? notes.filter((note) => note.subject === selectedSubject)
    : notes;

  return (
    <div className="container mx-auto p-4 md:p-6">
      <Card className="max-w-6xl mx-auto shadow-lg border border-gray-200 rounded-lg bg-white">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold text-gray-800">
            Uploaded Notes
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Subject Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {subjects.map((subject) => (
              <Button
                key={subject._id}
                variant={selectedSubject === subject.subjectName ? "default" : "outline"}
                onClick={() => setSelectedSubject(subject.subjectName)}
                className="flex items-center gap-2"
              >
                <BookOpen className="h-4 w-4" />
                {subject.subjectName}
              </Button>
            ))}
          </div>

          {/* Notes List */}
          {loading ? (
            <div className="text-center py-6">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading notes...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredNotes.map((note) => (
                <div
                  key={note._id}
                  className="p-4 border rounded-lg hover:shadow-md transition-shadow bg-gray-50"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <h3 className="text-lg font-semibold">{note.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{note.subject}</p>
                  <a
                    href={note.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-600 hover:underline"
                  >
                    <Download className="h-4 w-4" />
                    Download File
                  </a>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default NotesList;