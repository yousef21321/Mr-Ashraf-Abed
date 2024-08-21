import React, { useEffect, useState } from "react";
import "./ScrollProgressBar.css";

export default function ScrollProgressBar() {
  const [scrollPosition, setScrollPosition] = useState(0);

  const updateScrollProgress = () => {
    const scrollTotal = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPosition = document.documentElement.scrollTop;
    setScrollPosition((scrollPosition / scrollTotal) * 100);
  };

  useEffect(() => {
    window.addEventListener("scroll", updateScrollProgress);
    return () => window.removeEventListener("scroll", updateScrollProgress);
  }, []);

  return (
    <div className="progress-bar-container">
      <div
        className="progress-bar"
        style={{ width: `${scrollPosition}%` }}
      ></div>
    </div>
  );
}
