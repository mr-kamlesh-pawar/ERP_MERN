import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil, Plus, Trash2 } from "lucide-react";

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [action, setAction] = useState("create");
  const [eventData, setEventData] = useState({ id: null, title: "", date: "", location: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle Save Event
  const handleSaveEvent = () => {
    if (action === "create") {
      setEvents([...events, { ...eventData, id: Date.now() }]);
    } else if (action === "update") {
      setEvents(
        events.map((event) => (event.id === eventData.id ? { ...eventData } : event))
      );
    }
    closeModal();
  };

  // Handle Delete Event
  const handleDeleteEvent = (id) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  // Open Modal for Create/Update Event
  const openModal = (event = null, actionType = "create") => {
    setAction(actionType);
    setEventData(event || { id: null, title: "", date: "", location: "" });
    setIsModalOpen(true);
  };

  // Close Modal
  const closeModal = () => {
    setIsModalOpen(false);
    setEventData({ id: null, title: "", date: "", location: "" });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Manage Events</h1>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 mb-6">
        <Button
          onClick={() => openModal(null, "create")}
          className="text-white bg-blue-800 flex items-center font-bold"
        >
          <Plus size={20} className="mr-2" />
          Add Event
        </Button>
      </div>

      {/* Events Table */}
      <div className="overflow-x-auto mb-8">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border border-gray-300 text-sm sm:text-base">ID</th>
              <th className="px-4 py-2 border border-gray-300 text-sm sm:text-base">Event Title</th>
              <th className="px-4 py-2 border border-gray-300 text-sm sm:text-base">Date</th>
              <th className="px-4 py-2 border border-gray-300 text-sm sm:text-base">Location</th>
              <th className="px-4 py-2 border border-gray-300 text-sm sm:text-base">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id}>
                <td className="px-4 py-2 border border-gray-300">{event.id}</td>
                <td className="px-4 py-2 border border-gray-300">{event.title}</td>
                <td className="px-4 py-2 border border-gray-300">{event.date}</td>
                <td className="px-4 py-2 border border-gray-300">{event.location}</td>
                <td className="px-4 py-2 border border-gray-300">
                  <Button
                    onClick={() => openModal(event, "update")}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
                  >
                    <Pencil /> Update
                  </Button>
                  <Button
                    onClick={() => handleDeleteEvent(event.id)}
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

      {/* Modal for Create/Update Event */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={closeModal}
        >
          <div
            className="bg-white p-6 rounded-lg w-96"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">
              {action === "create" ? "Add Event" : "Update Event"}
            </h2>

            <div className="mb-4">
              <Label htmlFor="title" className="block text-sm font-semibold text-gray-700">
                Event Title
              </Label>
              <Input
                id="title"
                type="text"
                value={eventData.title}
                onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
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
                value={eventData.date}
                onChange={(e) => setEventData({ ...eventData, date: e.target.value })}
                className="mt-2 w-full"
              />
            </div>

            <div className="mb-4">
              <Label htmlFor="location" className="block text-sm font-semibold text-gray-700">
                Location
              </Label>
              <Input
                id="location"
                type="text"
                value={eventData.location}
                onChange={(e) => setEventData({ ...eventData, location: e.target.value })}
                className="mt-2 w-full"
              />
            </div>

            <div className="flex justify-end gap-4">
              <Button onClick={closeModal} className="bg-gray-600 text-white">
                Cancel
              </Button>
              <Button onClick={handleSaveEvent} className="bg-blue-600 text-white">
                Save
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEvents;
