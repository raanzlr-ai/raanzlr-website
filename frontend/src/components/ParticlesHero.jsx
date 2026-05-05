import React, { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const ParticlesHero = ({ id = "tsparticles-home" }) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setReady(true));
  }, []);

  if (!ready) return null;

  return (
    <Particles
      id={id}
      options={{
        fullScreen: { enable: false },
        background: { color: { value: "transparent" } },
        fpsLimit: 60,
        detectRetina: true,
        interactivity: {
          events: {
            onHover: { enable: true, mode: "grab" },
            onClick: { enable: true, mode: "push" },
          },
          modes: {
            grab: { distance: 180, links: { opacity: 0.6 } },
            push: { quantity: 2 },
          },
        },
        particles: {
          color: { value: ["#00F0FF", "#2563EB", "#ffffff"] },
          links: {
            enable: true,
            color: "#00F0FF",
            distance: 140,
            opacity: 0.22,
            width: 1,
          },
          move: {
            enable: true,
            speed: 0.7,
            outModes: { default: "bounce" },
          },
          number: { value: 70, density: { enable: true, area: 900 } },
          opacity: { value: { min: 0.3, max: 0.9 } },
          shape: { type: "circle" },
          size: { value: { min: 0.6, max: 2.2 } },
        },
      }}
      className="absolute inset-0"
    />
  );
};

export default ParticlesHero;
