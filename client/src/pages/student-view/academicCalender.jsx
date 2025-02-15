import React, { useEffect, useState } from "react";
import axios from "axios";
import { Calendar, Clock, BookOpen, Download } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const AcademicCalendar = () => {
  const [calendar, setCalendar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch academic calendar from the API
  useEffect(() => {
    const fetchAcademicCalendar = async () => {
      try {
        const response = await axios.get("https://rmd-erp-server.vercel.app/api/student/academic", {
          withCredentials: true, // Include cookies for authentication
        });

        if (response.data.success) {
          setCalendar(response.data.calendar);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError("Failed to fetch academic calendar. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchAcademicCalendar();
  }, []);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card className="shadow-lg">
          <CardHeader>
            <Skeleton className="h-8 w-48" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-10 w-32" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <Calendar className="w-6 h-6 text-blue-600" />
            Academic Calendar
          </CardTitle>
        </CardHeader>
        <CardContent>
          {calendar ? (
            <div className="space-y-6">
              {/* Calendar Details */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-green-500" />
                  <span className="font-medium">Department: {calendar.department}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-purple-500" />
                  <span className="font-medium">Year: {calendar.year}</span>
                </div>
                <div className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-orange-500" />
                  <span className="font-medium">Class: {calendar.classNumber}</span>
                </div>
              </div>

              {/* Calendar Image */}
              <div className="mt-6">
                <img
                  src={calendar.fileUrl}
                  alt="Academic Calendar"
                  className="w-full h-auto rounded-lg shadow-sm"
                />
              </div>

              {/* Download Button */}
              <div className="mt-6 flex justify-center">
                <a
                  href={calendar.fileUrl}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Download className="w-5 h-5 mr-2" />
                    Download Calendar
                  </Button>
                </a>
              </div>
            </div>
          ) : (
            <p className="text-gray-600">No academic calendar available.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AcademicCalendar;