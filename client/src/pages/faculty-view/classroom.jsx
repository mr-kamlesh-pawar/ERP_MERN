import React, { useState, useEffect } from 'react';
import { PlusCircle, Trash2, Edit2, Copy, Loader2, School, Save, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';

const FacultyClassroom = () => {
  const [formData, setFormData] = useState({
    semester: '',
    subject: '',
    class: '',
    googleClassCode: '',
    inviteLink: '',
    description: '',
  });

  const [editClassroomId, setEditClassroomId] = useState(null); // Track which classroom is being edited
  const [editFormData, setEditFormData] = useState({
    semester: '',
    subject: '',
    class: '',
    googleClassCode: '',
    inviteLink: '',
    description: '',
  });

  const { toast } = useToast();
  const [subjects, setSubjects] = useState([]);
  const [classrooms, setClassrooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredSubjects, setFilteredSubjects] = useState([]);

  const classes = [1, 2, 3];

  // Fetch subjects from backend
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/faculty/get-subs', { withCredentials: true });
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

  // Fetch classrooms from backend
  useEffect(() => {
    const fetchClassrooms = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/faculty/get-classroom', { withCredentials: true });
        setClassrooms(response.data);
      } catch (error) {
        console.error('Error fetching classrooms:', error);
        toast({
          title: 'Error',
          description: 'Failed to fetch classrooms.',
          variant: 'destructive',
        });
      }
    };

    fetchClassrooms();
  }, []);

  // Filter subjects based on selected semester
  useEffect(() => {
    if (formData.semester) {
      const filtered = subjects.filter((subject) => subject.semester === formData.semester);
      setFilteredSubjects(filtered);
    } else {
      setFilteredSubjects([]);
    }
  }, [formData.semester, subjects]);

  // Handle form submission for creating a classroom
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.semester || !formData.subject || !formData.class || !formData.googleClassCode || !formData.inviteLink || !formData.description) {
      toast({
        title: 'Error',
        description: 'All fields are required.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/faculty/create-classroom', formData, {
        withCredentials: true,
      });
      setClassrooms([...classrooms, response.data]);
      setFormData({
        semester: '',
        subject: '',
        class: '',
        googleClassCode: '',
        inviteLink: '',
        description: '',
      });
      toast({
        title: 'Success',
        description: 'Classroom created successfully.',
        variant: 'default',
      });
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast({
          title: 'Error',
          description: 'Classroom already exists for this semester, class, and subject.',
          variant: 'destructive',
        });
      }
      else{

      
      console.error('Error creating classroom:', error);
      toast({
        title: 'Error',
        description: 'Failed to create classroom.',
        variant: 'destructive',
      });
    }
    }
    
    finally {
      setLoading(false);
    }
  };

  // Handle classroom update
  const handleUpdate = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/faculty/update-classroom/${id}`,
        editFormData,
        { withCredentials: true }
      );
      setClassrooms(classrooms.map((cls) => (cls._id === id ? response.data : cls)));
      setEditClassroomId(null); // Exit edit mode
      toast({
        title: 'Success',
        description: 'Classroom updated successfully.',
        variant: 'default',
      });
    } catch (error) {
      console.error('Error updating classroom:', error);
      toast({
        title: 'Error',
        description: 'Failed to update classroom.',
        variant: 'destructive',
      });
    }
  };

  // Handle classroom deletion
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/faculty/delete-classroom/${id}`, { withCredentials: true });
      setClassrooms(classrooms.filter((cls) => cls._id !== id));
      toast({
        title: 'Success',
        description: 'Classroom deleted successfully.',
        variant: 'default',
      });
    } catch (error) {
      console.error('Error deleting classroom:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete classroom.',
        variant: 'destructive',
      });
    }
  };

  // Enter edit mode for a classroom
  const enterEditMode = (classroom) => {
    setEditClassroomId(classroom._id);
    setEditFormData({
      semester: classroom.semester,
      subject: classroom.subject,
      class: classroom.class,
      googleClassCode: classroom.googleClassCode,
      inviteLink: classroom.inviteLink,
      description: classroom.description,
    });
  };

  // Exit edit mode
  const exitEditMode = () => {
    setEditClassroomId(null);
    setEditFormData({
      semester: '',
      subject: '',
      class: '',
      googleClassCode: '',
      inviteLink: '',
      description: '',
    });
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-4xl mx-auto bg-gradient-to-r from-blue-50 to-purple-50 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-blue-800 flex">
            <School className="mr-2" /> Create Classroom
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select onValueChange={(value) => setFormData({ ...formData, semester: value })}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select Semester" />
                </SelectTrigger>
                <SelectContent>
                  {['1st Semester', '2nd Semester', '3rd Semester', '4th Semester', '5th Semester', '6th Semester'].map((sem) => (
                    <SelectItem key={sem} value={sem}>
                      {sem}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select onValueChange={(value) => setFormData({ ...formData, class: value })}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select Class" />
                </SelectTrigger>
                <SelectContent>
                  {classes.map((cls) => (
                    <SelectItem key={cls} value={cls.toString()}>
                      Class {cls}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select onValueChange={(value) => setFormData({ ...formData, subject: value })}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select Subject" />
                </SelectTrigger>
                <SelectContent>
                  {filteredSubjects.map((subject) => (
                    <SelectItem key={subject._id} value={subject.subjectName}>
                      {subject.subjectName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Input
                placeholder="Google Classroom Code"
                value={formData.googleClassCode}
                onChange={(e) => setFormData({ ...formData, googleClassCode: e.target.value })}
                className="bg-white"
              />

              <Input
                placeholder="Classroom Invite Link"
                value={formData.inviteLink}
                onChange={(e) => setFormData({ ...formData, inviteLink: e.target.value })}
                className="bg-white"
              />
            </div>

            <Textarea
              placeholder="Description"
              className="min-h-[100px] bg-white"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />

            <div className="flex justify-end space-x-4">
              <Button type="submit" className="flex items-center gap-2 bg-blue-900 hover:bg-blue-800" disabled={loading}>
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <PlusCircle className="w-4 h-4" />}
                {loading ? 'Creating...' : 'Create Classroom'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {classrooms.map((classroom) => (
          <Card key={classroom._id} className="bg-gradient-to-r from-blue-50 to-purple-50 shadow-md">
            <CardHeader>
              <CardTitle className="flex justify-between items-center text-blue-800">
                <span>{classroom.subject}</span>
                <div className="space-x-2">
                  <Button
                    className="bg-blue-200"
                    variant="ghost"
                    size="icon"
                    onClick={() => enterEditMode(classroom)}
                  >
                    <Edit2 className="w-4 h-4 text-blue-600" />
                  </Button>
                  <Button
                    className="bg-red-200"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(classroom._id)}
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {editClassroomId === classroom._id ? (
                <div className="space-y-4">
                  <Select
                    onValueChange={(value) => setEditFormData({ ...editFormData, semester: value })}
                    value={editFormData.semester}
                  >
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Select Semester" />
                    </SelectTrigger>
                    <SelectContent>
                      {['1st Semester', '2nd Semester', '3rd Semester', '4th Semester', '5th Semester', '6th Semester'].map((sem) => (
                        <SelectItem key={sem} value={sem}>
                          {sem}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select
                    onValueChange={(value) => setEditFormData({ ...editFormData, class: value })}
                    value={editFormData.class}
                  >
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Select Class" />
                    </SelectTrigger>
                    <SelectContent>
                      {classes.map((cls) => (
                        <SelectItem key={cls} value={cls.toString()}>
                          Class {cls}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select
                    onValueChange={(value) => setEditFormData({ ...editFormData, subject: value })}
                    value={editFormData.subject}
                  >
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Select Subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredSubjects.map((subject) => (
                        <SelectItem key={subject._id} value={subject.subjectName}>
                          {subject.subjectName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Input
                    placeholder="Google Classroom Code"
                    value={editFormData.googleClassCode}
                    onChange={(e) => setEditFormData({ ...editFormData, googleClassCode: e.target.value })}
                    className="bg-white"
                  />

                  <Input
                    placeholder="Classroom Invite Link"
                    value={editFormData.inviteLink}
                    onChange={(e) => setEditFormData({ ...editFormData, inviteLink: e.target.value })}
                    className="bg-white"
                  />

                  <Textarea
                    placeholder="Description"
                    className="min-h-[100px] bg-white"
                    value={editFormData.description}
                    onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                  />

                  <div className="flex justify-end space-x-4">
                    <Button
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => handleUpdate(classroom._id)}
                    >
                      <Save className="w-4 h-4 mr-2" /> Save
                    </Button>
                    <Button variant="outline" onClick={exitEditMode}>
                      <X className="w-4 h-4 mr-2" /> Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div>
                    <p className="text-sm font-medium">Class Code:</p>
                    <div className="flex items-center gap-2">
                      <code className="bg-white p-2 rounded">{classroom.googleClassCode}</code>
                      <Button
                        className="bg-blue-200"
                        variant="ghost"
                        size="icon"
                        onClick={() => navigator.clipboard.writeText(classroom.googleClassCode)}
                      >
                        <Copy className="w-4 h-4 text-blue-600" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Open Classroom:</p>
                    <a href={classroom.inviteLink} target="_blank" rel="noopener noreferrer">
                      <p className="text-sm text-muted-foreground">{classroom.inviteLink}</p>
                    </a>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Description:</p>
                    <p className="text-sm text-muted-foreground">{classroom.description}</p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FacultyClassroom;