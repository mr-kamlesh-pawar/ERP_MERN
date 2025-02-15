import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectGroup, SelectLabel } from "@/components/ui/select";
import { Pencil, Plus, Trash2, Loader2 } from "lucide-react";
import React, { useState, useEffect } from "react";
import axios from "axios";

const CreateNotice = () => {
  const [notices, setNotices] = useState([]);
  const [action, setAction] = useState("create");
  const [noticeData, setNoticeData] = useState({
    title: "",
    description: "",
    date: new Date().toISOString().split("T")[0], // Default to current date
    from: "faculty", // Default "from" value
    to: "all", // Default "to" value (all, students, faculties)
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch all notices from the backend
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await axios.get("https://rmd-erp-server.vercel.app/api/faculty/notices");
        setNotices(response.data.notices);
      } catch (error) {
        console.error("Error fetching notices:", error);
      }
    };
    fetchNotices();
  }, []);

  // Handle Create/Update
  const handleSaveNotice = async () => {
    setIsLoading(true);
    try {
      if (action === "create") {
        // Create a new notice
        const response = await axios.post("https://rmd-erp-server.vercel.app/api/faculty/notices", noticeData);
        setNotices([...notices, response.data.notice]);
      } else if (action === "update") {
        // Update an existing notice
        const response = await axios.put(
          `https://rmd-erp-server.vercel.app/api/faculty/notices/${noticeData._id}`,
          noticeData
        );
        setNotices(notices.map((notice) => (notice._id === noticeData._id ? response.data.notice : notice)));
      }
      closeModal();
    } catch (error) {
      console.error("Error saving notice:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Delete
  const handleDeleteNotice = async (id) => {
    try {
      await axios.delete(`https://rmd-erp-server.vercel.app/api/faculty/notices/${id}`);
      setNotices(notices.filter((notice) => notice._id !== id));
    } catch (error) {
      console.error("Error deleting notice:", error);
    }
  };

  // Open Modal for Create or Update
  const openModal = (notice = null, actionType = "create") => {
    setAction(actionType);
    setNoticeData(
      notice || {
        title: "",
        description: "",
        date: new Date().toISOString().split("T")[0],
        from: "faculty",
        to: "all",
      }
    );
    setIsModalOpen(true);
  };

  // Close Modal
  const closeModal = () => {
    setIsModalOpen(false);
    setNoticeData({
      title: "",
      description: "",
      date: new Date().toISOString().split("T")[0],
      from: "faculty",
      to: "all",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Manage Notices</h1>

        {/* Action Buttons */}
        <div className="flex justify-end mb-6">
          <Button
            onClick={() => openModal(null, "create")}
            className="bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2 transition-transform transform hover:scale-105"
          >
            <Plus size={18} /> Add Notice
          </Button>
        </div>

        {/* Notices Table */}
        <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
          <table className="min-w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">ID</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Title</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {notices.map((notice) => (
                <tr key={notice._id} className="hover:bg-gray-50 transition duration-200">
                  <td className="px-6 py-4 text-sm text-gray-700">{notice._id}</td>
                  <td
                    className="px-6 py-4 text-sm text-blue-600 cursor-pointer hover:underline"
                    onClick={() => openModal(notice, "view")}
                  >
                    {notice.title}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{notice.date}</td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex gap-2">
                      <Button
                        onClick={() => openModal(notice, "update")}
                        className="bg-yellow-500 text-white hover:bg-yellow-600 transition-transform transform hover:scale-105"
                      >
                        <Pencil size={16} /> Edit
                      </Button>
                      <Button
                        onClick={() => handleDeleteNotice(notice._id)}
                        className="bg-red-500 text-white hover:bg-red-600 transition-transform transform hover:scale-105"
                      >
                        <Trash2 size={16} /> Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal for Add/Update Notice */}
        {isModalOpen && action !== "view" && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={closeModal}
          >
            <div
              className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3 p-6 animate-fade-in"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-bold mb-4 text-gray-800">
                {action === "create" ? "Add Notice" : "Update Notice"}
              </h2>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="to" className="block text-sm font-semibold text-gray-700">
                    To
                  </Label>
                  <Select
                    value={noticeData.to}
                    onValueChange={(value) => setNoticeData({ ...noticeData, to: value })}
                  >
                    <SelectTrigger className="w-full">
                      <span>{noticeData.to}</span>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Recipient</SelectLabel>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="students">Students</SelectItem>
                        <SelectItem value="faculties">Faculties</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="title" className="block text-sm font-semibold text-gray-700">
                    Title
                  </Label>
                  <Input
                    id="title"
                    value={noticeData.title}
                    onChange={(e) => setNoticeData({ ...noticeData, title: e.target.value })}
                    className="w-full"
                  />
                </div>

                <div>
                  <Label htmlFor="description" className="block text-sm font-semibold text-gray-700">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    value={noticeData.description}
                    onChange={(e) => setNoticeData({ ...noticeData, description: e.target.value })}
                    className="w-full"
                  />
                </div>

                <div>
                  <Label htmlFor="date" className="block text-sm font-semibold text-gray-700">
                    Date
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={noticeData.date}
                    onChange={(e) => setNoticeData({ ...noticeData, date: e.target.value })}
                    className="w-full"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <Button onClick={closeModal} className="bg-gray-500 text-white hover:bg-gray-600">
                  Cancel
                </Button>
                <Button
                  onClick={handleSaveNotice}
                  className="bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2"
                  disabled={isLoading}
                >
                  {isLoading ? <Loader2 className="animate-spin" size={18} /> : "Save"}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Modal for View Notice */}
        {isModalOpen && action === "view" && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={closeModal}
          >
            <div
              className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3 p-6 animate-fade-in"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-bold mb-4 text-gray-800">Notice Details</h2>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="title" className="block text-sm font-semibold text-gray-700">
                    Title
                  </Label>
                  <Input id="title" value={noticeData.title} readOnly className="w-full" />
                </div>

                <div>
                  <Label htmlFor="description" className="block text-sm font-semibold text-gray-700">
                    Description
                  </Label>
                  <Textarea id="description" value={noticeData.description} readOnly className="w-full" />
                </div>

                <div>
                  <Label htmlFor="date" className="block text-sm font-semibold text-gray-700">
                    Date
                  </Label>
                  <Input id="date" type="date" value={noticeData.date} readOnly className="w-full" />
                </div>

                <div>
                  <Label htmlFor="to" className="block text-sm font-semibold text-gray-700">
                    To
                  </Label>
                  <Input id="to" value={noticeData.to} readOnly className="w-full" />
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <Button onClick={closeModal} className="bg-gray-500 text-white hover:bg-gray-600">
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateNotice;