import React from "react";

// Animated heartbeat pulse SVG echoing the raanzlr logo pulse.
const Heartbeat = ({ className = "", color = "#00F0FF" }) => (
  <svg
    viewBox="0 0 600 60"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
  >
    <defs>
      <linearGradient id="hbGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor={color} stopOpacity="0" />
        <stop offset="40%" stopColor={color} stopOpacity="0.9" />
        <stop offset="60%" stopColor={color} stopOpacity="0.9" />
        <stop offset="100%" stopColor={color} stopOpacity="0" />
      </linearGradient>
    </defs>
    <path
      d="M0 30 L180 30 L200 30 L215 10 L235 50 L255 18 L275 42 L290 30 L600 30"
      stroke="url(#hbGrad)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ filter: `drop-shadow(0 0 6px ${color})` }}
    />
  </svg>
);

export default Heartbeat;
