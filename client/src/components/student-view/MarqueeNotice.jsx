import React, { useEffect, useState } from "react";

const MarqueeNotice = () => {
  const [notice, setNotice] = useState({});
  const [event, setEvent] = useState({});

  useEffect(() => {
    // Fetch the most recent notice
    fetch('http://localhost:5000/api/student/notices/recent')
      .then(response => response.json())
      .then(data => setNotice(data))
      .catch(error => console.error('Error fetching notice:', error));

    // Fetch the most recent event
    fetch('http://localhost:5000/api/student/events/recent')
      .then(response => response.json())
      .then(data => setEvent(data))
      .catch(error => console.error('Error fetching event:', error));
  }, []);
  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-r from-red-500 to-pink-500 py-3">
      <div className="whitespace-nowrap animate-marquee flex items-center gap-16">
        <p className="text-white text-lg font-bold uppercase tracking-wide">
          🚨 Important Notice:  {notice.title}: {notice.description}!
        </p>
        <p className="text-white text-lg font-bold uppercase tracking-wide">
          📢 Attention:  {event.title} at {event.location} on {event.date}!
        </p>
        <p className="text-white text-lg font-bold uppercase tracking-wide">
          🔔 Reminder: Upcoming Deadlines - Don't Miss Out!
        </p>
      </div>
    </div>
  );
};

export default MarqueeNotice;
