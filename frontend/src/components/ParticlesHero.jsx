import React, { useEffect, useState, useMemo } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const ParticlesHero = ({ id = "tsparticles-home" }) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setReady(true));
  }, []);

  // Memoize options to prevent unnecessary re-renders
  const particleOptions = useMemo(() => ({
    fullScreen: { enable: false },
    background: { color: { value: "transparent" } },
    fpsLimit: 45, // Reduced from 60 for better performance
    detectRetina: true,
    interactivity: {
      events: {
        onHover: { enable: true, mode: "grab" },
        onClick: { enable: true, mode: "push" },
      },
      modes: {
        grab: { distance: 150, links: { opacity: 0.5 } }, // Reduced distance
        push: { quantity: 1 }, // Reduced from 2
      },
    },
    particles: {
      color: { value: ["#00F0FF", "#2563EB", "#ffffff"] },
      links: {
        enable: true,
        color: "#00F0FF",
        distance: 120, // Reduced from 140
        opacity: 0.18, // Reduced from 0.22
        width: 1,
      },
      move: {
        enable: true,
        speed: 0.5, // Reduced from 0.7
        outModes: { default: "bounce" },
      },
      number: { value: 50, density: { enable: true, area: 900 } }, // Reduced from 70
      opacity: { value: { min: 0.3, max: 0.8 } }, // Reduced max from 0.9
      shape: { type: "circle" },
      size: { value: { min: 0.5, max: 2 } }, // Slightly reduced
    },
  }), []);

  if (!ready) return null;

  return (
    <Particles
      id={id}
      options={particleOptions}
      className="absolute inset-0"
    />
  );
};

export default React.memo(ParticlesHero);
