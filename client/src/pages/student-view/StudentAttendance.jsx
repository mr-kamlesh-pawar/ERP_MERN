import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { CheckCircle, XCircle, User, ClipboardPenLine } from 'lucide-react';
import { motion } from 'framer-motion';

const StudentAttendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await axios.get('https://rmd-erp-server.vercel.app/api/student/attendance', { withCredentials: true });
        setAttendanceData(response.data.attendanceData);
      } catch (error) {
        console.error('Error fetching attendance:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-900">Your Attendance</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {attendanceData.map((subject, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow bg-white rounded-lg border border-gray-200">
              <CardHeader>
                <CardTitle className="text-xl text-blue-800">{subject.subject}</CardTitle>
                <CardDescription className="text-gray-600">Attendance Summary</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Circular Progress Bar */}
                  <div className="flex justify-center">
                    <div className="relative w-24 h-24">
                      <svg className="w-full h-full" viewBox="0 0 100 100">
                        {/* Background Circle */}
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="#e2e8f0"
                          strokeWidth="10"
                        />
                        {/* Progress Circle */}
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="#3b82f6"
                          strokeWidth="10"
                          strokeDasharray="283" // 2 * π * r (2 * 3.14 * 45)
                          strokeDashoffset={283 - (283 * subject.percentage) / 100}
                          strokeLinecap="round"
                          transform="rotate(-90 50 50)"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-lg font-semibold text-blue-800">
                          {subject.percentage}%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Faculty Name */}
                  <div className="flex items-center">
                    <User className="w-5 h-5 mr-2 text-purple-500" />
                    <span className="text-gray-700">Faculty: {subject.facultyName}</span>
                  </div>

                  {/* Present Lectures */}
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                    <span className="text-gray-700">Present: {subject.presentLectures}</span>
                  </div>

                  {/* Total Lectures */}
                  <div className="flex items-center">
                    <ClipboardPenLine className="w-5 h-5 mr-2 text-red-500" />
                    <span className="text-gray-700">Total Lectures: {subject.totalLectures}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StudentAttendance;