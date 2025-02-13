import React, { useEffect, useState } from "react";

const AnimatedCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trailPosition, setTrailPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Track cursor position
  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.pageX, y: e.pageY });

      // Check if hovering over interactive elements
      const target = e.target;
      if (target.closest("button, a, input, textarea, select")) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Smooth trailing effect
  useEffect(() => {
    const interval = setInterval(() => {
      setTrailPosition((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.1,
        y: prev.y + (position.y - prev.y) * 0.1,
      }));
    }, 20);

    return () => clearInterval(interval);
  }, [position]);

  return (
    <>
      {/* Main Cursor */}
      <div
        className="fixed w-8 h-8 rounded-full pointer-events-none z-50 transition-transform duration-100 ease-out"
        style={{
          transform: `translate3d(${position.x - 16}px, ${position.y - 16}px, 0) scale(${isHovering ? 1.8 : 1})`,
          background: isHovering
            ? "radial-gradient(circle, rgba(255, 105, 180, 0.8), transparent)"
            : "radial-gradient(circle, rgba(255, 255, 255, 0.8), transparent)",
          border: isHovering ? "2px solid rgba(255, 105, 180, 0.8)" : "2px solid rgba(255, 255, 255, 0.8)",
          boxShadow: isHovering
            ? "0 0 25px rgba(255, 105, 180, 0.8)"
            : "0 0 15px rgba(255, 255, 255, 0.6)",
          animation: isHovering ? "pulse 0.5s infinite alternate" : "none",
        }}
      ></div>

      {/* Trailing Cursor */}
      <div
        className="fixed w-10 h-10 rounded-full pointer-events-none z-40 transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(${trailPosition.x - 20}px, ${trailPosition.y - 20}px, 0) scale(${isHovering ? 1.4 : 1})`,
          background: isHovering
            ? "radial-gradient(circle, rgba(255, 105, 180, 0.5), transparent)"
            : "radial-gradient(circle, rgba(255, 255, 255, 0.5), transparent)",
          border: isHovering ? "2px solid rgba(255, 105, 180, 0.5)" : "2px solid rgba(255, 255, 255, 0.5)",
          boxShadow: "0 0 20px rgba(255, 255, 255, 0.3)",
          opacity: 0.5,
          animation: isHovering ? "trail 0.8s infinite alternate" : "none",
        }}
      ></div>
    </>
  );
};

export default AnimatedCursor;
