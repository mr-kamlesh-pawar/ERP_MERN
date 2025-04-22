import React, { useState, useCallback } from "react";
import { Calendar, Clock, BookOpen, Maximize, Minimize } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import timetableImage from "../../assets/timetable.jpg";

const TimetableComponent = () => {
  const [timetable, setTimetable] = useState({
    department: "Computer Engineering",
    year: "3rd Year",
    classNumber: "B",
    fileUrl: timetableImage
  });
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [imageStyle, setImageStyle] = useState({ transform: 'scale(1)' });

  // Toggle full-screen mode with enhanced handling
  const toggleFullScreen = useCallback((e) => {
    e.stopPropagation(); // Prevent event bubbling
    setIsFullScreen(prev => !prev);
    // Reset image style when toggling
    setImageStyle({ transform: 'scale(1)' });
  }, []);

  // Handle image click for zoom in/out in fullscreen mode
  const handleImageClick = useCallback((e) => {
    e.stopPropagation();
    if (isFullScreen) {
      setImageStyle(prev => ({
        transform: prev.transform === 'scale(1)' ? 'scale(1.5)' : 'scale(1)',
        transition: 'transform 0.3s ease'
      }));
    }
  }, [isFullScreen]);

  // Handle escape key to exit fullscreen
  React.useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isFullScreen) {
        setIsFullScreen(false);
        setImageStyle({ transform: 'scale(1)' });
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isFullScreen]);

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
                  className={`w-full h-auto rounded-lg shadow-sm cursor-pointer transition-transform duration-300`}
                  onClick={toggleFullScreen}
                />
                <Button
                  className="absolute top-2 right-2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 z-10"
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

            {/* Full-Screen Overlay with Enhanced Zoom */}
            {isFullScreen && (
              <div
                className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
                onClick={toggleFullScreen}
              >
                <div className="relative max-w-[90vw] max-h-[90vh]" onClick={e => e.stopPropagation()}>
                  <img
                    src={timetable.fileUrl}
                    alt="Timetable"
                    className="max-w-full max-h-[90vh] rounded-lg shadow-lg cursor-zoom-in"
                    style={imageStyle}
                    onClick={handleImageClick}
                  />
                  <Button
                    className="absolute top-2 right-2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2"
                    onClick={toggleFullScreen}
                  >
                    <Minimize className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            )}

            {/* Download Button */}
            <div className="mt-6 flex justify-center">
              <a
                href={timetable.fileUrl}
                download="timetable.jpg"
                className="inline-block"
              >
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Download Timetable
                </Button>
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TimetableComponent;