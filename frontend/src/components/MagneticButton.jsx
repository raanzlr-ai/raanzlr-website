import React, { useRef } from "react";
import { Link } from "react-router-dom";

const MagneticButton = ({ children, to, href, onClick, variant = "primary", className = "", testId, type = "button" }) => {
  const ref = useRef(null);

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    el.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
  };
  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = "translate(0,0)";
  };

  const base =
    "magnetic inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium tracking-wide select-none whitespace-nowrap";
  const styles = {
    primary:
      "bg-cyan-400/10 border border-cyan-400/40 text-cyan-100 hover:bg-cyan-400/20 hover:border-cyan-300 hover:text-white transition-colors [box-shadow:0_0_0_1px_rgba(0,240,255,0.2),0_0_30px_-4px_rgba(0,240,255,0.45)]",
    ghost:
      "bg-transparent border border-white/15 text-white/90 hover:border-white/40 hover:bg-white/5 transition-colors",
    solid:
      "bg-white text-black hover:bg-cyan-200 transition-colors",
  };
  const cls = `${base} ${styles[variant]} ${className}`;

  const Inner = (
    <span
      ref={ref}
      data-magnet
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={cls}
    >
      {children}
    </span>
  );

  if (to) return <Link to={to} data-testid={testId} onClick={onClick}>{Inner}</Link>;
  if (href) return <a href={href} data-testid={testId} onClick={onClick}>{Inner}</a>;
  return (
    <button type={type} data-testid={testId} onClick={onClick} className="outline-none">
      {Inner}
    </button>
  );
};

export default MagneticButton;
