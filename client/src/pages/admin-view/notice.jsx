import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SelectItem, SelectTrigger, SelectContent, SelectLabel, Select, SelectGroup } from "@/components/ui/select";
import { Pencil, Plus, Trash2 } from "lucide-react";
import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminNotice = () => {
  const [notices, setNotices] = useState([]);
  const [action, setAction] = useState("create");
  const [noticeData, setNoticeData] = useState({
    title: "",
    description: "",
    date: new Date().toISOString().split("T")[0], // Default to current date
    from: "admin", // Default "from" value
    to: "all", // Default "to" value (all, students, faculties)
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch all notices from the backend
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/admin/notices");
        setNotices(response.data.notices);
      } catch (error) {
        console.error("Error fetching notices:", error);
      }
    };
    fetchNotices();
  }, []);

  // Handle Create/Update
  const handleSaveNotice = async () => {
    try {
      if (action === "create") {
        // Create a new notice
        const response = await axios.post("http://localhost:5000/api/admin/notices", noticeData);
        setNotices([...notices, response.data.notice]);
      } else if (action === "update") {
        // Update an existing notice
        const response = await axios.put(
          `http://localhost:5000/api/admin/notices/${noticeData._id}`,
          noticeData
        );
        setNotices(notices.map((notice) => (notice._id === noticeData._id ? response.data.notice : notice)));
      }
      closeModal();
    } catch (error) {
      console.error("Error saving notice:", error);
    }
  };

  // Handle Delete
  const handleDeleteNotice = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/notices/${id}`);
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
        from: "admin",
        to: "all",
      }
    );
    setIsModalOpen(true);
  };

  // Open Modal to view Notice details (Read Only)
  const openViewNoticeModal = (notice) => {
    setAction("view");
    setNoticeData(notice);
    setIsModalOpen(true);
  };

  // Close Modal
  const closeModal = () => {
    setIsModalOpen(false);
    setNoticeData({
      title: "",
      description: "",
      date: new Date().toISOString().split("T")[0],
      from: "admin",
      to: "all",
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Manage Notices</h1>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 mb-6">
        <Button
          onClick={() => openModal(null, "create")}
          className="text-white bg-blue-800 flex items-center font-bold"
        >
          <Plus size={44} strokeWidth={3} />
          Add Notice
        </Button>
      </div>

      {/* Notices Table */}
      <div className="overflow-x-auto mb-8">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border border-gray-300 text-sm sm:text-base">ID</th>
              <th className="px-4 py-2 border border-gray-300 text-sm sm:text-base">Title</th>
              <th className="px-4 py-2 border border-gray-300 text-sm sm:text-base">Date</th>
              <th className="px-4 py-2 border border-gray-300 text-sm sm:text-base">Actions</th>
            </tr>
          </thead>
          <tbody>
            {notices.map((notice) => (
              <tr key={notice._id}>
                <td className="px-4 py-2 border border-gray-300">{notice._id}</td>
                <td
                  className="px-4 py-2 border border-gray-300 text-blue-600 cursor-pointer"
                  onClick={() => openViewNoticeModal(notice)}
                >
                  {notice.title}
                </td>
                <td className="px-4 py-2 border border-gray-300">{notice.date}</td>
                <td className="px-4 py-2 border border-gray-300">
                  <Button
                    onClick={() => openModal(notice, "update")}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
                  >
                    <Pencil /> Update
                  </Button>
                  <Button
                    onClick={() => handleDeleteNotice(notice._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 ml-2"
                  >
                    <Trash2 /> Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Add/Update Notice */}
      {isModalOpen && action !== "view" && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={closeModal}
        >
          <div
            className="bg-white p-6 rounded-lg w-96"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">
              {action === "create" ? "Add Notice" : "Update Notice"}
            </h2>

            <div className="mb-4">
              <Label htmlFor="to" className="block text-sm font-semibold text-gray-700">
                From
              </Label>
              <Input
                type="text"
                value="Admin"
                disabled
              />
            </div>

            <div className="mb-4">
              <Label htmlFor="to" className="block text-sm font-semibold text-gray-700">
                To
              </Label>
              <Select
                value={noticeData.to}
                onValueChange={(value) => setNoticeData({ ...noticeData, to: value })}
                className="mt-2 w-full"
              >
                <SelectTrigger>
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

            <div className="mb-4">
              <Label htmlFor="title" className="block text-sm font-semibold text-gray-700">
                Title
              </Label>
              <Input
                id="title"
                type="text"
                value={noticeData.title}
                onChange={(e) => setNoticeData({ ...noticeData, title: e.target.value })}
                className="mt-2 w-full"
              />
            </div>

            <div className="mb-4">
              <Label htmlFor="description" className="block text-sm font-semibold text-gray-700">
                Description
              </Label>
              <Textarea
                id="description"
                value={noticeData.description}
                onChange={(e) => setNoticeData({ ...noticeData, description: e.target.value })}
                className="mt-2 w-full"
              />
            </div>

            <div className="mb-4">
              <Label htmlFor="date" className="block text-sm font-semibold text-gray-700">
                Date
              </Label>
              <Input
                id="date"
                type="date"
                value={noticeData.date}
                onChange={(e) => setNoticeData({ ...noticeData, date: e.target.value })}
                className="mt-2 w-full"
              />
            </div>

            <div className="flex justify-end gap-4">
              <Button onClick={closeModal} className="bg-gray-600 text-white">
                Cancel
              </Button>
              <Button onClick={handleSaveNotice} className="bg-blue-600 text-white">
                Save
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for View Notice */}
      {isModalOpen && action === "view" && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={closeModal}
        >
          <div
            className="bg-white p-6 rounded-lg w-96"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">Notice Details</h2>

            <div className="mb-4">
              <Label htmlFor="title" className="block text-sm font-semibold text-gray-700">
                Title
              </Label>
              <Input
                id="title"
                type="text"
                value={noticeData.title}
                readOnly
                className="mt-2 w-full"
              />
            </div>

            <div className="mb-4">
              <Label htmlFor="description" className="block text-sm font-semibold text-gray-700">
                Description
              </Label>
              <Textarea
                id="description"
                value={noticeData.description}
                readOnly
                className="mt-2 w-full"
              />
            </div>

            <div className="mb-4">
              <Label htmlFor="date" className="block text-sm font-semibold text-gray-700">
                Date
              </Label>
              <Input
                id="date"
                type="date"
                value={noticeData.date}
                readOnly
                className="mt-2 w-full"
              />
            </div>

            <div className="mb-4">
              <Label htmlFor="to" className="block text-sm font-semibold text-gray-700">
                From
              </Label>
              <Input
                id="to"
                type="text"
                value={noticeData.from}
                readOnly
                className="mt-2 w-full"
              />
            </div>

            <div className="mb-4">
              <Label htmlFor="for" className="block text-sm font-semibold text-gray-700">
                To
              </Label>
              <Input
                id="for"
                type="text"
                value={noticeData.to}
                readOnly
                className="mt-2 w-full"
              />
            </div>

            <div className="flex justify-end gap-4">
              <Button onClick={closeModal} className="bg-gray-600 text-white">
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminNotice;