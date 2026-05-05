import React from "react";

const PulseDivider = ({ className = "" }) => (
  <div className={`relative w-full h-px overflow-hidden bg-white/5 ${className}`}>
    <div className="pulse-line absolute inset-0" />
  </div>
);

export default PulseDivider;
