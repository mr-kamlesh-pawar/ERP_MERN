import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Calendar, MapPin, ArrowRight, Clock, Info } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const EventsComponent = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null); // Selected event for modal

  // Fetch events from the API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("https://rmd-erp-server.vercel.app/api/student/events");

        if (response.data.success) {
          setEvents(response.data.events);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError("Failed to fetch events. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Open event details in a modal
  const openEventModal = (event) => {
    setSelectedEvent(event);
  };

  // Close event modal
  const closeEventModal = () => {
    setSelectedEvent(null);
  };

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold flex items-center gap-2 mb-6">
        <Calendar className="w-6 h-6 text-blue-600" />
        Upcoming Events
      </h1>

      {/* List of Events */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {events.map((event) => (
          <Card
            key={event._id}
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => openEventModal(event)}
          >
            <CardHeader>
              <CardTitle className="text-lg font-semibold line-clamp-2">
                {event.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
                <MapPin className="w-4 h-4" />
                <span className="line-clamp-2">{event.location}</span>
              </div>
            </CardContent>
            <CardContent className="flex items-center gap-2 text-sm text-blue-600">
              <ArrowRight className="w-4 h-4" />
              <span>View Details</span>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <Dialog open={!!selectedEvent} onOpenChange={closeEventModal}>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold flex items-center gap-2">
                <Info className="w-6 h-6 text-blue-600" />
                {selectedEvent.title}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>{selectedEvent.date}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{selectedEvent.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>Time: 10:00 AM - 4:00 PM</span> {/* Add time if available */}
              </div>
              <div className="text-sm text-gray-600">
                <p className="font-medium">Description:</p>
                <p>
                🔔 Reminder: Upcoming Deadlines - Don't Miss Out!
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default EventsComponent;