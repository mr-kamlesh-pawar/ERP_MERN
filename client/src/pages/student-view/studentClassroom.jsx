import React, { useState, useEffect } from 'react';
import { School, BookOpen, ArrowRight, Copy } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

const StudentClassroom = () => {
  const [subjects, setSubjects] = useState([]);
  const [selectedClassroom, setSelectedClassroom] = useState(null);
  const { toast } = useToast();

  // Fetch all subjects for the student
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/student/semester-subjects', {
          withCredentials: true,
        });
        setSubjects(response.data);
      } catch (error) {
        console.error('Error fetching subjects:', error);
        toast({
          title: 'Error',
          description: 'Failed to fetch subjects.',
          variant: 'destructive',
        });
      }
    };

    fetchSubjects();
  }, []);

  // Fetch classroom details for a specific subject
  const fetchClassroomDetails = async (subject) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/student/classroom/${subject}`, {
        withCredentials: true,
      });
      setSelectedClassroom(response.data);
    } catch (error) {
      console.error('Error fetching classroom details:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch classroom details.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-4xl mx-auto bg-gradient-to-r from-blue-50 to-purple-50 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-blue-800 flex items-center">
            <School className="mr-2" /> My Classrooms
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {subjects.map((subject, index) => (
              <Card key={index} className="bg-gradient-to-r from-blue-100 to-purple-100 shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-blue-800 flex items-center">
                    <BookOpen className="mr-2" /> {subject}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Button
                    className="w-full bg-blue-900 hover:bg-blue-800 text-white"
                    onClick={() => fetchClassroomDetails(subject)}
                  >
                    View Classroom <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {selectedClassroom && (
        <Card className="mt-8 max-w-4xl mx-auto bg-gradient-to-r from-blue-50 to-purple-50 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-blue-800 flex items-center">
              <School className="mr-2" /> {selectedClassroom.subject}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium">Class Code:</p>
              <div className="flex items-center gap-2">
                <code className="bg-white p-2 rounded">{selectedClassroom.googleClassCode}</code>
                <Button
                  className="bg-blue-200"
                  variant="ghost"
                  size="icon"
                  onClick={() => navigator.clipboard.writeText(selectedClassroom.googleClassCode)}
                >
                  <Copy className="w-4 h-4 text-blue-600" />
                </Button>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium">Open Classroom:</p>
              <a href={selectedClassroom.inviteLink} target="_blank" rel="noopener noreferrer">
                <p className="text-sm text-muted-foreground">{selectedClassroom.inviteLink}</p>
              </a>
            </div>
            <div>
              <p className="text-sm font-medium">Description:</p>
              <p className="text-sm text-muted-foreground">{selectedClassroom.description}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default StudentClassroom;