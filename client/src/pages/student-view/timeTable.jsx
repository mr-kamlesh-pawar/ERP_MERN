import React, { useEffect, useState } from "react";
import axios from "axios";
import { Calendar, Clock, BookOpen, Maximize, Minimize } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const TimetableComponent = () => {
  const [timetable, setTimetable] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false); // State for full-screen mode

  // Fetch timetable from the API
  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        const response = await axios.get("https://rmd-erp-server.vercel.app/api/student/timetable", {
          withCredentials: true, // Include cookies for authentication
        });

        if (response.data.success) {
          setTimetable(response.data.timetable);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError("Failed to fetch timetable. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchTimetable();
  }, []);

  // Toggle full-screen mode
  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <Calendar className="w-6 h-6 text-blue-600" />
            Timetable
          </CardTitle>
        </CardHeader>
        <CardContent>
          {timetable ? (
            <div className="space-y-4">
              {/* Timetable Details */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-green-500" />
                  <span className="font-medium">Department: {timetable.department}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-purple-500" />
                  <span className="font-medium">Year: {timetable.year}</span>
                </div>
                <div className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-orange-500" />
                  <span className="font-medium">Class: {timetable.classNumber}</span>
                </div>
              </div>

              {/* Timetable Image */}
              <div className="mt-6">
                <div className="relative">
                  <img
                    src={timetable.fileUrl}
                    alt="Timetable"
                    className={`w-full h-auto rounded-lg shadow-sm ${isFullScreen ? "cursor-zoom-out" : "cursor-zoom-in"}`}
                    onClick={toggleFullScreen}
                  />
                  <Button
                    className="absolute top-2 right-2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2"
                    onClick={toggleFullScreen}
                  >
                    {isFullScreen ? (
                      <Minimize className="w-5 h-5" />
                    ) : (
                      <Maximize className="w-5 h-5" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Full-Screen Overlay */}
              {isFullScreen && (
                <div
                  className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
                  onClick={toggleFullScreen}
                >
                  <img
                    src={timetable.fileUrl}
                    alt="Timetable"
                    className="max-w-full max-h-full rounded-lg shadow-lg"
                  />
                </div>
              )}

              {/* Download Button */}
              <div className="mt-6 flex justify-center">
                <a
                  href={timetable.fileUrl}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    Download Timetable
                  </Button>
                </a>
              </div>
            </div>
          ) : (
            <p className="text-gray-600">No timetable available.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TimetableComponent;