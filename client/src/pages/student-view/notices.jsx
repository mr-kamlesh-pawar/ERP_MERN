import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Calendar, AlertCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const NoticeComponent = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedNotice, setSelectedNotice] = useState(null); // Selected notice for modal

  // Fetch notices from the API
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/student/notices", {
          withCredentials: true, // Include cookies for authentication
        });

        if (response.data.success) {
          setNotices(response.data.notices);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError("Failed to fetch notices. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  // Open notice details in a modal
  const openNoticeModal = (notice) => {
    setSelectedNotice(notice);
  };

  // Close notice modal
  const closeNoticeModal = () => {
    setSelectedNotice(null);
  };

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold flex items-center gap-2 mb-6">
        <AlertCircle className="w-6 h-6 text-blue-600" />
        Notices
      </h1>

      {/* List of Notices */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {notices.map((notice) => (
          <Card
            key={notice._id}
            className="cursor-pointer hover:shadow-md transition-shadow h-[200px] flex flex-col"
            onClick={() => openNoticeModal(notice)}
          >
            <CardHeader className="flex-1">
              <CardTitle className="text-lg font-semibold line-clamp-2">
                {notice.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>{notice.date}</span>
              </div>
              <div className="mt-2 text-sm text-gray-600 line-clamp-3">
                {notice.description}
              </div>
            </CardContent>
            <CardFooter className="text-sm text-gray-500">
              From: {notice.from} | To: {notice.to}
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Notice Details Modal */}
      {selectedNotice && (
        <Dialog open={!!selectedNotice} onOpenChange={closeNoticeModal}>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold flex items-center gap-2">
                <AlertCircle className="w-6 h-6 text-blue-600" />
                {selectedNotice.title}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>{selectedNotice.date}</span>
              </div>
              <div className="text-sm text-gray-600">
                {selectedNotice.description}
              </div>
              <div className="text-sm text-gray-500">
                From: {selectedNotice.from} | To: {selectedNotice.to}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default NoticeComponent;